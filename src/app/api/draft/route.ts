// app/api/draft/route.ts
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
// 這裡拿剛才在 live.ts 裡設定好 token 的 client
const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  // 💡 關鍵：這行會幫瀏覽器寫入 Cookie，正式啟用 Next.js 的預覽狀態
  const draft = await draftMode();
  draft.enable();

  redirect(redirectTo);
}
