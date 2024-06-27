import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../../public/login.css";
import Footer from "./Footer";
import ProfilePicContext from "./ProfilePicContext";

const Login = () => {
  const navigate = useNavigate();
  const chosenProfilePic = useContext(ProfilePicContext);
   ///
const [name, setName] = useState('');
    const [password, setPassword] = useState('');
///

  // const handleContinueClick = () => {
  //   navigate("/homepage");
  // };
///
 const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { name, password });
            // Assuming the backend responds with the token and user name
            const { data } = response;
            // Store the token and navigate to the homepage
            localStorage.setItem('token', data.token);
            navigate('/homepage');
        } catch (error) {
            console.error('Error logging in', error);
            // Handle login failure
        }
    };
///
  useEffect(() => {
    const spanElement = document.querySelector("span");
    if (spanElement) {
      spanElement.classList.remove("text-body-secondary");
    }
  }, []);

//   return (
//     <div>
//       <Header />
//       <div>
//         <div className="profilePic">
//           {chosenProfilePic && (
//             <img src={chosenProfilePic.url} alt="profilePic" />
//           )}
//         </div>
//         <div className="username">
//           <input
//             type="search"
//             className="form-control"
//             placeholder="Nickname"
//             aria-label="Search"
//           />
//           <button
//             className="btn btn-primary d-inline-flex align-items-center btn-dark"
//             type="button"
//             onClick={handleContinueClick}
//           >
//             Continue
//             <svg className="bi ms-1" width="90" height="1">
//               <use xlinkHref="#arrow-right-short"></use>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };
///
 return (
        <div>
            <Header />
            <div>
                <div className="profilePic">
                    {chosenProfilePic && (
                        <img src={chosenProfilePic.url} alt="profilePic" />
                    )}
                </div>
                <div className="username">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nickname"
                        aria-label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="btn btn-primary d-inline-flex align-items-center btn-dark"
                        type="button"
                        onClick={handleLogin}
                    >
                        Continue
                        <svg className="bi ms-1" width="90" height="1">
                            <use xlinkHref="#arrow-right-short"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
///

export default Login;
