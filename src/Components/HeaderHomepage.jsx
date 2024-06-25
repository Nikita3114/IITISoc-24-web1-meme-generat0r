import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePicContext from "./ProfilePicContext";

function HeaderHomepage() {
  const chosenProfilePic = useContext(ProfilePicContext);

  return (
    <section id="header">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link
          to="/"
          className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          <svg
            className="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="#" className="nav-link px-2 link-secondary">
              Overview
            </Link>
          </li>
          {/* Uncomment and add more links as needed */}
          {/* <li><Link to="#" className="nav-link px-2 link-body-emphasis">Inventory</Link></li>
          <li><Link to="#" className="nav-link px-2 link-body-emphasis">Customers</Link></li>
          <li><Link to="#" className="nav-link px-2 link-body-emphasis">Products</Link></li> */}
        </ul>

        <div className="dropdown text-end">
          <Link
            to="#"
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="profilePic">
              {chosenProfilePic && (
                <img
                  src={chosenProfilePic.url}
                  alt="profilePic"
                  style={{ width: "70px", height: "70px" }}
                />
              )}
            </div>
          </Link>
          <ul className="dropdown-menu text-small">
            <li>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeaderHomepage;
