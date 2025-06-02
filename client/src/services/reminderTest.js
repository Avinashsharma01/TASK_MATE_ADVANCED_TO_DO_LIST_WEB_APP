// This file is for testing the reminder functionality
// Run this script from the browser console to test reminders

class ReminderTester {
    constructor() {
        this.taskToTest = null;
    }

    createTestTask() {
        // Create a task with reminder set to 1 minute in the future
        const now = new Date();
        const reminderDate = new Date(now.getTime() + 1 * 60 * 1000); // 1 minute from now

        console.log("Creating test task with reminder:", reminderDate);

        // This simulates what TaskForm.jsx creates
        return {
            title: "Test Reminder Task",
            description: "This is a test task for reminders",
            dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            category: "Test",
            completed: false,
            reminder: {
                enabled: true,
                date: reminderDate,
                notified: false
            }
        };
    }

    testNotificationPermission() {
        if (!("Notification" in window)) {
            console.error("This browser does not support notifications");
            return false;
        }

        console.log("Current notification permission:", Notification.permission);

        if (Notification.permission === "granted") {
            console.log("✅ Notification permission already granted");
            return true;
        }

        if (Notification.permission !== "denied") {
            console.log("❓ Requesting notification permission...");
            Notification.requestPermission().then(permission => {
                console.log("Permission result:", permission);
            });
        } else {
            console.error("❌ Notification permission denied. Please reset permissions for this site.");
        }
    }

    showTestNotification() {
        if (Notification.permission !== "granted") {
            console.error("Cannot show test notification - permission not granted");
            return;
        }

        const notification = new Notification("Test Notification", {
            body: "This is a test notification from the ReminderTester",
            icon: "/vite.svg",
            requireInteraction: true
        });

        console.log("✅ Test notification displayed");

        notification.onclick = () => {
            console.log("Notification clicked");
            notification.close();
        };
    }    // Analyze existing tasks in the system
    analyzeExistingTasks() {
        if (!window.TaskContext) {
            console.error("TaskContext not available. Make sure you're logged in.");
            return;
        }

        try {
            const tasks = window.TaskContext._currentValue.tasks;
            console.log(`Found ${tasks.length} tasks in the system`);

            // Filter tasks with reminders
            const tasksWithReminders = tasks.filter(task =>
                task.reminder && task.reminder.enabled && task.reminder.date
            );

            console.log(`Found ${tasksWithReminders.length} tasks with reminders`);

            // Analyze each reminder
            tasksWithReminders.forEach(task => {
                const now = new Date();
                let reminderDate;

                try {
                    reminderDate = new Date(task.reminder.date);
                    const timeDiff = (now - reminderDate) / (1000 * 60); // diff in minutes

                    console.log(`Task: "${task.title}"`);
                    console.log(`  Reminder date: ${reminderDate.toLocaleString()}`);
                    console.log(`  Current time: ${now.toLocaleString()}`);
                    console.log(`  Time difference: ${timeDiff.toFixed(2)} minutes`);
                    console.log(`  Notified: ${task.reminder.notified}`);
                    console.log(`  Raw reminder data: ${JSON.stringify(task.reminder)}`);

                    // Check if the reminder should fire soon
                    if (timeDiff >= -2 && timeDiff < 2) {
                        console.log("  🔔 This reminder should fire soon!");
                    } else if (timeDiff > 2) {
                        console.log("  ⏰ This reminder is in the past");
                    } else {
                        console.log(`  ⏳ This reminder will fire in ${Math.abs(timeDiff).toFixed(0)} minutes`);
                    }
                } catch (error) {
                    console.error(`  Error processing reminder for task "${task.title}":`, error);
                    console.log(`  Raw reminder data: ${JSON.stringify(task.reminder)}`);
                }

                console.log("-------------------------------------------");
            });
        } catch (error) {
            console.error("Error analyzing tasks:", error);
        }
    }

    runAllTests() {
        console.log("=== REMINDER TESTER ===");
        console.log("Running through all reminder tests...");

        // Test 1: Check browser support
        console.log("Test 1: Checking browser support for notifications");
        if (!("Notification" in window)) {
            console.error("❌ Test 1: This browser does not support notifications");
            return;
        }
        console.log("✅ Test 1: Browser supports notifications");

        // Test 2: Check permission
        console.log("Test 2: Checking notification permission");
        this.testNotificationPermission();

        // Test 3: Try showing a notification
        console.log("Test 3: Trying to show a test notification");
        if (Notification.permission === "granted") {
            this.showTestNotification();
        } else {
            console.log("⚠️ Test 3: Cannot test notification display without permission");
        }

        // Test 4: Create a task with reminder
        console.log("Test 4: Creating a test task with reminder");
        this.taskToTest = this.createTestTask();
        console.log("Task created:", this.taskToTest);

        // Test 5: Analyze existing tasks
        console.log("Test 5: Analyzing existing tasks");
        this.analyzeExistingTasks();

        console.log("=== TESTS COMPLETE ===");
        console.log("To add the test task to your tasks list, run:");
        console.log("const { addTask } = React.useContext(window.TaskContext); addTask(reminderTester.taskToTest);");
    }
}

// Create and expose the tester globally
window.reminderTester = new ReminderTester();

console.log("=== REMINDER TESTER LOADED ===");
console.log("Run 'reminderTester.runAllTests()' to test reminder functionality");
