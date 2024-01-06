import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "50px auto 0",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  
  };

function StudentList() {
  const [userForm, setUserForm] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    //window.location.reload();
    navigate("/login");

  };

  const deleteStudent = (_id) => {
    axios
      .delete("http://localhost:8080/feedback/detelefeedback/" + _id)
      .then(() => {
        alert("Data successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editfeedback = (id) => {
    axios
    .get("http://localhost:8080/feedback/read/" + id)
    .then((res) => {
      // navigate(`/edit-feedack/${id}`,  );
      navigate(`/edit-feedack/${id}`, { state: { data: res.data} });
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/feedback/allfeedback/")
      .then((res) => {
        setUserForm(res.data.feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userForm]);
  return (
    <><div >
      <nav style={navbar}>
        <h1>Admin all feedback</h1>

        <button  style={whiteBtnStyle} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
    <div style={containerStyle}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">customerName id</th>
              <th scope="col">customerName</th>
              <th scope="col">Feedback</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userForm.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{user._id}</th>
                  <td>{user.customerName}</td>
                  <td>{user.feedback}</td>
                  <td>
                    {/* <Link
                  className="btn btn-primary btn-sm me-2"
                  // to={"/edit-feedack/" + user._id}
                  
                >
                  Edit
                </Link> */}
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editfeedback(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStudent(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div></>
  );
}
export default StudentList;


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