import axiosInstance from "./axiosInstance";
import { Comment, defaultRoom, Position, PostComment, Room, SignIn, SignUp, User, Booking } from "../types/types";

export async function fetchPosition(): Promise<Position[]> {
  try {
    const response = await axiosInstance.get("/api/vi-tri");
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    throw error;
  }
}

export async function getPositionByPagination(
  pageIndex: string = "1",
  pageSize: string = "8",
  keyword: string = ""
): Promise<Position[]> {
  try {
    const response = await axiosInstance.get(
      `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
    );
    return Array.isArray(response.data.content.data) ? response.data.content.data : [];
  } catch (error) {
    throw error;
  }
}

export async function getRoomsByPosition(maViTri: string): Promise<Room[]> {
  try {
    const response = await axiosInstance.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`);
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    throw error;
  }
}

export async function getRoomsById(id: string): Promise<Room> {
  try {
    const response = await axiosInstance.get(`/api/phong-thue/${id}`);
    return response.data.content instanceof Object ? response.data.content : defaultRoom;
  } catch (error) {
    throw error;
  }
}

export async function getCommentsById(id: string): Promise<Comment[]> {
  try {
    const response = await axiosInstance.get(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`);
    return response.data.content instanceof Array ? response.data.content : [];
  } catch (error) {
    throw error;
  }
}

export async function createComment(data: PostComment): Promise<void> {
  try {
    const response = await axiosInstance.post(`/api/binh-luan`, data);
    if (response.statusText !== "OK") {
      throw new Error(response.data.message || "Không thể gửi bình luận");
    }
  } catch (error) {
    throw error;
  }
}

export async function createBooking(data: Booking): Promise<void> {
  try {
    const response = await axiosInstance.post(`/api/dat-phong`, data);
    if (response.data.statusCode !== 201) {
      throw new Error(response.data.message || "Không thể đặt phòng");
    }
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: SignIn): Promise<{ token: string; user: User }> {
  try {
    const response = await axiosInstance.post(`/api/auth/signin`, data);

    if (response.statusText === "OK") {
      const token = response.data.content.token;
      localStorage.setItem("authToken", token);
      const user = response.data.content.user;
      return { token, user };
    } else {
      throw new Error(response.data.message || "Không thể đăng nhập");
    }
  } catch (error) {
    throw error;
  }
}

export async function signUp(data: SignUp): Promise<{ token: string; user: object }> {
  try {
    const response = await axiosInstance.post("/api/auth/signup", data);

    if (response.statusText === "OK") {
      const token = response.data.content.token;
      localStorage.setItem("authToken", token);
      const user = response.data.content.user;
      return { token, user };
    } else {
      throw new Error(response.data.message || "Không thể đăng ký");
    }
  } catch (error) {
    throw error;
  }
}
