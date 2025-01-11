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
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/bigo/leaderboard"
                );
                if (!response.ok)
                    throw new Error("Failed to fetch leaderboard");
                const data = await response.json();

                // Add rank to each user
                const rankedData = data.map(
                    (user: LeaderboardUser, index: number) => ({
                        ...user,
                        rank: index + 1,
                    })
                );

                setLeaderboard(rankedData);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                toast.error("Failed to load leaderboard");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
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
        <section className="flex flex-row h-screen w-full bg-background">
            <Navbar />
            <div className="flex flex-col flex-1 px-16 pt-8">
                <ToastContainer />

                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Trophy className="w-10 h-10 text-yellow-400" />
                        <h1 className="text-5xl font-bold text-gray-800">
                            Leaderboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
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
                                    <tr className="border-b-2 border-gray-100">
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
                                            className={`border-b border-gray-50 hover:bg-blue-50 transition-colors
                                                      ${
                                                          user._id === userId
                                                              ? "bg-blue-50"
                                                              : ""
                                                      }`}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {getRankIcon(user.rank!)}
                                                    <span
                                                        className={`font-semibold
                                                        ${
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
                                                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                                                    <Star className="w-4 h-4 text-blue-600" />
                                                    <span className="font-semibold text-blue-600">
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
