interface WaterBucketProps {
  percentage: number;
  message: string;
}

export function WaterBucket({ percentage, message }: WaterBucketProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
      <h2 className="text-blue-800 mb-6 text-center">
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
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.9 }} />
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
              <clipPath id="bucketClip">
                <path d="M 60 20 L 40 260 L 160 260 L 140 20 Z" />
              </clipPath>
              
              <g clipPath="url(#bucketClip)">
                {/* Water fill */}
                <rect
                  x="35"
                  y={260 - (240 * percentage / 100)}
                  width="130"
                  height={240 * percentage / 100}
                  fill="url(#waterGradient)"
                />
                
                {/* Water surface wave effect */}
                <path
                  d={`M 35 ${260 - (240 * percentage / 100)} Q 60 ${260 - (240 * percentage / 100) - 5} 85 ${260 - (240 * percentage / 100)} T 135 ${260 - (240 * percentage / 100)} Q 150 ${260 - (240 * percentage / 100) - 5} 165 ${260 - (240 * percentage / 100)} L 165 ${260 - (240 * percentage / 100) + 10} L 35 ${260 - (240 * percentage / 100) + 10} Z`}
                  fill="#60a5fa"
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
                <div className="text-blue-900 text-2xl font-bold">{percentage}%</div>
                <div className="text-gray-600 text-sm">Full</div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="flex-1 space-y-4">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-blue-900 font-semibold mb-3">Current Status</h3>
            <p className="text-gray-700">{message}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm mb-1">Total Capacity</div>
              <div className="text-gray-900 font-semibold">XXX MCM</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm mb-1">Current Volume</div>
              <div className="text-gray-900 font-semibold">XXX MCM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

