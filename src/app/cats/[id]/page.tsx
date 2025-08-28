import CatDetailsPage from "@/screens/cat-details-page";
import { use } from "react";

const CatDetailsById = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <CatDetailsPage id={id} />;
};

export default CatDetailsById;
