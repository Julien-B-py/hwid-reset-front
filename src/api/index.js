import axios from "axios";

// Submit data to the server and return the response
const editHWID = async (userInput) => {
  try {
    const { data } = await axios.post("https://vecr-rest-api.herokuapp.com/api/reset-hwid", {
      token: userInput.token,
      prevHWID: userInput.prevHWID,
      newHWID: userInput.newHWID
    });

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default editHWID;
