import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import StepsChart from "../../components/HeartRateChart"; //Import per il grafico

const StepsPage = () => {
  const navigate = useNavigate();
  const [heartRateData, setHeartRateData] = useState([]);

  // Caricamento dati CSV
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCSV("/data/heart_rate.csv"); // Carica il CSV
      setHeartRateData(data); // Salva i dati nello stato
    };
    loadData();
  }, []);

  return (
    <>
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
          }}
        >
        <Segment style={{ padding: "40px", margin: "0 20px" }}>
  <Header as="h2">🗂️ Tabella della frequenza cardiaca giornaliera 🗂️</Header>
  <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
    La tabella riportata mostra i giorni della settimana e i valori della frequenza cardiaca rilevati quotidianamente.
    Ogni riga della tabella rappresenta un giorno specifico, mentre le colonne indicano la frequenza cardiaca media,
    minima e massima registrata. Le caselle con una frequenza cardiaca superiore a 100 bpm sono evidenziate in rosso,
    mentre quelle con una frequenza inferiore a 60 bpm sono evidenziate in blu. Questo permette di individuare
    rapidamente le giornate con valori fuori dal range ideale.
  </Header>

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
            <Header as="h2">📈 Grafico della frequenza cardiaca 📈</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Il grafico sottostante fornisce una rappresentazione visiva dell’andamento della frequenza cardiaca giornaliera. 
            La linea arancione indica la frequenza cardiaca media rilevata per ciascun giorno, mentre le aree viola e verdi rappresentano rispettivamente i valori minimi e massimi registrati. 
            Le linee tratteggiate rossa e blu segnano le soglie di riferimento per la frequenza cardiaca massima (100 bpm) e minima (60 bpm). 
            Questo confronto visivo permette di monitorare con facilità la variabilità della frequenza cardiaca e individuare eventuali valori fuori dal range ideale.
            </Header>
            <StepsChart data={heartRateData} />
          </Segment>
        </Container>
      </div>
    </>
  );
};

export default StepsPage;