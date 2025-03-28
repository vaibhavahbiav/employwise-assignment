import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth < 770) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
    })

    return (
        <div className="min-h-screen bg-gray-100 flex shadow-lg shadow-orange-500 rounded-lg">
            <div
                className={`${isSidebarOpen ? "w-64" : "w-16"
                    } bg-orange-500 text-gray-200 transition-all duration-300 p-4 fixed h-full flex flex-col`}
            >
                <div className="flex justify-around items-center mb-8">
                    <h1 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>
                        {window.innerWidth < 770 ? 'EmployWise' : 'EmployWise Dashboard'}
                    </h1>
                    <button
                        className="text-gray-200 md:hidden"
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? "Close" : "Open"}
                    </button>
                </div>

                <Link
                    to="info"
                    className={`${isSidebarOpen ? "block" : "text-center"
                        } p-2 mb-4 text-gray-200 hover:bg-orange-400 rounded-lg group relative overflow-clip`}
                >
                    <span className="before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-gray-200 before:bottom-2 before:-left-[100%] group-hover:before:left-[100%] group-hover:before:transition-all group-hover:before:duration-1000">{isSidebarOpen ? "Info" : "I"}</span>
                </Link>
                <Link
                    to="users"
                    className={`${isSidebarOpen ? "block" : "text-center"
                        } p-2 mb-4 text-gray-200 hover:bg-orange-400 rounded-lg group relative overflow-clip`}
                >
                    <span className="before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-gray-200 before:bottom-2 before:-left-[100%] group-hover:before:left-[100%] group-hover:before:transition-all group-hover:before:duration-1000">{isSidebarOpen ? "Users" : "U"}</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className={`${isSidebarOpen ? "block" : "text-center"
                        } p-2 bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-gray-200 rounded-lg`}
                >
                    {isSidebarOpen ? "Logout" : "L"}
                </button>
            </div>

            <div className="flex-1 ml-16 md:ml-64 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
