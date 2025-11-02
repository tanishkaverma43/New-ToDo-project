# Project Management Dashboard

## 🎯 Creative Upaay Full Stack Development Assignment

A modern, responsive project management dashboard built with React, Redux, and Tailwind CSS. This application provides an intuitive Kanban-style interface for managing tasks across different stages of completion.

![Dashboard Preview](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-cyan)

## ✨ Features

### Level 1 (Core Features) - ✅ Implemented

1. **Dashboard UI Implementation**
   - Pixel-perfect replication of the Figma design
   - Responsive layout with three columns: To Do, On Progress, and Done
   - Modern, clean interface with professional styling

2. **Task Management**
   - ➕ Add new tasks with title, description, and priority
   - 🔄 Move tasks between different stages
   - 🎨 Visual task cards with priority badges
   - 👥 Team member avatars on tasks
   - 💬 Comment and file counters

3. **Drag and Drop Functionality** (BONUS) ✅
   - Smooth drag-and-drop between columns
   - Visual feedback during dragging
   - Maintains task order within columns

4. **Advanced Filtering**
   - 🔍 Real-time search across task titles and descriptions
   - 🏷️ Priority-based filtering (All, Low, High, Completed)
   - Instant results with no lag

5. **State Management with Redux**
   - Centralized state management using Redux Toolkit
   - 💾 Automatic persistence to Local Storage
   - State survives page refreshes
   - Clean, maintainable Redux architecture

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2
- **State Management:** Redux Toolkit 2.0
- **Styling:** Tailwind CSS 3.4
- **Drag & Drop:** react-beautiful-dnd 13.1
- **Icons:** lucide-react
- **Build Tool:** Vite 5.0
- **Language:** JavaScript (ES6+)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd creative-upaay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
creative-upaay/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProjectHeader.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskCard.jsx
│   │   └── AddTaskModal.jsx
│   ├── store/           # Redux store configuration
│   │   ├── store.js
│   │   └── slices/
│   │       ├── tasksSlice.js
│   │       └── filtersSlice.js
│   ├── utils/           # Utility functions
│   │   ├── localStorage.js
│   │   └── uuid.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎮 How to Use

### Adding a New Task

1. Click the **"+"** button in any column header (To Do, On Progress, or Done)
2. Fill in the task details:
   - **Task Title** (required)
   - **Description** (optional)
   - **Priority** (Low or High)
3. Click "Add Task"

### Moving Tasks

**Method 1: Drag and Drop**
- Click and hold on a task card
- Drag it to the desired column
- Release to drop

**Method 2: Using Redux Actions**
- Tasks automatically save their position
- Changes persist after page refresh

### Filtering Tasks

**Search:**
- Use the search bar in the header to filter by task title or description
- Results update in real-time

**Priority Filter:**
- Click the "Filter" dropdown in the project header
- Select priority level: All, Low, High, or Completed
- View filtered results instantly

### Projects Sidebar

- Navigate between different projects
- View project list with color indicators
- Access navigation menu (Home, Messages, Tasks, Members, Settings)

## 🏗️ Architecture & Design Decisions

### State Management

**Redux Toolkit** was chosen for several reasons:
- Simplified Redux logic with less boilerplate
- Built-in immer for immutable updates
- Excellent TypeScript support (future-proof)
- Easy integration with persistence middleware

### Local Storage Persistence

The application uses a custom middleware pattern to:
- Automatically save state on every Redux action
- Load persisted state on application mount
- Handle errors gracefully with fallback to default state

### Component Structure

Components follow these principles:
- **Single Responsibility:** Each component has one clear purpose
- **Composition:** Small, reusable components
- **Props Drilling Avoidance:** Redux for global state
- **Performance:** React.memo for expensive renders (when needed)

### Styling Approach

Tailwind CSS was selected because:
- Rapid development with utility classes
- Consistent design system
- Small production bundle size
- Easy customization via config file

## 🎨 UI/UX Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Smooth Animations:** CSS transitions for all interactive elements
- **Visual Feedback:** Hover states, active states, and loading indicators
- **Accessibility:** Semantic HTML and ARIA labels
- **Modern Look:** Clean, professional interface matching Figma design

## 📊 Redux Store Structure

```javascript
{
  tasks: {
    columns: {
      todo: { id, title, taskIds[] },
      inProgress: { id, title, taskIds[] },
      done: { id, title, taskIds[] }
    },
    tasks: {
      [taskId]: {
        id, title, description, priority,
        comments, files, assignees[]
      }
    },
    columnOrder: []
  },
  filters: {
    searchQuery: "",
    priorityFilter: "All",
    currentProject: "Mobile App"
  }
}
```

## 🔧 Configuration

### Tailwind Configuration

Custom colors and theme settings can be modified in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* purple shades */ }
    }
  }
}
```

### Vite Configuration

Development server settings in `vite.config.js`:
- Port: 3000
- Auto-open browser
- Hot Module Replacement (HMR)

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Add tasks in each column
- [ ] Drag tasks between columns
- [ ] Use search to filter tasks
- [ ] Use priority filter
- [ ] Refresh page and verify data persistence
- [ ] Test responsive design on different screen sizes

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify Drop
3. Or connect your GitHub repository for automatic deployments

### Deploy to Render

1. Create a new Web Service
2. Connect your repository
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📝 Assignment Completion Checklist

- [x] ✅ UI matches Figma design
- [x] ✅ Three-column dashboard layout
- [x] ✅ Add new tasks functionality
- [x] ✅ Move tasks between columns
- [x] ✅ Task filtering by search
- [x] ✅ Task filtering by priority
- [x] ✅ Redux state management
- [x] ✅ Local Storage persistence
- [x] ✅ Drag and drop (BONUS)
- [x] ✅ Clean, maintainable code
- [x] ✅ Responsive design

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Modern React development patterns
- State management with Redux Toolkit
- CSS-in-JS with Tailwind CSS
- Drag and drop interactions
- Local storage and data persistence
- Component composition
- Responsive web design

## 🤝 Contributing

This is an assignment project, but suggestions and feedback are welcome!

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📄 License

This project is created for the Creative Upaay Full Stack Development Assignment.

## 🙏 Acknowledgments

- Figma design provided by Creative Upaay
- Icons by Lucide React
- UI inspiration from modern project management tools

---

**Note:** This application was built as part of the Creative Upaay Full Stack Development Assignment. All Level 1 requirements including the bonus drag-and-drop feature have been successfully implemented.

### Video Demonstration

[Link to video demonstration will be added here]

### Live Demo

[Link to deployed application will be added here]

## 📞 Support

For any questions or issues, please create an issue in the repository or contact the developer.

---

Made with ❤️ for Creative Upaay Assignment

