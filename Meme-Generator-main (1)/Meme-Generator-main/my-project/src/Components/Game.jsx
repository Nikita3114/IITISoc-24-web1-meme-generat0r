import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { toPng } from "html-to-image";
import HeadingGame from "./HeadingGame";

const FilterMenu = ({ isFilterMenuOpen, filterMenuRef, handleFilterChange }) => {
  if (!isFilterMenuOpen) return null;
  return (
    <div
      ref={filterMenuRef}
      className="absolute -bottom-40 right-0 bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-4 z-50"
    >
      {["None", "Grayscale", "Sepia", "Blur", "Brightness", "Contrast"].map(
        (filter, index) => (
          <button
            key={index}
            onClick={() =>
              handleFilterChange(
                filter === "None" ? "" : `${filter.toLowerCase()}(100%)`
              )
            }
            className="bg-black text-white rounded px-8 py-2 hover:bg-gray-400 hover:text-black z-30"
          >
            {filter}
          </button>
        )
      )}
    </div>
  );
};

const MemeGenerator = () => {
  const [texts, setTexts] = useState([]);
  const [image, setImage] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [filter, setFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const memeRef = useRef(null);
  const textRefs = useRef([]);
  const filterMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setSelectedTemplate(null);
      setTexts([]);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (memeRef.current === null) {
      return;
    }
    document.querySelectorAll(".delete-btn").forEach((btn) => btn.classList.add("hidden"));
    toPng(memeRef.current)
      .then((dataUrl) => {
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.classList.remove("hidden"));
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to create image", err);
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.classList.remove("hidden"));
      });
  };

  const handleAddText = () => {
    setTexts([
      ...texts,
      {
        text: "",
        x: -150,
        y: 20,
        font: "Arial",
        color: "black",
        size: "16px",
      },
    ]);
  };

  const handleTextChange = (index, newText) => {
    setTexts((texts) => texts.map((t, i) => (i === index ? { ...t, text: newText } : t)));
  };

  const handleDragStop = (index, e, data) => {
    setTexts((texts) => texts.map((t, i) => (i === index ? { ...t, x: data.x, y: data.y } : t)));
    setSelectedTextIndex(index);
    if (textRefs.current[index]) {
      textRefs.current[index].focus();
    }
  };

  const handleDeleteText = (index) => {
    setTexts((texts) => texts.filter((_, i) => i !== index));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setImage(null);
    setTexts([]);
  };

  const handleColorChange = (index, newColor) => {
    setTexts((texts) => texts.map((t, i) => (i === index ? { ...t, color: newColor } : t)));
  };

  const handleSizeChange = (index, newSize) => {
    setTexts((texts) => texts.map((t, i) => (i === index ? { ...t, size: `${newSize}px` } : t)));
  };

  const handleTextareaFocus = (index) => {
    setSelectedTextIndex(index);
    document.querySelectorAll(".draggable-textarea").forEach((textarea) => {
      textarea.draggable = false;
    });
  };

  const handleTextareaBlur = () => {
    setSelectedTextIndex(null);
    document.querySelectorAll(".draggable-textarea").forEach((textarea) => {
      textarea.draggable = true;
    });
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsFilterMenuOpen(false);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleDiscardChanges = () => {
    setImage(null);
    setSelectedTemplate(null);
    setTexts([]);
    setFilter('');
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-center bg-cover"
        style={{
          backgroundImage: "url('/Images/background-img.jpg')",
          opacity: 0.75,
          zIndex: -1,
        }}
      ></div>
      <div className="flex flex-col items-center pb-4 px-4">
        <HeadingGame />
        <div className="flex flex-col md:flex-row bg-white md:justify-around md:items-center w-[90%] lg:w-[47%] p-1.5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="btn rounded-bl-xl hover:bg-gray-400 hover:text-black rounded-tr-xl bg-black text-white font-irish mb-2 md:mb-0 md:mr-2 p-2 w-full"
          />
          <button
            className={`btn rounded-bl-xl hover:bg-gray-400 hover:text-black rounded-tr-xl bg-black text-white font-irish mb-2 md:mb-0 md:mr-2 p-2 w-full ${
              !image && !selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDownload}
            disabled={!image && !selectedTemplate}
          >
            Download Meme
          </button>
          <button
            className={`btn rounded-bl-xl hover:bg-gray-400 hover:text-black rounded-tr-xl bg-black text-white font-irish p-2 w-full ${
              !image && !selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleAddText}
            disabled={!image && !selectedTemplate}
          >
            Add Text
          </button>
        </div>
        <div className="relative flex justify-around items-center bg-white px-1 w-full md:w-auto">
          <button
            className={`btn rounded-bl-xl hover:bg-gray-400 mr-4 hover:text-black rounded-tr-xl bg-black text-white font-irish p-2 w-full md:w-auto ${
              !image && !selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDiscardChanges}
            disabled={!image && !selectedTemplate}
          >
            Discard Changes
          </button>
          <button
            onClick={toggleFilterMenu}
            className="btn rounded-bl-xl hover:bg-gray-400 hover:text-black rounded-tr-xl bg-black text-white font-irish p-2 w-full md:w-auto"
          >
            ☰ Filters
          </button>
          {isFilterMenuOpen && (
          <div ref={filterMenuRef} className="absolute -bottom-40 right-0 bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-4 z-50">
            <button
              name="filter"
              value=""
              onClick={() => handleFilterChange('')}
              className="bg-black text-white rounded px-8 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              None
            </button>
            <button
              name="filter"
              value="grayscale(100%)"
              onClick={() => handleFilterChange('grayscale(100%)')}
              className="bg-black text-white rounded px-4 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              Grayscale
            </button>
            <button
              name="filter"
              value="sepia(100%)"
              onClick={() => handleFilterChange('sepia(100%)')}
              className="bg-black text-white rounded px-8 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              Sepia
            </button>
            <button
              name="filter"
              value="blur(5px)"
              onClick={() => handleFilterChange('blur(5px)')}
              className="bg-black text-white rounded px-9 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              Blur
            </button>
            <button
              name="filter"
              value="brightness(150%)"
              onClick={() => handleFilterChange('brightness(150%)')}
              className="bg-black text-white rounded px-7 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              Brightness
            </button>
            <button
              name="filter"
              value="contrast(200%)"
              onClick={() => handleFilterChange('contrast(200%)')}
              className="bg-black text-white rounded px-5 py-2 hover:bg-gray-400 hover:text-black z-30"
            >
              Contrast
            </button>
          </div>
        )}
        </div>
        <div className="flex flex-col md:flex-row w-full mt-4">
          {/* Meme Editor */}
          <div
            ref={memeRef}
            className="relative flex flex-col items-center bg-white w-full md:w-1/2 max-h-screen overflow-auto"
          >
            {(image || selectedTemplate) && (
              <img
                src={image || selectedTemplate.url}
                alt="Meme"
                className="w-full max-h-[100vh]"
                style={{ filter }}
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
                  className="absolute transform -translate-x-1/2 cursor-move"
                  style={{ top: textObj.y, left: "50%" }}
                  onClick={() => setSelectedTextIndex(index)}
                >
                  <textarea
                    type="text"
                    placeholder="Text"
                    value={textObj.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    onFocus={() => handleTextareaFocus(index)}
                    onBlur={handleTextareaBlur}
                    className="draggable-textarea w-64 h-36 overflow-auto bg-transparent border-none text-center font-bold text-white shadow-text z-20"
                    ref={(el) => (textRefs.current[index] = el)}
                    style={{
                      color: textObj.color,
                      fontFamily: textObj.font,
                      fontSize: textObj.size,
                      zIndex: selectedTextIndex === index ? 10 : 1,
                    }}
                  />
                  <button
                    onClick={() => handleDeleteText(index)}
                    onTouchEnd={() => handleDeleteText(index)}
                    className="delete-btn absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center"
                  >
                    X
                  </button>
                  <div className="text-options absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-transparent p-2 rounded shadow-lg z-30">
                    <div className="flex justify-around h-fit w-fit delete-btn">
                      <input
                        type="color"
                        value={textObj.color}
                        onInput={(e) => handleColorChange(index, e.target.value)}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="ml-2 delete-btn w-16"
                      />
                      <input
                        type="number"
                        value={parseInt(textObj.size)}
                        onInput={(e) => handleSizeChange(index, e.target.value)}
                        onChange={(e) => handleSizeChange(index, e.target.value)}
                        className="ml-2 delete-btn w-16"
                      />
                    </div>
                  </div>
                </div>
              </Draggable>
            ))}
            {!image && !selectedTemplate && (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-xl font-irish text-gray-500">
                  Please select a template or upload an image to get started.
                </p>
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="w-full md:w-1/2 ml-4 md:mt-0 max-h-screen overflow-auto">
            <div className="flex justify-center">
              <div className="w-fit h-fit text-center bg-gray m-6">
                <h2 className="font-irish text-3xl antialiased font-bold underline bg-white decoration-double">
                  Select a Template
                </h2>
              </div>
            </div>
            <div
              className="flex flex-wrap justify-center bg-white p-4"
              style={{
                background:
                  "linear-gradient(to top , rgb(0, 0, 0) 0%, rgb(18, 0, 33) 100%)",
                clipPath: "polygon(100% 0% , 100% 100%,0 100%,0% 0%)",
              }}
            >
              {templates.map((template) => (
                <img
                  className="border-2 border-black my-2 h-48 w-36 active:opacity-0 transition ease-in-out hover:-translate-y-1 hover:scale-150 mx-4 cursor-pointer"
                  key={template.id}
                  src={template.url}
                  alt={template.name}
                  onClick={() => handleTemplateSelect(template)}
                />
              ))}
            </div>
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
