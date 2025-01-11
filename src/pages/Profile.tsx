// import React from "react";
import Navbar from "../components/Navbar.js";
import MyTopBar from "../components/MyTopbar.js";

const Profile = (): JSX.Element => {
    return (
        <section className="flex flex-row h-[100vh] w-full bg-background">
            <Navbar />
            <div className="flex flex-col w-full h-[100vh] my-16 px-20">
                <MyTopBar />
                <div className="flex flex-row gap-4 my-8 h-[70vh] rounded-lg">
                    {/* image and avatars */}
                    <div className="w-1/4 bg-blue-300 h-[100%] flex flex-col rounded-lg overflow-hidden">
                        <div className="h-1/3 bg-blue-400 py-12 flex justify-center items-center">
                            <div className="w-40 h-40 rounded-full border-4 border-blue-500">
                                <img
                                    src="https://github.com/shadcn.png"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="h-2/3">
                            <div className="w-full p-8 flex flex-row gap-4 justify-around flex-wrap">
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                                <div className="w-16 h-16 rounded-full bg-blue-400"></div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="w-1/2 h-full bg-blue-200 flex flex-col gap-6 p-6 rounded-lg">
                        {/* Placeholder for Username */}
                        <div className="w-[250px] h-[40px] rounded-full bg-blue-300"></div>

                        {/* Placeholder for Email */}
                        <div className="w-[200px] h-[40px] rounded-full bg-blue-300"></div>

                        {/* Placeholder for Name */}
                        <div className="w-[180px] h-[40px] rounded-full bg-blue-300"></div>

                        {/* Additional Div Below */}
                        <div className="w-full h-40 bg-gray-200 rounded-lg p-4">
                            <h3>Add friends</h3>
                        </div>
                    </div>

                    {/* Badges Section */}
                    <div className="p-4 w-1/4 h-full flex flex-col justify-between bg-blue-100 rounded-lg">
                        <div className="mb-6 flex-1">
                            <h1 className="text-2xl font-bold mb-2 text-blue-600">
                                Badges
                            </h1>
                            <p className="text-lg text-gray-600 bg-slate-50 p-4 rounded-lg shadow-md">
                                Start learning to earn badges
                            </p>
                        </div>

                        {/* Scrollable Container with Topics */}
                        <div className="overflow-y-auto h-3/4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">
                                Your Learning Paths
                            </h2>
                            <div className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors">
                                System Design
                            </div>
                            <div className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors">
                                DSA
                            </div>
                            <div className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors">
                                Web Development
                            </div>
                            <div className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors">
                                Machine Learning
                            </div>
                            <div className="p-3 bg-blue-200 rounded-md mb-2 cursor-pointer hover:bg-blue-300 transition-colors">
                                Cloud Computing
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
