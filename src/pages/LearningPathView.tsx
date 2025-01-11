import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Star, Trophy, CheckCircle2, Lock, Target } from "lucide-react";

interface LessonNode {
    id: number;
    title: string;
    description: string;
    status: "completed" | "current" | "locked";
    xp: number;
    challenges: number;
}

interface LearningPathData {
    _id: string;
    name: string;
    decks: Deck[];
    createdAt: string;
    updatedAt: string;
}

const LearningPathView: React.FC = () => {
    const { pathId } = useParams();
    const navigate = useNavigate();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [pathName, setPathName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const lessons: LessonNode[] = [
        {
            id: 1,
            title: "Introduction to Algorithms",
            description: "Learn the basics of algorithmic thinking",
            status: "completed",
            xp: 100,
            challenges: 3,
        },
        {
            id: 2,
            title: "Basic Data Structures",
            description: "Master fundamental data structures",
            status: "completed",
            xp: 150,
            challenges: 4,
        },
        {
            id: 3,
            title: "Array Operations",
            description: "Deep dive into array manipulations",
            status: "current",
            xp: 200,
            challenges: 5,
        },
        {
            id: 4,
            title: "Searching Algorithms",
            description: "Explore different searching techniques",
            status: "locked",
            xp: 250,
            challenges: 4,
        },
        {
            id: 5,
            title: "Sorting Algorithms",
            description: "Master various sorting methods",
            status: "locked",
            xp: 300,
            challenges: 6,
        },
    ];

    useEffect(() => {
        const fetchLearningPath = async () => {
            try {
                // Fetch learning path details
                const pathResponse = await fetch(
                    `http://localhost:3000/bigo/learning-path/${pathId}`
                );
                const pathData: LearningPathData = await pathResponse.json();
                setPathName(pathData.name);
                setDecks(pathData.decks);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching learning path:", error);
                setIsLoading(false);
            }
        };

        if (pathId) {
            fetchLearningPath();
        }
    }, [pathId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.3 }
        );

        document.querySelectorAll(".path-node").forEach((node) => {
            observer.observe(node);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-gradient-to-b from-blue-50 to-transparent pt-8 pb-4 backdrop-blur-sm">
                <button
                    onClick={() => navigate("/")}
                    className="fixed top-8 right-8 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                >
                    <X className="w-6 h-6 text-gray-500 group-hover:text-blue-500" />
                </button>
                <h1 className="text-5xl font-bold text-blue-800 text-center mb-3 animate-fade-in">
                    {pathName}
                </h1>
                <p className="text-center text-gray-600 text-lg animate-fade-in-delayed">
                    Your adventure awaits...
                </p>
            </div>

            {/* Progress Overview */}
            <div className="max-w-4xl mx-auto px-4 mb-16 animate-slide-up">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-blue-600 mb-2 animate-number">
                                40%
                            </div>
                            <div className="text-gray-600 font-medium">
                                Journey Progress
                            </div>
                        </div>
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-green-500 mb-2 animate-number">
                                450
                            </div>
                            <div className="text-gray-600 font-medium">
                                XP Earned
                            </div>
                        </div>
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl font-bold text-purple-500 mb-2 animate-number">
                                2/5
                            </div>
                            <div className="text-gray-600 font-medium">
                                Chapters Completed
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Path */}
            <div className="max-w-6xl mx-auto px-4 relative">
                {/* Journey Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 transform -translate-x-1/2 rounded-full glow-line" />

                {lessons.map((lesson, index) => (
                    <div
                        key={lesson.id}
                        className={`
                            path-node opacity-0 transform translate-y-8
                            transition-all duration-1000 ease-out mb-32
                            ${index % 2 === 0 ? "pr-[52%]" : "pl-[52%]"}
                        `}
                    >
                        <div className="relative">
                            {/* Connection Line with Animation */}
                            <div
                                className={`
                                    absolute top-1/2 w-24 h-1 
                                    bg-gradient-to-r ${
                                        index % 2 === 0
                                            ? "from-blue-200 to-blue-300"
                                            : "from-blue-300 to-blue-200"
                                    }
                                    ${
                                        index % 2 === 0
                                            ? "right-0 translate-x-full"
                                            : "left-0 -translate-x-full"
                                    }
                                    transform scale-x-0 animate-grow-line
                                    rounded-full
                                `}
                            />

                            {/* Node */}
                            <div
                                className={`
                                    absolute ${
                                        index % 2 === 0 ? "right-0" : "left-0"
                                    }
                                    top-1/2 transform translate-x-1/2 -translate-y-1/2
                                    w-20 h-20 rounded-full bg-white
                                    flex items-center justify-center
                                    shadow-xl transition-all duration-500
                                    hover:scale-110 z-10
                                    ${
                                        lesson.status !== "locked"
                                            ? "cursor-pointer"
                                            : "opacity-75"
                                    }
                                    ${
                                        lesson.status === "current"
                                            ? "ring-4 ring-blue-300 ring-opacity-50 animate-pulse-slow"
                                            : ""
                                    }
                                    group
                                `}
                            >
                                {lesson.status === "completed" && (
                                    <CheckCircle2 className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                                )}
                                {lesson.status === "current" && (
                                    <Target className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform duration-300 animate-spin-slow" />
                                )}
                                {lesson.status === "locked" && (
                                    <Lock className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                )}
                            </div>

                            {/* Content Card */}
                            <div
                                className={`
                                    bg-white rounded-2xl p-8 shadow-lg
                                    transform transition-all duration-500
                                    hover:-translate-y-2 hover:shadow-xl
                                    ${
                                        lesson.status === "locked"
                                            ? "opacity-75 grayscale"
                                            : ""
                                    }
                                    group
                                `}
                            >
                                <h3 className="text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors">
                                    {lesson.title}
                                </h3>
                                <p className="text-gray-600 mb-6 text-lg">
                                    {lesson.description}
                                </p>

                                <div className="flex items-center gap-6 mb-6">
                                    <span className="flex items-center gap-2 text-yellow-500 bg-yellow-50 px-4 py-2 rounded-full">
                                        <Star className="w-5 h-5" /> {lesson.xp}{" "}
                                        XP
                                    </span>
                                    <span className="flex items-center gap-2 text-purple-500 bg-purple-50 px-4 py-2 rounded-full">
                                        <Trophy className="w-5 h-5" />{" "}
                                        {lesson.challenges} Challenges
                                    </span>
                                </div>

                                {lesson.status !== "locked" && (
                                    <button
                                        className={`
                                            w-full px-6 py-3 rounded-xl text-white font-semibold
                                            transition-all duration-300 transform 
                                            ${
                                                lesson.status === "completed"
                                                    ? "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                                                    : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                                            }
                                            hover:scale-105 hover:shadow-lg
                                            group-hover:animate-pulse-subtle
                                        `}
                                    >
                                        {lesson.status === "completed"
                                            ? "Review Chapter"
                                            : "Begin Chapter"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningPathView;
