// import React from "react";
import { Flame, Sparkles } from "lucide-react";

const MyTopbar = (): JSX.Element => {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-2">
                <h1 className="text-8xl font-bold">Profile</h1>
            </div>
            <div className="flex flex-row self-end px-8 items-center justify-evenly bg-blue-50 w-96 h-20 rounded-lg">
                <div className="flex flex-row items-center space-x-4">
                    <Flame />
                    12
                </div>

                <div className="flex flex-row items-center space-x-4">
                    <Sparkles />
                    1200
                </div>
            </div>
        </div>
    );
};

export default MyTopbar;
