import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import ContentLoader, { Code } from "react-content-loader";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_FOR_AI);

function ImageDesc() {
  const [image, setImage] = useState(null);
  const [information, setInformation] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async function () {
        const dat = reader.result.split(",")[1];
        setBase64String(dat);
      };
    }
  };

  const handleSubmit = async () => {
    if (!base64String) return;
    const run = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        "explain this place in brief like tour guide  also provide historical information if any.",
        {
          inlineData: {
            data: base64String,
            mimeType: "image/png",
          },
        },
      ]);
      setInformation(result.response.text());
      console.log(result.response.text());
    };
    run();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      /> */}

      <div className="flex items-center justify-center w-10/12 mx-auto md:w-6/12">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            className="hidden"
            type="file"
            accept="image/*"
            capture="optional"
            onClick={() => {}}
            onChange={(event) => {
              setLoading(false);
              setInformation(null);
              setBase64String(null);

              handleImageChange(event);
            }}
          />
        </label>
      </div>

      {image && (
        <img
          className="w-10/12 mx-auto h-[50vh] md:h-[70vh] md:w-6/12  object-cover"
          src={image}
          alt="Uploaded image"
        />
      )}
      {base64String && (
        <button
          className=" 
                        relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm md:text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-6/12 md:w-3/12 mx-auto"
          onClick={() => {
            handleSubmit();
            setLoading(true);
            setBase64String(null);
          }}
        >
          <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
            <h1 className="">Submit</h1>
          </span>
        </button>
      )}
      {loading && (
        <div className="w-10/12 mx-auto text-sm md:w-6/12 md:text-lg">
          {information ? (
            // <p> {information}</p>
            <ReactMarkdown>{information}</ReactMarkdown>
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
      )}
    </div>
  );
}

export default ImageDesc;
