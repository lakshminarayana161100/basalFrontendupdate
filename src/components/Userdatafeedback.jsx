// Importing necessary dependencies and modules from React and external libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    width: "100%",
    maxWidth: "1000px",
    margin: "50px 100px 20px",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    
  

};

function Userdatalist() {
    const [userForm, setUserForm] = useState([]);

    const navigate = useNavigate();
// Function to delete a feedback entry
    const deletefeedback = (_id) => {
        axios
            .delete("http://localhost:8080/feedback/detelefeedback/" + _id)
            .then(() => {
                alert("Data successfully deleted!");
            })
            .catch((error) => {
                console.log(error);
            });
    };
 // Function to edit a feedback entry
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
  // Retrieving user information from local storage
    const user = JSON.parse(localStorage.getItem("token"));
    const id = user?._id
    console.log("userid", id)

      // Fetching user-specific feedback data from the server on component mount
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

     // Rendering the user-specific feedback data in a table
    return (

        <><nav style={navbar}>
            <h4 style={h1}>Userdata feedback</h4>
            {<Link
                style={whiteBtnStyle}
                to={"/CreateFeedback"}

            >
                Add feeback
            </Link>}
        </nav><div style={containerStyle}>
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
                                            onClick={() => deletefeedback(user._id)}
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
  const whiteBtnStyle = {
    border: 'none',
    outline: 'none',
    padding: '12px 0',
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '120px',
    fontWeight: 'bold',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '20px',
  };