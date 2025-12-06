"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PeriodPicker } from "@/components/PeriodPicker";
import { usePeriodStore } from "@/store/period-store";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePathname } from "next/navigation";

// Get today's date in DD.MM.YYYY format
function getTodayDDMMYYYY(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
}

export function DamPage() {
  const { period, setPeriod } = usePeriodStore();
  const displayPeriod = period || getTodayDDMMYYYY();
  const pathname = usePathname();


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
            value={displayPeriod}
            onChange={setPeriod}
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

