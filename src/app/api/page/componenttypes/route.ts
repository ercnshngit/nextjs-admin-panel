import { db } from "@/lib/database/connection";
import { ComponentType } from "@/lib/database/models";

export async function GET(request: Request) {
  const conn = await db.connection();
  const pages = await conn?.query({
    sql: `SELECT * FROM ${ComponentType.TABLE}`,
  });
  if (pages && pages.length > 0) {
    return new Response(JSON.stringify(pages));
  } else return new Response(JSON.stringify({ message: "Sayfa bulunamadı." }));
}
