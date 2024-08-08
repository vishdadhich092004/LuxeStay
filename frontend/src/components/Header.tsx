import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const { isLoggedIn } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-yellow-800 pb-4 pt-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tighter mb-4 md:mb-0 flex-1">
          <Link to="/">LuxeStay.com</Link>
        </span>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>

        {/* Menu Items */}
        <div
          className={`md:flex flex-col md:flex-row items-center ${
            menuOpen ? "block" : "hidden"
          } md:ml-auto w-full md:w-auto`}
        >
          {isLoggedIn ? (
            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <Link
                className="text-white px-3 py-2 font-bold hover:bg-yellow-600 rounded flex-1 text-center mb-2 md:mb-0"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-white px-3 py-2 font-bold hover:bg-yellow-600 rounded flex-1 text-center mb-2 md:mb-0"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <h1 className="text-white px-3 py-2 font-bold text-sm md:text-base flex-1 text-center mb-2 md:mb-0">
                Hey {}
              </h1>
              <div className="flex-1 text-center mb-2 md:mb-0">
                <SignOutButton />
              </div>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-yellow-600 px-4 py-2 font-bold hover:bg-gray-100 rounded flex-1 text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
