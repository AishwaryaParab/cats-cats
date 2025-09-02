"use client";

import CatDetails from "@/components/cats/cat-details";
import Container from "@/components/ui/container";
import LoadingSpinner from "@/components/ui/loading-spinner";
import StatusMessage from "@/components/ui/status-message";
import { useCat } from "@/hooks/cats/useCat";

const CatDetailsPage = ({ id }: { id: string }) => {
  const { cat, loading, error } = useCat(id);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
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
