interface StatusMessage {
  message: string;
  color?: string;
}

const StatusMessage = ({ message, color = "text-primary" }: StatusMessage) => {
  return (
    <div className="text-center py-4">
      <p className={`${color} text-lg`}>{message}</p>
    </div>
  );
};

export default StatusMessage;
