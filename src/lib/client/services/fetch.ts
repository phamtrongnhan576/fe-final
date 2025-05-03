import axiosInstance from "./api";
import { Position, Room } from "../types/types";

export async function fetchPosition(): Promise<Position[]> {
  try {
    const response = await axiosInstance.get("/api/vi-tri");

    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

export async function getPositionByPagination(pageIndex: string = "1", pageSize: string = "8", keyword: string = ""): Promise<Position[]> {
  try {
    const response = await axiosInstance.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);

    return Array.isArray(response.data.content.data) ? response.data.content.data : [];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

export async function getRoomsByPosition(maViTri: string): Promise<Room[]> {
  try {
    const response = await axiosInstance.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`);

    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}
