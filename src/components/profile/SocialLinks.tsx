"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SOCIAL_CONFIG = [
  { name: "Github", url: "https://github.com/wang-yin", icon: <FaGithub /> },
  { name: "Email", url: "mailto:sky06456@gmail.com", icon: <MdEmail /> },
];

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (url: string) => {
    // 提取純信箱地址
    const emailAddress = url.replace("mailto:", "");

    // 執行複製
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        setCopied(true);
        // 2 秒後恢復提示字
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <div className="flex gap-3 mb-6 select-none">
      {SOCIAL_CONFIG.map((link, index) => {
        const isEmail = link.url.startsWith("mailto");

        if (isEmail) {
          return (
            <a
              key={index}
              href={link.url}
              onClick={() => handleEmailClick(link.url)}
              className="text-center p-4 border-dashed border-2 cursor-pointer group transition-all duration-300 flex-1 hover:scale-105 bg-BuffIt border-Antique rounded-sm block"
            >
              <div className="text-2xl mb-2 flex justify-center">
                {link.icon}
              </div>
              <div className="text-sm font-medium text-Umber">{link.name}</div>
              <div
                className={`text-xs mt-1 text-center transition-all duration-300 ${
                  copied
                    ? "text-Kilimanjaro font-medium opacity-100 translate-y-0"
                    : "opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-Antique"
                }`}
              >
                {copied ? "✨ 已複製信箱！" : "點擊複製並前往"}
              </div>
            </a>
          );
        }
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-4 border-dashed border-2 cursor-pointer group transition-all duration-300 flex-1 hover:scale-105 bg-BuffIt border-Antique rounded-sm block "
          >
            <div className="text-2xl mb-2 flex justify-center text-Umber group-hover:text-[#3d3830] transition-colors">
              {link.icon}
            </div>
            <div className="text-sm font-medium text-center text-Umber group-hover:text-[#3d3830] transition-colors">
              {link.name}
            </div>
            <div className="text-xs mt-1 text-center opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-Antique">
              點擊前往
            </div>
          </a>
        );
      })}
    </div>
  );
}
