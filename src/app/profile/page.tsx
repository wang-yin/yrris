import Image from "next/image";
import SocialLinks from "@/components/profile/SocialLinks";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { SKILLS_CONFIG } from "@/config/skills";

export default function Profile() {
  return (
    <>
      <div className="mx-auto mt-12 max-w-xl lg:max-w-4xl text-center">
        {/* 標題 */}
        <div className="mb-12">
          <h1 className="text-Umber font-(family-name:--font-luoyan) text-4xl">
            關　於　我
          </h1>
          <div className="border-AlmondMilk mx-auto w-30 border"></div>
        </div>

        {/* 主要自我介紹信 */}
        <div className="relative rounded-lg bg-SugarQuill p-10 border-BuffIt border-2 shadow-lg">
          {/* 郵票裝飾 */}
          <div className=" absolute border-dashed h-12 w-16 border-2 text-xs flex items-center justify-center top-8 right-8 rotate-8 border-AlmondMilk bg-DryBone">
            <div className="text-center">
              <div>Yirris</div>
              <div>2026</div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 gap-8 items-start lg:flex-row border-b border-BuffIt">
            {/* 頭像區 */}
            <div className="flex-col flex ">
              <div className="w-40 h-40 rounded-full border-4 border-AlmondMilk relative overflow-hidden group shadow-sm">
                <Image
                  src="/avatar.jpeg"
                  alt="Yrris's Avatar"
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                ></Image>
              </div>
              <div className="w-40 h-14 rounded-[50%] border-2 border-dashed flex flex-col items-center justify-center border-AlmondMilk text-xs text-Antique mt-4 opacity-60">
                <div>Code & Life</div>
              </div>
            </div>

            {/* 內容區 */}
            <div className="flex-1 mb-6 text-left">
              <h2 className="text-3xl mb-2 text-Molasses">Yrris</h2>
              <p className="text-sm mb-4 text-Antique">全端 / LeetCode</p>
              <div className="p-4 rounded-md mb-4 border-AlmondMilk border-l-4 bg-DryBone ">
                <p className="leading-[1.8] text-Molasses ">
                  你好！我是 Yirris，一個熱愛程式設計的開發者。 平時喜歡透過解
                  LeetCode 來精進演算法能力， 也會動手做一些有趣的 Side
                  Projects。 這個部落格記錄了我的學習旅程和技術筆記，
                  希望能與更多開發者交流分享。
                </p>
              </div>

              {/* 聯繫方式 */}
              <div className="text-sm mb-3 text-Antique">聯繫方式</div>
              <SocialLinks />
            </div>
          </div>
          <div className="text-right italic mt-8 text-sm text-Antique">
            {'"Keep coding, keep learning."'}
          </div>
        </div>

        {/* 技能信封區 */}
        <div className="m-12">
          <h1 className="text-Umber font-(family-name:--font-luoyan) text-4xl">
            技　能　&　工　具
          </h1>
          <div className="border-AlmondMilk mx-auto w-30 border"></div>
        </div>
        <div className="flex flex-wrap gap-3 rounded-lg bg-SugarQuill p-10 border-BuffIt border-2 shadow-lg">
          {SKILLS_CONFIG.map(({ id, name, Icon, url }) => (
            <Link
              key={id}
              href={url}
              target="_blank" // 確保在新分頁開啟
              rel="noopener noreferrer" // 安全防護
              className="flex items-center gap-1.5 pl-3.5 pr-8 py-1.5 bg-DryBone  rounded-full text-sm font-medium border border-BuffIt  hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group relative"
            >
              {/* 統一調整 Icon 的大小 */}
              <Icon size={18} className="shrink-0" />
              <span>{name}</span>

              <span className="absolute right-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center text-Antique">
                <FiArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
