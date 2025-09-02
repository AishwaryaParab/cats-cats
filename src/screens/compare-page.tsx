"use client";

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import LoadingSpinner from "@/components/ui/loading-spinner";
import StatusMessage from "@/components/ui/status-message";
import { useCompareCats } from "@/hooks/cats/useCompareCats";
import { ArrowLeft, Scale } from "lucide-react";

const ComparePage = () => {
  const { breeds, loading, error, goBack } = useCompareCats();

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error || breeds.length === 0) {
    return (
      <>
        <StatusMessage
          message={error || "No breeds found"}
          color="text-red-500"
        />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="mb-8">
          <button
            onClick={goBack}
            className="flex items-center space-x-2 text-foreground hover:text-muted mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-foreground hover:text-muted">
              Back to cats
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <Scale className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">
              Breed Comparison
            </h1>
          </div>
          <p className="text-foreground mt-2">
            Compare {breeds.length} cat breed{breeds.length > 1 ? "s" : ""} side
            by side
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold bg-accent text-foreground sticky left-0 z-10">
                    Characteristic
                  </th>
                  {breeds.map((breed) => (
                    <th
                      key={breed.id}
                      className="px-6 py-4 text-center text-sm font-semibold text-foreground min-w-[200px]"
                    >
                      {breed.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 font-medium sticky left-0 bg-card z-10">
                    Origin
                  </td>
                  {breeds.map((breed) => (
                    <td
                      key={breed.id}
                      className="px-6 py-4 text-center text-muted"
                    >
                      {breed.origin || "Unknown"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-accent/10">
                  <td className="px-6 py-4 font-medium sticky left-0 bg-accent z-10">
                    Life Span
                  </td>
                  {breeds.map((breed) => (
                    <td
                      key={breed.id}
                      className="px-6 py-4 text-center text-muted"
                    >
                      {breed.life_span ? `${breed.life_span} years` : "Unknown"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium sticky left-0 bg-card z-10">
                    Weight
                  </td>
                  {breeds.map((breed) => (
                    <td
                      key={breed.id}
                      className="px-6 py-4 text-center text-muted"
                    >
                      {breed.weight?.metric
                        ? `${breed.weight.metric} kg`
                        : "Unknown"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-accent/10">
                  <td className="px-6 py-4 font-medium sticky left-0 bg-accent z-10">
                    Temperament
                  </td>
                  {breeds.map((breed) => (
                    <td
                      key={breed.id}
                      className="px-6 py-4 text-center text-muted"
                    >
                      <div className="flex justify-center">
                        <p className="max-w-xs">
                          {breed.temperament || "Unknown"}
                        </p>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium sticky left-0 bg-card z-10">
                    Description
                  </td>
                  {breeds.map((breed) => (
                    <td
                      key={breed.id}
                      className="px-6 py-4 text-center text-muted"
                    >
                      <div className="flex justify-center">
                        <p className="max-w-xs text-sm">
                          {breed.description || "No description available"}
                        </p>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={goBack}>Browse More Cats</Button>
        </div>
      </Container>
    </div>
  );
};

export default ComparePage;
