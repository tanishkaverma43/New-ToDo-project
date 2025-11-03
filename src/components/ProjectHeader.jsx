import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link2, ArrowLeftRight, ChevronDown, Calendar, Share2, Filter, Equal, List, Grid3x3, Plus, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { setPriorityFilter, setDateFilter } from '../store/slices/filtersSlice';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import firstImage from '../assets/first.png';
import secondImage from '../assets/2nd.png';
import thirdImage from '../assets/3nr.png';
import fourthImage from '../assets/4th.png';

const ProjectHeader = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.filters.currentProject);
  const priorityFilter = useSelector((state) => state.filters.priorityFilter);
  const dateFilter = useSelector((state) => state.filters.dateFilter);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);

  const teamMembers = [
    { id: 1, name: 'User 1', avatar: firstImage, color: '#FCD34D' },
    { id: 2, name: 'User 2', avatar: secondImage, color: '#93C5FD' },
    { id: 3, name: 'User 3', avatar: thirdImage, color: '#93C5FD' },
    { id: 4, name: 'User 4', avatar: fourthImage, color: '#D97757' },
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'MMM dd, yyyy');
    dispatch(setDateFilter(formattedDate));
    setShowCalendar(false);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    dispatch(setDateFilter('Today'));
    setShowCalendar(false);
  };

  const handleAllClick = () => {
    dispatch(setDateFilter('All'));
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="mb-6">
   
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-gray-900">{currentProject}</h1>
          <button className="p-1.5 rounded-md hover:bg-purple-50 transition-colors">
            <Link2 size={16} className="text-purple-600" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-purple-50 transition-colors">
            <ArrowLeftRight size={16} className="text-purple-600" />
          </button>
        </div>

        <div className="flex items-center gap-3">
       
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 transition-colors font-medium text-sm hover:opacity-90" style={{ color: '#7C3AED' }}>
              <Plus size={16} style={{ color: '#7C3AED' }} />
              <span>Invite</span>
            </button>
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: member.color }}
                  title={member.name}
                >
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: '#FBCFE8' }}>
                <span className="text-xs font-semibold" style={{ color: '#EC4899' }}>+2</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-between">
       
        <div className="flex items-center gap-2 mt-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 bg-white">
              <Filter size={16} />
              <span>Filter</span>
              <ChevronDown size={14} />
            </button>
            <select 
              value={priorityFilter}
              onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="relative" ref={calendarRef}>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 bg-white"
            >
              <Calendar size={16} />
              <span>{dateFilter}</span>
              <ChevronDown size={14} />
            </button>
            
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-80">
  
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronLeft size={16} className="text-gray-600" />
                  </button>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </div>

          
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

           
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const isCurrentMonthDay = isSameMonth(day, currentMonth);
                    const isSelectedDay = isSameDay(day, selectedDate);
                    const isTodayDate = isToday(day);

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(day)}
                        className={`
                          p-2 text-xs rounded transition-colors
                          ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}
                          ${isSelectedDay ? 'bg-purple-600 text-white font-semibold' : 'hover:bg-gray-100'}
                          ${isTodayDate && !isSelectedDay ? 'bg-purple-100 text-purple-700 font-semibold' : ''}
                        `}
                      >
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button
                    onClick={handleTodayClick}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      dateFilter === 'Today'
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={handleAllClick}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      dateFilter === 'All'
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 bg-white">
            <Share2 size={16} />
            <span>Share</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: '#9333EA' }}>
            <Menu size={16} className="text-white" />
          </button>
          
          <button className="p-2 transition-colors text-gray-600 hover:opacity-70">
            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

