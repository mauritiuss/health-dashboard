import { useState, useEffect } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { Helmet } from 'react-helmet-async';
import CardInfo from "../components/CardInfo";
import { fetchCSV } from "../utils/csvReader";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CompletionProgress = ({ steps, bpm, sleep, temp }) => {
  let score = 0;

  if (steps > 8000) score++;
  if (bpm >= 60 && bpm <= 100) score++;
  if (sleep >= 8) score++;
  if (temp >= 34.5 && temp <= 37) score++;

  const percentage = (score / 4) * 100;

  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#4CAF50",
          pathColor: "#4CAF50",
          trailColor: "#eee",
          textSize: '16px'
        })}
      />
    </div>
  );
};

const Dashboard = () => {
  const [averageSteps, setAverageSteps] = useState(0);
  const [averageBpm, setAverageBpm] = useState(0);
  const [averageSleepHours, setAverageSleepHours] = useState(0);
  const [averageTemperature, setAverageTemperature] = useState(0);

  useEffect(() => {
    const getAverage = async (path, key, setFunction) => {
      try {
        const data = await fetchCSV(path);

        if (!data || data.length === 0) {
          console.error(`Il file CSV ${path} è vuoto o non è stato caricato correttamente.`);
          return;
        }

        const total = data.reduce((sum, day) => {
          const value = parseFloat(day[key]);
          if (isNaN(value)) {
            console.error(`Valore non valido trovato: ${day[key]}`);
            return sum;
          }
          return sum + value;
        }, 0);

        const average = total / data.length;
        setFunction(average);
      } catch (error) {
        console.error(`Errore durante il calcolo della media di ${key}:`, error);
      }
    };

    getAverage("/data/steps.csv", "steps", setAverageSteps);
    getAverage("/data/heart_rate.csv", "heart_rate", setAverageBpm);
    getAverage("/data/sleep.csv", "sleep_hours", setAverageSleepHours);
    getAverage("/data/temperature.csv", "temperature", setAverageTemperature);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard del Benessere - Report Settimanale</title>
        <meta name="description" content="Visualizza il report settimanale dei tuoi parametri di benessere: passi giornalieri, frequenza cardiaca, ore di sonno e temperatura del polso." />
        <meta name="keywords" content="dashboard, salute, benessere, passi, frequenza cardiaca, sonno, temperatura" />
        <meta name="description" content="Visualizza il report settimanale con il grafico di completamento delle quattro categorie." />
        <meta name="author" content="Health Dashboard" />
      </Helmet>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        alignItems: "flex-start",
        maxWidth: "1000px",
        width: "100%",
      }}>
        <Container style={{ flex: 1, minWidth: "300px"}}>
          <Segment style={{ padding: "40px", marginBottom: "40px" }}>
            <Header as="h2">Dashboard del tuo benessere</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Con questa dashboard puoi visualizzare un report settimanale dei valori registrati sui tuoi parametri di benessere: passi giornalieri, frequenza cardiaca, ore di sonno e temperatura del polso. 
            Monitorare costantemente questi indicatori è fondamentale per tenere sotto controllo il tuo stato di salute generale e adottare, se necessario, abitudini più equilibrate per migliorare il tuo benessere quotidiano.
            </Header>
          </Segment>
        </Container>

        <Container style={{ flex: 1, 
          minWidth: "300px", 
          display: 'flex', 
          justifyContent: 'center', 
          flexDirection: "column"}}>
        <Segment style={{ 
          padding: "40px", 
          marginBottom: "40px", 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Questo grafico mostra il tuo punteggio di completamento in base alle quattro categorie chiave: passi giornalieri, frequenza cardiaca, ore di sonno e temperatura del polso.
            </Header>
            <CompletionProgress
              steps={averageSteps}
              bpm={averageBpm}
              sleep={averageSleepHours}
              temp={averageTemperature}
            />
        </Segment>
        </Container>
      </div>

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
        <CardInfo title="Passi Giornalieri" value={`Media: ${Math.round(averageSteps).toLocaleString()} passi`} icon="male" link="/steps" />
        <CardInfo title="Frequenza Cardiaca" value={`Media: ${Math.round(averageBpm).toLocaleString()} bpm`} icon="heartbeat" link="/heart-rate" />
        <CardInfo title="Ore di Sonno" value={`Media: ${Math.round(averageSleepHours).toLocaleString()} h`} icon="bed" link="/sleep" />
        <CardInfo title="Temperatura del Polso" value={`Media: ${Math.round(averageTemperature).toLocaleString()} °C`} icon="thermometer half" link="/temperature" />
        <CardInfo title="Riferimenti scientifici" value="Scopri di più" icon="info" link="/documentation"/>
      </Container>
    </div>
  );
};

export default Dashboard;
