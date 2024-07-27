import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function HeaderHomepage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHomeClick = () => {
    navigate("/homepage");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleSignoutClick = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="flex bg-gray-200 justify-between px-10 py-2 items-center">
        <div className="flex gap-4 py-4 justify-around items-center">
          <div className="mr-10 font-semibold hover:text-blue-400">
            <a href="#" onClick={handleHomeClick}>Home</a>
          </div>
          <div className="font-semibold hover:text-blue-400">
            <a href="#" onClick={toggleModal}>Instructions</a>
          </div>
          <div className="ml-10 font-semibold hover:text-red-700">
            
            <a href="#" onClick={handleSignoutClick}>Sign Out</a>
          </div>
        </div>
        <div className="flex">
          <img src="/Images/profile.jpg" alt="Profile" className="h-24 w-24 rounded-full" />
        </div>
      </nav>
      <div className="relative overflow-hidden h-96 flex justify-center">
        <video
          autoPlay
          loop
          muted
          id="video"
          className="absolute top-0 h-full object-cover rounded-[20px] w-[900px]"
        >
          <source src="/Videos/a.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

       {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96 h-96 overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Instructions</h2>
                        <h1>How to Use Our Meme Generator</h1>
                        <p>Welcome to our Meme Generator! Follow these simple steps to create and share your own memes:</p>
                        <br/>
                        <h2>Step 1: Choose Your Image</h2>
                        <ol>
                            <li><strong>Find an Image</strong>: Copy the URL of the image you want to use. You can find images on the web or use your own hosted images.</li>
                            <br/>
                            <li><strong>Enter the URL</strong>: Paste the image URL into the "Image URL" field on our website.</li>
                        </ol>
                        <br/>
                        <h2>Step 2: Add Your Text</h2>
                        <ol>
                            <li><strong>Top Text</strong>: Enter the text you want to appear at the top of the image in the "Top Text" field.</li>
                            <br/>
                            <li><strong>Bottom Text</strong>: Enter the text you want to appear at the bottom of the image in the "Bottom Text" field.</li>
                        </ol>
                        <br/>
                        <h2>Step 3: Generate Your Meme</h2>
                        <ol>
                            <li><strong>Click the Generate Button</strong>: Once you have entered the image URL and your desired text, click the "Generate Meme" button.</li>
                        </ol>
                        <br/>
                        <h2>Step 4: View and Download Your Meme</h2>
                        <ol>
                            <li><strong>View Your Meme</strong>: After clicking the "Generate Meme" button, your custom meme will appear below the form.</li>
                            <br/>
                            <li><strong>Download</strong>: Right-click on the generated meme and select "Save Image As..." to download it to your device.</li>
                        </ol>
                        <br/>
                        <h2>Tips for Creating Great Memes</h2>
                        <ul>
                            <li><strong>Clear Text</strong>: Make sure your text is easy to read. Use clear and concise wording.</li>
                            <br/>
                            <li><strong>Funny and Relatable</strong>: Think of something funny or relatable that matches the image.</li>
                            <br/>
                            <li><strong>Image Quality</strong>: Use high-quality images for the best results.</li>
                        </ul>
                        <br/>
                        <h2>Troubleshooting</h2>
                        <ul>
                            <li><strong>Image Not Loading</strong>: Ensure the image URL is correct and the image is publicly accessible.</li>
                            <br/>
                            <li><strong>Text Not Appearing</strong>: Check that you've entered text in both the top and bottom fields.</li>
                            <br/>
                            <li><strong>Other Issues</strong>: Refresh the page and try again. If problems persist, contact our support team.</li>
                        </ul>
                        <button
                            onClick={toggleModal}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default HeaderHomepage;