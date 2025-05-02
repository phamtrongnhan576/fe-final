import axiosInstance from "./api";
import { Position } from "../types/types";

export async function fetchPosition(): Promise<Position[]> {
  try {
    const response = await axiosInstance.get("/api/vi-tri");

    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}