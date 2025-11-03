import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, X, Check } from 'lucide-react';
import { addSubtask, updateSubtask, deleteSubtask } from '../store/slices/tasksSlice';

const SubtaskManager = ({ task }) => {
  const dispatch = useDispatch();
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const subtasks = task.subtasks || [];

  const handleAddSubtask = () => {
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

  const handleToggleSubtask = (subtaskId, completed) => {
    dispatch(
      updateSubtask({
        taskId: task.id,
        subtaskId,
        updates: { completed: !completed },
      })
    );
  };

  const handleDeleteSubtask = (subtaskId) => {
    dispatch(
      deleteSubtask({
        taskId: task.id,
        subtaskId,
      })
    );
  };

  const completedCount = subtasks.filter((st) => st.completed).length;
  const progressPercentage = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div>
     
      {subtasks.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">
              Subtasks ({completedCount}/{subtasks.length})
            </span>
            <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

     
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2 group hover:bg-gray-50 rounded p-1 -mx-1"
          >
            <button
              onClick={() => handleToggleSubtask(subtask.id, subtask.completed)}
              className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                subtask.completed
                  ? 'bg-purple-600 border-purple-600'
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              {subtask.completed && <Check size={10} className="text-white" />}
            </button>
            <span
              className={`text-sm flex-1 ${
                subtask.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-700'
              }`}
            >
              {subtask.title}
            </span>
            <button
              onClick={() => handleDeleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
            >
              <X size={14} className="text-gray-500 hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>

     
      {showAddInput ? (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSubtask();
              } else if (e.key === 'Escape') {
                setShowAddInput(false);
                setNewSubtaskTitle('');
              }
            }}
            placeholder="Add subtask..."
            autoFocus
            className="flex-1 text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleAddSubtask}
            className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => {
              setShowAddInput(false);
              setNewSubtaskTitle('');
            }}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddInput(true)}
          className="mt-2 flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          <Plus size={14} />
          Add subtask
        </button>
      )}
    </div>
  );
};

export default SubtaskManager;

