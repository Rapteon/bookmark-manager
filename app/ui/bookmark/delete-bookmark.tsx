"use client";
import { Bookmark } from "@/app/lib/models/Bookmark";
import { supabase } from "@/app/lib/supabase";

export default function DeleteBookmark({ bookmark }: { bookmark: Bookmark }) {
  async function deleteBookmark(bookmark: Bookmark) {
    const { data, error } = await supabase
      .from("bookmark")
      .delete()
      .eq("email", bookmark.email)
      .eq("id", bookmark.id)
      .select("");
    if (error) {
      console.error(error);
    }
  }
  function confirmAndDelete(bookmark: Bookmark) {
    if (!confirm(`Would you really like to ${bookmark.title}`)) {
      console.log("Returning");
      return;
    }
    deleteBookmark(bookmark);
  }
  return (
    <button
      onClick={() => confirmAndDelete(bookmark)}
      className="relative flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600 before:content-['🗑'] before:text-base before:leading-none"
    >
      Delete
    </button>
  );
}
