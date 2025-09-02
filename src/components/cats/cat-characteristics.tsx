import { PawPrint } from "lucide-react";

interface CatRatingProps {
  rating: number;
  maxRating?: number;
}

interface CatCharacteristicsProps {
  breed: {
    adaptability?: number;
    affection_level?: number;
    child_friendly?: number;
    intelligence?: number;
    social_needs?: number;
    shedding_level?: number;
  };
}

const CatRating = ({ rating, maxRating = 5 }: CatRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const isFilled = index < rating;
        return (
          <PawPrint
            key={index}
            className={`w-5 h-5 transition-all duration-200 ${
              isFilled
                ? "text-primary fill-primary drop-shadow-sm"
                : "text-muted"
            }`}
          />
        );
      })}
    </div>
  );
};

const CatCharacteristics = ({ breed }: CatCharacteristicsProps) => {
  const characteristics = [
    {
      key: "adaptability",
      label: "Adaptability",
      value: breed.adaptability || 0,
      description: "How well the cat adapts to new environments",
    },
    {
      key: "affection_level",
      label: "Affection Level",
      value: breed.affection_level || 0,
      description: "How affectionate and loving the cat is",
    },
    {
      key: "child_friendly",
      label: "Child Friendly",
      value: breed.child_friendly || 0,
      description: "How well the cat gets along with children",
    },
    {
      key: "intelligence",
      label: "Intelligence",
      value: breed.intelligence || 0,
      description: "How intelligent and trainable the cat is",
    },
    {
      key: "social_needs",
      label: "Social Needs",
      value: breed.social_needs || 0,
      description: "How much social interaction the cat requires",
    },
    {
      key: "shedding_level",
      label: "Shedding Level",
      value: breed.shedding_level || 0,
      description: "How much the cat sheds hair and fur",
    },
  ];
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-primary mt-8 mb-4">
        Breed Characteristics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-card text-card-foreground shadow-lg rounded-lg my-6">
        {characteristics.map((characteristic) => (
          <div
            key={characteristic.key}
            className="flex flex-col space-y-2 p-3 bg-accent rounded-lg shadow-sm border border-border"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                {characteristic.label}
              </span>
              <span className="text-sm text-muted">
                {characteristic.value}/5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CatRating rating={characteristic.value} />
            </div>
            <p className="text-xs text-muted">{characteristic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatCharacteristics;
