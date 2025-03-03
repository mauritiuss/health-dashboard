import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const StepsChart = ({ data }) => {
  const maxSteps = Math.max(...data.map(d => d.steps), 10000);

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, maxSteps + 1000]} />
          <Tooltip />
          <Line type="monotone" dataKey="steps" stroke="#8884d8" strokeWidth={3} />
          <ReferenceLine y={8000} stroke="red" strokeDasharray="5 5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#8884d8' }}></div>
          <span>Passi giornalieri</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: 'red', border: '1px dashed red' }}></div>
          <span>Obiettivo 8000 passi</span>
        </div>
      </div>
    </div>
  );
};

export default StepsChart;
