import React, { useState } from "react";
import { VscTasklist } from "react-icons/vsc";
import { IoSettingsOutline, IoBulbOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { BsChatSquareDots } from "react-icons/bs";
import { Grid3x3, Users, ChevronLeft } from "lucide-react";
import { toggleMenu } from "../store/slices/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  const [project, setProject] = useState("Mobile App");

  const data = [
    {
      name: "Mobile App",
      color: "bg-green-500",
    },
    {
      name: "Website Redesign",
      color: "bg-orange-500",
    },
    {
      name: "Design System",
      color: "bg-purple-500",
    },
    {
      name: "Wireframes",
      color: "bg-blue-500",
    },
  ];

  if (!isMenuOpen) return null;

  return (
    <div className="w-[280px] z-50 bg-white h-full flex border-r border-gray-200 font-inter flex-col items-start px-6 py-6">
      {/* Logo Section */}
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A78BFA' }}>
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#7C3AED' }}></div>
          </div>
          <span className="text-lg font-bold text-gray-900">Project M.</span>
          
        </div>
        <button 
          onClick={() => dispatch(toggleMenu())}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-start text-gray-600 cursor-pointer items-start gap-5 font-normal w-full mb-6">
        <div className="flex justify-center items-center gap-4 hover:text-purple-600 transition-colors">
          <Grid3x3 size={20} className="text-[#787486]" />
          <p className="text-sm">Home</p>
        </div>
        <div className="flex justify-center items-center gap-4 hover:text-purple-600 transition-colors">
          <BsChatSquareDots size={20} className="text-[#787486]" />
          <p className="text-sm">Messages</p>
        </div>
        <div className="flex justify-center items-center gap-4 hover:text-purple-600 transition-colors">
          <VscTasklist size={20} className="text-[#787486]" />
          <p className="text-sm">Tasks</p>
        </div>
        <div className="flex justify-center items-center gap-4 hover:text-purple-600 transition-colors">
          <Users size={20} className="text-[#787486]" />
          <p className="text-sm">Members</p>
        </div>
        <div className="flex justify-center items-center gap-4 hover:text-purple-600 transition-colors">
          <IoSettingsOutline size={20} className="text-[#787486]" />
          <p className="text-sm">Settings</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-2"></div>

      {/* My Projects Section */}
      <div className="w-full mt-4">
        <div className="flex text-sm justify-between items-center mb-4">
          <p className="text-xs text-[#787486] font-semibold tracking-wider uppercase">MY PROJECTS</p>
          <MdOutlineAddBox size={18} className="text-[#787486] cursor-pointer hover:text-purple-600" />
        </div>
        <div className="flex pt-2 w-full flex-col justify-center items-start text-sm font-normal gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex w-full justify-between items-center cursor-pointer px-3 py-2 rounded-lg transition-colors ${
                project === item.name
                  ? "bg-purple-100 text-gray-900"
                  : "text-[#787486] hover:bg-gray-100"
              } `}
              onClick={() => setProject(item.name)}
            >
              <div className="flex justify-center items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${item.color}`}
                ></div>
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <PiDotsThreeBold
                size={18}
                className={project === item.name ? "text-gray-900" : "text-[#787486]"}
              />
            </div>
          ))}
        </div>

        {/* Thoughts Time Card */}
        <div className="relative w-full flex flex-col mt-8 justify-center items-center">
          <div className="absolute -top-6 flex justify-center items-center z-10 bg-gray-100 w-12 h-12 rounded-full border-2 border-gray-200">
            <IoBulbOutline size={24} className="text-yellow-500" />
          </div>
          <div className="w-full rounded-2xl flex flex-col p-5 pt-10 justify-center text-sm items-center bg-gray-100 border border-gray-200 gap-3">
            <p className="font-semibold text-gray-900">Thoughts Time</p>
            <p className="w-full text-xs text-[#787486] leading-relaxed text-center">
              We don't have any notice for you, till then you can share your thoughts with your peers.
            </p>
            <button className="bg-white border border-gray-200 px-4 py-2 text-gray-700 w-full rounded-lg text-sm mt-1 hover:bg-gray-50 transition-colors font-medium">
              Write a message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

