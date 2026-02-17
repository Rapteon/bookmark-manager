"use client";
import { Bookmark } from "@/app/lib/models/Bookmark";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import BookmarkCard from "./card";

export default function BookmarkList({
  bookmarks,
  userEmail,
}: {
  bookmarks: Bookmark[];
  userEmail: string;
}) {
  let [items, setItems] = useState(bookmarks);
  useEffect(() => {
    if (!userEmail) return;
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          const oldPayload = payload.old as Bookmark;
          const newPayload = payload.new as Bookmark;

          setItems((prev) => {
            if (payload.eventType === "INSERT") {
              if (newPayload.email === userEmail) {
                return [...prev, newPayload];
              }
            }

            if (payload.eventType === "UPDATE") {
              if (newPayload.email === userEmail) {
                return prev.map((bk) =>
                  bk.id === oldPayload.id && bk.email === oldPayload.email
                    ? { ...bk, title: newPayload.title, url: newPayload.url }
                    : bk,
                );
              }
            }

            if (payload.eventType === "DELETE") {
              if (oldPayload.email === userEmail) {
                return prev.filter(
                  (bk) =>
                    !(
                      bk.id === oldPayload.id && bk.email === oldPayload.email
                    ),
                );
              }
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userEmail]);

  return (
    <div className="h-full">
      {items.length > 0 ? (
        items.map((item) => <BookmarkCard key={item.id+item.email} bookmark={item} />)
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">
            Add some bookmarks to get started
          </p>
        </div>
      )}
    </div>
  );
}
