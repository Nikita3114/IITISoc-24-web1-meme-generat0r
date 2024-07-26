import React from "react";


function HeaderHomepage() {
  return (
    <div className="relative overflow-hidden h-96 flex justify-center">
      <video autoPlay loop muted id="video" className="absolute top-0 h-full object-cover rounded-[20px] w-[900px]">
        <source src="/Videos/a.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default HeaderHomepage;
