import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { toPng } from "html-to-image";
import HeadingGame from "./HeadingGame";

const MemeGenerator = () => {
  const [texts, setTexts] = useState([]);
  const [image, setImage] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const memeRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        if (response.data.success) {
          setTemplates(response.data.data.memes);
        }
      })
      .catch((error) => console.error("Error fetching meme templates:", error));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setSelectedTemplate(null);
      setTexts([]); // Clear texts when a new image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (memeRef.current === null) {
      return;
    }
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) => btn.classList.add("hidden"));
    toPng(memeRef.current)
      .then((dataUrl) => {
        document
          .querySelectorAll(".delete-btn")
          .forEach((btn) => btn.classList.remove("hidden"));

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to create image", err);
        document
          .querySelectorAll(".delete-btn")
          .forEach((btn) => btn.classList.remove("hidden"));
      });
  };

  const handleAddText = () => {
    setTexts([
      ...texts,
      {
        text: "",
        x: -100,
        y: 10, 
        font: "Arial",
        color: "#ffffff",
        size: "16px",
      },
    ]);
  };

  const handleTextChange = (index, newText) => {
    const newTexts = texts.map((t, i) =>
      i === index ? { ...t, text: newText } : t
    );
    setTexts(newTexts);
  };

  const handleDragStop = (index, e, data) => {
    const newTexts = texts.map((t, i) =>
      i === index ? { ...t, x: data.x, y: data.y } : t
    );
    setTexts(newTexts);
  };

  const handleDeleteText = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setImage(null);
    setTexts([]); // Clear texts when a new template is selected
  };

  const handleFontChange = (index, newFont) => {
    const newTexts = texts.map((t, i) =>
      i === index ? { ...t, font: newFont } : t
    );
    setTexts(newTexts);
  };

  const handleColorChange = (index, newColor) => {
    const newTexts = texts.map((t, i) =>
      i === index ? { ...t, color: newColor } : t
    );
    setTexts(newTexts);
  };

  const handleSizeChange = (index, newSize) => {
    const newTexts = texts.map((t, i) =>
      i === index ? { ...t, size: newSize } : t
    );
    setTexts(newTexts);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('/Images/background-img.jpg')",
          opacity: 0.75,
          zIndex: -1,
        }}
      ></div>
      <div className="flex flex-col items-center pb-4 px-4">
        <HeadingGame />
        <div className="flex flex-col md:flex-row bg-white md:justify-around md:items-center w-[47%] p-1.5 ">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="btn rounded-bl-xl rounded-tr-xl bg-black text-white font-irish h-1/5 mb-2 md:mb-0 md:mr-2"
            style={{
              hover: {
                boxShadow:
                  "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
              },
            }}
          />
          <button
            onClick={handleDownload}
            className="btn rounded-bl-xl rounded-tr-xl bg-black text-white font-irish w-full md:w-48 py-0.5 mb-2 md:mb-0 md:mr-2"
            style={{
              hover: {
                boxShadow:
                  "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
              },
            }}
          >
            Download Meme
          </button>
          <button
            onClick={handleAddText}
            className="btn rounded-bl-xl rounded-tr-xl bg-black text-white font-irish w-full md:w-36 py-0.5"
            style={{
              hover: {
                boxShadow:
                  "0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
              },
            }}
          >
            Add Text
          </button>
        </div>

        <div
          ref={memeRef}
          className="relative inline-block text-center bg-white  w-full max-w-xl mt-4"
        >
          {(image || selectedTemplate) && (
            <img
              src={image || selectedTemplate.url}
              alt="Meme"
              className="w-full h-auto"
            />
          )}
          {texts.map((textObj, index) => (
            <Draggable
            key={index}
            defaultPosition={{ x: textObj.x, y: textObj.y }}
            onStop={(e, data) => handleDragStop(index, e, data)}
            enableUserSelectHack={false}
          >
            <div
              className="absolute transform -translate-x-1/2 cursor-move z-10"
              style={{ top: textObj.y, left: "50%" }}
              onClick={() => setSelectedTextIndex(index)}
            >
              <textarea
                type="text"
                placeholder="Text"
                value={textObj.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="w-64 h-36 resize overflow-auto bg-transparent border-none text-center font-bold text-white shadow-text"
                style={{
                  color: textObj.color,
                  fontFamily: textObj.font,
                  fontSize: textObj.size,
                }}
              />
              {selectedTextIndex === index && (
                <div className="flex items-center p-2">
                  <select
                    className="delete-btn"
                    value={textObj.font}
                    onChange={(e) => handleFontChange(index, e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                  <input
                    className="mx-2 delete-btn"
                    type="color"
                    value={textObj.color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                  <input
                    className="delete-btn"
                    type="number"
                    value={parseInt(textObj.size)}
                    onChange={(e) =>
                      handleSizeChange(index, `${e.target.value}px`)
                    }
                    style={{ width: "50px" }}
                  />
                </div>
              )}
              <button
                onClick={() => handleDeleteText(index)}
                className="delete-btn ml-2 cursor-pointer bg-red-600 text-white text-lg font-bold px-2"
              >
                X
              </button>
            </div>
          </Draggable>
          
          ))}
        </div>
        <div className="flex flex-col content-around mt-4 w-full">
          <div className="flex justify-center">
            <div className="w-fit h-fit text-center bg-gray m-6">
              <h2 className="font-irish text-3xl antialiased font-bold underline decoration-double">
                Select a Template
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap justify-center bg-white "  style={{background: "linear-gradient(to top , rgb(0, 0, 0) 0%, rgb(18, 0, 33) 100%)", clipPath: "polygon(100% 0% , 100% 100%,0 100%,0% 0%)", aspectRatio:"17/16"}}>
            {templates.map((template) => (
              <img
                className="border-2 border-black my-2 h-48 w-36 hover:animate-bounce active:opacity-0 w-36 h-48 my-2 mx-4 cursor-pointer"
                key={template.id}
                src={template.url}
                alt={template.name}
                onClick={() => handleTemplateSelect(template)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Game = () => {
  return (
    <div>
      <MemeGenerator />
    </div>
  );
};

export default Game;