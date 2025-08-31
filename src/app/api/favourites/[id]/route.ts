import { NextRequest, NextResponse } from "next/server";

const CAT_API_BASE_URL = process.env.CAT_API_BASE_URL!;
const CAT_API_KEY = process.env.CAT_API_KEY!;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Favourite ID is required",
        },
        { status: 400 }
      );
    }

    const url = `${CAT_API_BASE_URL}/favourites/${id}`;
    const headers: HeadersInit = {
      "x-api-key": CAT_API_KEY,
    };

    const res = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      throw new Error(`Deleting favourite failed with status: ${res.status}`);
    }

    return NextResponse.json({
      success: true,
      message: "Favourite deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting favourite: ", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete favourite" },
      { status: 500 }
    );
  }
}
