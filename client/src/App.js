import { Route, Routes, Navigate } from "react-router-dom";


import Home from "./pages/Home";
import Upload from "./components/Upload.jsx";
import LandingPage from "./pages/.LandingPage.js";
import Signup from "./components/Signup.jsx";



function App(){
	const user = false;
	return (
		<Routes>
		<Route path="/" element={<LandingPage />} />
		<Route path="/auth/github" element={user ? <Navigate to="/home/this/site" /> : <Signup />} />
		{/* <Route path="/home" element={<Home />} /> */}
		<Route path="/home/this/site" element={<Home />} />
		<Route path="/upload" element={<Upload />} />
	</Routes>
	);
}
// const App = () =>

// (
// 	<Routes>
// 		<Route path="/" element={<LandingPage />} />
// 		<Route path="/auth/github" element={user ? <Navigate to="/home/this/site" /> : <Signup />} />
// 		{/* <Route path="/home" element={<Home />} /> */}
// 		<Route path="/home/this/site" element={<Home />} />
// 		<Route path="/upload" element={<Upload />} />
// 	</Routes>
// );

export default App;
