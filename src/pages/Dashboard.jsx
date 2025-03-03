import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import CardInfo from "../components/CardInfo";
import { fetchCSV } from "../utils/csvReader"; //Import reader di file csv

const Dashboard = () => {
  const [averageSteps, setAverageSteps] = useState(0);
  const [averageBpm, setAverageBpm] = useState(0);
  const [averageSleep_hours, setAverageSleep_hours] = useState(0);
  const [averageTemperature, setAverageTemperature] = useState(0);

  //Calcolo media passi
  useEffect(() => {
    const getAverageSteps = async () => {
      try {
        const data = await fetchCSV("/data/steps.csv")
  
        if (!data || data.length === 0) {
          console.error("Il file CSV è vuoto o non è stato caricato correttamente.");
          return;
        }
  
        const totalSteps = data.reduce((sum, day) => {
          const steps = parseInt(day.steps, 10);
          if (isNaN(steps)) {
            console.error(`Valore non valido trovato: ${day.steps}`);
            return sum;
          }
          return sum + steps;
        }, 0);
  
        const average = totalSteps / data.length;
        setAverageSteps(`Media: ${Math.round(average).toLocaleString()} passi`);
      } catch (error) {
        console.error("Errore durante il calcolo della media dei passi:", error);
      }
    };
  
    getAverageSteps();
  }, []);

  //Calcolo media bmp
  useEffect(() => {
    const getAverageBpm = async () => {
      try {
        const data = await fetchCSV("/data/heart_rate.csv")
  
        if (!data || data.length === 0) {
          console.error("Il file CSV è vuoto o non è stato caricato correttamente.");
          return;
        }
  
        const totalBpm = data.reduce((sum, day) => {
          const heart_rate = parseInt(day.heart_rate, 10);
          if (isNaN(heart_rate)) {
            console.error(`Valore non valido trovato: ${day.heart_rate}`);
            return sum;
          }
          return sum + heart_rate;
        }, 0);
  
        const average = totalBpm / data.length;
        setAverageBpm(`Media: ${Math.round(average).toLocaleString()} bpm`);
      } catch (error) {
        console.error("Errore durante il calcolo della media dei bpm:", error);
      }
    };
  
    getAverageBpm();
  }, []);

  //Calcolo media ore di sonno
  useEffect(() => {
    const getAverageSleep_hours = async () => {
      try {
        const data = await fetchCSV("/data/sleep.csv")
  
        if (!data || data.length === 0) {
          console.error("Il file CSV è vuoto o non è stato caricato correttamente.");
          return;
        }
  
        const totalSleep_hours = data.reduce((sum, day) => {
          const sleep_hours = parseInt(day.sleep_hours, 10);
          if (isNaN(sleep_hours)) {
            console.error(`Valore non valido trovato: ${day.Sleep_hours}`);
            return sum;
          }
          return sum + sleep_hours;
        }, 0);
  
        const average = totalSleep_hours / data.length;
        setAverageSleep_hours(`Media: ${Math.round(average).toLocaleString()} h`);
      } catch (error) {
        console.error("Errore durante il calcolo della media delle ore di sonno:", error);
      }
    };
  
    getAverageSleep_hours();
  }, []);
  
  //Calcolo media temperatura
  useEffect(() => {
    const getAverageTemperature = async () => {
      try {
        const data = await fetchCSV("/data/temperature.csv")
  
        if (!data || data.length === 0) {
          console.error("Il file CSV è vuoto o non è stato caricato correttamente.");
          return;
        }
  
        const totalTemperature = data.reduce((sum, day) => {
          const temperature = parseInt(day.temperature, 10);
          if (isNaN(temperature)) {
            console.error(`Valore non valido trovato: ${day.Temperature}`);
            return sum;
          }
          return sum + temperature;
        }, 0);
  
        const average = totalTemperature / data.length;
        setAverageTemperature(`Media: ${Math.round(average).toLocaleString()} °C`);
      } catch (error) {
        console.error("Errore durante il calcolo della media delle temperature:", error);
      }
    };
  
    getAverageTemperature();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Container
        textAlign="center"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "800px",
        }}
      >
        <CardInfo title="Passi Giornalieri" value={averageSteps} icon="male" link="/steps"/>
        <CardInfo title="Frequenza Cardiaca" value={averageBpm} icon="heartbeat" link="/heart-rate"/>
        <CardInfo title="Ore di Sonno" value={averageSleep_hours} icon="bed" link="/sleep"/>
        <CardInfo title="Temperatura del Polso" value={averageTemperature} icon="thermometer half" link="/temperature"/>
        <CardInfo title="Riferimenti scientifici" value="Scopri di più" icon="info" link="/documentation"/>
      </Container>
    </div>
  );
};

export default Dashboard;