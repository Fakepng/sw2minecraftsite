import React from "react";
import { Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Navbar from "./components/Navbar";
import AdminNav from "./components/Navbar/AdminNav";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Skin from "./Pages/Skin";
import Event from "./Pages/Event";
import Games from "./Pages/Event/Game";
import Team from "./Pages/Team";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import FourOFour from "./Pages/FourOFour";
import Render from "./Pages/Admin/Render";
import SignIn from "./Pages/Admin";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminRegister from "./Pages/Admin/Register";
import AdminRepass from "./Pages/Admin/Repass";
import EventQuery from "./Pages/Admin/Event";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const App = () => {
	const token = localStorage.getItem("accessToken");
	const user = localStorage.getItem("user");
	const isTokenExpired = isExpired(token);
	const tokenOwner = decodeToken(token)?.username;

	const navigate = useNavigate();

	let buffer = [];

	document.addEventListener("keydown", (event) => {
		const charList = "admin";
		const key = event.key.toLowerCase();
		if (charList.indexOf(key) === -1) {
			buffer = [];
			return;
		}
		buffer.push(key);
		if (buffer.join("") === charList) {
			buffer = [];
			navigate("/admin");
		}
	});

	const isAdmin = token && !isTokenExpired && tokenOwner === user;

	return (
		<>
			{isAdmin ? <AdminNav /> : <Navbar />}
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/gallery' element={<Gallery />} />
				<Route path='/skin' element={<Skin />} />
				<Route path='/event' element={<Event />} />
				<Route path='/event/:id' element={<Games />} />
				<Route path='/team' element={<Team />} />
				<Route path='/register' element={<Register />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/admin' element={<SignIn />} />
				<Route
					path='/admin/render'
					element={
						<Protected isAdmin={isAdmin}>
							<Render />
						</Protected>
					}
				/>
				<Route
					path='/admin/dashboard'
					element={
						<Protected isAdmin={isAdmin}>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path='/admin/register'
					element={
						<Protected isAdmin={isAdmin}>
							<AdminRegister />
						</Protected>
					}
				/>
				<Route
					path='/admin/repass'
					element={
						<Protected isAdmin={isAdmin}>
							<AdminRepass />
						</Protected>
					}
				/>
				<Route
					path='/admin/event'
					element={
						<Protected isAdmin={isAdmin}>
							<EventQuery />
						</Protected>
					}
				/>
				<Route path='*' element={<FourOFour />} status={404} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
