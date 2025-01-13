/**
 * @fileoverview Language graph component that visualizes the languages used.
 */
import React from "react";
import './Graphs.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function LanguageGraph({ languagedata }) {

    // Transform the language data into an array of objects with name and value properties.
  const LanguageArr = Object.keys(languagedata.data).map((key) => ({
    name: key,
    value: languagedata.data[key], // Count of the language used.
  }));

  return (
    <div className="p-2">

      {/* Title */}
      <h4 className="text-center text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r text-[#05CBDC]">
        Languages Used
      </h4>

      {/* Chart Container :  make the chart responsive */}
      <ResponsiveContainer width="100%" height={400}>

          {/* Radar chart for visualizing language usage */}
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={LanguageArr}>

            {/* Polar grid lines for better readability of the chart */}
          <PolarGrid stroke="url(#gridGradient)" strokeOpacity={0.5} />

            {/* Axis for language names around the radar chart */}
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "url(#textGradient)", fontSize: 14, fontWeight: "bold" }}
          />

            {/* Radius axis for numeric values (usage counts) */}
          <PolarRadiusAxis
            angle={30}
            domain={[0, Math.max(...LanguageArr.map((item) => item.value))]}
            tick={{ fill: "url(#textGradient)", fontSize: 12 }}
          />

            {/* Radar graph (shaded area) representing language usage */}
          <Radar
            name="Usage Count"
            dataKey="value"
            stroke="url(#strokeGradient)"
            fill="url(#fillGradient)"
            fillOpacity={0.8}
          />

          {/* Tooltip  to display the count of  language */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              color: "#a1a1aa",
            }}
            formatter={(value) => [`${value}`, "Count"]}
            itemStyle={{ color: "cyan" }}
          />

        </RadarChart>
      </ResponsiveContainer>

        {/* SVG gradients for styling the chart (colors for stroke, fill, grid, and text) */}
      <svg>
        <defs>
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}
