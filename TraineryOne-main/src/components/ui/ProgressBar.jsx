import React from "react";
import { cn } from "../../lib/utils";

export function ProgressBar({ value, max = 100, variant = "primary", className, height = "h-2" }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    primary: "bg-blue-600",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    manager: "bg-purple-600",
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-gray-200", height, className)}>
      <div
        className={cn("h-full transition-all duration-300 ease-in-out", variants[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
