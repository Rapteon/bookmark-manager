import { Bookmark } from "@/app/lib/models/Bookmark";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div className="m-6 flex flex-col gap-2 rounded-md border border-neutral-800 p-4">
      <h1 className="text-lg font-semibold tracking-tight text-black">
        {bookmark.title}
      </h1>
      <p className="text-sm text-neutral-400">{bookmark.url}</p>
    </div>
  );
}
