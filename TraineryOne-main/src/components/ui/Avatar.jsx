import React from "react";
import { cn } from "../../lib/utils";
import { User } from "lucide-react";

export function Avatar({ src, fallback, size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-gray-100",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={fallback || "Avatar"}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 font-medium">
          {fallback || <User size={16} />}
        </div>
      )}
    </div>
  );
}
