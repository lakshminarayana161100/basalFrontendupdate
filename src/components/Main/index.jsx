import styles from "./styles.module.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import CreateStudent from "../AllfeedbackList";



const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <><div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Admin all feedback</h1>
        
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
        {/* <div>
          <ul style={{ display: 'flex', gap: '50px', float: "right", marginLeft: "700px" }}>
            <li className="nav-item">
              <Link to="/create-student" className="nav-link">
                Create Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student-list" className="nav-link">
                Student List
              </Link>
            </li>
          </ul>
        </div> */}




      <CreateStudent />
    </div>
    </>
  );
};

export default Main;



{/* <div className="App">
<nav className={styles.navbar}>
  <div className="container">
    <Link to={"/create-student"} className="nav-link">
      React MERN Stack App
    </Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/create-student" className="nav-link">
            Create Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/student-list" className="nav-link">
            Student List
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<button className={styles.white_btn} onClick={handleLogout}>
  Logout
</button>
</div> */}


