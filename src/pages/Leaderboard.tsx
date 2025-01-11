import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Trophy, Medal, Crown, Star, Users } from "lucide-react";
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
        <section className="flex flex-row h-screen w-full bg-gray-50">
            <Navbar />
            <div className="flex flex-col flex-1 px-16 py-8">
                <ToastContainer />

                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Trophy className="w-10 h-10 text-yellow-400" />
                        <h1 className="text-5xl font-bold text-gray-800">
                            Leaderboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full shadow-md">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                            {leaderboard.length} Players
                        </span>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                                            Rank
                                        </th>
                                        <th className="text-left py-4 px-6 text-gray-500 font-semibold">
                                            Player
                                        </th>
                                        <th className="text-right py-4 px-6 text-gray-500 font-semibold">
                                            XP Points
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((user) => (
                                        <tr
                                            key={user._id}
                                            className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                                                user._id === userId
                                                    ? "bg-blue-50"
                                                    : ""
                                            }`}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {getRankIcon(user.rank!)}
                                                    <span
                                                        className={`font-semibold ${
                                                            user.rank === 1
                                                                ? "text-yellow-400"
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
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 
                                                                  flex items-center justify-center text-white font-bold"
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
                                            <td className="py-4 px-6 text-right">
                                                <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full shadow-md">
                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                    <span className="font-semibold text-yellow-600">
                                                        {user.xp.toLocaleString()}
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
        </section>
    );
};

export default Leaderboard;
