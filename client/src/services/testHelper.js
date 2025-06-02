/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/**
 * This file provides utility functions for testing task reminders
 * You can run these functions from the browser console
 */

class ReminderTestHelper {
    /**
     * Creates a task with a reminder set to a specific time from now
     * @param {number} minutesFromNow - Minutes from now to set the reminder (can be negative for past)
     * @returns {Object} - Task object ready to be added
     */
    createTaskWithReminder(minutesFromNow) {
        const now = new Date();
        const reminderTime = new Date(now.getTime() + minutesFromNow * 60 * 1000);

        const task = {
            title: `Test Reminder (${minutesFromNow}m)`,
            description: `This task should trigger a reminder ${minutesFromNow >= 0 ? 'in' : ''} ${Math.abs(minutesFromNow)} minutes ${minutesFromNow < 0 ? 'ago' : 'from now'}`,
            category: "Test",
            completed: false,
            reminder: {
                enabled: true,
                date: reminderTime.toISOString(),
                notified: false
            }
        };

        console.log(`Created test task with reminder at ${reminderTime.toLocaleString()}`);
        return task;
    }

    /**
     * Add test tasks with reminders at various times
     */
    async createTestTasks() {
        if (!window.TaskContext) {
            console.error("TaskContext not found. Make sure you're logged in.");
            return;
        }

        try {
            const { addTask } = React.useContext(window.TaskContext);
            if (!addTask) {
                console.error("addTask function not found in TaskContext");
                return;
            }

            console.log("Creating test tasks with various reminder times...");

            // Create tasks with reminders at different times
            await addTask(this.createTaskWithReminder(-1)); // 1 min ago
            await addTask(this.createTaskWithReminder(0));  // right now
            await addTask(this.createTaskWithReminder(1));  // 1 min from now
            await addTask(this.createTaskWithReminder(5));  // 5 mins from now

            console.log("Test tasks created successfully!");
            console.log("Now wait for the notifications to trigger");

        } catch (error) {
            console.error("Error creating test tasks:", error);
        }
    }

    /**
     * Force check for reminders now
     */
    forceCheckReminders() {
        if (!window.reminderService) {
            console.error("Reminder service not exposed. Try restarting the app.");
            return;
        }

        if (!window.TaskContext) {
            console.error("TaskContext not found. Make sure you're logged in.");
            return;
        }

        try {
            const tasks = React.useContext(window.TaskContext).tasks;
            console.log(`Force checking reminders for ${tasks.length} tasks...`);

            // Expose the reminder service for testing
            window.reminderService = window.reminderService || {};

            // Force check for reminders
            const remindedTasks = window.reminderService.checkReminders(tasks);
            console.log(`Found ${remindedTasks ? remindedTasks.length : 0} tasks to remind`);

        } catch (error) {
            console.error("Error checking reminders:", error);
        }
    }

    /**
     * Expose the reminder service for debugging
     */
    exposeReminderService() {
        // Get the service from the imports
        import('../services/reminderService').then(module => {
            window.reminderService = module.default;
            console.log("Reminder service exposed as window.reminderService");
        }).catch(err => {
            console.error("Failed to import reminder service:", err);
        });
    }
}

// Create and expose the helper
window.reminderHelper = new ReminderTestHelper();

// Print instructions
console.log("=== REMINDER TEST HELPER LOADED ===");
console.log("Available commands:");
console.log("1. reminderHelper.createTestTasks() - Create test tasks with various reminder times");
console.log("2. reminderHelper.forceCheckReminders() - Force check for reminders now");
console.log("3. reminderHelper.exposeReminderService() - Expose reminder service for debugging");
