"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

export function DashboardChartsFallback() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Données pour les graphiques
  const lineData = [
    { month: 'Jan', value: 400 },
    { month: 'Fév', value: 300 },
    { month: 'Mar', value: 600 },
    { month: 'Avr', value: 800 },
    { month: 'Mai', value: 500 },
    { month: 'Jun', value: 900 },
  ];

  const barData = [
    { name: 'Clients', value: 1200 },
    { name: 'Fournisseurs', value: 800 },
    { name: 'Partenaires', value: 400 },
    { name: 'Prospects', value: 600 },
  ];

  // Fonction pour créer un graphique en ligne simple avec SVG
  const renderLineChart = () => {
    const maxValue = Math.max(...lineData.map(item => item.value));
    const chartHeight = 280;
    const chartWidth = 500;
    const padding = 10;
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Axes */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />
        
        {/* Data points and line */}
        {lineData.map((item, index) => {
          const x = padding + (index * (chartWidth - 2 * padding) / (lineData.length - 1));
          const y = chartHeight - padding - (item.value / maxValue) * (chartHeight - 2 * padding);
          
          return (
            <g key={item.month}>
              {/* Point */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
              />
              
              {/* Line to next point */}
              {index < lineData.length - 1 && (
                <line
                  x1={x}
                  y1={y}
                  x2={padding + ((index + 1) * (chartWidth - 2 * padding) / (lineData.length - 1))}
                  y2={chartHeight - padding - (lineData[index + 1].value / maxValue) * (chartHeight - 2 * padding)}
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              )}
              
              {/* Month label */}
              <text
                x={x}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {item.month}
              </text>
              
              {/* Value label */}
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#3b82f6"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Fonction pour créer un graphique en barres simple avec SVG
  const renderBarChart = () => {
    const maxValue = Math.max(...barData.map(item => item.value));
    const chartHeight = 280;
    const chartWidth = 500;
    const padding = 10;
    const barWidth = 60;
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Axes */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />
        
        {/* Bars */}
        {barData.map((item, index) => {
          const x = padding + (index * (chartWidth - 2 * padding) / barData.length) + 20;
          const barHeight = (item.value / maxValue) * (chartHeight - 2 * padding);
          const y = chartHeight - padding - barHeight;
          
          return (
            <g key={item.name}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#3b82f6"
                rx="2"
              />
              
              {/* Name label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {item.name}
              </text>
              
              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={y - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#3b82f6"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  if (!isClient) {
    return (
      <div className="col-span-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du CA</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-gray-500">Chargement du graphique...</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Tiers</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-gray-500">Chargement du graphique...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="col-span-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Évolution du CA</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          {renderLineChart()}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Tiers</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          {renderBarChart()}
        </CardContent>
      </Card>
    </div>
  );
}