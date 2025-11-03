import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from '../../utils/uuid';

const initialState = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: [],
    },
    inProgress: {
      id: 'inProgress',
      title: 'On Progress',
      taskIds: [],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  tasks: {},
  columnOrder: ['todo', 'inProgress', 'done'],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const taskId = uuidv4();
      const newTask = {
        id: taskId,
        title: task.title,
        description: task.description,
        priority: task.priority || 'Low',
        comments: 0,
        files: 0,
        assignees: task.assignees || [],
        dueDate: task.dueDate || null,
        reminder: task.reminder || false,
        subtasks: task.subtasks || [],
      };
      state.tasks[taskId] = newTask;
      state.columns[columnId].taskIds.push(taskId);
    },
    moveTask: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;

      const sourceColumn = state.columns[sourceColumnId];
      const destinationColumn = state.columns[destinationColumnId];

      if (sourceColumn.taskIds[sourceIndex] !== taskId) {
   
        const foundIndex = sourceColumn.taskIds.indexOf(taskId);
        if (foundIndex === -1) {
          return; 
        }
        
        sourceColumn.taskIds.splice(foundIndex, 1);
      } else {
    
        sourceColumn.taskIds.splice(sourceIndex, 1);
      }

      
      let actualDestinationIndex = destinationIndex;
      if (sourceColumnId === destinationColumnId && destinationIndex > sourceIndex) {
      
        actualDestinationIndex = destinationIndex - 1;
      }

     
      if (actualDestinationIndex < 0) {
        actualDestinationIndex = 0;
      } else if (actualDestinationIndex > destinationColumn.taskIds.length) {
        actualDestinationIndex = destinationColumn.taskIds.length;
      }

      destinationColumn.taskIds.splice(actualDestinationIndex, 0, taskId);
    },
    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      const index = state.columns[columnId].taskIds.indexOf(taskId);
      if (index > -1) {
        state.columns[columnId].taskIds.splice(index, 1);
      }
      delete state.tasks[taskId];
    },
    updateTask: (state, action) => {
      const { taskId, updates } = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId] = { ...state.tasks[taskId], ...updates };
      }
    },
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      if (state.tasks[taskId]) {
        if (!state.tasks[taskId].subtasks) {
          state.tasks[taskId].subtasks = [];
        }
        const subtaskId = uuidv4();
        state.tasks[taskId].subtasks.push({
          id: subtaskId,
          title: subtask.title,
          completed: false,
        });
      }
    },
    updateSubtask: (state, action) => {
      const { taskId, subtaskId, updates } = action.payload;
      if (state.tasks[taskId] && state.tasks[taskId].subtasks) {
        const subtaskIndex = state.tasks[taskId].subtasks.findIndex(
          (st) => st.id === subtaskId
        );
        if (subtaskIndex !== -1) {
          state.tasks[taskId].subtasks[subtaskIndex] = {
            ...state.tasks[taskId].subtasks[subtaskIndex],
            ...updates,
          };
        }
      }
    },
    deleteSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      if (state.tasks[taskId] && state.tasks[taskId].subtasks) {
        state.tasks[taskId].subtasks = state.tasks[taskId].subtasks.filter(
          (st) => st.id !== subtaskId
        );
      }
    },
    addComment: (state, action) => {
      const { taskId, comment, userId, userName } = action.payload;
      if (state.tasks[taskId]) {
  
        if (!state.tasks[taskId].commentsList) {
          state.tasks[taskId].commentsList = [];
        }
   
        const commentId = uuidv4();
        state.tasks[taskId].commentsList.push({
          id: commentId,
          text: comment,
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });
      
        state.tasks[taskId].comments = (state.tasks[taskId].comments || 0) + 1;
        
        if (!state.tasks[taskId].activityLog) {
          state.tasks[taskId].activityLog = [];
        }
        state.tasks[taskId].activityLog.push({
          id: uuidv4(),
          type: 'comment',
          userId,
          userName,
          message: `${userName} added a comment`,
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addTask, moveTask, deleteTask, updateTask, addSubtask, updateSubtask, deleteSubtask, addComment } = tasksSlice.actions;
export default tasksSlice.reducer;

