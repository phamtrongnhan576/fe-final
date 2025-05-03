import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-custom-rose" />
    </div>
  );
};

export default Loading;