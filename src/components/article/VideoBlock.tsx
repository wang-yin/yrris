"use client"; // 確保瀏覽器端的自動播放等屬性完美運作

import { getFileAsset } from "@sanity/asset-utils";

export default function VideoBlock({ value }: any) {
  if (!value?.videoAsset?.asset) return null;

  const fileAsset = getFileAsset(value.videoAsset, {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  });

  const videoUrl = fileAsset?.url;

  if (!videoUrl) {
    console.warn("無法解析影片 URL:", value);
    return null;
  }
  return (
    <div className="my-8 overflow-hidden shadow-md max-w-3xl mx-auto ">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover block"
      />
      {value.caption && (
        <p className="text-center text-xs text-SmokingMirror mt-2 pb-2">
          {value.caption}
        </p>
      )}
    </div>
  );
}
