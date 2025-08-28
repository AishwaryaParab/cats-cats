import { Cat } from "@/lib/api/cats";
import Image from "next/image";

interface CatDetailsProps {
  cat: Cat;
}

const CatDetails = ({ cat }: CatDetailsProps) => {
  const breed = cat?.breeds?.[0];
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative lg:w-1/2 h-100 rounded-lg">
          <Image
            src={cat.url}
            alt="cat-image"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {breed ? (
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-primary">{breed.name}</h1>

            <div>
              {breed.description && (
                <div>
                  <h3 className="text-primary font-semibold">Description</h3>
                  <p>{breed.description}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {breed.origin && (
                <div>
                  <span className="text-primary font-semibold">Origin:</span>
                  <p>{breed.origin}</p>
                </div>
              )}

              {breed.life_span && (
                <div>
                  <span className="text-primary font-semibold">Life Span:</span>
                  <p>{breed.life_span} years</p>
                </div>
              )}

              {breed.weight?.metric && (
                <div>
                  <span className="text-primary font-semibold">Weight:</span>
                  <p>{breed.weight.metric} kg</p>
                </div>
              )}

              {breed.energy_level && (
                <div>
                  <span className="text-primary font-semibold">
                    Energy Level:
                  </span>
                  <p>{breed.energy_level}/5</p>
                </div>
              )}
            </div>

            <div>
              {breed.temperament && (
                <div>
                  <span className="text-primary font-semibold">
                    Temperament
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {breed.temperament.split(", ").map((temp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary text-white rounded-full text-sm"
                      >
                        {temp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-primary">Beautiful Cat</h1>
            <p>
              This lovely cat doesn't have breed information available, but
              isn't it gorgeous?
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CatDetails;
