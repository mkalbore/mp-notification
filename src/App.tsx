import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestPage from "./components/RequestPage";
import StatusChangePage from "./components/StatusChangePage";
import NewFeaturePage from "./components/NewFeaturePage";
import HomePage from "./components/HomePage";
import { NotificationProvider } from "./components/NotificationContext";

export default function App() {
	return (
		<>
			<NotificationProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/request' element={<RequestPage />} />
						<Route path='/status-change' element={<StatusChangePage />} />
						<Route path='/new-feature' element={<NewFeaturePage />} />
					</Routes>
				</Router>
			</NotificationProvider>
		</>
	);
}
