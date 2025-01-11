import React, { useEffect, useRef } from "react";
import { CheckCircle2, Circle, Lock, Star, Trophy, Target } from "lucide-react";

interface LessonNode {
    id: number;
    title: string;
    status: "completed" | "current" | "locked";
    xp: number;
    challenges: number;
}

const LearningPath: React.FC = () => {
    const pathRef = useRef<HTMLDivElement>(null);

    const lessons: LessonNode[] = [
        {
            id: 1,
            title: "Introduction to Algorithms",
            status: "completed",
            xp: 100,
            challenges: 3,
        },
        {
            id: 2,
            title: "Basic Data Structures",
            status: "completed",
            xp: 150,
            challenges: 4,
        },
        {
            id: 3,
            title: "Array Operations",
            status: "current",
            xp: 200,
            challenges: 5,
        },
        {
            id: 4,
            title: "Searching Algorithms",
            status: "locked",
            xp: 250,
            challenges: 4,
        },
        {
            id: 5,
            title: "Sorting Algorithms",
            status: "locked",
            xp: 300,
            challenges: 6,
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        entry.target.classList.add("show-path");
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll(".lesson-node").forEach((node) => {
            observer.observe(node);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative" ref={pathRef}>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2 z-0" />

            {lessons.map((lesson, index) => (
                <div
                    key={lesson.id}
                    className={`
                        lesson-node opacity-0 transform translate-y-20
                        mb-32 relative z-10
                    `}
                >
                    <div
                        className={`
                        flex items-center gap-8
                        ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}
                    `}
                    >
                        {/* Node */}
                        <div
                            className={`
                            w-24 h-24 rounded-full bg-white 
                            flex items-center justify-center
                            shadow-lg transition-all duration-500
                            ${
                                lesson.status !== "locked"
                                    ? "hover:scale-110 hover:shadow-xl cursor-pointer"
                                    : "opacity-50"
                            }
                            ${
                                lesson.status === "current"
                                    ? "ring-4 ring-blue-300 ring-opacity-50 animate-pulse"
                                    : ""
                            }
                        `}
                        >
                            {lesson.status === "completed" && (
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            )}
                            {lesson.status === "current" && (
                                <Target className="w-12 h-12 text-blue-500" />
                            )}
                            {lesson.status === "locked" && (
                                <Lock className="w-12 h-12 text-gray-400" />
                            )}
                        </div>

                        {/* Content Card */}
                        <div
                            className={`
                            bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                            transition-all duration-300 flex-1 max-w-xl
                            transform hover:-translate-y-1
                            ${lesson.status === "locked" ? "opacity-50" : ""}
                        `}
                        >
                            <h3 className="text-2xl font-bold text-blue-800 mb-3">
                                {lesson.title}
                            </h3>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4" /> {lesson.xp} XP
                                </span>
                                <span className="flex items-center gap-1 text-purple-500">
                                    <Trophy className="w-4 h-4" />{" "}
                                    {lesson.challenges} Challenges
                                </span>
                            </div>

                            {lesson.status !== "locked" && (
                                <button
                                    className={`
                                    mt-4 px-6 py-3 rounded-xl text-white font-medium
                                    transition-all duration-300 transform hover:scale-105
                                    ${
                                        lesson.status === "completed"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }
                                `}
                                >
                                    {lesson.status === "completed"
                                        ? "Review Lesson"
                                        : "Start Challenge"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LearningPath;
