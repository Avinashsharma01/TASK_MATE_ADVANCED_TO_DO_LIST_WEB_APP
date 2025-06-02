import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }, reminder: {
    date: {
      type: Date,  // Use Date type explicitly
      get: function (date) {
        // When retrieving, ensure we get a proper date
        return date ? new Date(date) : null;
      }
    },
    enabled: {
      type: Boolean,
      default: false
    },
    notified: {
      type: Boolean,
      default: false
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task; 