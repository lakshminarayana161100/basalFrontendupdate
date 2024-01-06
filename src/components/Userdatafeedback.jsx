import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    width: "100%",
    maxWidth: "1000px",
    margin: "400px 100px 100px",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    
  

};

function Userdatalist() {
    const [userForm, setUserForm] = useState([]);

    const navigate = useNavigate();

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
                navigate(`/edit-feedack/${id}`, { state: { data: res.data } });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const user = JSON.parse(localStorage.getItem("token"));
    const id = user?._id
    console.log("userid", id)
    useEffect(() => {
        axios
            .get("http://localhost:8080/feedback/allfeedback/")
            .then((res) => {

                const fliteredarray = res.data.feedback.filter(obj => obj.userid === id)

                console.log("fliteredarray", res.data.feedback)
                setUserForm(fliteredarray);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userForm]);
    return (

        <nav style={navbar}>
            <h4 style={h1}>Userdata feedback</h4>
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
            </div>
            </nav>
            );
}

 export default Userdatalist;


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