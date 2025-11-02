import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, CheckCircle, FileText, User, Clock } from 'lucide-react';

const ActivityLog = ({ activityLog }) => {
  if (!activityLog || activityLog.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Log</h3>
        <p className="text-sm text-gray-500 text-center py-8">No activity yet</p>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return <MessageSquare size={16} className="text-purple-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'created':
        return <FileText size={16} className="text-blue-600" />;
      default:
        return <User size={16} className="text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'comment':
        return 'bg-purple-100 border-purple-300';
      case 'completed':
        return 'bg-green-100 border-green-300';
      case 'created':
        return 'bg-blue-100 border-blue-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Log</h3>
      <div className="space-y-4">
        {activityLog.map((activity, index) => (
          <div key={activity.id || index} className="relative pl-8 pb-4">
            {/* Timeline line */}
            {index !== activityLog.length - 1 && (
              <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            {/* Icon */}
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 ${getActivityColor(activity.type)} flex items-center justify-center`}>
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">
                    {activity.userName || 'Unknown User'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.message || 'Activity performed'}
                  </p>
                </div>
                {activity.timestamp && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                    <Clock size={12} />
                    <span>
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
