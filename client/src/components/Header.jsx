import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
    const { user, logout, isAuthenticated } = useAuthContext();

    // Landing page navigation items
    const navItems = [
        { label: "Features", target: "#features" },
        { label: "Testimonials", target: "#testimonials" },
        { label: "Get Started", target: "#auth-section" },
    ];

    return (
        <header
            className={`${
                isAuthenticated
                    ? "bg-primary"
                    : "bg-transparent absolute w-full z-10"
            } text-white py-6`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Task Mate
                        </h1>
                        <p className="text-primary-light">
                            Manage your tasks with ease
                        </p>
                    </div>

                    <div>
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden md:block bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <span className="text-sm">
                                        Welcome, {user.username}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <nav className="flex items-center">
                                <ul className="hidden md:flex space-x-8">
                                    {navItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.target}
                                                className="hover:text-white/80 transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document
                                                        .querySelector(
                                                            item.target
                                                        )
                                                        ?.scrollIntoView({
                                                            behavior: "smooth",
                                                        });
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("auth-section")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                    className="ml-8 bg-white text-primary font-medium py-2 px-4 rounded hover:bg-white/90 transition-colors"
                                >
                                    Log In
                                </button>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
