import React, { createContext, useState, useEffect } from "react";
import profilePic from "../../public/picture"; // Ensure this path and import is correct

const ProfilePicContext = createContext();

export const ProfilePicProvider = ({ children }) => {
  const [chosenProfilePic, setChosenProfilePic] = useState(null);

  useEffect(() => {
    if (profilePic.length > 0) {
      const imageIndex = Math.floor(Math.random() * profilePic.length);
      setChosenProfilePic(profilePic[imageIndex]);
      console.log("Chosen Profile Pic:", profilePic[imageIndex]);
    } else {
      console.error("ProfilePic array is empty.");
    }
  }, []);

  return (
    <ProfilePicContext.Provider value={chosenProfilePic}>
      {children}
    </ProfilePicContext.Provider>
  );
};

export default ProfilePicContext;
