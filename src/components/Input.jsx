"use client";
import { forwardRef } from "react";

const Input = forwardRef(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      {...props}
    />
  );
});

export default Input;
