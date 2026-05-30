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
