/* Libraries */
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* Pages */
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<Dashboard />} />
				</Route>

				<Route path="*" element={<h2>404 Not found.</h2>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
