"use client";

import CatDetails from "@/components/cats/cat-details";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import LoadingSpinner from "@/components/ui/loading-spinner";
import StatusMessage from "@/components/ui/status-message";
import { useCat } from "@/hooks/cats/useCat";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

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
      <Link href="/">
        <Button
          className="mb-4 flex items-center gap-1"
          ariaLabel="Go back to Home"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Back to Home</span>
        </Button>
      </Link>

      {loading && <LoadingSpinner ariaLabel="Loading cat details" />}

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
