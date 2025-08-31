import { BreedData } from "@/lib/api/cats";
import { NextRequest, NextResponse } from "next/server";

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL!;
const CAT_API_KEY = process.env.CAT_API_KEY!;

export async function GET(request: NextRequest) {
  try {
    const url = `${CAT_API_BASE_URL}/breeds`;
    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Fetching breeds failed with status: ${res.status}`);
    }
    let breeds: BreedData[] = await res.json();
    breeds = breeds.map((breed) => ({ id: breed.id, name: breed.name }));

    return NextResponse.json({
      success: true,
      data: breeds,
    });
  } catch (err) {
    console.error("Error fetching breeds: ", err);
    const errMessage =
      err instanceof Error ? err.message : "Unexpected error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch breeds",
        error: process.env.NODE_ENV === "development" ? errMessage : undefined,
      },
      { status: 500 }
    );
  }
}
