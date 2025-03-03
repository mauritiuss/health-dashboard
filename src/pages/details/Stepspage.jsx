import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import StepsChart from "../../components/StepsChart"; //Import per il grafico

const StepsPage = () => {
  const navigate = useNavigate();
  const [stepsData, setStepsData] = useState([]);

  // Caricamento dati CSV
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCSV("/data/steps.csv"); // Carica il CSV
      setStepsData(data); // Salva i dati nello stato
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
          <Segment raised>
            <Header as="h2">Tabella dei passi giornalieri</Header>
            <p>Di seguito viene riportata una tabella contenente i passi che hai effettuato durante la tua ultima settimana.</p>
            <p>In rosso sono presenti i giorni in cui non hai camminato per almeno 8000 passi.</p>

            <Table celled striped textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Giorno</Table.HeaderCell>
                  <Table.HeaderCell>Passi</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {stepsData.map((entry, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{entry.day}</Table.Cell>
                    <Table.Cell
                      style={{
                        backgroundColor: entry.steps < 8000 ? "#fc8c88" : "transparent",
                        color: entry.steps < 8000 ? "white" : "black",
                      }}
                    >
                      {entry.steps}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

          </Segment>

          <Segment raised>
            <Header as="h2">Grafico dei passi</Header>
            <StepsChart data={stepsData} />
          </Segment>
        </Container>
      </div>
    </>
  );
};

export default StepsPage;