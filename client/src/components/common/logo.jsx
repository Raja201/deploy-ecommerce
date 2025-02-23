import React from 'react'

function Logo() {
    return (
      <div className="flex items-center space-x-3">
        {/* Shopping Cart Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2m0 0L7 13h10l1.38-6H5.4m0 0L4 4M16 17a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
        </div>
  
        {/* Logo Text */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900">
            THE <span className="text-blue-600">SHOPCENTER</span>
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Your Ultimate Shopping Destination
          </p>
        </div>
      </div>
    );
  }
  

  

export default Logo