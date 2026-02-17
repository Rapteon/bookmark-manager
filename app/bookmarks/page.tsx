import { Suspense } from "react";
import AddBookmark from "../ui/bookmark/add-bookmark";
import BookmarkList from "../ui/bookmark/list";
import ListSkeleton from "../ui/bookmark/list-skeleton";

export default function Bookmarks() {
  return (
    <div className="flex flex-col">
      <AddBookmark />
      <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
        <Suspense fallback={<ListSkeleton />}>
        <BookmarkList />
        </Suspense>
      </div>
    </div>
  );
}
