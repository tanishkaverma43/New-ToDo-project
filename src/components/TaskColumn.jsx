import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskColumn = ({ column, tasks, onAddTask, onTaskClick }) => {
  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return { dot: '#A78BFA', badge: 'bg-purple-100 text-purple-700' };
      case 'inProgress':
        return { dot: '#FDBA74', badge: 'bg-orange-100 text-orange-700' };
      case 'done':
        return { dot: '#6EE7B7', badge: 'bg-green-100 text-green-700' };
      default:
        return { dot: '#9CA3AF', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const colors = getColumnColor(column.id);

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span 
            className="text-base" 
            style={{ color: colors.dot }}
          >
            •
          </span>
          <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-600">
            {tasks.length}
          </span>
        </div>
        {column.id === 'todo' && (
          <button
            onClick={() => onAddTask(column.id)}
            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          >
            <Plus size={16} style={{ color: colors.dot }} />
          </button>
        )}
      </div>
      
      {/* Colored Line */}
      <div className="h-1 rounded-full mb-4" style={{ backgroundColor: colors.dot }}></div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-4 min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-gray-50 rounded-lg p-2' : ''
            }`}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
                if (!task || !task.id) return null;
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <TaskCard 
                          task={task} 
                          isDragging={snapshot.isDragging} 
                          onTaskClick={onTaskClick}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <div className="text-gray-400 text-sm text-center py-8">
                No tasks found
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;

