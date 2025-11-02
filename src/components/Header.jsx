import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Search, Calendar, Bell, ChevronDown, HelpCircle } from 'lucide-react';
import { setSearchQuery } from '../store/slices/filtersSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.filters.searchQuery);
  const { user } = useUser();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={18} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-2 relative group">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {user?.firstName || 'Palak'} {user?.lastName || 'Jain'}
              </p>
              <p className="text-xs text-[#787486] leading-tight">
                Rajathan, India
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={user.firstName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {user?.firstName?.[0] || 'P'}
                </span>
              )}
            </div>
            <ChevronDown size={16} className="text-gray-400" />
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="py-1">
                <SignOutButton>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

