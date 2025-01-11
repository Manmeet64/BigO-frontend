import React, { useState, useEffect, useRef } from "react";
import {
    User,
    X,
    Bug,
    Trophy,
    Star,
    Target,
    LoaderPinwheel,
} from "lucide-react";
import Navbar from "../components/Navbar";
import LearningPathCard from "../components/LearningPathCard";
import AchievementBadge from "../components/AchievementBadge";
import LearningPath from "../components/LearningPath";
import LearningPathView from "./LearningPathView";
import { useNavigate } from "react-router-dom";
import MyTopBar from "../components/MyTopbar";
import { gsap } from "gsap";

interface LearningPath {
    _id: string;
    name: string;
    decks: string[];
    createdAt: string;
    updatedAt: string;
    progress?: number;
}

interface Achievement {
    name: string;
    icon: string;
    isUnlocked: boolean;
    description: string;
}

const Learning: React.FC = () => {
    const navigate = useNavigate();
    const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [achievements, setAchievements] = useState([
        { name: "Bug Finder", icon: Bug },
        { name: "Quick Learner", icon: Trophy },
        { name: "Problem Solver", icon: Star },
        { name: "Goal Achiever", icon: Target },
    ]);

    const loaderRef = useRef(null);

    useEffect(() => {
        if (loaderRef.current) {
            gsap.fromTo(
                loaderRef.current,
                { x: 0 },
                {
                    x: "400%",
                    duration: 4,
                    ease: "power2.inOut",
                    yoyo: true,
                    repeat: 10,
                    repeatDelay: 0.5,
                }
            );
        }
    }, []);

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/bigo/learning-paths"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Add random progress to each path
                const pathsWithProgress = data.map((path: LearningPath) => ({
                    ...path,
                    progress: Math.floor(Math.random() * 100),
                }));

                // Calculate overall progress
                const totalProgress = pathsWithProgress.reduce(
                    (acc, path) => acc + path.progress!,
                    0
                );
                const avgProgress = Math.floor(
                    totalProgress / pathsWithProgress.length
                );

                setOverallProgress(avgProgress);
                setLearningPaths(pathsWithProgress);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching learning paths:", error);
                setIsLoading(false);
            }
        };

        fetchLearningPaths();
    }, []);

    const handleContinueLearning = (pathId: string) => {
        navigate(`/learning-path/${pathId}`);
    };

    if (isLoading) {
        return (
            <section className="flex flex-row h-screen w-full">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-row h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                <div className="px-12 py-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 pt-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3 animate-fade-in">
                            Paths
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Your learning adventure begins here
                        </p>
                    </div>

                    {/* Progress and Achievements Row */}
                    <div className="flex gap-8 mb-12">
                        {/* Left Side - Overall Progress */}
                        <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    Overall Progress
                                </h2>
                                <span className="text-3xl font-bold text-blue-600">
                                    {overallProgress}%
                                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full
                                             transition-all duration-1000 ease-out relative group"
                                    style={{ width: `${overallProgress}%` }}
                                >
                                    <div
                                        className="absolute inset-0 bg-white opacity-0 
                                                  group-hover:opacity-20 transition-opacity"
                                    />
                                </div>
                            </div>
                            <div className="relative h-[100px] mt-12 w-[500px] flex items-center overflow-hidden">
                                <div
                                    id="loaderPinwheelWrapper"
                                    className="absolute items-end justify-start"
                                    ref={loaderRef}
                                >
                                    <LoaderPinwheel size={72} />
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Achievements */}
                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-blue-500" />
                                Achievements
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="group flex flex-col items-center bg-blue-50 p-3 rounded-xl
                                                 hover:bg-blue-100 transition-all duration-300
                                                 transform hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <achievement.icon
                                            className="w-8 h-8 text-blue-600 mb-2 
                                                                   group-hover:scale-110 transition-transform"
                                        />
                                        <span className="text-sm font-medium text-gray-700 text-center">
                                            {achievement.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Learning Paths Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {learningPaths.map((path, index) => (
                            <div
                                key={path._id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div
                                    className="bg-white rounded-2xl p-6 border border-gray-100 
                                              group hover:shadow-lg transition-all duration-300 
                                              transform hover:-translate-y-2 h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <h3
                                            className="text-xl font-bold text-gray-800 mb-3 
                                                     group-hover:text-blue-600 transition-colors"
                                        >
                                            {path.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm flex items-center gap-2 mb-6">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                            {path.decks.length} decks available
                                        </p>

                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Progress
                                                </span>
                                                <span className="text-sm font-medium text-blue-600">
                                                    {path.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 
                                                             rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${path.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleContinueLearning(path._id)
                                            }
                                            className="w-full bg-blue-600 text-white rounded-xl py-3 px-4
                                                     font-medium transition-all duration-300
                                                     hover:bg-blue-700 active:transform active:scale-95
                                                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                     focus:ring-opacity-50"
                                        >
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Learning;
