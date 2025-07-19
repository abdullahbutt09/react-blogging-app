import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600 dark:bg-blue-500",
  textColor = "text-white dark:text-gray-100",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center 
        px-5 py-2.5 
        rounded-lg 
        font-medium 
        ${bgColor} 
        ${textColor} 
        hover:bg-blue-700 dark:hover:bg-blue-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}