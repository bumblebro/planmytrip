import { useEffect } from "react";
import {
  FunctionDeclarationSchemaType,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { useState } from "react";
import ContentLoader, { Code } from "react-content-loader";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import svg from "../images/googlemap.svg";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_FOR_AI);

function FinalRoute({ selectedPlaces, time1, time2, handlePrint }) {
  const [text, setText] = useState(null);
  const selected1 = useSelector((state) => state.selected1);
  const selected2 = useSelector((state) => state.selected2);
  const link = useSelector((state) => state.link);
  useEffect(() => {
    async function run() {
      setText(null);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: FunctionDeclarationSchemaType.ARRAY,
            items: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                timeframe: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                placename: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                description: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                placeId: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
              },
            },
          },
        },
      });
      const prompt = `Arrange the place to visit from ${time1} to ${time2} with origin place as ${
        selected1.placeName
      } and destination place is ${
        selected2.placeName
      } and it is oneway trip and places to visit is ${selectedPlaces.map(
        (item) => {
          return (
            `${item.placeName} of lat:${item.lat} lng:${item.lng}  placeId: ${item.placeId}` +
            ","
          );
        }
      )}  please mention timeframe in the 12hr format with am and pm, send latitude and longitude and send breif description in description property about 3-4 sentence and allocate some time for lunch and send as Lunch in placename variable or dinner as Dinner in placename variable if required`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = response.text();
      console.log(data);
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setText(parsedData);
    }
    run();
  }, [selectedPlaces, time1, time2]);

  return (
    <div className="bg-[#f6f5fa] px-2 py-2 rounded-lg mb-4  ">
      <h1 className="mb-2 font-medium">Your Planned itinerary 🚗</h1>
      <div className="my-4 text-sm leading-relaxed text-blueGray-500 md:text-base">
        {text ? (
          <div>
            <div>
              {text.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">{item.timeframe}</h1>
                      {item.placename == "Lunch" ||
                      item.placename == "Dinner" ? (
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/search/restaurants+near+me/`}
                          className="flex items-center gap-2 text-blue-500 font-seemibold"
                        >
                          <p className="text-black">-</p>
                          <h1>{item.placename}</h1>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      ) : (
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/place/?q=place_id:${item.placeId}`}
                          // href={`googlemaps://?q=place_id:${item.placeId}`}
                          className="flex items-center gap-2 text-blue-500 font-seemibold"
                        >
                          <p className="text-black">-</p>
                          <h1>{item.placename}</h1>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      )}
                    </div>

                    <h1 className="text-slate-700">{item.description}</h1>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-around">
              <a href={link} target="_blank">
                <button
                  href={link}
                  target="_blank"
                  className="
               rounded-lg    
               flex  items-center justify-center p-0.5   overflow-hidden text-sm font-medium
                text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600
                 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-blue-300
                  dark:focus:ring-blue-800    
                    gap-2    mt-4"
                >
                  <span className="relative flex items-center w-full gap-2 px-2 py-2 text-gray-900 transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white ">
                    <h1>Open Route in Google Maps</h1>
                    <img className="w-6 text-white" src={svg} alt="" />
                  </span>
                </button>
              </a>{" "}
              <a onClick={handlePrint}>
                <button
                  className="
               rounded-lg    
               flex  items-center justify-center p-0.5   overflow-hidden text-sm font-medium
                text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600
                 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-blue-300
                  dark:focus:ring-blue-800    
                    gap-2    mt-4"
                >
                  <span className="relative flex items-center w-full gap-2 px-2 py-2 text-gray-900 transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white ">
                    <h1>PDF Export</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </span>
                </button>
              </a>{" "}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default FinalRoute;
