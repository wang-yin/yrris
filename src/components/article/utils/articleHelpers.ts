import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

export function convertTextToId(text: string): string {
  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-_]/g, "") // 僅保留中英數字、底線與連字號
    .replace(/\s+/g, "-"); // 空格轉連字號
  return encodeURIComponent(cleanText);
}

interface CustomQuestionBlock {
  _type: "questionBlock";
  _key?: string;
  description?: string;
  example?: string;
}

export function getReadingTime(body: PortableTextBlock[]) {
  if (!body || body.length === 0) return { wordCount: 0, minutes: 1 };

  // 1. 拼接全文字串
  const allText = body
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children || [])
    .map((child) => (child as PortableTextSpan).text || "")
    .join("");

  // 2. 精準計算：中文字數 + 英文單字數
  const chineseCount = (allText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = allText
    .replace(/[\u4e00-\u9fa5]/g, " ") // 把中文過濾掉換成空白
    .split(/\s+/) // 用空白切開算單字
    .filter((word) => word.length > 0).length;

  const totalWords = chineseCount + englishWords;

  // 3. 統一以每分鐘 350 字計算（適合中英混雜的技術部落格）
  const minutes = Math.max(1, Math.ceil(totalWords / 350));

  return {
    wordCount: totalWords,
    minutes: minutes,
  };
}
