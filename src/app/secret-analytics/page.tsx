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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('/api/analytics/secret', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const json = await response.json();
        setData(json);
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">Secret Analytics</h1>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter access token"
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={fetchData}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Access Analytics
          </button>
        </div>
      </div>
    );
  }

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