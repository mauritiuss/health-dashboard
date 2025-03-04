import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

const SleepChart = ({ data }) => {
  const maxSleep = Math.max(...data.map(d => d.sleep_hours), 9);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, maxSleep + 1]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="light_sleep" stackId="a" fill="#A3D8F4" name="Sonno leggero" />
          <Bar dataKey="deep_sleep" stackId="a" fill="#779ECB" name="Sonno profondo" />
          <Bar dataKey="rem_sleep" stackId="a" fill="#836FFF" name="Sonno REM" />
          <ReferenceLine y={8} stroke="red" strokeDasharray="5 5" strokeWidth={3}/>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: 'red', border: '1px dashed red' }}></div>
          <span>Obiettivo 8h</span>
        </div>
      </div>
    </div>
  );
};

export default SleepChart;