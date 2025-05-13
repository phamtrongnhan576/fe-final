import { toast } from "sonner";
import { AxiosError } from "axios";
import { X } from "lucide-react";


export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 2000,
    className:
      "!bg-green-50 !text-green-600 !font-bold !border-[2px] !text-lg !border-green-500 px-4 py-2",
    position: "top-right",
    action: {
      label: <X className="w-5 h-5 text-green-600 cursor-pointer" />,
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 2000,
    className: "!bg-red-50 !text-red-600 !font-bold !border-[2px] !text-md !border-red-500",
    position: "top-right",
    action: {
      label: <X className="w-5 h-5 text-red-600 cursor-pointer" />,
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const response = error.response;

    const errorMessage =
      response?.data && typeof response.data === "object" && "content" in response.data
        ? response.data.content
        : "Lỗi không xác định";

    switch (response?.status) {
      case 400:
        showErrorToast(`Yêu cầu không hợp lệ: ${errorMessage}`);
        break;
      case 401:
        showErrorToast("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
        break;
      case 403:
        showErrorToast("Bạn không có quyền truy cập tài nguyên này");
        break;
      case 404:
        showErrorToast("Tài nguyên không tồn tại");
        break;
      case 500:
        showErrorToast("Lỗi server, vui lòng thử lại sau");
        break;
      default:
        showErrorToast(`Lỗi không xác định: ${errorMessage}`);
        break;
    }
  } else {
    showErrorToast("Lỗi không xác định, vui lòng thử lại");
  }
};