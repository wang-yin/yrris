import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "文章",
  type: "document",
  fields: [
    {
      name: "title",
      title: "標題",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "文章摘要 (Excerpt)",
      type: "text", // 使用 text 而不是 string，後台輸入框會比較大，方便寫兩三句話
      description: "顯示在文章櫃卡片上的精簡介紹，建議在 50-100 字以內。",
      validation: (Rule: any) =>
        Rule.max(200).warning("摘要太長可能會在卡片上被截斷喔！"),
    },
    {
      name: "slug",
      title: "網址路徑 (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "主圖",
      type: "image",
      options: {
        hotspot: true, // 這是解決圖片寬高崩壞的關鍵，讓你在後台能選中心點
      },
    },
    defineField({
      name: "categories",
      title: "分類",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    // 標籤：純文字輸入陣列
    defineField({
      name: "tags",
      title: "標籤 (Tags)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags", // 這會讓後台呈現標籤雲的形式，更好輸入
      },
    }),
    {
      name: "publishedAt",
      title: "發布日期",
      type: "datetime",
    },
    {
      name: "body",
      title: "內容",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "videoFile",
          title: "動態展示影片",
          fields: [
            {
              name: "videoAsset",
              title: "上傳影片檔案 (.mp4)",
              type: "file",
              options: {
                accept: "video/mp4, video/webm", // 限制只能上傳影片格式
              },
            },
            {
              name: "caption",
              title: "影片說明/標題 (選填)",
              type: "string",
            },
          ],
        },
        {
          type: "code",
          name: "myCodeBlock",
          title: "程式碼區塊",
          options: {
            withFilename: true, // 允許你輸入該檔案的名稱（例如：solution.cpp）
            languageAlternatives: [
              { title: "C++", value: "cpp" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
            ],
          },
        },
        defineArrayMember({
          type: "object",
          name: "questionBlock",
          title: "LeetCode 題目區塊",
          fields: [
            {
              name: "description",
              title: "題目描述",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "example",
              title: "測資範例 (選填)",
              type: "text",
              rows: 4,
            },
          ],
        }),
      ], // 使用 Rich Text
    },
  ],
});
