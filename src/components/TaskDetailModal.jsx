import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, MessageSquare, Paperclip, Calendar, Send, Bell, Edit2, Save } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { addComment, updateTask } from '../store/slices/tasksSlice';
import ActivityLog from './ActivityLog';
import SubtaskManager from './SubtaskManager';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedReminder, setEditedReminder] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
 
  const currentTask = task ? tasks[task.id] || task : null;

  if (!isOpen || !currentTask) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-700';
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(
        addComment({
          taskId: currentTask.id,
          comment: comment.trim(),
          userId: '1',
          userName: 'Current User',
        })
      );
      setComment('');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setComment('');
      setIsEditingDueDate(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentTask) {
      setEditedDueDate(currentTask.dueDate || '');
      setEditedReminder(currentTask.reminder || false);
    }
  }, [currentTask]);

  const handleSaveDueDate = () => {
    if (currentTask) {
      dispatch(
        updateTask({
          taskId: currentTask.id,
          updates: {
            dueDate: editedDueDate || null,
            reminder: editedReminder,
          },
        })
      );
      setIsEditingDueDate(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
     
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(currentTask.priority)}`}>
                  {currentTask.priority}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentTask.title}</h2>
              {currentTask.description && (
                <p className="text-gray-600 mb-4">{currentTask.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        
            <div className="flex items-center gap-2">
              {isEditingDueDate ? (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded border border-gray-300">
                  <Calendar size={16} className="text-gray-500" />
                  <input
                    type="date"
                    value={editedDueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                    className="text-sm border-none bg-transparent focus:outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedReminder}
                      onChange={(e) => setEditedReminder(e.target.checked)}
                      className="w-3 h-3"
                    />
                    <Bell size={12} className="text-purple-600" />
                  </label>
                  <button
                    onClick={handleSaveDueDate}
                    className="p-1 hover:bg-green-100 rounded transition-colors"
                    title="Save"
                  >
                    <Save size={14} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingDueDate(false);
                      setEditedDueDate(currentTask.dueDate || '');
                      setEditedReminder(currentTask.reminder || false);
                    }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Cancel"
                  >
                    <X size={14} className="text-red-600" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {currentTask.dueDate ? (
                    <div className={`flex items-center gap-2 px-3 py-1 rounded ${
                      isPast(new Date(currentTask.dueDate)) && !isToday(new Date(currentTask.dueDate))
                        ? 'bg-red-100 text-red-700'
                        : isToday(new Date(currentTask.dueDate))
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      <Calendar size={16} />
                      <span>
                        Due: {format(new Date(currentTask.dueDate), 'MMM dd, yyyy')}
                        {isPast(new Date(currentTask.dueDate)) && !isToday(new Date(currentTask.dueDate)) && ' (Overdue)'}
                        {isToday(new Date(currentTask.dueDate)) && ' (Today)'}
                      </span>
                      {currentTask.reminder && (
                        <Bell size={14} className="text-purple-600" title="Reminder enabled" />
                      )}
                      <button
                        onClick={() => setIsEditingDueDate(true)}
                        className="ml-1 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
                        title="Edit due date"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingDueDate(true)}
                      className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Calendar size={16} />
                      <span>Add due date</span>
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>{currentTask.comments || 0} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <Paperclip size={16} />
              <span>{currentTask.files || 0} files</span>
            </div>
          </div>

          {currentTask.assignees && currentTask.assignees.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Assignees</h3>
              <div className="flex -space-x-2">
                {currentTask.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm"
                    style={{ backgroundColor: assignee.color }}
                    title={assignee.name}
                  >
                    {assignee.avatar}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      
        <div className="p-6 space-y-6">
     
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Subtasks</h3>
            <SubtaskManager task={currentTask} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Comment</h3>
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                <span>Post Comment</span>
              </button>
            </form>
          </div>

    
          <div className="border-t border-gray-200 pt-6">
            <ActivityLog activityLog={currentTask.activityLog || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;

