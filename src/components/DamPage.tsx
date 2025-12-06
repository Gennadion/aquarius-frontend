"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PeriodPicker } from "@/components/PeriodPicker";
import { usePeriodStore } from "@/store/period-store";

export function DamPage() {
  const { period, setPeriod } = usePeriodStore();
  const displayPeriod = period || new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          {/* Period Picker */}
          <PeriodPicker
            value={displayPeriod}
            onChange={setPeriod}
            dateFormat="DD.MM.YYYY"
            className="mb-0 inline"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dam Details</h1>
          <p className="text-gray-600">
            This page will display detailed information about individual dams.
          </p>
        </div>
      </div>
    </div>
  );
}

