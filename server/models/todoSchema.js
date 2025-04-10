import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    dueDate: { type: Date },
    category: { type: String, enum: ['Urgent', 'Non-Urgent'], default: 'Non-Urgent' },
}, { timestamps: true });

export const ToDo =  mongoose.model('Todo', todoSchema);