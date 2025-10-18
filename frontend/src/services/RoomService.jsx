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

export const joinRoom = async (roomId, userName) => {
  try {
    const response = await Axios.post("/rooms/join", { roomId, userName }); // Adjust endpoint as needed
    return response.data; // Assuming the response contains room details
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};
