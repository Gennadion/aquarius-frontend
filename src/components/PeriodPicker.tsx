"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";

export interface PeriodPickerProps {
  /** Current date value in DD.MM.YYYY format, e.g. "15.01.2025" */
  value: string;
  /** Callback when date changes */
  onChange: (date: string) => void;
  /** Label for the period picker */
  label?: string;
  /** Additional className for the container */
  className?: string;
}

export function PeriodPicker({
  value,
  onChange,
  label,
  className = "",
}: PeriodPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local value with prop value (only when prop changes from parent)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce onChange callback (only when localValue changes from user input)
  useEffect(() => {
    // Skip debounce if localValue matches the prop value (synced from parent)
    if (localValue === value) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChange(localValue);
    }, 1000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [localValue, onChange, value]);

  const handleTextChange = (newDate: string) => {
    setLocalValue(newDate);
  };

  const displayValue = localValue || "";

  // Check if className contains "mb-0" or "inline" to determine if it should be inline
  const isInline = className.includes("mb-0") || className.includes("inline");
  const containerClass = isInline 
    ? `relative ${className}` 
    : `flex justify-center mb-8 ${className}`;
  
  return (
    <div className={containerClass}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-gray-900">
            {label || "Period"}: {displayValue || "Select date"}
          </span>
        </button>

        {isOpen && (
          <div className={`absolute top-14 ${isInline ? 'left-0' : 'left-1/2 transform -translate-x-1/2'} bg-white rounded-lg shadow-xl p-4 z-10`}>
            <label className="block text-gray-700 mb-2 text-sm">
              Target Date (DD.MM.YYYY)
            </label>
            <input
              type="text"
              placeholder="DD.MM.YYYY (e.g., 15.01.2025)"
              value={localValue}
              onChange={(e) => handleTextChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              pattern="\d{2}\.\d{2}\.\d{4}"
              title="Please enter date in DD.MM.YYYY format"
            />
          </div>
        )}
      </div>
    </div>
  );
}

