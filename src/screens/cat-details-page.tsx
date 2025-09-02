"use client";

import CatDetails from "@/components/cats/cat-details";
import CatDetailsSkeleton from "@/components/cats/cat-details-skeleton";
import Container from "@/components/ui/container";
import StatusMessage from "@/components/ui/status-message";
import { useCat } from "@/hooks/cats/useCat";

const CatDetailsPage = ({ id }: { id: string }) => {
  const { cat, loading, error } = useCat(id);

  if (loading) {
    return (
      <Container>
        <CatDetailsSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      {cat ? (
        <CatDetails cat={cat} />
      ) : error ? (
        <StatusMessage
          message={error || "Something went wrong. Please try again later."}
          color="text-red-500"
        />
      ) : (
        <StatusMessage
          message="Oops!! No cat found. Please try again later."
          color="text-primary"
        />
      )}
    </Container>
  );
};

export default CatDetailsPage;
