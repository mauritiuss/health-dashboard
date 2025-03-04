import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import TemperatureChart from "../../components/TemperatureChart"; //Import per il grafico

const StepsPage = () => {
  const navigate = useNavigate();
  const [temperatureData, setTemperatureData] = useState([]);

    // Caricamento dati CSV
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchCSV("/data/temperature.csv"); // Carica il CSV
        setTemperatureData(data); // Salva i dati nello stato
      };
      loadData();
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
            flex: 1,
            flexDirection: "column",
            gap: "20px",
                }}
        >

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <Header as="h2">🌡️ Tabella delle temperature giornaliere 🌡️</Header>
          <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            La tabella riportata mostra i giorni della settimana e le temperature rilevate in tre momenti della giornata: mattina, pomeriggio e sera.
            Ogni riga rappresenta un giorno specifico, mentre le colonne indicano le temperature registrate nelle diverse fasce orarie.
            Eventuali temperature serali superiori a 37°C sono evidenziate in rosso, segnalando possibili condizioni di caldo anomalo.
          </Header>

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
            <Header as="h2">📈 Grafico delle temperature 📈</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Il grafico sottostante offre una rappresentazione visiva delle temperature giornaliere rilevate in tre momenti della giornata: mattina, pomeriggio e sera. 
            I punti gialli, arancioni e viola indicano rispettivamente le temperature registrate in queste fasce orarie, mentre la linea rossa rappresenta la temperatura media giornaliera. 
            Questo confronto visivo consente di osservare facilmente le variazioni di temperatura nell’arco della settimana e di individuare eventuali scostamenti rispetto alla media.
            </Header>
            <TemperatureChart data={temperatureData} />
          </Segment>

          <Segment style={{ padding: "40px", margin: "0 20px" }}>
            <Header as="h2">🧐 Spiegazione 🧐</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Mantenere una temperatura corporea stabile è fondamentale per il corretto funzionamento dell’organismo umano. 
            La termoregolazione, ovvero la capacità del corpo di mantenere la temperatura interna entro un intervallo fisiologico, coinvolge diversi sistemi corporei e meccanismi di controllo. <br />
            <Header as="h3">✅ Benefici associati a una corretta termoregolazione: </Header>
            <ul style={{ textAlign: 'justify', paddingLeft: '20px' }}>
              <li><b>Funzioni enzimatiche ottimali</b>: li enzimi, fondamentali per le reazioni biochimiche nel corpo, operano in modo efficiente a temperature specifiche. Una temperatura corporea stabile garantisce l'efficacia di processi come la digestione e la sintesi proteica</li>
              <li><b>Salute del sistema nervosoe</b>: un riposo adeguato contribuisce a regolare la pressione sanguigna e riduce il rischio di malattie cardiache e ictus.</li>
              <li><b>Efficienza metabolica</b>: il metabolismo energetico dipende dalla temperatura corporea. Fluttuazioni termiche possono alterare la produzione e l'utilizzo dell'energia, influenzando il peso corporeo e i livelli di energia.</li>
              <li><b>Risposta immunitaria efficace</b>: una temperatura corporea stabile supporta la capacità del sistema immunitario di combattere infezioni e malattie.</li>
              <li><b>Benessere generale</b>: maantenere una temperatura corporea equilibrata contribuisce al comfort fisico e al benessere psicologico, riducendo lo stress termico e migliorando la qualità della vita.</li>
            </ul>
            È importante notare che la temperatura corporea può variare leggermente tra gli individui e nel corso della giornata. Tuttavia, deviazioni significative dalla norma possono indicare condizioni patologiche e richiedono attenzione medica.
            </Header>
        </Segment>
    </Container>
    </div>
  );
};

export default StepsPage;