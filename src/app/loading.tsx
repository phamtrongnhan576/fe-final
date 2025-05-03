import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Loader2 className="h-20 w-20 animate-spin text-custom-rose" />
    </div>
  );
};

export default LoadingPage;