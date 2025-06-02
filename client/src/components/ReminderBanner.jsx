import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

const ReminderBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const { enableReminders } = useTaskContext();
    useEffect(() => {
        // Only show the banner if:
        // 1. Browser supports notifications
        // 2. Permission isn't already granted
        const shouldShowBanner =
            "Notification" in window &&
            Notification.permission !== "granted" &&
            Notification.permission !== "denied";

        console.log("Notification permission status:", Notification.permission);
        setShowBanner(shouldShowBanner);

        // Check if permission changes after the component is mounted
        const checkPermission = () => {
            if (Notification.permission === "granted") {
                setShowBanner(false);
            }
        };

        // Check every few seconds (for testing only)
        const interval = setInterval(checkPermission, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleEnableReminders = async () => {
        const granted = await enableReminders();
        if (granted) {
            setShowBanner(false);
        }
    };

    const handleDismiss = () => {
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md shadow">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between items-center">
                    <p className="text-sm text-blue-700">
                        Enable notifications to receive reminders for your
                        tasks.
                    </p>
                    <div className="mt-3 md:mt-0 md:ml-6 flex space-x-2">
                        <button
                            onClick={handleEnableReminders}
                            className="text-sm font-medium text-blue-700 hover:text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded transition-colors"
                        >
                            Enable
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="text-sm font-medium text-gray-500 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderBanner;
