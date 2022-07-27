import { Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import Upload from "./components/Upload.jsx";
import LandingPage from "./pages/.LandingPage.js";
import Signup from "./components/Signup.jsx";

const App = () => (
	<Routes>
		<Route path="/" element={<LandingPage />} />
		<Route path="/auth/github" element={<Signup />} />
		{/* <Route path="/home" element={<Home />} /> */}
		<Route path="/home/this/site" element={<Home />} />
		<Route path="/upload" element={<Upload />} />
	</Routes>
);

export default App;
