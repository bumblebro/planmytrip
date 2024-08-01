import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_FOR_AI);

function ImageDesc() {
  const [image, setImage] = useState(null);
  const [information, setInformation] = useState(null);
  const [base64String, setBase64String] = useState(null);

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
        "What is in this photo?",
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
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded image" />}
      <button onClick={handleSubmit}>Submit</button>
      {information && <p>{information}</p>}
    </div>
  );
}

export default ImageDesc;
