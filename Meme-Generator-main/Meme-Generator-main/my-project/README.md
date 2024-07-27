**MEME GENERATOR PROJECT DOCUMENTATION** 

*WEB DEVELOPMENT TEAM 1* 

**INTRODUCTION**

Our meme generator website offers users an immersive experience in the world of memes, enabling them to unleash their creativity in generating unique content. Users have the option to select from our extensive library of popular meme templates or upload their own images to create new memes. Our platform features customizable text boxes that can be added to any image, with adjustable font color and size, as well as various filter options. Completed memes can be easily downloaded and saved for sharing across different platforms.

**TECH STACK**

\- Frontend : React  
\- Backend : Node.js , Express.js  
\- Database : MongoDB for storage  
\- Styling : CSS & Tailwind  
\- Designing \- Figma , Bootstrap

**USED LIBRARIES and DEPENDENCIES**

* React : useState, useEffect, useRef , react , useContext, createContext  
* Axios   
* React Draggable  
* HeadingGame  
* react-router-dom : useNavigate , Route , Navigate, BrowserRouter  
* react-bootstrap : Form , Button   
*  {render, screen} from @testing-library/react  
* Tailwind base  
* ReactDOM

 **Running the Website Locally**

**Cloning on VS Code**  
1\. Clone the repository from GitHub.  
2\. Install dependencies using \`npm install\`.  
3\. Start the development server with \`npm start\`.

**Using React CodeSandbox**  
1\. Fork the project on CodeSandbox.  
2\. Open the project in the browser.  
3\. Start editing and see changes in real-time.


**MEME GENERATOR WALKTHROUGH WITH SNAPSHOTS : THE FLOW** 

***THE LOGIN / SIGNUP PAGE***  

   
The homepage of the meme generator website features a login section for entering your email and password, with a recurring meme series playing above and black-and-white cartoons in the background. New users can click the "Sign Up" link at the bottom to create an account, allowing them to explore the site immediately and log in later with the same credentials.

The Login and SignUp pages snapshots are respectively as follows : 

**NOTE : It’s necessary to put user address in ….xyz@abc…. Format**

![Screenshot 2024-07-26 223356](https://github.com/user-attachments/assets/ff485d57-3cd3-4717-a53c-8b599b01990b)

![Screenshot 2024-07-26 223448](https://github.com/user-attachments/assets/2d5ce37c-c098-4540-9e17-609471e8d04b)




***THE WELCOME PAGE*** 

Upon successful login, you'll be greeted by a welcome page featuring an eye-catching interface with a series of meme animations at the top. Scrolling down reveals a black-and-white theme with humorous statements and numerous animated cartoons and drawings in the background, designed to entertain and amuse.

Snapshots are as follows : 

![Screenshot 2024-07-26 152344](https://github.com/user-attachments/assets/5e39e663-54cc-4f6d-be71-a5780b4b1653)
![Screenshot 2024-07-26 152307](https://github.com/user-attachments/assets/0c147f20-42f2-4955-bff7-4d21600950bd)
![Screenshot 2024-07-26 152237](https://github.com/user-attachments/assets/b7bc2c03-daa6-4269-a415-b57186e962d0)



And you scroll down to click on the continue box to enter the meme generator page.

***THE MEMEGENERATOR PAGE*** 

![Screenshot 2024-07-26 153714](https://github.com/user-attachments/assets/99563203-7fe3-4827-aed2-f441321feddb)



Upon clicking continue the main meme generator page opens up with the same black and white theme and cartoons in background with a designed title of “MEME” at the top .

Followed by : 

1)  **An Inbuilt Meme Library :**  
    
The page offers a wide variety of popular meme templates that you can scroll through. Hovering over a meme image enlarges it automatically. Click on a desired template to move it to the blank area on the left, where you can edit it.

The snapshots are shown below : 

![Screenshot 2024-07-26 160943](https://github.com/user-attachments/assets/60f9a2d2-3ac8-4cba-80f9-47f5ee89c572)
![Screenshot 2024-07-26 161007](https://github.com/user-attachments/assets/8485950a-34ce-4f87-a8b9-830eaad5f31d)
![Screenshot 2024-07-26 160921](https://github.com/user-attachments/assets/6274f542-36c7-4acd-80dd-596772c7e990)
![Screenshot 2024-07-26 173143](https://github.com/user-attachments/assets/e74f8043-d350-4e71-9943-e75e7ff71493)


We clicked on this image and it appeared on the blank working area.  

1) **Followed by various buttons to use different features as follows :** 

1) ***Choose File*** : Allows us to choose any desired image from our own device for meme generation.

1) ***Add Text*** : Allows us to add text boxes in which we can type any desired caption 

**Text Box Features:**

* Move text boxes by clicking and dragging or using the move option in the lower right corner.  
* Adjust font size and color using the buttons below the text box.  
* Text boxes remain fixed to the meme/image and are included when downloaded.  
* Select color gradients using the color button below the text box.  
* Add multiple text boxes and delete any by clicking the cross button in the upper right corner.

![Screenshot 2024-07-26 155327](https://github.com/user-attachments/assets/89557278-d0e2-4f33-b8db-79c699b7fd3a)
![Screenshot 2024-07-26 155454](https://github.com/user-attachments/assets/d5cb0121-2d4c-4a56-bb68-d7f6edeeca41)




1) ***Download MEME*** : When we are completely satisfied with the final meme we have created we can download / save it in our device using this button. 

 

1) ***Filter Button*** i.e. Three Parallel Line Menu Button on the Blank Area : 

	This feature allows us to select the filter for our selected meme/image   
	We can just click on anyone fliter we want and can see the changes .

The images are as follows : 

![Screenshot 2024-07-26 160133](https://github.com/user-attachments/assets/ba23047e-9472-4c1f-a98c-6a7818966294)

![Screenshot 2024-07-26 160203](https://github.com/user-attachments/assets/3bb3eb53-1151-4d5a-965a-b0ad4c8084b6)



**\# SAMPLE MEMES :** 

We asked our friends to use our website and generate some cool memes.  
They loved it \!  
Few of those memes are as follows : 


![meme (3)](https://github.com/user-attachments/assets/47a7f866-b7da-4655-88c9-026b52cfd52e)
![meme (4)](https://github.com/user-attachments/assets/1bcbcbbb-4151-4d89-a203-af1ac6cc411d)
![meme (5)](https://github.com/user-attachments/assets/6b547331-fe03-4cde-9e7e-ae32b6180c09)


**\*\* THE END \! \*\***   
