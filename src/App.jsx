import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddTaskModal from './components/AddTaskModal';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import NotificationBanner from './components/NotificationBanner';

function App() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const { isSignedIn, isLoaded } = useUser();
  const hash = window.location.hash;

  // Clear hash and redirect to home after successful authentication
  useEffect(() => {
    if (isLoaded && isSignedIn && (hash === '#/sign-in' || hash === '#/sign-up')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [isSignedIn, isLoaded, hash]);

  const handleOpenAddTaskModal = (columnId) => {
    setSelectedColumn(columnId);
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-[#FDFDFD]">
          <NotificationBanner />
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <Dashboard onAddTask={handleOpenAddTaskModal} />
          </div>
          <AddTaskModal 
            isOpen={isAddTaskModalOpen}
            onClose={handleCloseAddTaskModal}
            columnId={selectedColumn}
          />
        </div>
      </SignedIn>
      <SignedOut>
        {/* Handle routing for sign in/up pages */}
        {hash === '#/sign-up' ? (
          <SignUpPage />
        ) : (
          <SignInPage />
        )}
      </SignedOut>
    </>
  );
}

export default App;

