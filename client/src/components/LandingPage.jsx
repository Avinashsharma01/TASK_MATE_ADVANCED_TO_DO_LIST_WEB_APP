import React from "react";
import { useAuthContext } from "../context/AuthContext";
import AuthContainer from "./auth/AuthContainer";

const LandingPage = () => {
    const { isAuthenticated } = useAuthContext();

    // Features section data
    const features = [
        {
            title: "Task Management",
            description: "Create, organize, and track your tasks in one place",
            icon: "📝",
        },
        {
            title: "Categories",
            description: "Group tasks by categories for better organization",
            icon: "🗂️",
        },
        {
            title: "Due Dates",
            description: "Never miss a deadline with due date reminders",
            icon: "📅",
        },
        {
            title: "Search & Filter",
            description:
                "Quickly find tasks with powerful search and filtering",
            icon: "🔍",
        },
    ];

    // Testimonial section data
    const testimonials = [
        {
            quote: "Task Mate has completely transformed how I organize my day. I can't imagine going back to my old system!",
            author: "Alex Johnson",
            role: "Marketing Manager",
        },
        {
            quote: "Simple yet powerful. The perfect combination for a productivity tool that doesn't get in your way.",
            author: "Sam Lee",
            role: "Software Developer",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Organize Your Life with Task Mate
                            </h1>
                            <p className="text-xl mb-8">
                                The smart to-do list app that helps you stay
                                productive and focused on what matters most.
                            </p>

                            {!isAuthenticated && (
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("auth-section")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                    className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* App screenshot or illustration */}
                            <div className="bg-white p-4 rounded-lg shadow-2xl w-full max-w-md">
                                <div className="h-8 bg-gray-100 rounded-t flex items-center px-2 space-x-1">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            checked
                                            className="h-5 w-5 rounded mr-2 accent-primary"
                                            readOnly
                                        />
                                        <span className="line-through text-gray-500">
                                            Complete project proposal
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded mr-2 accent-primary"
                                            readOnly
                                        />
                                        <span>Schedule team meeting</span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded mr-2 accent-primary"
                                            readOnly
                                        />
                                        <span>Research new tools</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded mr-2 accent-primary"
                                            readOnly
                                        />
                                        <span>Send client report</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{" "}
            {/* Features Section */}
            <section id="features" className="py-16 bg-neutral">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <div className="text-3xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>{" "}
            {/* Testimonials */}
            <section id="testimonials" className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        What Our Users Say
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-neutral p-6 rounded-lg"
                            >
                                <p className="text-lg italic mb-4">
                                    "{testimonial.quote}"
                                </p>
                                <div>
                                    <p className="font-semibold">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Auth Section */}
            <section id="auth-section" className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Get Started Today
                    </h2>
                    <div className="max-w-md mx-auto">
                        <AuthContainer />
                    </div>
                </div>
            </section>
            {/* Footer */}
            <section className="bg-primary-dark text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-2">
                        Task Mate - Your Advanced To-Do List App
                    </p>
                    <p className="text-sm opacity-75">
                        © {new Date().getFullYear()} Task Mate. All rights
                        reserved.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
