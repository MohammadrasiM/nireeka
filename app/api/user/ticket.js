import AppHttp from "../AppHttp";

export const getTicketList = async (status = null) => {
  const http = AppHttp();

  let params = {};
  if (status) {
    params = { status };
  }

  try {
    const res = await http.get(`/api/tickets`, { params });
    return res.data;
  } catch (error) {
    console.log("Error occurred getting tiket list", error, error.response);
    return error;
  }
};

export const getTicketDetails = async (ticketId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/tickets/${ticketId}`);
    return res.data;
  } catch (error) {
    console.log("Error getting ticket details", error, error.response);
    return error;
  }
};

export const closeTicket = async (ticketId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/tickets/${ticketId}/close`);
    return res.data;
  } catch (error) {
    console.log("Error closing ticket", error, error.response);
    return error;
  }
};

export const reopenTicket = async (ticketId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/tickets/${ticketId}/open`);
    return res.data;
  } catch (error) {
    console.log("Error re opening ticket", error, error.response);
    return error;
  }
};

export const replyToTicket = async (replyForm) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(`/api/tickets/comment`, replyForm);
    return res.data;
  } catch (error) {
    console.log("Error replying to ticket", error, error.response);
    return error;
  }
};

export const openNewTicket = async (ticketForm) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(`/api/tickets`, ticketForm);
    return res.data;
  } catch (error) {
    console.log("Error creating a new ticket", error, error.response);
    return error;
  }
};

export const getTicketCategories = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/tickets/categories`);
    return res.data;
  } catch (error) {
    console.log("Error in getting ticket categories", error, error.response);
    return error;
  }
};

export const getTicketPriorities = async () => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/tickets/priority`);
    return res.data;
  } catch (error) {
    console.log("Error in getting ticket priority", error, error.response);
    return error;
  }
};
