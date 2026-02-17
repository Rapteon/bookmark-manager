"use client";

import { supabase } from "@/app/lib/supabase";
import { useSession } from "next-auth/react";

export default function AddBookmark() {
  const { data: session, status } = useSession();
  async function addBookmark(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const url = String(formData.get("url") ?? "").trim();
    const email = session?.user?.email;

    // At this point you have the extracted values.
    const bookmark = { email: email, title: title, url: url };
    const { error } = await supabase.from("bookmark").insert(bookmark);
    if (error) {
      alert(`Could not add new bookmark due to error: ${error.message}`);
    }
  }

  return (
    <form
      onSubmit={addBookmark}
      className="flex flex-row flex-wrap items-end gap-4 p-6 font-sans antialiased"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="title-input"
          className="text-sm font-medium text-neutral-400"
        >
          Title
        </label>
        <input
          id="title-input"
          name="title"
          type="text"
          maxLength={40}
          className="caret-foreground rounded-md border border-neutral-600 px-3 py-2 text-sm text-foreground placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url-input"
          className="text-sm font-medium text-neutral-400"
        >
          URL
        </label>
        <input
          id="url-input"
          name="url"
          type="url"
          className="caret-foreground rounded-md border border-neutral-600 px-3 py-2 text-sm text-foreground placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-neutral-800 hover:border-neutral-600"
      >
        Add
      </button>
    </form>
  );
}
