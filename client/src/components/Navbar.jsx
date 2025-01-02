import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, handleSingOut } = useAuth();

  return (
    <div className="flex justify-between items-center py-8 mx-5 md:mx-0">
      <div className="hidden md:block">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-9 h-9" src={logo} alt="" />
          <h2 className="font-black text-3xl font-row">LMS</h2>
        </Link>
      </div>
      <nav className="z-10">
        <div
          className="md:hidden absolute left-5 top-8"
          onClick={() => setOpen(!open)}
        >
          {open === true ? (
            <i className="fa-regular fa-circle-xmark text-black text-4xl"></i>
          ) : (
            <i className="fa-solid fa-bars text-black text-4xl"></i>
          )}
        </div>
        <ul
          className={`flex flex-col md:flex-row md:gap-5 absolute md:absolute lg:static bg-white rounded-xl py-3 px-5 md:p-0 font-medium md:top-24 md:left-72 z-10 ${
            open ? "left-4 top-24" : "-top-40"
          }`}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allBooks">All Books</NavLink>
          <NavLink to="/addBook">Add Book</NavLink>
          <NavLink to="/borrowedBooks">Borrowed Books</NavLink>
          {user ? <NavLink to="/profile">Profile</NavLink> : ""}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 z-10">
            <div>
              <img
                data-tooltip-id="tooltip"
                data-tooltip-content={user?.displayName}
                className="w-12 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <button
              onClick={handleSingOut}
              className="bg-black text-white font-bold py-2 px-4 rounded-sm"
            >
              Sign Out
            </button>
            <Tooltip id="tooltip" place="top" type="dark" effect="float" />
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="bg-black text-white font-bold py-2 px-4 rounded-sm">
              <Link to="/signIn">Sign In</Link>
            </button>
            <button className="bg-black text-white font-bold py-2 px-4 rounded-sm">
              <Link to="/signUp">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
