"use client";

interface CylinderProps {
  level: number;
  status: 'critical' | 'warning' | 'normal';
  name: string;
}

export function Cylinder({ level, status }: CylinderProps) {
  const getWaterColor = () => {
    switch (status) {
      case 'critical':
        return 'from-red-400 to-red-600';
      case 'warning':
        return 'from-orange-400 to-orange-600';
      case 'normal':
        return 'from-blue-400 to-blue-600';
    }
  };

  const waterHeight = Math.max(5, level);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-64">
        {/* Cylinder body */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border-4 border-gray-300 overflow-hidden">
          {/* Water fill */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${waterHeight}%` }}
          >
            {/* Water wave effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-white opacity-20 animate-pulse"></div>
          </div>
          
          {/* Glass shine effect */}
          <div className="absolute top-0 left-2 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-40"></div>
        </div>

        {/* Top ellipse */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-8">
          <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-[50%] border-4 border-gray-300"></div>
        </div>

        {/* Bottom ellipse */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8">
          <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 rounded-[50%] border-4 border-gray-300"></div>
        </div>

        {/* Level indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-lg">
          <p className="text-gray-900 font-semibold">{level}%</p>
        </div>
      </div>
    </div>
  );
}

