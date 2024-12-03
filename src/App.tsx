/* Libraries */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
/* Pages */
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Catalogs from "./pages/Catalogs/Catalogs";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/Rooms/page/RoomDetails/RoomDetails";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Navigate to="/dashboard" />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/catalogs" element={<Catalogs />} />
					<Route path="/rooms" element={<Rooms />} />
					<Route path="/rooms/:slug" element={<RoomDetails />} />
				</Route>

				<Route path="*" element={<h2>404 Not found.</h2>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
