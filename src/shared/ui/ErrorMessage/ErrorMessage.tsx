interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="w-full text-left mt-2 text-red-500 text-xs">- {message}</p>
  );
};
