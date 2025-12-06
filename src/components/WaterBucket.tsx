import { useId, useEffect, useState, useRef, useMemo } from 'react';

interface WaterBucketProps {
  percentage: number;
  message: string;
  totalCapacityMcm: number;
  totalStorageMcm: number;
}

interface WaterSurfaceWaveProps {
  waterLevel: number;
  color: string;
}

function WaterSurfaceWave({ waterLevel, color }: WaterSurfaceWaveProps) {
  const waveId = useId();
  const wavePath = useMemo(() => {
    const baseY = waterLevel;
    return `M 35 ${baseY} Q 60 ${baseY - 5} 85 ${baseY} T 135 ${baseY} Q 150 ${baseY - 5} 165 ${baseY} L 165 ${baseY + 10} L 35 ${baseY + 10} Z`;
  }, [waterLevel]);

  const wavePathUp = useMemo(() => {
    const baseY = waterLevel;
    return `M 35 ${baseY} Q 60 ${baseY + 5} 85 ${baseY} T 135 ${baseY} Q 150 ${baseY + 5} 165 ${baseY} L 165 ${baseY + 10} L 35 ${baseY + 10} Z`;
  }, [waterLevel]);

  return (
    <path
      d={wavePath}
      fill={color}
      opacity="0.6"
      key={`wave-${waveId}-${waterLevel}`}
    >
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values={`${wavePath};${wavePathUp};${wavePath}`}
      />
    </path>
  );
}

type StatusLevel = 'emergency' | 'orange' | 'amber' | 'green';

function getStatusLevel(percentage: number): StatusLevel {
  if (percentage < 25) return 'emergency';
  if (percentage < 40) return 'orange';
  if (percentage < 60) return 'amber';
  return 'green';
}

function getStatusColors(status: StatusLevel) {
  switch (status) {
    case 'emergency':
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
    case 'amber':
      return {
        waterGradient: { start: '#f59e0b', end: '#d97706' }, // amber-500 to amber-600
        waterSurface: '#fbbf24', // amber-400
        textColor: 'text-amber-900',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        titleColor: 'text-amber-800',
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
  const [animatedPercentage, setAnimatedPercentage] = useState(percentage);
  const [displayPercentage, setDisplayPercentage] = useState(percentage);
  const previousPercentageRef = useRef(percentage);
  const animationFrameRef = useRef<number | null>(null);
  const currentAnimatedRef = useRef(percentage);
  const status = getStatusLevel(percentage);
  const colors = getStatusColors(status);
  const gradientId = `waterGradient-${status}-${uniqueId}`;
  const clipPathId = `bucketClip-${status}-${uniqueId}`;

  useEffect(() => {
    // Only animate if percentage actually changed
    if (previousPercentageRef.current !== percentage) {
      // Cancel any ongoing animation
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const startPercentage = currentAnimatedRef.current; // Start from current animated position
      const endPercentage = percentage;
      const duration = 1500; // 1.5 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentPercentage = startPercentage + (endPercentage - startPercentage) * easedProgress;
        currentAnimatedRef.current = currentPercentage;
        setAnimatedPercentage(currentPercentage);
        
        // Update display percentage with rounding
        setDisplayPercentage(Math.round(currentPercentage));

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          currentAnimatedRef.current = endPercentage;
          setAnimatedPercentage(endPercentage);
          setDisplayPercentage(Math.round(endPercentage));
          previousPercentageRef.current = endPercentage;
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function to cancel animation on unmount
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [percentage]);

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
                  y={260 - (240 * animatedPercentage / 100)}
                  width="130"
                  height={240 * animatedPercentage / 100}
                  fill={`url(#${gradientId})`}
                  style={{
                    transition: 'y 0.1s ease-out, height 0.1s ease-out'
                  }}
                />
                
                {/* Water surface wave effect */}
                <WaterSurfaceWave 
                  waterLevel={260 - (240 * animatedPercentage / 100)}
                  color={colors.waterSurface}
                />
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
                <div className={`${colors.textColor} text-2xl font-bold transition-all duration-300`}>{displayPercentage}%</div>
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

