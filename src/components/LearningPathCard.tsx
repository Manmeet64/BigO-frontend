import React from "react";
import { BookOpen, Lock, Trophy, ChevronRight } from "lucide-react";

interface LearningPathCardProps {
    title: string;
    description: string;
    progress: number;
    isLocked: boolean;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({
    title,
    description,
    progress,
    isLocked,
}) => {
    return (
        <div className={`card learning-path-card ${isLocked ? "locked" : ""}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`achievement-icon ${
                            isLocked ? "bg-gray-400" : ""
                        }`}
                    >
                        {isLocked ? (
                            <Lock className="w-5 h-5" />
                        ) : (
                            <BookOpen className="w-5 h-5" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span className="text-gray-600">Progress</span>
                    </div>
                    <span className="font-medium text-primary">
                        {progress}%
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {!isLocked && (
                <button className="mt-4 w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span>Continue Learning</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default LearningPathCard;
