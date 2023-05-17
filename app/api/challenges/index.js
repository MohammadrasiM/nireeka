import AppHttp from "../AppHttp";

export const getChallengesList = async () => {
  const http = AppHttp();
  try {
    const res = await http.get("/api/challenges");
    return res.data;
  } catch (error) {
    console.log("Couldn't get challenges list", error, error.response);
    throw error;
  }
};

export const claimChallengeById = async (challengeId) => {
  const http = AppHttp();
  try {
    const res = await http.get(`/api/challenges/${challengeId}/claim`);
    return res.data;
  } catch (error) {
    console.log(
      "Couldn't claim challenge with id:",
      challengeId,
      error,
      error.response
    );
    throw error;
  }
};
