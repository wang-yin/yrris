export function convertTextToId(text: string): string {
  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5-_]/g, "") // 僅保留中英數字、底線與連字號
    .replace(/\s+/g, "-"); // 空格轉連字號
  return encodeURIComponent(cleanText);
}
