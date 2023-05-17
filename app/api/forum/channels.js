import AppHttp from "../AppHttp";

export const subscribeToChannel = async (channelId) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/forum/channels/subscriptions", {
      channel_id: channelId,
    });
    return res.data;
  } catch (error) {
    console.error("Error subscribing to channel.", error.response);
    throw error;
  }
};

export const unsubscribeFromChannel = async (channelId) => {
  const http = AppHttp();
  try {
    const res = await http.delete("/api/forum/channels/subscriptions", {
      data: {
        channel_id: channelId,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error unsubscribing from channel.", error.response);
    throw error;
  }
};
