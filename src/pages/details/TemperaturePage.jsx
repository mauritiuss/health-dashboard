import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import TemperatureChart from "../../components/TemperatureChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati
import ReactMarkdown from 'react-markdown';

const StepsPage = () => {
  const navigate = useNavigate();
  const [temperatureData, setTemperatureData] = useState([]);
  const [temperatureTab, settemperatureTab] = useState(""); // Stato per il markdown
  const [temperatureChart, settemperatureChart] = useState(""); // Stato per il markdown
  const [temperatureExp, settemperatureExp] = useState(""); // Stato per il markdown

    // Caricamento dati CSV
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchCSV("/data/temperature.csv"); // Carica il CSV
        setTemperatureData(data); // Salva i dati nello stato
      };
      loadData();

          // **Caricare il file markdown**
    fetch("/testo/temperatureTab.md")
    .then(response => response.text())
    .then(text => settemperatureTab(text))
    .catch(error => console.error("Errore nel caricamento del file markdown:", error));

  fetch("/testo/temperatureChart.md")
    .then(response => response.text())
    .then(text => settemperatureChart(text))
    .catch(error => console.error("Errore nel caricamento del file markdown:", error));
  
  fetch("/testo/temperatureExp.md")
    .then(response => response.text())
    .then(text => settemperatureExp(text))
    .catch(error => console.error("Errore nel caricamento del file markdown:", error));
    }, []);

  return (
    <>
    <Helmet>
            <title>Temperatura del polso - Report Settimanale</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="keywords" content="temperatura, salute, benessere, gradi, polso" />
            <meta name="description" content="Visualizza la tua temperatura settimanale con la tabella e il grafico delle temperature." />
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

          <Segment style={{ padding: "40px", margin: "0 20px" }}>
            <ReactMarkdown >{temperatureTab}</ReactMarkdown>

            <Table celled striped textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Giorno</Table.HeaderCell>
                  <Table.HeaderCell>Mattina (°C)</Table.HeaderCell>
                  <Table.HeaderCell>Pomeriggio (°C)</Table.HeaderCell>
                  <Table.HeaderCell>Sera (°C)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {temperatureData.map((entry, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{entry.day}</Table.Cell>
                    <Table.Cell>{entry.morningTemperature}</Table.Cell>
                    <Table.Cell>{entry.afternoonTemperature}</Table.Cell>
                    <Table.Cell
                      style={{
                        backgroundColor: entry.eveningTemperature > 37 ? "#ffc2c2" : "transparent",
                        color: entry.eveningTemperature > 37 ? "white" : "black",
                      }}
                    >
                      {entry.eveningTemperature}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>

            <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <ReactMarkdown >{temperatureChart}</ReactMarkdown>
              <TemperatureChart data={temperatureData} />
            </Segment>

            <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <ReactMarkdown >{temperatureExp}</ReactMarkdown>
          </Segment>
      </Container>
      </div>
    </>
  );
};

export default StepsPage;