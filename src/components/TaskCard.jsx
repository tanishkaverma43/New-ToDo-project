import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessageSquare, FileText, MoreHorizontal, Calendar, CheckSquare2, Bell, Plus, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { isPast, isToday, differenceInDays } from 'date-fns';
import { addSubtask, updateSubtask, deleteSubtask } from '../store/slices/tasksSlice';
import firstImage from '../assets/first.png';
import secondImage from '../assets/2nd.png';
import thirdImage from '../assets/3nr.png';

const TaskCard = ({ task, isDragging, onTaskClick, dragHandleProps }) => {
  const dispatch = useDispatch();
  const [isSubtasksExpanded, setIsSubtasksExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return { bg: '#FED7AA', text: '#9A3412' };
      case 'High':
        return { bg: '#C4B5FD', text: '#5B21B6' };
      case 'Completed':
        return { bg: '#A7F3D0', text: '#065F46' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      const daysOverdue = differenceInDays(today, dueDate);
      return { 
        status: 'overdue', 
        text: `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`,
        color: 'text-red-600 bg-red-50',
        borderColor: 'border-red-300'
      };
    } else if (isToday(dueDate)) {
      return { 
        status: 'today', 
        text: 'Due today',
        color: 'text-orange-600 bg-orange-50',
        borderColor: 'border-orange-300'
      };
    } else {
      const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return { 
        status: 'upcoming', 
        text: daysUntil === 1 ? 'Due tomorrow' : `Due in ${daysUntil} days`,
        color: 'text-blue-600 bg-blue-50',
        borderColor: 'border-blue-300'
      };
    }
  };

  const handleAddSubtask = (e) => {
    e.stopPropagation();
    if (newSubtaskTitle.trim()) {
      dispatch(
        addSubtask({
          taskId: task.id,
          subtask: { title: newSubtaskTitle.trim() },
        })
      );
      setNewSubtaskTitle('');
      setShowAddInput(false);
    }
  };

  const handleToggleSubtask = (e, subtaskId, completed) => {
    e.stopPropagation();
    dispatch(
      updateSubtask({
        taskId: task.id,
        subtaskId,
        updates: { completed: !completed },
      })
    );
  };

  const handleDeleteSubtask = (e, subtaskId) => {
    e.stopPropagation();
    dispatch(
      deleteSubtask({
        taskId: task.id,
        subtaskId,
      })
    );
  };

  const toggleSubtasksExpanded = (e) => {
    e.stopPropagation();
    setIsSubtasksExpanded(!isSubtasksExpanded);
  };

  const priorityColors = getPriorityColor(task.priority);
  const dueDateInfo = getDueDateInfo();
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const subtaskProgress = subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0;

  return (
    <div
      {...(dragHandleProps || {})}
      className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all relative ${
        isDragging ? 'shadow-xl cursor-grabbing border-2 border-dashed' : 'cursor-default'
      } ${dueDateInfo?.status === 'overdue' ? 'border-l-4 border-red-500' : ''}`}
      style={isDragging ? { borderColor: '#A78BFA' } : {}}
    >
    
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="text-xs font-medium px-2 py-1 rounded"
            style={{ backgroundColor: priorityColors.bg, color: priorityColors.text }}
          >
            {task.priority}
          </span>
          {task.reminder && task.dueDate && (
            <Bell size={12} className="text-purple-600" title="Reminder enabled" />
          )}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
           
          }}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2 text-base">{task.title}</h4>

      <p className="text-sm text-[#787486] mb-4 leading-relaxed">{task.description}</p>

      {dueDateInfo && (
        <div className={`mb-3 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${dueDateInfo.color} border ${dueDateInfo.borderColor}`}>
          <Calendar size={12} />
          <span>{dueDateInfo.text}</span>
        </div>
      )}

      <div className="subtask-section mb-3" onClick={(e) => e.stopPropagation()}>
       
        {(subtasks.length > 0 || isSubtasksExpanded) && (
          <div className="mb-2">
            <button
              onClick={toggleSubtasksExpanded}
              className="w-full flex items-center justify-between text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              <div className="flex items-center gap-1">
                <CheckSquare2 size={12} />
                <span>
                  {subtasks.length > 0 
                    ? `${completedSubtasks}/${subtasks.length} subtasks`
                    : 'Subtasks'}
                </span>
                {subtasks.length > 0 && (
                  <span className="text-gray-400 ml-1">({Math.round(subtaskProgress)}%)</span>
                )}
              </div>
              {isSubtasksExpanded ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            {subtasks.length > 0 && !isSubtasksExpanded && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${subtaskProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

        {isSubtasksExpanded && (
          <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
         
            {subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-2 group hover:bg-gray-50 rounded p-1.5 -mx-1.5 transition-colors"
              >
                <button
                  onClick={(e) => handleToggleSubtask(e, subtask.id, subtask.completed)}
                  className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    subtask.completed
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {subtask.completed && <Check size={10} className="text-white" />}
                </button>
                <span
                  className={`text-xs flex-1 ${
                    subtask.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {subtask.title}
                </span>
                <button
                  onClick={(e) => handleDeleteSubtask(e, subtask.id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-100 rounded transition-all"
                >
                  <X size={12} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            ))}

            {showAddInput ? (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSubtask(e);
                    } else if (e.key === 'Escape') {
                      setShowAddInput(false);
                      setNewSubtaskTitle('');
                    }
                  }}
                  placeholder="Add subtask..."
                  autoFocus
                  className="flex-1 text-xs px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={handleAddSubtask}
                  className="px-2 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex-shrink-0"
                >
                  <Plus size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddInput(false);
                    setNewSubtaskTitle('');
                  }}
                  className="px-2 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex-shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddInput(true);
                }}
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium mt-1"
              >
                <Plus size={12} />
                Add subtask
              </button>
            )}
          </div>
        )}

        {subtasks.length === 0 && !isSubtasksExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSubtasksExpanded(true);
              setShowAddInput(true);
            }}
            className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
          >
            <Plus size={12} />
            Add subtasks
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
   
        <div className="flex -space-x-2">
          {[firstImage, secondImage, thirdImage].map((avatarImage, index) => (
            <div
              key={index}
              className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: task.assignees && task.assignees[index] ? task.assignees[index].color : '#93C5FD' }}
              title={task.assignees && task.assignees[index] ? task.assignees[index].name : `User ${index + 1}`}
            >
              <img src={avatarImage} alt={task.assignees && task.assignees[index] ? task.assignees[index].name : `User ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-[#787486]">
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{task.comments || 0} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{task.files || 0} files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

