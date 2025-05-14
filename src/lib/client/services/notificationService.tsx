import { AxiosError } from "axios";
import { toast } from 'react-toastify';


export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right', 
    autoClose: 3000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true, 
    draggable: true, 
    theme: 'colored', 
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',  
    autoClose: 3000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    pauseOnHover: true, 
    draggable: true, 
    theme: 'colored', 
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