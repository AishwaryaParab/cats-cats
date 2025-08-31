import { NextRequest, NextResponse } from "next/server";

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL!;
const CAT_API_KEY = process.env.CAT_API_KEY!;

export async function GET(request: NextRequest) {
  try {
    const url = `${CAT_API_BASE_URL}/favourites`;
    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Fetching favourites failed with status: ${res.status}`);
    }
    const favourites = await res.json();

    return NextResponse.json({
      success: true,
      data: favourites,
    });
  } catch (err) {
    console.error("Error fetching favourites: ", err);
    const errMessage =
      err instanceof Error ? err.message : "Unexpected error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch favourites",
        error: process.env.NODE_ENV === "development" ? errMessage : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { image_id } = await request.json();

    if (!image_id) {
      return NextResponse.json(
        { error: "image_id is required" },
        { status: 400 }
      );
    }

    const url = `${CAT_API_BASE_URL}/favourites`;
    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
      "Content-Type": "application/json",
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        image_id,
      }),
    });
    if (!res.ok) {
      throw new Error(`Adding favourites failed with status: ${res.status}`);
    }
    const favourites = await res.json();

    return NextResponse.json({
      success: true,
      data: favourites,
    });
  } catch (err) {
    console.error("Error adding favourites: ", err);
    const errMessage =
      err instanceof Error ? err.message : "Unexpected error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add favourites",
        error: process.env.NODE_ENV === "development" ? errMessage : undefined,
      },
      { status: 500 }
    );
  }
}
