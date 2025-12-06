"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PeriodPicker } from "@/components/PeriodPicker";
import { ArrowLeft, Droplets, MapPin, Mountain, Maximize2, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Cylinder } from './Cylinder';
import { usePeriodStore } from "@/store/period-store";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePathname } from "next/navigation";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface Dam {
  id: string;
  name: string;
  currentLevel: number;
  capacity: number;
  status: 'critical' | 'warning' | 'normal';
  lastUpdated: string;
  location: string;
  heightAboveSeaLevel: number;
  surfaceArea: number;
}

export const damsData: Dam[] = [
  {
    id: '1',
    name: 'Asprokremmos Dam',
    currentLevel: 15,
    capacity: 52.375,
    status: 'critical',
    lastUpdated: '2025-12-06',
    location: 'Paphos District',
    heightAboveSeaLevel: 145,
    surfaceArea: 2.1
  },
  {
    id: '2',
    name: 'Evretou Dam',
    currentLevel: 45,
    capacity: 24.5,
    status: 'warning',
    lastUpdated: '2025-12-06',
    location: 'Paphos District',
    heightAboveSeaLevel: 240,
    surfaceArea: 1.2
  },
  {
    id: '3',
    name: 'Mavrokolympos Dam',
    currentLevel: 72,
    capacity: 5.2,
    status: 'normal',
    lastUpdated: '2025-12-06',
    location: 'Paphos District',
    heightAboveSeaLevel: 320,
    surfaceArea: 0.4
  }
];

// Artificial data for the water level trend
const waterLevelData = [
  { date: '2025-11-01', level: 68 },
  { date: '2025-11-05', level: 65 },
  { date: '2025-11-10', level: 62 },
  { date: '2025-11-15', level: 58 },
  { date: '2025-11-20', level: 55 },
  { date: '2025-11-25', level: 52 },
  { date: '2025-11-30', level: 48 },
  { date: '2025-12-05', level: 45 },
];

function DamDashboard({ dams, onSelectDam }: { dams: Dam[]; onSelectDam: (id: string) => void }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Droplets className="w-12 h-12 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-900">Paphos Water Dams Analytics</h1>
        </div>
        <p className="text-gray-600">
          Detailed analytics and water level monitoring for all dams in Paphos District, Cyprus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {dams.map((dam) => (
          <button
            key={dam.id}
            onClick={() => onSelectDam(dam.id)}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            <Cylinder
              level={dam.currentLevel}
              status={dam.status}
              name={dam.name}
            />
            
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{dam.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-700 font-medium">
                  {dam.currentLevel}%
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    dam.status === 'critical'
                      ? 'bg-red-500'
                      : dam.status === 'warning'
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                >
                  {dam.status === 'critical' && 'Critical'}
                  {dam.status === 'warning' && 'Warning'}
                  {dam.status === 'normal' && 'Normal'}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Capacity: {dam.capacity} MCM
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="text-gray-700 font-medium">Normal</p>
                <p className="text-gray-500 text-sm">&gt; 60%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <div>
                <p className="text-gray-700 font-medium">Warning</p>
                <p className="text-gray-500 text-sm">30% - 60%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div>
                <p className="text-gray-700 font-medium">Critical</p>
                <p className="text-gray-500 text-sm">&lt; 30%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DamDetail({ dam, onGoBack }: { dam: Dam; onGoBack: () => void }) {
  const getStatusColor = () => {
    switch (dam.status) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      case 'normal':
        return 'text-green-600 bg-green-100';
    }
  };

  const getStatusMessage = () => {
    switch (dam.status) {
      case 'critical':
        return 'Water level is critically low. Immediate conservation measures recommended.';
      case 'warning':
        return 'Water level is below optimal. Monitor closely and prepare conservation measures.';
      case 'normal':
        return 'Water level is within normal operating range.';
    }
  };

  const currentVolume = (dam.currentLevel / 100) * dam.capacity;

  // ApexCharts configuration for water level trend
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      fontFamily: 'inherit',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#3b82f6']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#3b82f6',
            opacity: 0.7
          },
          {
            offset: 100,
            color: '#3b82f6',
            opacity: 0.1
          }
        ]
      }
    },
    xaxis: {
      categories: waterLevelData.map(d => d.date),
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        rotate: -45
      },
      axisBorder: {
        color: '#e5e7eb'
      },
      axisTicks: {
        color: '#e5e7eb'
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Water Level (%)',
        style: {
          color: '#6b7280',
          fontSize: '12px',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        formatter: (value) => `${value}%`
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) => `${value}%`
      }
    },
    markers: {
      size: 4,
      colors: ['#3b82f6'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6
      }
    }
  };

  const chartSeries = [{
    name: 'Water Level',
    data: waterLevelData.map(d => d.level)
  }];

  // Get trend direction
  const firstLevel = waterLevelData[0].level;
  const lastLevel = waterLevelData[waterLevelData.length - 1].level;
  const trendDown = lastLevel < firstLevel;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
          <span className="text-gray-900">Back to all Dams</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-10 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Droplets className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold">{dam.name}</h1>
              <p className="text-blue-100">{dam.location}</p>
            </div>
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-full ${getStatusColor()} mt-4`}>
            <p className="font-medium">
              Status: {dam.status.charAt(0).toUpperCase() + dam.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Droplets className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Current Water Level</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{dam.currentLevel}%</p>
              <p className="text-gray-600">
                {currentVolume.toFixed(2)} MCM of {dam.capacity} MCM
              </p>
              
              {/* Progress bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    dam.status === 'critical'
                      ? 'bg-red-500'
                      : dam.status === 'warning'
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${dam.currentLevel}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mountain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Elevation</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {dam.heightAboveSeaLevel} meters
              </p>
              <p className="text-gray-600">above sea level</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Maximize2 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Surface Area</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{dam.surfaceArea} km²</p>
              <p className="text-gray-600">at full capacity</p>
            </div>
          </div>

          {/* Water Level Trend Graph with ApexCharts */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Water Level Trend</h3>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${trendDown ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {trendDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {Math.abs(lastLevel - firstLevel)}% {trendDown ? 'decrease' : 'increase'}
                </span>
              </div>
            </div>
            <div className="h-[300px]">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height="100%"
              />
            </div>
          </div>

          {/* Status Message */}
          <div className={`mt-6 rounded-xl p-6 ${getStatusColor()}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status Information</h3>
            <p className="text-gray-700">{getStatusMessage()}</p>
          </div>

          {/* Location */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
            </div>
            <p className="text-gray-700">
              {dam.name} is one of the major water reservoirs serving the {dam.location} area. 
              It plays a crucial role in the water supply infrastructure of the region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const [selectedDamId, setSelectedDamId] = useState<string | null>(null);
  const { period, setPeriod } = usePeriodStore();
  const displayPeriod = period || new Date().toISOString().split("T")[0];
  const pathname = usePathname();

  const selectedDam = selectedDamId 
    ? damsData.find(dam => dam.id === selectedDamId) 
    : null;


  return (
    <div className="min-h-screen flex flex-col">
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
            dateFormat={selectedDam ? "YYYY-MM-DD" : "DD.MM.YYYY"}
            className="mb-0 inline"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        {!selectedDam ? (
          <DamDashboard dams={damsData} onSelectDam={setSelectedDamId} />
        ) : (
          <DamDetail dam={selectedDam} onGoBack={() => setSelectedDamId(null)} />
        )}
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

