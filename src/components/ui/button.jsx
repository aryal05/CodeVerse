"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
  { variants: { variant: { default: "bg-gray-950 text-white hover:bg-gray-800", outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50", ghost: "text-gray-600 hover:bg-gray-100" }, size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } },
);

const Button = forwardRef(({ className, variant, size, ...props }, ref) => <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />);
Button.displayName = "Button";

export { Button, buttonVariants };
