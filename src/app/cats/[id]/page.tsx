"use client";

import CatDetails from "@/components/cat-details";
import LoadingSpinner from "@/components/loading-spinner";
import Button from "@/ui/button";
import Container from "@/ui/container";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useCat } from "@/hooks/cats/useCat";

const CatDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { cat, loading, error } = useCat(id);

  return (
    <Container>
      <Link href="/">
        <Button className="mb-4 flex items-center gap-1">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>
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
