import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: params.id,
    });

    const content = blocks.results.map((block: any) => {
      switch (block.type) {
        case "paragraph":
          return {
            type: "paragraph",
            text: block.paragraph.rich_text.map((t: any) => t.plain_text).join(""),
          };
        case "heading_1":
        case "heading_2":
        case "heading_3":
          return {
            type: "header",
            text: "// " + block[block.type].rich_text.map((t: any) => t.plain_text).join(""),
          };
        case "quote":
          return {
            type: "quote",
            text: block.quote.rich_text.map((t: any) => t.plain_text).join(""),
          };
        case "code":
          return {
            type: "log",
            text: block.code.rich_text.map((t: any) => t.plain_text).join(""),
          };
        case "divider":
          return { type: "divider" };
        default:
          return null;
      }
    });

    return NextResponse.json({
      content: content.filter(Boolean),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}