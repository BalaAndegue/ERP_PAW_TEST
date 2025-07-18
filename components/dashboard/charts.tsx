"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export function DashboardCharts() {
  return (
    <div className="col-span-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Évolution du CA</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Tiers</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}