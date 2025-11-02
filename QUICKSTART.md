# ⚡ Quick Start Guide

Get the dashboard running in under 2 minutes!

## 🚀 Installation (1 minute)

```bash
# 1. Navigate to project directory
cd "creative upaay"

# 2. Install dependencies (takes ~30-60 seconds)
npm install

# 3. Start development server
npm run dev
```

That's it! The app will open at **http://localhost:3000**

## 🎯 First Steps

### 1. Explore the Dashboard
- Navigate through the three columns: **To Do**, **On Progress**, **Done**
- See pre-loaded sample tasks

### 2. Add Your First Task
- Click the **+** button on any column header
- Fill in:
  - Task Title (required)
  - Description (optional)
  - Priority (Low/High)
- Click "Add Task"

### 3. Try Drag & Drop
- Click and hold any task card
- Drag it to another column
- Release to drop
- Notice the smooth animation!

### 4. Use Search
- Type in the search bar at the top
- Watch tasks filter in real-time
- Try searching: "Brainstorming" or "Design"

### 5. Filter by Priority
- Click "Filter" dropdown in the project header
- Select a priority: Low, High, or Completed
- See filtered results

### 6. Test Persistence
- Add some tasks
- Move them around
- Refresh the page (F5)
- Everything is still there! ✨

## 🎨 Key Features to Try

| Feature | How to Use |
|---------|-----------|
| **Add Task** | Click + button in column header |
| **Drag & Drop** | Click and drag task cards |
| **Search** | Type in top search bar |
| **Filter** | Use Filter dropdown |
| **Move Tasks** | Drag between columns |
| **View Details** | Hover over task cards |

## 🔥 Pro Tips

1. **Fast Task Creation**: Use Tab key to navigate form fields
2. **Quick Search**: Start typing immediately after page load
3. **Bulk Organization**: Add multiple tasks, then drag them to organize
4. **Priority Colors**: 
   - 🟢 Green = Low
   - 🔴 Red = High
   - 🟢 Emerald = Completed

## 📱 Mobile Testing

```bash
# Find your local IP (for mobile testing)
# Windows:
ipconfig

# Mac/Linux:
ifconfig

# Access from phone:
# http://YOUR_IP:3000
```

## 🛠️ Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing?
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors?
```bash
# Ensure Node.js version 16+
node --version

# Update npm
npm install -g npm@latest
```

## 📦 Project Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Check code quality
npm run format       # Format code with Prettier
```

## 🎯 What to Show in Your Demo

1. ✅ UI matches design
2. ✅ Create new task
3. ✅ Drag task between columns
4. ✅ Search functionality
5. ✅ Filter by priority
6. ✅ Refresh page - data persists
7. ✅ Responsive on mobile

## 📹 Recording Your Demo

### Recommended Tools:
- **Windows**: Xbox Game Bar (Win + G)
- **Mac**: QuickTime Screen Recording
- **Cross-platform**: OBS Studio (free)

### What to Show (2-3 minutes):
1. Load the dashboard
2. Show all three columns with tasks
3. Create a new task
4. Drag a task from one column to another
5. Use the search feature
6. Use the priority filter
7. Refresh the page
8. Show that data persisted

## 🌐 Deploy in 5 Minutes

### Vercel (Easiest):
```bash
npm install -g vercel
vercel login
vercel
```
Follow prompts → Get live URL!

### Netlify:
```bash
npm run build
```
Go to [netlify.com/drop](https://app.netlify.com/drop)
Drag `dist` folder → Instant deploy!

## ✨ Sample Data

The app comes pre-loaded with sample tasks:
- 2 tasks in "To Do"
- 3 tasks in "On Progress"
- 2 tasks in "Done"

Feel free to modify or delete them!

## 🎓 Next Steps

1. ✅ Get it running locally
2. ✅ Explore all features
3. ✅ Record demonstration video
4. ✅ Deploy to Vercel/Netlify
5. ✅ Submit GitHub repository
6. ✅ Submit live URL
7. ✅ Submit video demonstration

## 📚 More Information

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Assignment Details**: See `ASSIGNMENT_COMPLETION.md`

## 🆘 Need Help?

Common issues and solutions:
- **Nothing appears**: Check console for errors (F12)
- **Search not working**: Type slowly, it's instant
- **Drag not working**: Try refreshing the page
- **Tasks disappear**: Check filter settings

## 🎉 You're Ready!

The dashboard is now running and ready for demonstration.

**Time to complete setup:** ~2 minutes
**Time to explore features:** ~5 minutes
**Total time to full demo:** ~7 minutes

Happy Demonstrating! 🚀

---

*Need more help? Check README.md for detailed documentation.*

