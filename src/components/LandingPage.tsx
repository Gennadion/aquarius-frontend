"use client";

import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { WaterBucket } from "@/components/WaterBucket";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handlePlaceholder1Click = () => {
    console.log("Placeholder 1 clicked");
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
                  <Button
                    onClick={handlePlaceholder1Click}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    Placeholder Text
                  </Button>
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
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Cyprus Dam Data Tracking
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time monitoring and analytics for Cyprus
              water reservoirs
            </p>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
              About Our Mission
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae
                ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Overall Capacity Section */}
          <div className="mt-12">
            <WaterBucket 
              percentage={68}
              message="All Cyprus dams are currently at 68% capacity. Water levels are stable and within normal range for this time of year. Continue monitoring for any significant changes in reservoir levels."
            />
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
                real-time across all Cyprus dams.
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

