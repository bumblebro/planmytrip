import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");

function ThingsToCarry({ selectedPlaces }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `List the minimum things to carry with comma while going for a trip to ${selectedPlaces.map(
        (item) => {
          return `${item.placeName}` + ",";
        }
      )}  avoid sending first sentence, also put emoji `;
      // const prompt = `Please plan this trip using this ${selectedPlaces.map(
      //   (item) => {
      //     return `${item.placeName}` + ",";
      //   }
      // )}  with time of travel from 8am to 8pm `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      setText(data);
    }
    run();
  }, [selectedPlaces]);
  return (
    <div className="bg-[#f6f5fa] px-2 py-2 rounded-lg mt-4">
      <h1 className="mb-2 ">Things to carry while visiting above place:</h1>
      <ReactMarkdown>{text}</ReactMarkdown>{" "}
    </div>
  );
}

export default ThingsToCarry;
