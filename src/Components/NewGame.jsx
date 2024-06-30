import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "./Footer";
import Draggable from "react-draggable";
import "../../public/styles/newgame.css";
import { toPng } from "html-to-image";

const MemeGenerator = () => {
  const [texts, setTexts] = useState([{ text: "", x: 0, y: 0 }]);
  const [image, setImage] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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
      setSelectedTemplate(null); // Clear selected template if a new image is uploaded
      setTexts([{ text: "", x: 0, y: 0 }]); // Reset texts when a new image is uploaded
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
          .forEach((btn) => btn.classList.add("hidden"));

        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to create image", err);
        document
          .querySelectorAll(".delete-btn")
          .forEach((btn) => btn.classList.add("hidden"));
      });
  };

  const handleAddText = () => {
    setTexts([...texts, { text: "", x: 50, y: 50 }]);
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
    setImage(null); // Clear uploaded image if a template is selected
    setTexts([{ text: "", x: 0, y: 0 }]); // Reset texts when a new template is selected
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1
        style={{
          color: "white",
          fontWeight: "400",
          fontFamily: "cursive",
        }}
      >
        Meme Generator
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="btn btn-outline-dark"
        style={{ borderRadius: "0" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDownload}
          className="btn btn-outline-dark"
          style={{ borderRadius: "7%" }}
        >
          Download Meme
        </button>
      </div>
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleAddText} className="btn btn-outline-dark">
          Add Text
        </button>
      </div>
      <div
        ref={memeRef}
        style={{
          position: "relative",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {(image || selectedTemplate) && (
          <img
            src={image || selectedTemplate.url}
            alt="Meme"
            style={{ width: "500px", height: "auto" }}
          />
        )}
        {texts.map((textObj, index) => (
          <Draggable
            key={index}
            defaultPosition={{ x: textObj.x, y: textObj.y }}
            onStop={(e, data) => handleDragStop(index, e, data)}
          >
            <div
              style={{
                position: "absolute",
                top: textObj.y,
                left: textObj.x,
                transform: "translate(-50%, -50%)",
                cursor: "move",
              }}
            >
              <textarea
                type="text"
                placeholder="Text"
                value={textObj.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                style={{
                  width: "250px",
                  height: "200px ",
                  wordWrap: "break-word",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  textAlign: "center",
                  wordWrap: "break-word",
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px #000",
                }}
              />
              <button
                onClick={() => handleDeleteText(index)}
                className="delete-btn"
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  background: "red",
                  border: "none",
                  color: "white",
                  fontSize: "1em",
                  fontWeight: "bold",
                  padding: "5px",
                }}
              >
                X
              </button>
            </div>
          </Draggable>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2
          style={{
            color: "white",
            fontWeight: "400",
            fontFamily: "cursive",
          }}
        >
          Select a Template
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {templates.map((template) => (
            <img
              key={template.id}
              src={template.url}
              alt={template.name}
              style={{ width: "150px", margin: "10px", cursor: "pointer" }}
              onClick={() => handleTemplateSelect(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NewGame = () => {
  return (
    <div>
      <MemeGenerator />
      <Footer />
    </div>
  );
};

export default NewGame;
