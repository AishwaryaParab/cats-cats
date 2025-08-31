import { CATS_PER_PAGE } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL!;
const CAT_API_KEY = process.env.CAT_API_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const sortOrder = searchParams.get("sort") || "RAND";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : CATS_PER_PAGE;
    const hasBreeds = searchParams.get("has_breeds") || "0";
    const breed_ids = searchParams.get("breed_ids") || "";

    let url = `${CAT_API_BASE_URL}/images/search?limit=${limit}&page=${
      parseInt(page) - 1
    }&order=${sortOrder}&has_breeds=${parseInt(
      hasBreeds
    )}&breed_ids=${breed_ids}`;

    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Fetching cats failed with status: ${res.status}`);
    }
    const cats = await res.json();

    const totalCount = Number(res.headers.get("pagination-count") ?? 0);
    const pageLimit = Number(res.headers.get("pagination-limit") ?? 1); // avoid divide by 0
    const currentPage = Number(res.headers.get("pagination-page") ?? 0); // 0 accepted by the API

    return NextResponse.json({
      success: true,
      data: cats,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageLimit),
        currentPage,
        pageLimit,
      },
    });
  } catch (err) {
    console.error("Error fetching cats: ", err);
    const errMessage =
      err instanceof Error ? err.message : "Unexpected error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cats",
        error: process.env.NODE_ENV === "development" ? errMessage : undefined,
      },
      { status: 500 }
    );
  }
}
