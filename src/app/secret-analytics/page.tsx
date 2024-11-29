"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  activeViewers: number;
  pageViews: {
    [key: string]: number;
  };
}

export default function SecretAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/analytics/secret');
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Viewers</h2>
          <p className="text-3xl">{data?.activeViewers || 0}</p>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Page Views</h2>
          <p className="text-3xl">
            {Object.values(data?.pageViews || {}).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Page Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4">Path</th>
                <th className="text-left p-4">Views</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data?.pageViews || {}).map(([path, views]) => (
                <tr key={path}>
                  <td className="p-4">{path}</td>
                  <td className="p-4">{views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 