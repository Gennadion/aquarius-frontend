"use client";

import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { WaterBucket } from "@/components/WaterBucket";
import { PeriodPicker } from "@/components/PeriodPicker";
import { Menu } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { getSummary, SummaryModel } from "@/services/summary";
import { usePeriodStore } from "@/store/period-store";

export function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [summary, setSummary] = useState<SummaryModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { period, setPeriod, resetPeriod } = usePeriodStore();

  // Convert date from YYYY-MM-DD to DD.MM.YYYY format if needed
  const convertToApiDateFormat = (date: string): string => {
    // Check if date is in YYYY-MM-DD format (e.g., "2025-01-15")
    const yyyyMmDdPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (yyyyMmDdPattern.test(date)) {
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    }
    // If already in DD.MM.YYYY format or empty, return as-is
    return date;
  };

  const fetchSummary = useCallback(async (date?: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiDate = date ? convertToApiDateFormat(date) : undefined;
      const data = await getSummary(apiDate ? { targetDate: apiDate } : undefined);
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load summary data");
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary(period || undefined);
  }, [period, fetchSummary]);

  const handleDateSubmit = (date: string) => {
    setPeriod(date);
    fetchSummary(date || undefined);
  };

  const handleResetDate = () => {
    resetPeriod();
    fetchSummary();
  };

  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handlePlaceholder2Click = () => {
    console.log("Placeholder 2 clicked");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuClick}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-blue-600">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/dam" onClick={() => setIsNavOpen(false)}>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
                    >
                      Dam
                    </Button>
                  </Link>
                  <Link href="/analytics" onClick={() => setIsNavOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      Analytics
                    </Button>
                  </Link>
                  <Button
                    onClick={handlePlaceholder2Click}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    Placeholder Text
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1645616265871-be6186d5a019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW0lMjB3YXRlciUyMHJlc2Vydm9pcnxlbnwxfHx8fDE3NjUwMjQ3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Water background"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <span className="text-blue-600 font-semibold tracking-wide">
              AQUARIUS
            </span>
          </div>
          
          {/* Period Picker */}
          <PeriodPicker
            value={period}
            onChange={setPeriod}
            onSubmit={handleDateSubmit}
            onReset={handleResetDate}
            showReset={!!period}
            loading={loading}
            dateFormat="DD.MM.YYYY"
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

            {error ? (
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto text-center">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            ) : summary ? (
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
          <p>&copy; 2025 AQUARIUS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

