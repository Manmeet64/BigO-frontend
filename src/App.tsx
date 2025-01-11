import { Routes, Route } from "react-router-dom";
import Learning from "./pages/Learning";
import LearningPathView from "./pages/LearningPathView";
import Cards from "./pages/Cards";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Battles from "./pages/Battles";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Learning />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cards" element={<Cards />} />
            <Route
                path="/learning-path/:pathId"
                element={<LearningPathView />}
            />
            <Route path="/leaderboard/:userId" element={<Leaderboard />} />
            <Route path="/battles" element={<Battles />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
