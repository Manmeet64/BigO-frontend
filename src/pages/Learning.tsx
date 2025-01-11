import React, { useState } from "react";
import { User, X } from "lucide-react";
import Navbar from "../components/Navbar";
import LearningPathCard from "../components/LearningPathCard";
import AchievementBadge from "../components/AchievementBadge";
import LearningPath from "../components/LearningPath";
import LearningPathView from "./LearningPathView";
import { useNavigate } from "react-router-dom";

interface LearningPath {
    title: string;
    description: string;
    progress: number;
    isLocked: boolean;
}

interface Achievement {
    name: string;
    icon: string;
    isUnlocked: boolean;
    description: string;
}

const Learning: React.FC = () => {
    const navigate = useNavigate();

    const learningPaths: LearningPath[] = [
        {
            title: "Algorithm Basics",
            description:
                "Learn fundamental algorithms and problem-solving techniques",
            progress: 75,
            isLocked: false,
        },
        {
            title: "Data Structures",
            description:
                "Master essential data structures and their implementations",
            progress: 30,
            isLocked: false,
        },
        {
            title: "Advanced Topics",
            description:
                "Explore advanced algorithms and optimization techniques",
            progress: 0,
            isLocked: true,
        },
    ];

    const achievements: Achievement[] = [
        {
            name: "First Steps",
            icon: "/icons/steps.svg",
            isUnlocked: true,
            description: "Complete your first algorithm challenge",
        },
        {
            name: "Quick Learner",
            icon: "/icons/brain.svg",
            isUnlocked: true,
            description: "Complete 5 challenges in one day",
        },
        {
            name: "Problem Solver",
            icon: "/icons/puzzle.svg",
            isUnlocked: false,
            description: "Solve a complex algorithm challenge",
        },
    ];

    const handleContinueLearning = (pathTitle: string) => {
        navigate(`/learning-path/${encodeURIComponent(pathTitle)}`);
    };

    return (
        <section className="flex flex-row h-[100vh] w-full bg-background">
            <Navbar />
            <div className="flex flex-col w-full h-[100vh] my-16 px-20">
                <div className="flex flex-row gap-4 h-[70vh] rounded-lg">
                    {/* Learning Paths Section */}
                    <div className="w-1/2 bg-blue-200 h-full flex flex-col gap-6 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-blue-800">
                            Learning Paths
                        </h2>
                        <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2">
                            {learningPaths.map((path, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                        {path.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {path.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${path.progress}%`,
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleContinueLearning(
                                                    path.title
                                                )
                                            }
                                            disabled={path.isLocked}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                path.isLocked
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        >
                                            {path.isLocked
                                                ? "Locked"
                                                : "Continue Learning"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="w-1/4 bg-blue-300 h-full flex flex-col rounded-lg overflow-hidden">
                        <div className="h-1/3 bg-blue-400 py-8 flex justify-center items-center">
                            <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-white flex items-center justify-center">
                                <User className="w-16 h-16 text-blue-600" />
                            </div>
                        </div>
                        <div className="h-2/3 p-6">
                            <h2 className="text-xl font-bold text-blue-800 mb-4">
                                Achievements
                            </h2>
                            <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2">
                                {achievements.map((achievement, index) => (
                                    <AchievementBadge
                                        key={index}
                                        {...achievement}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="w-1/4 h-full flex flex-col justify-between bg-blue-100 rounded-lg p-6">
                        <div>
                            <h2 className="text-xl font-bold text-blue-800 mb-4">
                                Statistics
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Daily Streak
                                        </span>
                                        <span className="text-orange-500 font-bold">
                                            🔥 7 days
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            XP Points
                                        </span>
                                        <span className="text-green-500 font-bold">
                                            ⭐ 1250
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Completed
                                        </span>
                                        <span className="text-blue-600 font-bold">
                                            12/20
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">
                                Next Challenge
                            </h3>
                            <p className="text-blue-600">
                                Binary Search Implementation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Learning;
