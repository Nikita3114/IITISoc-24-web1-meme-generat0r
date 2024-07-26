import React from "react";

function HeadingGame(){
    return(
        <div className="flex h-80 justify-center items-start w-screen" style={{background: "linear-gradient(to right , rgb(0, 0, 0) 0%, rgb(11, 2, 40) 100%)", clipPath: "polygon(100% 0%,100% 70%,0 100%,0% 0%)"}}>
            <img src="/Images/MEME.jpg" className="h-36 mt-10" />
        </div>
    );
}

export default HeadingGame;