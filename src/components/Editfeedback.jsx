import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
function EditStudent() {

  let params = useParams();
  let navigate = useNavigate();

  const location = useLocation();
  const feedbackdata = location.state?.data || "";

  const [userForm, setUserForm] = useState({
    customerName: feedbackdata.customerName,
    feedback: feedbackdata.feedback,
  });


  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const user = JSON.parse(localStorage.getItem("token"));
  const userRole = user?.userType
// Function to handle form submission for updating feedback
  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/feedback/updatefeedback/" + params.id, {
        customerName: userForm.customerName,
        feedback: userForm.feedback,
      })
      .then((res) => {
        console.log({ status: res.status });
 // Navigating based on user role after updating feedback
        if (userRole === "User") {
          navigate("/Userdatafeedback");
        } else {
          navigate("/Allfeedback-list");
        }
      });
  };
 // Effect to fetch existing feedback data for editing
  useEffect(() => {
    axios
      .get("http://localhost:8080/feedback/read/" + params.id)
      .then((res) => {
        if (res.data && res.data.data) {
          setUserForm({
            customerName: res.data.data.customerName || "",
            feedback: res.data.data.feedback || "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]); // Ensure the effect runs when params.id changes

   // Rendering the feedback edit form and navigation bar

  return (
    <nav style={navbar}>
      <h4 style={h1}>Edit Feedback</h4>
      <div style={containerStyle}>
        <div className="form-wrapper">
          <form onSubmit={onUpdate}>
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
              <label className="form-label">Feedback</label>
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      </nav>
      );
}

 export default EditStudent;



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