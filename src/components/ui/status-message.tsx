import { useRouter } from "next/navigation";
import Button from "./button";

interface StatusMessage {
  message: string;
  color?: string;
}

const StatusMessage = ({ message, color = "text-primary" }: StatusMessage) => {
  const router = useRouter();
  return (
    <div role="alert" className="text-center py-4">
      <p className={`${color} text-lg`}>{message}</p>
      <Button onClick={() => router.back()} className="my-4">
        Go Back
      </Button>
    </div>
  );
};

export default StatusMessage;
