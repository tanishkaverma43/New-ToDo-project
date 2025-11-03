import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, X, Clock } from 'lucide-react';
import { format, isPast, isToday, differenceInDays, differenceInHours } from 'date-fns';

const NotificationBanner = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const [notifications, setNotifications] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(new Set());

  useEffect(() => {
    const checkDueDates = () => {
      const now = new Date();
      const newNotifications = [];

      Object.values(tasks).forEach((task) => {
        if (!task.dueDate || !task.reminder || dismissedIds.has(task.id)) {
          return;
        }

        const dueDate = new Date(task.dueDate);
        
        if (isPast(dueDate) && !isToday(dueDate)) {
       
          const daysOverdue = differenceInDays(now, dueDate);
          newNotifications.push({
            id: task.id,
            type: 'overdue',
            message: `"${task.title}" is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`,
            taskId: task.id,
          });
        } else if (isToday(dueDate)) {
          
          newNotifications.push({
            id: task.id,
            type: 'due-today',
            message: `"${task.title}" is due today!`,
            taskId: task.id,
          });
        } else {
          const hoursUntilDue = differenceInHours(dueDate, now);
          if (hoursUntilDue <= 24 && hoursUntilDue > 0) {
            
            newNotifications.push({
              id: task.id,
              type: 'due-soon',
              message: `"${task.title}" is due in ${hoursUntilDue} hour${hoursUntilDue > 1 ? 's' : ''}`,
              taskId: task.id,
            });
          }
        }
      });

    
      newNotifications.sort((a, b) => {
        const priority = { overdue: 3, 'due-today': 2, 'due-soon': 1 };
        return (priority[b.type] || 0) - (priority[a.type] || 0);
      });

      setNotifications(newNotifications);
    };

    checkDueDates();
   
    const interval = setInterval(checkDueDates, 60000);
    return () => clearInterval(interval);
  }, [tasks, dismissedIds]);

  const handleDismiss = (id) => {
    setDismissedIds((prev) => new Set([...prev, id]));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 space-y-2 p-4 pointer-events-none">
      <div className="mx-auto max-w-4xl space-y-2 pointer-events-auto">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg shadow-xl p-4 flex items-center justify-between animate-slide-down backdrop-blur-sm ${
              notification.type === 'overdue'
                ? 'bg-red-100 border-l-4 border-red-600 ring-2 ring-red-200'
                : notification.type === 'due-today'
                ? 'bg-orange-100 border-l-4 border-orange-600 ring-2 ring-orange-200'
                : 'bg-yellow-100 border-l-4 border-yellow-600 ring-2 ring-yellow-200'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {notification.type === 'overdue' ? (
                <div className="p-2 bg-red-200 rounded-full">
                  <AlertCircle className="text-red-700" size={20} />
                </div>
              ) : (
                <div className={`p-2 rounded-full ${
                  notification.type === 'due-today' ? 'bg-orange-200' : 'bg-yellow-200'
                }`}>
                  <Clock className={notification.type === 'due-today' ? 'text-orange-700' : 'text-yellow-700'} size={20} />
                </div>
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    notification.type === 'overdue'
                      ? 'text-red-900'
                      : notification.type === 'due-today'
                      ? 'text-orange-900'
                      : 'text-yellow-900'
                  }`}
                >
                  {notification.message}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    notification.type === 'overdue'
                      ? 'text-red-700'
                      : notification.type === 'due-today'
                      ? 'text-orange-700'
                      : 'text-yellow-700'
                  }`}
                >
                  {notification.type === 'overdue' 
                    ? 'Please update the due date or complete this task.'
                    : notification.type === 'due-today'
                    ? 'Don\'t forget to complete this task today!'
                    : 'This task is due soon. Plan your time accordingly.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDismiss(notification.id)}
              className="ml-4 p-2 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors flex-shrink-0"
              title="Dismiss notification"
            >
              <X
                size={18}
                className={
                  notification.type === 'overdue'
                    ? 'text-red-700'
                    : notification.type === 'due-today'
                    ? 'text-orange-700'
                    : 'text-yellow-700'
                }
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBanner;

