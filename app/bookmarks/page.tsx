import { getBookmarks } from "../lib/get-bookmarks";
import getUserEmail from "../lib/get-user-email";
import AddBookmark from "../ui/bookmark/add-bookmark";
import BookmarkList from "../ui/bookmark/bookmarks-list";

export default async function Bookmarks() {
  const bookmarks = await getBookmarks();
  const userEmail = await getUserEmail();
  return (
    <div className="flex flex-col">
      <AddBookmark />
      <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
        <BookmarkList bookmarks={bookmarks} userEmail={userEmail}/>
      </div>
    </div>
  );
}
