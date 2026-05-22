import * as Icons from "@/components/icons";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SKILLS_CONFIG = [
  { id: "html", name: "HTML5", Icon: Icons.Html5 },
  { id: "css", name: "CSS3", Icon: Icons.Css3 },
  { id: "js", name: "JavaScript", Icon: Icons.JavaScript },
  { id: "typescript", name: "TypeScript", Icon: Icons.TypeScript },
  { id: "react", name: "React", Icon: Icons.ReactIcon },
  { id: "next", name: "Next.js", Icon: Icons.Nextjs },
  { id: "tailwind", name: "Tailwind CSS", Icon: Icons.TailwindCSS },
  { id: "bootstrap", name: "Bootstrap", Icon: Icons.Bootstrap },
  { id: "express", name: "Express.js", Icon: Icons.Expressjs },
  { id: "node", name: "Node.js", Icon: Icons.Nodejs },
  { id: "mongodb", name: "MongoDB", Icon: Icons.MongoDB },
  { id: "vscode", name: "VS Code", Icon: Icons.VScode },
  { id: "git", name: "Git", Icon: Icons.Git },
];

export default function Profile() {
  const socialLinks = [
    { name: "Github", url: "github.com" },
    { name: "Email", url: "google.com" },
  ];
  return (
    <>
      <div className="mx-auto mt-12 max-w-xl lg:max-w-4xl text-center">
        {/* 標題 */}
        <div className="mb-12">
          <h1 className="text-articletitle font-(family-name:--font-luoyan) text-4xl">
            關　於　我
          </h1>
          <div className="border-postcardtitlebar mx-auto w-30 border"></div>
        </div>

        {/* 主要自我介紹信 */}
        <div className="relative rounded-lg bg-postcardbg p-10 border-cardcategorie border-2 shadow-lg">
          {/* 郵票裝飾 */}
          <div className=" absolute border-dashed h-12 w-16 border-2 text-xs flex items-center justify-center top-8 right-8 rotate-8 border-postcardtitlebar bg-drawer">
            <div className="text-center">
              <div>Yirris</div>
              <div>2026</div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 gap-8 items-start lg:flex-row border-b border-cardcategorie">
            {/* 頭像區 */}
            <div className="flex-col flex ">
              <div className="w-40 h-40 rounded-full border-4 border-postcardtitlebar"></div>
              <div className="w-40 h-14 rounded-[50%] border-2 border-dashed flex flex-col items-center justify-center border-postcardtitlebar text-xs text-stamp mt-4 opacity-60">
                <div>Code & Life</div>
              </div>
            </div>

            {/* 內容區 */}
            <div className="flex-1 mb-6 text-left">
              <h2 className="text-3xl mb-2 text-postcardtitle">Yrris</h2>
              <p className="text-sm mb-4 text-stamp">全端 / LeetCode</p>
              <div className="p-4 rounded-md mb-4 border-postcardtitlebar border-l-4 bg-drawer ">
                <p className="leading-[1.8] text-postcardtitle ">
                  你好！我是 Yirris，一個熱愛程式設計的開發者。 平時喜歡透過解
                  LeetCode 來精進演算法能力， 也會動手做一些有趣的 Side
                  Projects。 這個部落格記錄了我的學習旅程和技術筆記，
                  希望能與更多開發者交流分享。
                </p>
              </div>

              {/* 聯繫方式 */}
              <div className="text-sm mb-3 text-stamp">聯繫方式</div>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="text-center p-4 border-dashed border-2 cursor-pointer group transition-all duration-300 flex-1 hover:scale-105 bg-cardcategorie border-stamp rounded-sm"
                  >
                    <div className="text-2xl mb-2 flex justify-center">
                      {link.name === "Github" && <FaGithub />}
                      {link.name === "Email" && <MdEmail />}
                    </div>
                    <div className="text-sm font-medium text-articletitle">
                      {link.name}
                    </div>
                    <div className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-stamp">
                      點擊前往
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right italic mt-8 text-sm text-stamp">
            "Keep coding, keep learning."
          </div>
        </div>

        {/* 技能信封區 */}
        <div className="m-12">
          <h1 className="text-articletitle font-(family-name:--font-luoyan) text-4xl">
            技　能　&　工　具
          </h1>
          <div className="border-postcardtitlebar mx-auto w-30 border"></div>
        </div>
        <div className="flex flex-wrap gap-3 rounded-lg bg-postcardbg p-10 border-cardcategorie border-2 shadow-lg">
          {SKILLS_CONFIG.map(({ id, name, Icon }) => (
            <div
              key={id}
              className="flex items-center gap-2 px-3 py-1.5 bg-drawer  rounded-full text-sm font-medium border border-cardcategorie  hover:shadow-sm hover:-translate-y-px transition-all cursor-pointer"
            >
              {/* 統一調整 Icon 的大小 */}
              <Icon size={20} className="shrink-0" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
