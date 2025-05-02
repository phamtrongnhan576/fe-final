import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT,
  },
});


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage =
        data && typeof data === "object" && "message" in data
          ? data.message
          : "Lỗi không xác định";

      switch (status) {
        case 400:
          console.error(`Bad Request (400): ${errorMessage}`);
          toast.error(`Yêu cầu không hợp lệ: ${errorMessage}`);
          break;
        case 401:
          console.error(`Unauthorized (401): ${errorMessage}`);
          toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
          window.location.href = "/login";
          break;
        case 403:
          console.error(`Forbidden (403): ${errorMessage}`);
          toast.error("Bạn không có quyền truy cập tài nguyên này");
          break;
        case 404:
          console.error(`Not Found (404): ${errorMessage}`);
          toast.error("Tài nguyên không tồn tại");
          break;
        case 500:
          console.error(`Internal Server Error (500): ${errorMessage}`);
          toast.error("Lỗi server, vui lòng thử lại sau");
          break;
        default:
          console.error(`Unexpected error (${status}): ${errorMessage}`);
          toast.error(`Lỗi không xác định: ${errorMessage}`);
          break;
      }
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        console.error("Request Timeout: The request took too long to respond");
        toast.error("Yêu cầu hết thời gian, vui lòng thử lại");
      } else {
        console.error("Network Error: No response received from server");
        toast.error("Lỗi mạng, vui lòng kiểm tra kết nối");
      }
    } else {
      console.error(`Request Setup Error: ${error.message}`);
      toast.error(`Lỗi thiết lập yêu cầu: ${error.message}`);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;