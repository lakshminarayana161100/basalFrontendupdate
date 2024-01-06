import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  maxWidth: "1000px",
  margin: "500px auto 100px 50px",
  padding: "20px",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  alignItems: "center",
  marginLeft: "-30px"

};

const navbar = {
  width: '100%',
  height: '70px',
  backgroundColor: '#3bb19b',
  display: 'flex',
  alignItems: ' center',
  justifyContent: 'space-between',
}

const h1 = {
  color: 'white',
  fontSize: '25px',
  marginLeft: '20px',
}

function CreateStudent() {

  const handleLogout = () => {
    localStorage.removeItem("token");
   // window.location.reload();
   navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("token"));
  const id = user?._id
  const [userForm, setUserForm] = useState({
    customerName: "",
    feedback: "",
    userid: id

  });


  const navigate = useNavigate();


  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };


  const onSubmit = (e) => {

    e.preventDefault();
    axios
      .post("http://localhost:8080/feedback/feedbackpost", userForm)
      .then((res) => {
        console.log(res.data);
        setUserForm({
          customerName: "",
          feedback: "",
          userid: id

        });
        navigate("/Userdatafeedback")

      });
  };
  console.log(user)
  console.log("userForm", userForm)
  useEffect(() => { }, []);
  return (
    <nav style={navbar}>
      <h4 style={h1}> UserCreate Feedback</h4>
      <div style={containerStyle}>
        <div className="form-wrapper">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">customerName</label>
              <input
                type="text"
                className="form-control"
                name="customerName"
                id="customerName"
                value={userForm.customerName}
                onChange={inputsHandler}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">feedback</label>
              <input
                type="text"
                className="form-control"
                name="feedback"
                id="feedback"
                value={userForm.feedback}
                onChange={inputsHandler}
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <button style={whiteBtnStyle} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
export default CreateStudent;


const whiteBtnStyle = {
  border: 'none',
  outline: 'none',
  padding: '12px 0',
  backgroundColor: 'white',
  borderRadius: '20px',
  width: '120px',
  fontWeight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
  marginRight: '20px',
};