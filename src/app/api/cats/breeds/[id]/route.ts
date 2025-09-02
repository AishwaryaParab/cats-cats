import { NextRequest, NextResponse } from "next/server";

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL!;
const CAT_API_KEY = process.env.CAT_API_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Breed ID is required",
        },
        { status: 400 }
      );
    }

    let url = `${CAT_API_BASE_URL}/breeds/${id}`;
    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({
          success: false,
          message: "Breed details not found",
        });
      }
      throw new Error(
        `Fetching breed details failed with status: ${res.status}`
      );
    }

    const breedDetails = await res.json();
    return NextResponse.json({
      success: true,
      data: breedDetails,
    });
  } catch (err) {
    console.error("Error fetching breed details: ", err);
    const errMessage =
      err instanceof Error ? err.message : "Unexpected error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch breed details",
        error: process.env.NODE_ENV === "development" ? errMessage : undefined,
      },
      { status: 500 }
    );
  }
}
