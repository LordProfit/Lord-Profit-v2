import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const DATABASE_ID = "0bf6d42a5fb74253825c48ae4c616103";

export async function GET() {
  try {
    const response = await notion.databases.query({
  database_id: DATABASE_ID,
  filter: {
    property: "Published",
    checkbox: {
      equals: true,
    },
  },
  sorts: [
    {
      property: "Date",
      direction: "descending",
    },
  ],
});

    const posts = response.results.map((page: any) => {
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
