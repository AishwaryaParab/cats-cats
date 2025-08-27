"use client";

import CatDetails from "@/components/cat-details";
import LoadingSpinner from "@/components/loading-spinner";
import { useFetch } from "@/hooks/useFetch";
import Button from "@/ui/button";
import Container from "@/ui/container";
import { Cat } from "@/utils/types";
import Link from "next/link";
import { use } from "react";

const CatDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const {
    data: cat,
    loading,
    error,
  } = useFetch<Cat>(
    `https://api.thecatapi.com/v1/images/${id}`,
    { headers: { "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY! } },
    [id]
  );

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
          <p className="text-primary text-lg">
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
