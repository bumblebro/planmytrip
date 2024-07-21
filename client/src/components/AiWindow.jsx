import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ContentLoader, { Code } from "react-content-loader";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyCXDKoQVeO41DjXic40S9ONZwF8oiMFTww");

function AiWindow({ setIsOpen, placename, location }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Place ${placename} located in ${location} in less than 200 words`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      setText(data);
    }
    run();
  }, [placename]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none my-14 focus:outline-none ">
        <div className="relative w-10/12 max-w-3xl mx-auto my-6 h-6/12 lg:w-auto">
          {/*content*/}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-5 pt-5 border-b border-solid rounded-t border-blueGray-200">
              <h3 className="text-xl font-semibold lg:text-3xl">{placename}</h3>
            </div>
            <div className="relative flex-auto px-6">
              {text ? (
                <div className="my-4 text-sm leading-relaxed lg:text-lg text-blueGray-500">
                  {/* <p className="my-4 text-sm leading-relaxed lg:text-lg text-blueGray-500">
              {text}
            </p> */}

                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              ) : (
                <ContentLoader
                  height={140}
                  speed={1}
                  className="w-full h-full my-4"
                  backgroundColor={"#999"}
                  foregroundColor={"#fff"}
                  viewBox="0 0 380 70"
                >
                  <rect x="0" y="0" rx="4" ry="4" width="370" height="10" />
                  <rect x="0" y="15" rx="4" ry="4" width="250" height="10" />
                  <rect x="0" y="30" rx="4" ry="4" width="300" height="10" />
                  <rect x="0" y="45" rx="4" ry="4" width="370" height="10" />
                  <rect x="0" y="60" rx="4" ry="4" width="250" height="10" />
                </ContentLoader>
              )}
            </div>
            <div className="flex items-center justify-end border-t border-solid rounded-b border-blueGray-200 ">
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none lg:text-lg"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default AiWindow;
