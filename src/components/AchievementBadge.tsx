import React from "react";
import { Trophy, Star, Lock, Award } from "lucide-react";

interface AchievementBadgeProps {
    name: string;
    icon: string;
    isUnlocked: boolean;
    description: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
    name,
    icon,
    isUnlocked,
    description,
}) => {
    return (
        <div
            className={`card achievement-badge ${
                isUnlocked ? "unlocked" : "locked"
            }`}
        >
            <div className="flex items-start space-x-4">
                <div className="achievement-icon">
                    {isUnlocked ? (
                        <Trophy className="w-6 h-6" />
                    ) : (
                        <Lock className="w-6 h-6" />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-900">
                                {name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {description}
                            </p>
                        </div>
                        {isUnlocked && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        )}
                    </div>

                    {isUnlocked && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4 text-primary" />
                                    <span className="text-gray-600">
                                        Achievement Unlocked
                                    </span>
                                </div>
                                <span className="text-primary font-medium">
                                    +100 XP
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AchievementBadge;
