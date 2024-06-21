import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import Footer from "./Footer";
import "../../public/newgame.css";

const NewGame = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [texts, setTexts] = useState([]);
  const [memeImage, setMemeImage] = useState(null);

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

  const handleAddText = () => {
    console.log("Add Text button clicked");
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

  const handleGenerateMeme = () => {
    if (!selectedTemplate) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedTemplate.url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      context.font = "30px Impact";
      context.textAlign = "center";
      context.fillStyle = "white";
      context.strokeStyle = "black";
      context.lineWidth = 2;

      texts.forEach((textObj) => {
        context.fillText(textObj.text, textObj.x, textObj.y);
        context.strokeText(textObj.text, textObj.x, textObj.y);
      });

      const dataUrl = canvas.toDataURL("image/png");
      setMemeImage(dataUrl);
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Meme Generator</h1>
      {templates.length > 0 ? (
        <div>
          <select
            onChange={(e) =>
              setSelectedTemplate(
                templates.find((t) => t.id === e.target.value)
              )
            }
          >
            <option value="">Select a template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Loading templates...</p>
      )}
      <br />
      <button onClick={handleAddText}>Add Text</button>
      <br />
      <div className="meme-container">
        {selectedTemplate && (
          <div className="meme">
            <img
              src={selectedTemplate.url}
              alt="Meme Template"
              width="700px"
              height="700px"
            />
            {texts.map((textObj, index) => (
              <Draggable
                key={index}
                defaultPosition={{ x: textObj.x, y: textObj.y }}
                onStop={(e, data) => handleDragStop(index, e, data)}
              >
                <div className="draggable-text">
                  <input
                    type="text"
                    value={textObj.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                  />
                </div>
              </Draggable>
            ))}
          </div>
        )}
      </div>
      <br />
      <button onClick={handleGenerateMeme}>Generate Meme</button>
      <br />
      {memeImage && (
        <div className="meme" style={{ marginTop: "20px" }}>
          <h2>Generated Meme</h2>
          <img
            src={memeImage}
            alt="Generated Meme"
            height="700px"
            width="700px"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default NewGame;
