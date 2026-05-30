import { MdOutlineFormatAlignLeft } from "react-icons/md";

export default function TableOfContents() {
  return (
    <aside className="hidden lg:block shrink-0 w-50">
      <div className="flex items-center gap-2 mb-4 text-SmokingMirror">
        <MdOutlineFormatAlignLeft size={13} />
        <span className="text-xs font-medium uppercase tracking-widest">
          目錄
        </span>
      </div>
      <nav className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-PolishedLimestone"></div>
        <ul className="space-y-1 pl-4"></ul>
      </nav>
    </aside>
  );
}
