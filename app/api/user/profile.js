import AppHttp from "../AppHttp";

export const updateUserAvatar = async (avatarForm) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const http = AppHttp({ headers });
  try {
    const res = await http.post(`/api/update-avatar`, avatarForm);
    return res.data;
  } catch (error) {
    console.log("Error in updating profile picture", error, error.response);
    return error;
  }
};

export const updateUserProfileData = async (newData) => {
  let http = AppHttp();
  try {
    const res = await http.post("/api/register-second", newData);
    return res.data;
  } catch (error) {
    console.log(
      "Error in updating usr profile info with post body:",
      newData,
      "error.response:",
      error.response
    );

    throw error;
  }
};

export const getShippingAddresses = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/addresses");
    return res.data;
  } catch (error) {
    console.log("Couldn't get shipping addresses", error, error.response);
    return error;
  }
};

export const getShippingAddressDetails = async (addressId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/addresses/${addressId}/edit`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get shipping addresses details", error, error.response);
    return error;
  }
};

export const deleteShippingAddress = async (addressId) => {
  const http = AppHttp();
  try {
    const res = await http.delete(`/api/addresses/${addressId}`);
    return res.data;
  } catch (error) {
    console.log("Couldn't delete shipping address", error, error.response);
    throw error;
  }
};

export const editShippingAddress = async (addressId, editedAddress) => {
  const http = AppHttp();
  try {
    const res = await http.put(`/api/addresses/${addressId}`, editedAddress);
    return res.data;
  } catch (error) {
    console.log("Couldn't edit shipping address", error, error.response);
    throw error;
  }
};

export const updateUserPrivacySettings = async (newPrivacy) => {
  const http = AppHttp();
  try {
    const res = await http.put("/api/forum/settings", newPrivacy);
    return res.data;
  } catch (error) {
    console.log("Couldn't update user privacy settings", error, error.response);
    return error;
  }
};

export const getUserProfileByUserID = async (userID) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/profile/${userID}`);
    return res.data;
  } catch (error) {
    console.log("Couldn't get user profile data id:", userID, error, error.response);
    return error;
  }
};

export const setUserDefaultAddress = async (addressId) => {
  const http = AppHttp();
  try {
    const res = await http.post("/api/addresses/select-default", { address_id: addressId });
  } catch (error) {
    console.log("Couldn't set users's default address with id:", addressId, error, error.response);
    throw error;
  }
};
