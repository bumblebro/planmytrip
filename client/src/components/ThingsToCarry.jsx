import { useEffect } from "react";
import {
  FunctionDeclarationSchemaType,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { useState } from "react";
import ContentLoader, { Code } from "react-content-loader";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_FOR_AI);

function ThingsToCarry({ selectedPlaces }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    async function run() {
      setText(null);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: FunctionDeclarationSchemaType.ARRAY,
            items: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                item: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                emoji: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
              },
            },
          },
        },
      });
      const prompt = `List the minimum things to carry with comma while going for a trip to ${selectedPlaces.map(
        (item) => {
          return `${item.placeName}` + ",";
        }
      )}  avoid sending first sentence just send me the things as result, also put emoji `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      console.log(data);
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setText(parsedData);
    }
    run();
  }, [selectedPlaces]);
  return (
    <div className="bg-[#f6f5fa] px-2 py-2 rounded-lg mt-4 border border-solid  border-slate-400">
      <h1 className="mb-2 font-medium">Things to carry 🎒</h1>
      <div className="my-4 text-sm leading-relaxed text-blueGray-500 md:text-base">
        {text ? (
          <div>
            {" "}
            {text.map((item, index) => {
              return (
                <div key={index} className="flex">
                  <h1 className="font-semibold">{item.item}</h1>
                  <h1 className="text-blue-500 font-semibold">{item.emoji}</h1>
                </div>
              );
            })}
          </div>
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
