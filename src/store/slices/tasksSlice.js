import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from '../../utils/uuid';

const initialState = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    inProgress: {
      id: 'inProgress',
      title: 'On Progress',
      taskIds: ['task-3', 'task-4', 'task-5'],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-6', 'task-7'],
    },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
    'task-2': {
      id: 'task-2',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      priority: 'High',
      comments: 10,
      files: 3,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '4', name: 'User 4', avatar: '👩‍🎨', color: '#95E1D3' },
      ],
    },
    'task-3': {
      id: 'task-3',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
    'task-4': {
      id: 'task-4',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
    'task-5': {
      id: 'task-5',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
    'task-6': {
      id: 'task-6',
      title: 'Brainstorming',
      description: 'Brainstorming brings team members\' diverse experience into play.',
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
    'task-7': {
      id: 'task-7',
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before.',
      priority: 'Completed',
      comments: 12,
      files: 15,
      assignees: [
        { id: '1', name: 'User 1', avatar: '👨‍💼', color: '#FF6B6B' },
        { id: '2', name: 'User 2', avatar: '👩‍💼', color: '#4ECDC4' },
        { id: '3', name: 'User 3', avatar: '👨‍💻', color: '#FFD93D' },
      ],
    },
  },
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

      // Verify the task exists in the source column at the expected index
      if (sourceColumn.taskIds[sourceIndex] !== taskId) {
        // If not at expected index, try to find it
        const foundIndex = sourceColumn.taskIds.indexOf(taskId);
        if (foundIndex === -1) {
          return; // Task not found in source column
        }
        // Remove from found index instead
        sourceColumn.taskIds.splice(foundIndex, 1);
      } else {
        // Remove from source column using the provided index
        sourceColumn.taskIds.splice(sourceIndex, 1);
      }

      // Adjust destination index if moving within the same column
      let actualDestinationIndex = destinationIndex;
      if (sourceColumnId === destinationColumnId && destinationIndex > sourceIndex) {
        // Moving down within the same column - adjust index since we removed an item
        actualDestinationIndex = destinationIndex - 1;
      }

      // Ensure destination index is within bounds
      if (actualDestinationIndex < 0) {
        actualDestinationIndex = 0;
      } else if (actualDestinationIndex > destinationColumn.taskIds.length) {
        actualDestinationIndex = destinationColumn.taskIds.length;
      }

      // Add to destination column
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
        // Initialize comments array if it doesn't exist
        if (!state.tasks[taskId].commentsList) {
          state.tasks[taskId].commentsList = [];
        }
        // Add the comment
        const commentId = uuidv4();
        state.tasks[taskId].commentsList.push({
          id: commentId,
          text: comment,
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });
        // Update comment count
        state.tasks[taskId].comments = (state.tasks[taskId].comments || 0) + 1;
        // Add to activity log if it exists
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

