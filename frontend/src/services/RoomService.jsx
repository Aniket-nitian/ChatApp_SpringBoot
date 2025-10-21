import { Axios } from "../config/AxiosHelper";

export const createRoom = async (roomDetail) => {
  try {
    const response = await Axios.post("/api/v1/rooms", roomDetail);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const joinRoom = async (roomId) => {
  try {
    const response = await Axios.get(`/api/v1/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};
