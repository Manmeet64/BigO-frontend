import { Routes, Route } from "react-router-dom";
import Learning from "./pages/Learning";
import LearningPathView from "./pages/LearningPathView";
import Cards from "./pages/Cards";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Learning />} />
            <Route path="/cards/:userId" element={<Cards />} />
            <Route
                path="/learning-path/:pathId"
                element={<LearningPathView />}
            />
            <Route path="/leaderboard/:userId" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
