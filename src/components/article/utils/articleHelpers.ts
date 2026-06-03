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

export function getReadingTime(
  body: (PortableTextBlock | CustomQuestionBlock)[],
): number {
  if (!body || !Array.isArray(body)) return 1;

  let totalText = "";

  body.forEach((block) => {
    // 1. 處理一般的段落、標題文字 (block.children)
    if (block._type === "block" && "children" in block && block.children) {
      (block.children as PortableTextSpan[]).forEach((child) => {
        if (child.text) {
          totalText += child.text;
        }
      });
    }
    // 2. 處理我們自訂的 LeetCode 題目區塊 (questionBlock)
    else if (block._type === "questionBlock") {
      const qBlock = block as CustomQuestionBlock;
      if (qBlock.description) totalText += qBlock.description;
      if (qBlock.example) totalText += qBlock.example;
    }
    // 💡 提示：程式碼區塊 (myCodeBlock) 通常不納入文字閱讀字數計算，因為看扣得時間因人而異
  });

  // 計算總字數（移除前後空格）
  const wordsCount = totalText.trim().length;

  // 假設每分鐘閱讀 300 字，用 Math.ceil 無條件進位，最低 1 分鐘
  const readingTime = Math.ceil(wordsCount / 300);

  return readingTime < 1 ? 1 : readingTime;
}
