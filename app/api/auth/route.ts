import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const client_id = "GeIjbbLJ69_fGA0P0d9I8frHGvQnkMipxOvgZu42Mtk";
  const client_secret = "LkV53EdsvYic5AyFysMRdmdBDvSTycPK35t1U5UFJ_U";

  const body = await req.json();

  const { email, password } = body;

  try {
    let bodyContent = new FormData();
    bodyContent.append("grant_type", "password");
    bodyContent.append("client_id", client_id);
    bodyContent.append("client_secret", client_secret);
    bodyContent.append("username", email);
    bodyContent.append("password", password);

    let response = await fetch(
      "https://www.worldcubeassociation.org/oauth/token",
      {
        method: "POST",
        body: bodyContent,
      }
    );

    let data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("access-token");

  try {
    let response = await fetch(
      "https://www.worldcubeassociation.org/api/v0/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await response.json();

    return NextResponse.json({ user: data})
  } catch (error) {
    return NextResponse.json({ error });
  }
}
