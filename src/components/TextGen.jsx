import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loading_Img from "../assets/loading.gif";
const TextGen = () => {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const copyRef = useRef();

  const genAI = new GoogleGenerativeAI(
    "your_API_KEY"
  );

  const genText = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = input;

      const result = await model.generateContent(prompt);
      const response = result.response;

      const text = response.text();
      setInput("");
      setGeneratedText(text);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const onCopyText = () => {
    copyRef.current.select();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          AI Text Generator
        </h1>
        <div className="flex flex-col gap-2">
          <div className=" cursor-pointer  flex justify-end">
            <p
              className="bg-blue-500 px-2 py-2 rounded-md"
              onClick={onCopyText}
            >
              copy
            </p>
          </div>
          <div>
            {loading === true ? (
              <div className="flex items-center justify-center border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                <img src={Loading_Img} alt="" />
              </div>
            ) : (
              <div>
                <textarea
                  className="border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={generatedText}
                  readOnly
                  placeholder="Generated text will appear here..."
                  ref={copyRef}
                ></textarea>
              </div>
            )}
          </div>
        </div>

        <div className="flex pt-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter your prompt..."
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={genText}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextGen;
