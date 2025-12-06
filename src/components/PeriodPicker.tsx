"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PeriodPickerProps {
  /** Current date value. For DD.MM.YYYY format, pass string like "15.01.2025". For YYYY-MM-DD format, pass string like "2025-01-15" */
  value: string;
  /** Callback when date changes */
  onChange: (date: string) => void;
  /** Optional callback when form is submitted (for DD.MM.YYYY format) */
  onSubmit?: (date: string) => void;
  /** Optional callback when reset button is clicked */
  onReset?: () => void;
  /** Whether to show reset button */
  showReset?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Date format to use */
  dateFormat?: "DD.MM.YYYY" | "YYYY-MM-DD";
  /** Label for the period picker */
  label?: string;
  /** Whether to show as dropdown (like LandingPage) or button (like AnalyticsPage) */
  variant?: "dropdown" | "button";
  /** Additional className for the container */
  className?: string;
}

export function PeriodPicker({
  value,
  onChange,
  onSubmit,
  onReset,
  showReset = false,
  loading = false,
  dateFormat = "YYYY-MM-DD",
  label,
  variant = "button",
  className = "",
}: PeriodPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (newDate: string) => {
    onChange(newDate);
    if (dateFormat === "YYYY-MM-DD") {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
    setIsOpen(false);
  };

  const displayValue = value || (dateFormat === "YYYY-MM-DD" ? new Date().toISOString().split("T")[0] : "");

  if (variant === "dropdown") {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mb-6 ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="text-lg font-semibold text-gray-900">
            {label || "Filter by Date"}
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {isOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="target-date" className="block text-sm font-medium text-gray-700 mb-2">
                  {dateFormat === "DD.MM.YYYY" ? "Target Date (DD.MM.YYYY)" : "Select Date"}
                </label>
                {dateFormat === "DD.MM.YYYY" ? (
                  <>
                    <input
                      id="target-date"
                      type="text"
                      placeholder="DD.MM.YYYY (e.g., 15.01.2025)"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      pattern="\d{2}\.\d{2}\.\d{4}"
                      title="Please enter date in DD.MM.YYYY format"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Leave empty to view current data
                    </p>
                  </>
                ) : (
                  <input
                    id="target-date"
                    type="date"
                    value={value}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
              <div className="flex items-end gap-2">
                {dateFormat === "DD.MM.YYYY" && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? "Loading..." : "Apply"}
                  </Button>
                )}
                {showReset && value && (
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    disabled={loading}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Button variant (default)
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
              {dateFormat === "DD.MM.YYYY" ? "Target Date (DD.MM.YYYY)" : "Select Date"}
            </label>
            {dateFormat === "DD.MM.YYYY" ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="DD.MM.YYYY (e.g., 15.01.2025)"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  pattern="\d{2}\.\d{2}\.\d{4}"
                  title="Please enter date in DD.MM.YYYY format"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    {loading ? "Loading..." : "Apply"}
                  </Button>
                  {showReset && value && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      disabled={loading}
                      size="sm"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <input
                type="date"
                value={value}
                onChange={(e) => handleDateChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

