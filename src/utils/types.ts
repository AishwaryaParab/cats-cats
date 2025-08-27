export type SortOrder = "RANDOM" | "ASC" | "DESC";

export type Breed = {
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  energy_level: number;
  weight: {
    metric: string;
  };
};

export type Cat = {
  id: string;
  url: string;
  breeds?: Breed[];
  width: number;
  height: number;
};
