import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="bg-yellow-800 pb-7 pt-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tighter">
          <Link to="/">LuxeStay.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            className="flex items-center bg-white text-yellow-600 px-3 font-bold hover:bg-gray-100"
            to="/sign-in"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
export default Header;
