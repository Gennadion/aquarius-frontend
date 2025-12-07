"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { PeriodPicker } from "@/components/PeriodPicker";
import { ArrowLeft, Droplets, MapPin, Mountain, Maximize2, TrendingDown, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Cylinder } from './Cylinder';
import { usePeriodStore } from "@/store/period-store";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { usePathname } from "next/navigation";
import { getDam, DamModel, DamName } from "@/services/dam";

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
  storageMcm: number;
  imageUrl?: string;
  wikipediaUrl?: string;
}

// Dam names available from API
const DAM_NAMES: DamName[] = ['Asprokremmos', 'Evretou', 'Mavrokolympos'];

// Helper function to determine status from percentage
function getStatusFromPercentage(percentage: number): 'critical' | 'warning' | 'normal' {
  if (percentage < 30) return 'critical';
  if (percentage < 60) return 'warning';
  return 'normal';
}

// Helper to format date for display (DD.MM.YYYY)
function formatDateForDisplay(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Map API DamModel to component Dam interface
function mapDamModelToDam(model: DamModel, id: string): Dam {
  return {
    id,
    name: `${model.dam.name} Dam`,
    currentLevel: Math.round(model.dam.percentage),
    capacity: model.dam.capacityMcm,
    status: getStatusFromPercentage(model.dam.percentage),
    lastUpdated: formatDateForDisplay(model.dataDate),
    location: 'Paphos District',
    heightAboveSeaLevel: model.dam.height,
    storageMcm: model.dam.storageMcm,
    imageUrl: model.dam.imageUrl,
    wikipediaUrl: model.dam.wikipediaUrl,
  };
}

// Get today's date in DD.MM.YYYY format
function getTodayDDMMYYYY(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
}

// Parse date string in DD.MM.YYYY format
function parseDate(dateStr: string): Date {
  const ddMmYyyyPattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  const match = dateStr.match(ddMmYyyyPattern);
  if (match) {
    const [, day, month, year] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  // Fallback to standard Date parsing
  return new Date(dateStr);
}

// Generate mock trend data starting from the selected period and going forward in time
// The first data point matches the selected period with the actual current level
function generateMockTrendData(currentLevel: number, startDate?: string): WaterLevelDataPoint[] {
  const start = startDate ? parseDate(startDate) : new Date();
  const dataPoints: WaterLevelDataPoint[] = [];
  
  // Number of days to show (8 data points = 8 days)
  const numDays = 8;
  
  // Project forward trend: start from current level and trend slightly up or down
  // Simulate realistic water level changes (typically small variations)
  const trendDirection = Math.random() > 0.5 ? 1 : -1; // Random up or down trend
  const trendMagnitude = 0.5 + Math.random() * 1.5; // 0.5% to 2% change over period
  const endLevel = Math.max(0, Math.min(100, currentLevel + trendDirection * trendMagnitude));
  
  for (let dayOffset = 0; dayOffset < numDays; dayOffset++) {
    const date = new Date(start);
    date.setDate(date.getDate() + dayOffset);
    
    let level: number;
    if (dayOffset === 0) {
      // First point (selected period) is the actual current level
      level = currentLevel;
    } else {
      // Interpolate from current level to projected end level with minimal noise
      const progress = dayOffset / (numDays - 1);
      const baseLevel = currentLevel + (endLevel - currentLevel) * progress;
      const noise = (Math.random() - 0.5) * 0.6; // ±0.3% random variation
      level = Math.round(Math.max(0, Math.min(100, baseLevel + noise)) * 10) / 10;
    }
    
    dataPoints.push({
      date: formatDateForDisplay(date),
      level,
    });
  }
  
  return dataPoints;
}

function DamDashboard({ 
  dams, 
  onSelectDam, 
  loading, 
  error 
}: { 
  dams: Dam[]; 
  onSelectDam: (id: string) => void;
  loading: boolean;
  error: string | null;
}) {
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

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading dam data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && dams.length > 0 && (
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
      )}

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

interface WaterLevelDataPoint {
  date: string;
  level: number;
}

function DamDetail({ 
  dam, 
  onGoBack,
  currentPeriod
}: { 
  dam: Dam; 
  onGoBack: () => void;
  currentPeriod?: string;
}) {
  // Generate mock trend data starting from the selected period and going forward
  const trendData = generateMockTrendData(dam.currentLevel, currentPeriod);
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
      categories: trendData.map(d => d.date),
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
    data: trendData.map(d => d.level)
  }];

  // Get trend direction
  const hasTrendData = trendData.length >= 2;
  const firstLevel = hasTrendData ? trendData[0].level : 0;
  const lastLevel = hasTrendData ? trendData[trendData.length - 1].level : 0;
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
                {dam.storageMcm.toFixed(2)} MCM of {dam.capacity} MCM
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
                <h3 className="text-lg font-semibold text-gray-900">Dam Height</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {dam.heightAboveSeaLevel} meters
              </p>
              <p className="text-gray-600">structural height</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Maximize2 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Capacity</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{dam.capacity} MCM</p>
              <p className="text-gray-600">maximum storage</p>
            </div>
          </div>

          {/* Water Level Trend Graph with ApexCharts */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Water Level Trend</h3>
              </div>
              {hasTrendData && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${trendDown ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {trendDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {Math.abs(lastLevel - firstLevel).toFixed(1)}% {trendDown ? 'decrease' : 'increase'}
                  </span>
                </div>
              )}
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
  const [dams, setDams] = useState<Dam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { period, setPeriod } = usePeriodStore();
  const displayPeriod = period || getTodayDDMMYYYY();
  const pathname = usePathname();


  // Fetch all dams data
  const fetchDams = useCallback(async (targetDate?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const damPromises = DAM_NAMES.map((name, index) => 
        getDam({ name, targetDate })
          .then(model => mapDamModelToDam(model, String(index + 1)))
      );
      
      const results = await Promise.all(damPromises);
      setDams(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dam data');
      console.error('Error fetching dams:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dams on mount and when period changes
  useEffect(() => {
    fetchDams(period || undefined);
  }, [period, fetchDams]);

  const selectedDam = selectedDamId 
    ? dams.find(dam => dam.id === selectedDamId) 
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
            value={displayPeriod}
            onChange={setPeriod}
            className="mb-0 inline"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        {!selectedDam ? (
          <DamDashboard 
            dams={dams} 
            onSelectDam={setSelectedDamId}
            loading={loading}
            error={error}
          />
        ) : (
          <DamDetail 
            dam={selectedDam} 
            onGoBack={() => setSelectedDamId(null)}
            currentPeriod={period || undefined}
          />
        )}
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

