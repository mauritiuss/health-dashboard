import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import HeartRateChart from "../../components/HeartRateChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati
import ReactMarkdown from 'react-markdown';

const StepsPage = () => {
  const navigate = useNavigate();
  const [heartRateData, setHeartRateData] = useState([]);
  const [heartDisclaimer, setheartDisclaimer] = useState(""); // Stato per il markdown
  const [heartTab, setheartTab] = useState(""); // Stato per il markdown
  const [heartChart, setheartChart] = useState(""); // Stato per il markdown
  const [heartExp, setheartExp] = useState(""); // Stato per il markdown

  // Caricamento dati CSV
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCSV("/data/heart_rate.csv"); // Carica il CSV
      setHeartRateData(data); // Salva i dati nello stato
    };
    loadData();

    // **Caricare il file markdown**
    fetch("/testo/heartDisclaimer.md")
    .then(response => response.text())
    .then(text => setheartDisclaimer(text))
    .catch(error => console.error("Errore nel caricamento del file markdown:", error));

        // **Caricare il file markdown**
        fetch("/testo/heartTab.md")
        .then(response => response.text())
        .then(text => setheartTab(text))
        .catch(error => console.error("Errore nel caricamento del file markdown:", error));
  
      fetch("/testo/heartChart.md")
        .then(response => response.text())
        .then(text => setheartChart(text))
        .catch(error => console.error("Errore nel caricamento del file markdown:", error));
      
      fetch("/testo/heartExp.md")
        .then(response => response.text())
        .then(text => setheartExp(text))
        .catch(error => console.error("Errore nel caricamento del file markdown:", error));
  }, []);

  return (
    <>
            <Helmet>
                <title>Frequenza cardiaca - Report Settimanale</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="frequenza cardiaca, salute, benessere, cuore, minima, massima, cardio" />
                <meta name="description" content="Visualizza la tua attività cardiaca settimanale con la tabella e il grafico delle frequenza cardiache." />
                <meta name="author" content="Health Dashboard" />
            </Helmet>
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
            flex: 1,
            flexDirection: "column",
            gap: "20px",
            textAlign: 'justify'
          }}
        >

        <Message warning style={{ textAlign: "justify", padding: "20px", margin: "0 20px" }}>
        <ReactMarkdown >{heartDisclaimer}</ReactMarkdown>
        </Message>
        
        <Segment style={{ padding: "40px", margin: "0 20px" }}>
  <ReactMarkdown >{heartTab}</ReactMarkdown>

  <Table celled striped textAlign="center">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Giorno</Table.HeaderCell>
        <Table.HeaderCell>Media (bpm)</Table.HeaderCell>
        <Table.HeaderCell>Minima (bpm)</Table.HeaderCell>
        <Table.HeaderCell>Massima (bpm)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {heartRateData.map((entry, index) => (
        <Table.Row key={index}>
          <Table.Cell>{entry.day}</Table.Cell>
          <Table.Cell
            style={{
              backgroundColor: entry.heart_rate > 100 ? "#ffc2c2" : entry.heart_rate < 60 ? "#c2d9ff" : "transparent",
              color: entry.heart_rate > 100 || entry.heart_rate < 60 ? "white" : "black",
            }}
          >
            {entry.heart_rate}
          </Table.Cell>
          <Table.Cell
            style={{
              backgroundColor: entry.min_heart_rate < 60 ? "#c2d9ff" : "transparent",
              color: entry.min_heart_rate < 60 ? "white" : "black",
            }}
          >
            {entry.min_heart_rate}
          </Table.Cell>
          <Table.Cell
            style={{
              backgroundColor: entry.max_heart_rate > 100 ? "#ffc2c2" : "transparent",
              color: entry.max_heart_rate > 100 ? "white" : "black",
            }}
          >
            {entry.max_heart_rate}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
        <ReactMarkdown >{heartChart}</ReactMarkdown>
            <HeartRateChart data={heartRateData} />
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
        <ReactMarkdown >{heartExp}</ReactMarkdown>
        </Segment>

        </Container>
      </div>
    </>
  );
};

export default StepsPage;