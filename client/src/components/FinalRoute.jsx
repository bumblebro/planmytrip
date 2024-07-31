import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ContentLoader, { Code } from "react-content-loader";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");

function FinalRoute({ selectedPlaces, time1, time2 }) {
  const [text, setText] = useState(null);
  const selected1 = useSelector((state) => state.selected1);
  const selected2 = useSelector((state) => state.selected2);
  const link = useSelector((state) => state.link);
  useEffect(() => {
    async function run() {
      setText(null);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Arrange the place to visit from ${time1} to ${time2} with origin place as ${
        selected1.placeName
      } and destination place is ${
        selected2.placeName
      } and it is oneway trip and places to visit is ${selectedPlaces.map(
        (item) => {
          return `${item.placeName}` + ",";
        }
      )}  avoid sending first sentence. please mention time in the 12hr format. `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      setText(data);
    }
    run();
  }, [selectedPlaces, time1, time2]);

  return (
    <div className="bg-[#f6f5fa] px-2 py-2 rounded-lg mb-4  ">
      <h1 className="mb-2 font-medium">Your Planned itinerary 🚗</h1>
      <div className="my-4 text-sm leading-relaxed text-blueGray-500 md:text-base">
        {text ? (
          <div>
            <ReactMarkdown>{text}</ReactMarkdown>
            <h1>{link}</h1>
          </div>
        ) : (
          <>
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
            </ContentLoader>{" "}
            <a href={link} target="_blank">
              xxxxxx
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default FinalRoute;
