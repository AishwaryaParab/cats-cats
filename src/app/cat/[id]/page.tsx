"use client";

import CatDetails from "@/components/cat-details";
import LoadingSpinner from "@/components/loading-spinner";
import Button from "@/ui/button";
import Container from "@/ui/container";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const CatDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCat = async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY!,
          },
        });
        if (!res.ok) {
          throw new Error("Cat not found");
        }
        const data = await res.json();
        console.log(data);
        setCat(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch cats. Please try again!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCat(id);
  }, [id]);

  console.log(cat);

  return (
    <Container>
      <Link href="/">
        <Button className="my-4">Back to Home</Button>
      </Link>

      {loading ? (
        <LoadingSpinner />
      ) : cat ? (
        <CatDetails cat={cat} />
      ) : (
        <div className="text-center py-4">
          <p className="text-purple-500 text-lg">
            Oops!! No cat found. Please try again later.
          </p>
        </div>
      )}

      {error && (
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </Container>
  );
};

export default CatDetail;
