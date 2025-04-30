import axiosInstance from "./axios";
import { Position } from "./types";

export async function fetchPosition(): Promise<Position[]> {
  try {
    const response = await axiosInstance.get("/api/vi-tri");
    return response.data.content;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
}
