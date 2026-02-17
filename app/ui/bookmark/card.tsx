import { Bookmark } from "@/app/lib/models/Bookmark";
import DeleteBookmark from "./delete-bookmark";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div className="m-6 rounded-md border border-neutral-800 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold tracking-tight text-black">
            {bookmark.title}
          </h1>
          <p className="text-sm text-neutral-400">{bookmark.url}</p>
        </div>
        <DeleteBookmark bookmark={bookmark}></DeleteBookmark>
      </div>
    </div>
  );
}
