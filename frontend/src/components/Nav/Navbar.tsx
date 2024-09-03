import React, { useState } from "react";
import "./Navbar.css";
import { Home, Info, MessageCircle, Plus, PlusCircle } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AddPost from "@/pages/AddPost";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 bg-white shadow-xl bottom-navbar rounded-xl rounded-b-none">
      <AddPost isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="container mx-auto flex justify-evenly py-4">
        <NavLink
          to="/"
          className=" hover:text-pink-700 hover:scale-110 cafe-noir"
          style={({ isActive }) => {
            return {
              color: isActive ? "text-pink-700" : "",
            };
          }}
        >
          <Home className="w-8 h-8" />
        </NavLink>

        <button
          className=" hover:text-pink-700 hover:scale-110 cafe-noir"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <PlusCircle className="w-8 h-8" />
        </button>

        <NavLink
          to="/messages"
          className="hover:text-pink-700 hover:scale-110 cafe-noir"
          style={({ isActive }) => {
            return {
              color: isActive ? "text-pink-700" : "",
            };
          }}
        >
          <MessageCircle className="w-8 h-8" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
