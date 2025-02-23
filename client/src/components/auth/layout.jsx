import { Outlet } from "react-router-dom";
import Logo from "../common/logo";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-gradient-to-br from-blue-900 via-purple-800 to-purple-600">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <div className="p-5 m-16"><Logo/></div>
            Your Ultimate Shopping Destination
          </h1>
          <p className="text-lg text-gray-200">
            Explore a world of exclusive deals, top brands, and seamless shopping. 
            Experience convenience like never before.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
