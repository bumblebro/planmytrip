import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ContentLoader, { Code } from "react-content-loader";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");

function ThingsToCarry({ selectedPlaces }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    async function run() {
      setText(null);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `List the minimum things to carry with comma while going for a trip to ${selectedPlaces.map(
        (item) => {
          return `${item.placeName}` + ",";
        }
      )}  avoid sending first sentence just send me the things as result, also put emoji `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      setText(data);
    }
    run();
  }, [selectedPlaces]);
  return (
    <div className="bg-[#f6f5fa] px-2 py-2 rounded-lg mt-4 border border-solid  border-slate-400">
      <h1 className="mb-2 font-medium">Things to carry 🎒</h1>
      <div className="my-4 text-sm leading-relaxed text-blueGray-500 md:text-base">
        {text ? (
          <ReactMarkdown>{text}</ReactMarkdown>
        ) : (
          <ContentLoader
            speed={1}
            className="w-full "
            backgroundColor={"#999"}
            foregroundColor={"#fff"}
            viewBox="0 0 380 40"
          >
            <rect x="0" y="0" rx="4" ry="4" width="370" height="10" />
            <rect x="0" y="15" rx="4" ry="4" width="250" height="10" />
            <rect x="0" y="30" rx="4" ry="4" width="300" height="10" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
}

export default ThingsToCarry;
