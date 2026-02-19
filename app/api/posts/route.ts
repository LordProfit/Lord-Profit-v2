import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const DATABASE_ID = "30c08ef5e23880e0974ed0ec2990bfbb";

export async function GET() {
  try {
    const response = await notion.pages.search({
      filter: {
        property: "object",
        value: "page",
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
    });

    const posts = response.results
      .filter((page: any) => page.parent?.database_id?.replace(/-/g, "") === DATABASE_ID)
      .filter((page: any) => page.properties?.Published?.checkbox === true)
      .map((page: any) => {
        const props = page.properties;
        const slug = props.Slug?.rich_text?.[0]?.plain_text ?? page.id;
        return {
          id: page.id,
          title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
          date: props.Date?.date?.start ?? null,
          classification: props.Classification?.rich_text?.[0]?.plain_text ?? "",
          slug,
          filename: slug.toUpperCase().replace(/-/g, "_") + ".log",
        };
      });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
