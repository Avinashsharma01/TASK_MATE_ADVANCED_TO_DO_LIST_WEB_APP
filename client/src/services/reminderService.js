// Reminder Service - Handles checking and displaying reminders
import { updateTask } from './api';

class ReminderService {
    constructor() {
        this.checkIntervalId = null;
        this.hasPermission = false;
    }

    // Request notification permissions
    async requestPermission() {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
            return false;
        }

        if (Notification.permission === "granted") {
            this.hasPermission = true;
            return true;
        }

        if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === "granted";
            return this.hasPermission;
        }

        return false;
    }    // Check for tasks that need reminders
    checkReminders(tasks) {
        if (!this.hasPermission) {
            console.log("Reminder check skipped: No notification permission");
            return;
        }

        if (!tasks || tasks.length === 0) {
            console.log("No tasks available to check for reminders");
            return [];
        }

        console.log(`Checking reminders for ${tasks.length} tasks at ${new Date().toLocaleTimeString()}`);

        const now = new Date();
        const tasksToRemind = tasks.filter(task => {
            // Only check non-completed tasks with enabled reminders that haven't been notified
            if (
                !task.completed &&
                task.reminder &&
                task.reminder.enabled &&
                task.reminder.date &&
                !task.reminder.notified
            ) {                // Handle potential date parsing issues
                let reminderTime;
                try {
                    // First, extract raw date value regardless of format
                    let dateValue = task.reminder.date;

                    // Log the raw reminder date for debugging
                    console.log(`Raw reminder date value: ${JSON.stringify(dateValue)}`);

                    // Handle different date formats from MongoDB/server
                    if (typeof dateValue === 'object' && dateValue.$date) {
                        // MongoDB extended JSON format
                        dateValue = dateValue.$date;
                    }

                    // Create a date object ignoring timezone for comparison
                    if (typeof dateValue === 'string') {
                        // If it's an ISO string, parse it
                        reminderTime = new Date(dateValue);
                    } else if (dateValue instanceof Date) {
                        reminderTime = dateValue;
                    } else {
                        // Try as timestamp
                        reminderTime = new Date(Number(dateValue));
                    }

                    // If still invalid, try other approaches
                    if (isNaN(reminderTime.getTime())) {
                        console.warn(`Invalid date detected, trying alternative parsing: ${dateValue}`);
                        // Last resort - try parsing as string
                        reminderTime = new Date(String(dateValue));
                    }
                } catch (error) {
                    console.error("Error parsing reminder date:", error);
                    console.error("Problem with date value:", task.reminder.date);
                    return false;
                }

                // Log information to help debug with full timezone info
                console.log(`Task "${task.title}" reminder time: ${reminderTime.toLocaleString()} (${reminderTime.toISOString()})`);
                console.log(`Current time: ${now.toLocaleString()} (${now.toISOString()})`);

                // Compare only the relevant parts (year, month, day, hours, minutes)
                const reminderYear = reminderTime.getFullYear();
                const reminderMonth = reminderTime.getMonth();
                const reminderDay = reminderTime.getDate();
                const reminderHour = reminderTime.getHours();
                const reminderMinute = reminderTime.getMinutes();

                const nowYear = now.getFullYear();
                const nowMonth = now.getMonth();
                const nowDay = now.getDate();
                const nowHour = now.getHours();
                const nowMinute = now.getMinutes();

                // First check if date (year, month, day) matches
                const dateMatches =
                    reminderYear === nowYear &&
                    reminderMonth === nowMonth &&
                    reminderDay === nowDay;

                // Then check if time is within range
                let timeInRange = false;
                if (dateMatches) {
                    // Calculate time difference in minutes
                    const reminderMinuteOfDay = reminderHour * 60 + reminderMinute;
                    const nowMinuteOfDay = nowHour * 60 + nowMinute;
                    const diffMinutes = Math.abs(reminderMinuteOfDay - nowMinuteOfDay);

                    console.log(`Minute of day - Reminder: ${reminderMinuteOfDay}, Now: ${nowMinuteOfDay}, Diff: ${diffMinutes}`);
                    timeInRange = diffMinutes <= 5; // 5 minute window for testing
                }

                const shouldNotify = dateMatches && timeInRange;
                console.log(`Should notify for "${task.title}": ${shouldNotify} (Date match: ${dateMatches}, Time in range: ${timeInRange})`);

                return shouldNotify;
            }
            return false;
        });

        // Send notifications for each task that needs a reminder
        tasksToRemind.forEach(task => {
            this.showNotification(task);
            this.markAsNotified(task._id);
        });

        return tasksToRemind;
    }    // Show a browser notification for a task
    showNotification(task) {
        if (!this.hasPermission) {
            console.log("Cannot show notification: permission not granted");
            return;
        }

        if (!task || !task.title) {
            console.error("Cannot show notification: invalid task", task);
            return;
        }

        try {
            console.log(`Showing notification for task: ${task.title}`);

            const title = `Task Reminder: ${task.title}`;
            const options = {
                body: task.description || 'It\'s time for your task!',
                icon: '/vite.svg', // Use your app logo
                badge: '/vite.svg',
                requireInteraction: true, // Keep notification visible until user interaction
                timestamp: new Date().getTime()
            };

            const notification = new Notification(title, options);

            // Handle notification click
            notification.onclick = function () {
                console.log("Notification clicked");
                window.focus();
                notification.close();
            };

            notification.onshow = function () {
                console.log("Notification shown to user");
            };

            notification.onerror = function (err) {
                console.error("Notification error:", err);
            };
        } catch (error) {
            console.error("Error showing notification:", error);
        }
    }    // Mark a task as having been notified
    async markAsNotified(taskId) {
        try {
            console.log(`Marking task ${taskId} as notified`);
            // We need to use a proper update that won't remove existing reminder data
            await updateTask(taskId, {
                "reminder.notified": true
            });
            console.log(`Task ${taskId} marked as notified successfully`);
        } catch (error) {
            console.error("Failed to update reminder status:", error);
        }
    }    // Start the reminder service
    start(getTasks) {
        if (this.checkIntervalId) {
            console.log("Reminder service already running, not starting again");
            return;
        }

        console.log("Starting reminder service...");

        // Verify we got a valid function to get tasks
        if (typeof getTasks !== 'function') {
            console.error("Invalid getTasks parameter, expected a function");
            return;
        }

        // Use a wrapped getter to catch errors
        const safeGetTasks = () => {
            try {
                const tasks = getTasks();
                if (!Array.isArray(tasks)) {
                    console.error("getTasks did not return an array:", tasks);
                    return [];
                }
                return tasks;
            } catch (error) {
                console.error("Error getting tasks:", error);
                return [];
            }
        };

        // Do an initial check immediately
        const tasks = safeGetTasks();
        console.log(`Initial reminder check with ${tasks ? tasks.length : 0} tasks`);
        if (tasks && tasks.length) {
            this.checkReminders(tasks);
        }

        // Set a more frequent interval for checking reminders
        this.checkIntervalId = setInterval(() => {
            // Get latest tasks and check for reminders
            const tasks = safeGetTasks();
            console.log(`Checking reminders at ${new Date().toLocaleTimeString()} with ${tasks ? tasks.length : 0} tasks`);
            if (tasks && tasks.length) {
                this.checkReminders(tasks);
            }
        }, 10000); // Check every 10 seconds (more frequent for testing)
    }

    // Stop the reminder service
    stop() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = null;
        }
    }
}

// Export as a singleton
export default new ReminderService();
