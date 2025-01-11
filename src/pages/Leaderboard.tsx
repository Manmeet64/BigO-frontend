import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Trophy, Medal, Crown, Star, Users, Sparkles } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

interface LeaderboardUser {
    _id: string;
    username: string;
    xp: number;
    rank?: number;
}

const Leaderboard: FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        // Adding more dummy data
        const dummyData = [
            { _id: "1", username: "Alice", xp: 1500 },
            { _id: "2", username: "Bob", xp: 1400 },
            { _id: "3", username: "Charlie", xp: 1300 },
            { _id: "4", username: "Diana", xp: 1200 },
            { _id: "5", username: "Eve", xp: 1100 },
            { _id: "6", username: "Frank", xp: 1050 },
            { _id: "7", username: "Grace", xp: 1000 },
            { _id: "8", username: "Hank", xp: 950 },
            { _id: "9", username: "Ivy", xp: 900 },
            { _id: "10", username: "Jack", xp: 850 },
            { _id: "11", username: "Kathy", xp: 800 },
            { _id: "12", username: "Leo", xp: 750 },
            { _id: "13", username: "Mona", xp: 700 },
            { _id: "14", username: "Nina", xp: 650 },
            { _id: "15", username: "Oscar", xp: 600 },
        ];

        // Adding rank to the dummy data
        const rankedData = dummyData.map((user, index) => ({
            ...user,
            rank: index + 1,
        }));

        // Simulating API delay
        setTimeout(() => {
            setLeaderboard(rankedData);
            setIsLoading(false);
        }, 1000);
    }, []);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Medal className="w-6 h-6 text-amber-600" />;
            default:
                return <Star className="w-6 h-6 text-blue-400" />;
        }
    };

    return (
        <section className="flex flex-row h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />
            <div className="flex-1 p-8 relative">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl animate-float" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl animate-float-delayed" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
                    <ToastContainer />

                    {/* Top Header - Fixed */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Leaderboard
                        </h1>
                        <p className="text-gray-600">
                            Track your ranking and progress
                        </p>
                    </div>

                    {/* Scrollable Stats Header */}
                    <div
                        className="bg-white rounded-t-2xl shadow-lg border border-gray-100 
                                  animate-slide-up overflow-hidden"
                    >
                        <div className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <Trophy className="w-12 h-12 text-yellow-500 transform group-hover:scale-110 transition-transform duration-300" />
                                    <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                        Top Performers
                                    </h2>
                                    <p className="text-gray-500">
                                        Compete with the best
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-xl 
                                          border border-blue-100 animate-fade-in-delayed"
                            >
                                <Users className="w-5 h-5 text-blue-600" />
                                <span className="text-blue-600 font-medium">
                                    {leaderboard.length} Players
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Leaderboard Container */}
                    <div
                        className="flex-1 bg-white rounded-b-2xl shadow-lg border-x border-b border-gray-100 
                                  transform hover:shadow-xl transition-all duration-300
                                  overflow-hidden flex flex-col h-[calc(100vh-280px)]"
                    >
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-500" />
                                    <p className="text-gray-600 animate-pulse">
                                        Loading rankings...
                                    </p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-4 px-8 text-gray-600 font-semibold">
                                                Rank
                                            </th>
                                            <th className="text-left py-4 px-8 text-gray-600 font-semibold">
                                                Player
                                            </th>
                                            <th className="text-right py-4 px-8 text-gray-600 font-semibold">
                                                XP Points
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboard.map((user, index) => (
                                            <tr
                                                key={user._id}
                                                className="border-b border-gray-50 hover:bg-blue-50/50 
                                                         transition-all duration-300 animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${
                                                        index * 50
                                                    }ms`,
                                                }}
                                            >
                                                <td className="py-4 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="transform hover:scale-110 transition-transform duration-300">
                                                            {getRankIcon(
                                                                user.rank!
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`font-bold ${
                                                                user.rank === 1
                                                                    ? "text-yellow-500"
                                                                    : user.rank ===
                                                                      2
                                                                    ? "text-gray-400"
                                                                    : user.rank ===
                                                                      3
                                                                    ? "text-amber-600"
                                                                    : "text-blue-400"
                                                            }`}
                                                        >
                                                            #{user.rank}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600
                                                                      flex items-center justify-center text-white font-bold
                                                                      transform hover:scale-110 transition-transform duration-300"
                                                        >
                                                            {user.username
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-700">
                                                            {user.username}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-8 text-right">
                                                    <div
                                                        className="inline-flex items-center gap-2 bg-yellow-50 
                                                                  px-4 py-2 rounded-full hover:bg-yellow-100
                                                                  transition-all duration-300"
                                                    >
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span className="font-bold text-yellow-700">
                                                            {user.xp.toLocaleString()}{" "}
                                                            XP
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Update the custom scrollbar for dark theme
const globalCSS = `
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(75, 85, 99, 0.4) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.4);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 85, 99, 0.6);
}
`;

// Add these animations to your global CSS or tailwind config
const tailwindConfig = {
    theme: {
        extend: {
            animation: {
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out infinite -3s",
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "fade-in-delayed": "fadeIn 0.5s ease-out 0.3s forwards",
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                "slide-up": "slideUp 0.5s ease-out forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
};

export default Leaderboard;
