import React from "react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const HeartRateChart = ({ data }) => {
  const maxHeartRate = Math.max(...data.map(d => d.max_heart_rate), 100);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[50, maxHeartRate + 10]} />
          <Tooltip />
          <Area type="monotone" dataKey="min_heart_rate" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
          <Area type="monotone" dataKey="max_heart_rate" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
          <Line type="monotone" dataKey="heart_rate" stroke="#ff7300" strokeWidth={3} />
          <ReferenceLine y={100} stroke="red" strokeDasharray="5 5" strokeWidth={3} />
          <ReferenceLine y={60} stroke="blue" strokeDasharray="3 3" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#ff7300' }}></div>
          <span>Frequenza cardiaca media</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#8884d8' }}></div>
          <span>Frequenza cardiaca minima</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#82ca9d' }}></div>
          <span>Frequenza cardiaca massima</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: 'red', border: '1px dashed red' }}></div>
          <span>Soglia massima 100 bpm</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: 'blue', border: '1px dashed blue' }}></div>
          <span>Soglia minima 60 bpm</span>
        </div>
      </div>
    </div>
  );
};

export default HeartRateChart;
