import axios from "axios";

export const analyzeLog = async (logText) => {
  try {
    const response = await axios.post("http://127.0.0.1:5001/predict", {
      text: logText,
    });

    return response.data; // { attack_type, severity }
  } catch (error) {
    console.error("AI Prediction Error:", error.message);
    return { attack_type: "Unknown", severity: "Low" };
  }
};
