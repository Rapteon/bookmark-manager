import { useSession } from "next-auth/react";
import { Bookmark } from "./models/Bookmark";
import { supabase } from "./supabase";
import { auth } from "../auth";

export async function getBookmarks(): Promise<Bookmark[]> {
  const session = await auth();
  const userEmail = session?.user?.email;
  const { data: bookmarks, error } = await supabase
    .from("bookmark")
    .select("title, url, email")
    .eq("email", userEmail);
  if (error != null) {
    console.error(error);
  }
  return bookmarks || [];
}
