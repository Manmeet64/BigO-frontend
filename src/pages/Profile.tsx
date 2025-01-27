import Navbar from "../components/Navbar.js";
import MyTopBar from "../components/MyTopbar.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Bug } from "lucide-react";

interface Friend {
    username: string;
    avatar: string; // Assuming each friend object contains `username` and `avatar`
}

interface ProfileData {
    username: string;
    email: string;
    friends: Friend[]; // Changed to array of Friend objects
    // Add other fields that come from your API
}

const Profile = (): JSX.Element => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [badges, setBadges] = useState<string[]>(["Bug Finder"]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId) {
                toast.error("No user found. Please login again.");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3000/bigo/user/${userId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setProfileData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to load user profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (isLoading || !profileData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    const handleContinueLearning = (pathTitle: string) => {
        navigate(`/learning-path/${encodeURIComponent(pathTitle)}`);
    };

    return (
        <section className="flex flex-row h-[100vh] w-full bg-background">
            <Navbar />
            <div className="flex flex-col w-full h-[100vh] my-16 px-20">
                <MyTopBar />

                <div className="flex flex-row gap-4 my-8 h-[70vh] rounded-lg">
                    {/* Left Side - Image and Avatars */}
                    <div className="w-1/4 bg-blue-300 h-[100%] flex flex-col rounded-lg overflow-hidden">
                        <div className="h-1/3 bg-blue-400 py-12 flex justify-center items-center">
                            <div className="w-40 h-40 rounded-full border-4 border-blue-500">
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="h-2/3">
                            <div className="w-full p-8 flex flex-row gap-4 justify-around flex-wrap">
                                {[...Array(6)].map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="w-16 h-16 rounded-full bg-blue-400"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="w-1/2 h-full bg-blue-200 flex flex-col gap-6 p-6 rounded-lg">
                        {/* Username */}
                        <div className="w-[250px] h-[40px] rounded-full bg-blue-300 flex items-center justify-center">
                            <span className="text-white">
                                {profileData.username}
                            </span>
                        </div>

                        {/* Email */}
                        <div className="w-[200px] h-[40px] rounded-full bg-blue-300 flex items-center justify-center">
                            <span className="text-white">
                                {profileData.email}
                            </span>
                        </div>

                        {/* Friends section */}
                        <div className="w-full h-48 bg-gray-200 rounded-lg p-4 flex flex-col justify-between">
                            <h3>Friends</h3>
                            <div className="flex flex-wrap gap-4">
                                {profileData.friends.length === 0 ? (
                                    <p className="text-sm text-gray-600">
                                        No friends yet.
                                    </p>
                                ) : (
                                    profileData.friends.map((friend, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center bg-blue-200 p-4 rounded-lg w-24 h-32"
                                        >
                                            {/* Display friend's avatar and username */}
                                            <img
                                                src={
                                                    friend.avatar ||
                                                    "https://github.com/shadcn.png"
                                                }
                                                alt={`${friend.username}'s avatar`}
                                                className="w-20 h-20 rounded-full object-cover mb-2"
                                            />
                                            <span className="text-sm">
                                                {friend.username}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Badges Section */}
                    <div className="p-4 w-1/4 h-full flex flex-col justify-between bg-blue-100 rounded-lg">
                        <div className="mb-6 flex-1">
                            <h1 className="text-2xl font-bold mb-2 text-blue-600">
                                Badges
                            </h1>
                            {badges.length <= 0 ? (
                                <p className="text-lg text-gray-600 bg-slate-50 p-4 rounded-lg shadow-md">
                                    Start learning to earn badges
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {badges.map((badge, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col gap-2 items-center bg-blue-200 p-2 rounded-full"
                                        >
                                            <Bug size={16} />
                                            <span className="text-sm">
                                                {badge}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Scrollable Container with Learning Paths */}
                        <div className="overflow-y-auto h-3/4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">
                                Your Learning Paths
                            </h2>
                            {[
                                "System Design",
                                "DSA",
                                "Web Development",
                                "Machine Learning",
                                "Cloud Computing",
                            ].map((path, idx) => (
                                <div
                                    key={idx}
                                    className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors"
                                    onClick={() => handleContinueLearning(path)}
                                >
                                    {path}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
