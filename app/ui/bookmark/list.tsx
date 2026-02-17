import { supabase } from "@/app/lib/supabase";
import BookmarkCard from "./card";
import { auth } from "@/app/auth";
import { Bookmark } from "@/app/lib/models/Bookmark";

export default async function BookmarkList() {
  async function getBookmarks(): Promise<Bookmark[]> {
    // TODO: Remove this after testing with real data.
    const session = await auth();
    const { data: bookmarks, error } = await supabase
      .from("bookmark")
      .select("title, url")
      .eq("email", session?.user?.email);
    if (error != null) {
      console.error(error);
    }

    return bookmarks || [];
  }
  const bookmarks: Bookmark[] = await getBookmarks();
  return (
    <div>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.url} bookmark={bookmark} />
        ))
      ) : (
        <div>Add some bookmarks to get started</div>
      )}
    </div>
  );
}
