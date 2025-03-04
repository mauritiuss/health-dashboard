import React from "react";
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Funzione per creare cerchi personalizzati con contorno colorato e riempimento trasparente
const CustomCircle = ({ cx, cy, fill }) => {
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={8} // Regola la dimensione
      fill={fill} 
      fillOpacity={0.4} // Trasparenza del riempimento
      stroke={fill} // Colore del contorno
      strokeWidth={2} // Spessore del contorno
    />
  );
};

const TemperatureChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" type="category" allowDuplicatedCategory={false} />
          <YAxis domain={[34, 38]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Mattina" data={data} fill="#FFD700" shape={<CustomCircle />} dataKey="morningTemperature" />
          <Scatter name="Pomeriggio" data={data} fill="#FF8C00" shape={<CustomCircle />} dataKey="afternoonTemperature" />
          <Scatter name="Sera" data={data} fill="#483D8B" shape={<CustomCircle />} dataKey="eveningTemperature" />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#FF0000" 
            strokeWidth={2} 
            dot={false} 
            name="Media giornaliera"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;