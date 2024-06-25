import React, { useEffect } from "react";
import Footer from "./Footer";
import "../../public/homepage.css";
import HeaderHomepage from "./HeaderHomepage";
import { useNavigate } from "react-router-dom";

function Homepage() {
  useEffect(() => {
    const spanElement = document.querySelector("span");
    if (spanElement) {
      spanElement.classList.remove("text-body-secondary");
    }
  }, []);
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/game");
  };

  return (
    <div>
      <HeaderHomepage />
      <section id="mbody">
        <div className="container">
          <div className="row">
            <div className="info col-8">
              <p>
                asdfghjkldzxcvbnmvcbnmmdsgdhdgfmhgnsbfdnsaschgjhf k jvub kjafj
                ajdfj jkjavs jvfha djkjk
                afBKJBKvDFCVGHBJHJGVFCDXSWXRDCFVGHBJNGVFCDXSZSXDCVHFDCxswsxdcfvgbhnbgvfcdextcf
                hgjca issdo odsb obso dbobsodb o ois sdifgiadiregwibfousba ibir
                eibif iwgigh groivweiur3g282g3 f iufiuw efuig igwfiug uifiaab
                fsdgsgdsgsdgsdgsdggggggg
              </p>
            </div>
            <div className="start col-4">
              <div className="newgame">
                <button className="btn btn-dark" onClick={handleContinueClick}>
                  <img
                    src="https://cdn3.emoji.gg/emojis/7643_woman_yelling_at_cat_meme.png"
                    alt="New Game"
                  />
                  New Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;
