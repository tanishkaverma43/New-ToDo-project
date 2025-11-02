import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { moveTask } from '../store/slices/tasksSlice';
import TaskColumn from './TaskColumn';
import ProjectHeader from './ProjectHeader';
import TaskDetailModal from './TaskDetailModal';
import { isSameDay, parse, isToday, startOfDay } from 'date-fns';

const Dashboard = ({ onAddTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { columns, tasks, columnOrder } = useSelector((state) => state.tasks);
  const { searchQuery, priorityFilter, dateFilter } = useSelector((state) => state.filters);

  // Filter tasks based on search, priority, and date
  const getFilteredTasks = (taskIds) => {
    let filtered = taskIds.filter((taskId) => {
      const task = tasks[taskId];
      if (!task) return false; // Safety check
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      
      // Date filtering
      let matchesDate = true;
      if (dateFilter && dateFilter !== 'All') {
        if (dateFilter === 'Today') {
          // Show tasks due today or with no due date
          if (task.dueDate) {
            const taskDueDate = new Date(task.dueDate);
            matchesDate = isToday(taskDueDate);
          } else {
            matchesDate = false; // Hide tasks without due date when filtering by Today
          }
        } else {
          // Custom date selected - parse the formatted date (e.g., "Dec 25, 2024")
          try {
            const selectedDate = parse(dateFilter, 'MMM dd, yyyy', new Date());
            if (task.dueDate) {
              const taskDueDate = startOfDay(new Date(task.dueDate));
              matchesDate = isSameDay(taskDueDate, selectedDate);
            } else {
              matchesDate = false; // Hide tasks without due date when specific date is selected
            }
          } catch (e) {
            matchesDate = true; // If parsing fails, show all tasks
          }
        }
      }
      
      return matchesSearch && matchesPriority && matchesDate;
    });

    // Sort by due date when a date filter is applied
    if (dateFilter && dateFilter !== 'All') {
      filtered.sort((taskIdA, taskIdB) => {
        const taskA = tasks[taskIdA];
        const taskB = tasks[taskIdB];
        
        // Tasks with due dates come first, then sorted by date
        if (taskA.dueDate && taskB.dueDate) {
          return new Date(taskA.dueDate) - new Date(taskB.dueDate);
        } else if (taskA.dueDate && !taskB.dueDate) {
          return -1;
        } else if (!taskA.dueDate && taskB.dueDate) {
          return 1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Map filtered indices to actual indices in the taskIds arrays
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    
    if (!sourceColumn || !destinationColumn) {
      return; // Safety check
    }
    
    // Get filtered taskIds for both columns
    const sourceFilteredTaskIds = getFilteredTasks(sourceColumn.taskIds);
    const destinationFilteredTaskIds = getFilteredTasks(destinationColumn.taskIds);
    
    // Find the actual source index in the original taskIds array
    const actualSourceIndex = sourceColumn.taskIds.indexOf(draggableId);
    
    if (actualSourceIndex === -1) {
      return; // Task not found in source column
    }
    
    // Calculate actual destination index
    let actualDestinationIndex;
    if (source.droppableId === destination.droppableId) {
      // Same column - map the filtered index to actual index
      const destTaskId = sourceFilteredTaskIds[destination.index];
      if (destTaskId) {
        actualDestinationIndex = sourceColumn.taskIds.indexOf(destTaskId);
      } else {
        actualDestinationIndex = destination.index;
      }
      // If not found, use the destination index directly
      if (actualDestinationIndex === -1) {
        actualDestinationIndex = Math.min(destination.index, sourceColumn.taskIds.length);
      }
    } else {
      // Different column
      if (destination.index < destinationFilteredTaskIds.length && destinationFilteredTaskIds[destination.index]) {
        // Place at the position of the task at destination index
        const destTaskId = destinationFilteredTaskIds[destination.index];
        actualDestinationIndex = destinationColumn.taskIds.indexOf(destTaskId);
        // If not found, append to end
        if (actualDestinationIndex === -1) {
          actualDestinationIndex = destinationColumn.taskIds.length;
        }
      } else {
        // Append to end
        actualDestinationIndex = destinationColumn.taskIds.length;
      }
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: actualSourceIndex,
        destinationIndex: actualDestinationIndex,
      })
    );
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#FDFDFD]">
      <div className="p-8">
        <ProjectHeader />
        
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-8 mt-6">
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const filteredTaskIds = getFilteredTasks(column.taskIds);
              const columnTasks = filteredTaskIds
                .map((taskId) => tasks[taskId])
                .filter((task) => task !== undefined);

              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  onAddTask={onAddTask}
                  onTaskClick={handleTaskClick}
                />
              );
            })}
          </div>
        </DragDropContext>

        {/* Task Detail Modal */}
        <TaskDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;

