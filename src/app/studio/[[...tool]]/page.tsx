"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config"; // 請確認路徑是否正確指向你的 config 檔案
import dynamic from "next/dynamic";

// 使用 dynamic import 並禁用 SSR
const StudioPage = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false },
);

export default function Studio() {
  return <StudioPage config={config} />;
}
