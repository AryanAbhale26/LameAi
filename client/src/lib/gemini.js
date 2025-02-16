import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI("AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});

// Example of usage
// const prompt = "Explain how AI works";
// const result = await model.generateContent(prompt);
// console.log(result.response.text());

export default model;
