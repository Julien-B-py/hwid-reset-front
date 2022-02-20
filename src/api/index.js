import axios from "axios";

const editHWID = async (userInput) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/reset-hwid", {
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
