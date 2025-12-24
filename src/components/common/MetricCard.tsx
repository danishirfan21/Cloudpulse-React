import React from 'react';
import { MetricCard as MetricCardType } from '../../types';

interface MetricCardProps extends MetricCardType {
  isHero?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  status = 'success',
  icon,
  isHero = false,
  className = ''
}) => {
  const statusColors = {
    success: '#00d084',
    warning: '#ffa502',
    error: '#ff4757'
  };

  const borderColor = statusColors[status];

  if (isHero) {
    return (
      <div className={`bg-[#1a1f29] rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow min-h-[140px] flex flex-col justify-between ${className}`}
           style={{ borderTop: `4px solid ${borderColor}` }}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-[#8b93a7] uppercase tracking-wide opacity-50">
            {title}
          </h3>
          {icon && <div className="animate-scale-once">{icon}</div>}
        </div>
        <div className="text-7xl font-semibold tabular-nums mb-1 text-white" 
             style={{ letterSpacing: '-0.02em', lineHeight: 1 }}>
          {value}
          {unit && <span className="text-3xl">{unit}</span>}
        </div>
        {change && (
          <div className={`text-[13px] font-medium mb-3 text-[${borderColor}]`}
               style={{ textShadow: `0 0 12px ${borderColor}15` }}>
            {change}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-[#1a1f29] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow min-h-[100px] flex flex-col justify-between ${className}`}
         style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-[#8b93a7] uppercase tracking-wide opacity-50">
          {title}
        </h3>
        {icon}
      </div>
      <div className="text-[40px] font-semibold tabular-nums mb-1 text-white"
           style={{ letterSpacing: '-0.01em', lineHeight: 1 }}>
        {value}
        {unit && <span className="text-xl opacity-60">{unit}</span>}
      </div>
      {change && (
        <div className={`text-xs flex items-center gap-1 mb-2 text-[${borderColor}]`}>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
