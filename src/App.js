import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateFeedback from "./components/CreateFeedback";
import Editfeedback from "./components/Editfeedback";
import AllfeedbackList from "./components/AllfeedbackList";

import Userdatafeedback from "./components/Userdatafeedback";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/"  element={<Main />} />}
			<Route path="/signup"  element={<Signup />} />
			<Route path="/login"  element={<Login />} />
			<Route path="/CreateFeedback" element={<CreateFeedback />} />
			<Route path="/edit-feedack/:id" element={<Editfeedback />} />
			<Route path="/Allfeedback-list" element={<AllfeedbackList />} />
			<Route path="/Userdatafeedback" element={<Userdatafeedback />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
