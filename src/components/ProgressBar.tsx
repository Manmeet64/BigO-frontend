import React from "react";
import { Star, Zap, Award } from "lucide-react";

interface ProgressBarProps {
    currentLevel: number;
    totalLevels: number;
    xp: number;
    xpRequired: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    currentLevel,
    totalLevels,
    xp,
    xpRequired,
}) => {
    const progress = (xp / xpRequired) * 100;

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="achievement-icon">
                        <Star className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Level {currentLevel}
                        </h3>
                        <p className="text-sm text-gray-600">Keep going!</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">
                        {xp}/{xpRequired} XP
                    </span>
                </div>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-gray-600">Next Level</span>
                </div>
                <span className="text-gray-600">
                    {totalLevels - currentLevel} levels remaining
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
