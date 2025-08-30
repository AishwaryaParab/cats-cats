const LoadingSpinner = ({ ariaLabel }: { ariaLabel?: string }) => {
  return (
    <div
      className="flex justify-center items-center min-h-64"
      aria-label={ariaLabel}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingSpinner;
