// import React from "react";
import { Box, Route, SquareDashedKanban, Swords, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const Navbar = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-8 justify-center h-screen w-[120px] text-white px-4 bg-gray-800">
            <MyButton
                icon={Box}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
                onClick={() => navigate("/cards")}
            />
            <MyButton
                icon={Route}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
                onClick={() => navigate("/")}
            />
            <MyButton
                icon={SquareDashedKanban}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
                onClick={() => navigate("/leaderboard/userid")}
            />
            <MyButton
                icon={Swords}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
                onClick={() => navigate("/battles")}
            />
            <MyButton
                icon={User}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
                onClick={() => navigate("/profile")}
            />
        </div>
    );
};

export default Navbar;
