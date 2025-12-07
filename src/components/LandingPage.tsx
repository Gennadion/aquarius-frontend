"use client";

import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { WaterBucket } from "@/components/WaterBucket";
import { PeriodPicker } from "@/components/PeriodPicker";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getSummary, SummaryModel } from "@/services/summary";
import { usePeriodStore } from "@/store/period-store";
import { usePathname } from "next/navigation";

export function LandingPage() {
  const [summary, setSummary] = useState<SummaryModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { period, setPeriod, resetPeriod } = usePeriodStore();
  const pathname = usePathname();


  const fetchSummary = useCallback(async (date?: string) => {
    try {
      setError(null);
      const data = await getSummary(date ? { targetDate: date } : undefined);
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load summary data");
      console.error("Error fetching summary:", err);
    }
  }, []);

  useEffect(() => {
    fetchSummary(period || undefined);
  }, [period, fetchSummary]);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/logo.png"
                alt="AquaWise Logo"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <span className="text-blue-600 font-semibold tracking-wide">
              AquaWise
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "outline"}
                className={pathname === "/" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
              >
                Home
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                variant={pathname === "/analytics" ? "default" : "outline"}
                className={pathname === "/analytics" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
              >
                Dams
              </Button>
            </Link>
          </div>
          
          {/* Period Picker */}
          <PeriodPicker
            value={period || ""}
            onChange={setPeriod}
            className="mb-0 inline"
          />
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Paphos Dam Levels & Water Consumption Tracking
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time monitoring and analytics for Paphos
              water reservoirs
            </p>
          </div>

        {/* Overall Capacity Section */}
        <div className="mt-12">

            {summary ? (
                <WaterBucket
                    percentage={Math.round(summary.totalPercentage)}
                    message={`All Paphos dams are currently at ${Math.round(summary.totalPercentage)}% capacity. ${summary.delta > 0 ? `Water levels have increased by ${summary.delta.toFixed(1)}% compared to last year.` : summary.delta < 0 ? `Water levels have decreased by ${Math.abs(summary.delta).toFixed(1)}% compared to last year.` : 'Water levels are stable compared to last year.'} Continue monitoring for any significant changes in reservoir levels.`}
                    totalCapacityMcm={summary.totalCapacityMcm}
                    totalStorageMcm={summary.totalStorageMcm}
                />
            ) : null}
        </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
              About Our Mission
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                  Paphos Dam Levels Tracking exists to provide clear, reliable, and up-to-date information about the water levels in the dams that support our communities. Water is one of Cyprus’ most critical resources, and understanding how much we have - and how quickly it changes - helps everyone make better decisions.
              </p>
              <p>
                  By tracking Paphos’ dam levels consistently and clearly, we aim to help protect our island’s most valuable resource and encourage sustainable water management for today and the future.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Data
              </h3>
              <p className="text-gray-600">
                Monitor water levels and reservoir capacity in
                real-time across all Paphos dams.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">
                Advanced analytics and insights to help manage
                water resources efficiently.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Alerts</h3>
              <p className="text-gray-600">
                Get notified about critical water levels and
                important updates instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 AquaWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

