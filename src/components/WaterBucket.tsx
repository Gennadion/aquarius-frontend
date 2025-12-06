import { useId } from 'react';

interface WaterBucketProps {
  percentage: number;
  message: string;
  totalCapacityMcm: number;
  totalStorageMcm: number;
}

type StatusLevel = 'red' | 'orange' | 'green';

function getStatusLevel(percentage: number): StatusLevel {
  if (percentage < 30) return 'red';
  if (percentage < 60) return 'orange';
  return 'green';
}

function getStatusColors(status: StatusLevel) {
  switch (status) {
    case 'red':
      return {
        waterGradient: { start: '#ef4444', end: '#dc2626' }, // red-500 to red-600
        waterSurface: '#f87171', // red-400
        textColor: 'text-red-900',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        titleColor: 'text-red-800',
      };
    case 'orange':
      return {
        waterGradient: { start: '#f97316', end: '#ea580c' }, // orange-500 to orange-600
        waterSurface: '#fb923c', // orange-400
        textColor: 'text-orange-900',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        titleColor: 'text-orange-800',
      };
    case 'green':
      return {
        waterGradient: { start: '#22c55e', end: '#16a34a' }, // green-500 to green-600
        waterSurface: '#4ade80', // green-400
        textColor: 'text-green-900',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        titleColor: 'text-green-800',
      };
  }
}

export function WaterBucket({ percentage, message, totalCapacityMcm, totalStorageMcm }: WaterBucketProps) {
  const uniqueId = useId();
  const status = getStatusLevel(percentage);
  const colors = getStatusColors(status);
  const gradientId = `waterGradient-${status}-${uniqueId}`;
  const clipPathId = `bucketClip-${status}-${uniqueId}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
      <h2 className={`${colors.titleColor} mb-6 text-center`}>
        Overall Dam Capacity
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Bucket Visualization */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-48 h-64">
            {/* Bucket Container */}
            <svg
              viewBox="0 0 200 280"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bucket shape */}
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: colors.waterGradient.start, stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: colors.waterGradient.end, stopOpacity: 0.9 }} />
                </linearGradient>
                <linearGradient id="bucketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#94a3b8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              
              {/* Bucket outline (trapezoid) */}
              <path
                d="M 60 20 L 40 260 L 160 260 L 140 20 Z"
                fill="none"
                stroke="url(#bucketGradient)"
                strokeWidth="4"
              />
              
              {/* Water inside bucket */}
              <clipPath id={clipPathId}>
                <path d="M 60 20 L 40 260 L 160 260 L 140 20 Z" />
              </clipPath>
              
              <g clipPath={`url(#${clipPathId})`}>
                {/* Water fill */}
                <rect
                  x="35"
                  y={260 - (240 * percentage / 100)}
                  width="130"
                  height={240 * percentage / 100}
                  fill={`url(#${gradientId})`}
                />
                
                {/* Water surface wave effect */}
                <path
                  d={`M 35 ${260 - (240 * percentage / 100)} Q 60 ${260 - (240 * percentage / 100) - 5} 85 ${260 - (240 * percentage / 100)} T 135 ${260 - (240 * percentage / 100)} Q 150 ${260 - (240 * percentage / 100) - 5} 165 ${260 - (240 * percentage / 100)} L 165 ${260 - (240 * percentage / 100) + 10} L 35 ${260 - (240 * percentage / 100) + 10} Z`}
                  fill={colors.waterSurface}
                  opacity="0.6"
                >
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values={`
                      M 35 ${260 - (240 * percentage / 100)} Q 60 ${260 - (240 * percentage / 100) - 5} 85 ${260 - (240 * percentage / 100)} T 135 ${260 - (240 * percentage / 100)} Q 150 ${260 - (240 * percentage / 100) - 5} 165 ${260 - (240 * percentage / 100)} L 165 ${260 - (240 * percentage / 100) + 10} L 35 ${260 - (240 * percentage / 100) + 10} Z;
                      M 35 ${260 - (240 * percentage / 100)} Q 60 ${260 - (240 * percentage / 100) + 5} 85 ${260 - (240 * percentage / 100)} T 135 ${260 - (240 * percentage / 100)} Q 150 ${260 - (240 * percentage / 100) + 5} 165 ${260 - (240 * percentage / 100)} L 165 ${260 - (240 * percentage / 100) + 10} L 35 ${260 - (240 * percentage / 100) + 10} Z;
                      M 35 ${260 - (240 * percentage / 100)} Q 60 ${260 - (240 * percentage / 100) - 5} 85 ${260 - (240 * percentage / 100)} T 135 ${260 - (240 * percentage / 100)} Q 150 ${260 - (240 * percentage / 100) - 5} 165 ${260 - (240 * percentage / 100)} L 165 ${260 - (240 * percentage / 100) + 10} L 35 ${260 - (240 * percentage / 100) + 10} Z
                    `}
                  />
                </path>
              </g>
              
              {/* Bucket handle */}
              <path
                d="M 60 20 Q 100 -10 140 20"
                fill="none"
                stroke="url(#bucketGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 rounded-lg px-4 py-2 shadow-md">
                <div className={`${colors.textColor} text-2xl font-bold`}>{percentage}%</div>
                <div className="text-gray-600 text-sm">Full</div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="flex-1 space-y-4">
          <div className={`${colors.bgColor} rounded-lg p-6 border ${colors.borderColor}`}>
            <h3 className={`${colors.textColor} font-semibold mb-3`}>Current Status</h3>
            <p className="text-gray-700">{message}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm mb-1">Total Capacity</div>
              <div className="text-gray-900 font-semibold">{totalCapacityMcm.toLocaleString()} MCM</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm mb-1">Current Volume</div>
              <div className="text-gray-900 font-semibold">{totalStorageMcm.toLocaleString()} MCM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

