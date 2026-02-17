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
                  bk.title === oldPayload.title && bk.url === oldPayload.url
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
                      bk.title === oldPayload.title && bk.url === oldPayload.url
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
    <div>
      {items.length > 0 ? (
        items.map((item) => <BookmarkCard key={item.url} bookmark={item} />)
      ) : (
        <div>Add some bookmarks to get started</div>
      )}
    </div>
  );
}
