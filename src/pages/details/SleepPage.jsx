import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import SleepChart from "../../components/SleepChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati
import ReactMarkdown from 'react-markdown';

const StepsPage = () => {
  const navigate = useNavigate();
  const [sleepData, setSleepData] = useState([]);
  const [sleepTab, setsleepTab] = useState(""); // Stato per il markdown
  const [sleepChart, setsleepChart] = useState(""); // Stato per il markdown
  const [sleepExp, setsleepExp] = useState(""); // Stato per il markdown
  
    // Caricamento dati CSV
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchCSV("/data/sleep.csv"); // Carica il CSV
        setSleepData(data); // Salva i dati nello stato
      };
      loadData();

    // **Caricare il file markdown**
    fetch("/testo/sleepTab.md")
      .then(response => response.text())
      .then(text => setsleepTab(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));

    fetch("/testo/sleepChart.md")
      .then(response => response.text())
      .then(text => setsleepChart(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));
    
    fetch("/testo/sleepExp.md")
      .then(response => response.text())
      .then(text => setsleepExp(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));
    }, []);

    const daysBelowTarget = sleepData.filter(entry => entry.sleep_hours < 8).length;

    const getSuggestionMessage = (daysBelow) => {
      switch (daysBelow) {
        case 0:
          return "Ottimo lavoro! Hai dormito almeno 8 ore ogni notte. Continua così per mantenere il tuo benessere!";
        case 1:
          return "Solo una notte con meno di 8 ore di sonno. Cerca di mantenere questa costanza, magari andando a letto un po' prima.";
        case 2:
          return "Due notti con poco riposo. Valuta di creare una routine rilassante prima di dormire per migliorare la qualità del sonno.";
        case 3:
          return "Hai dormito poco per tre notti questa settimana. Prova a evitare schermi luminosi prima di dormire e mantieni orari regolari.";
        case 4:
          return "Quattro notti con meno di 8 ore di sonno. È importante dare priorità al riposo per la tua salute fisica e mentale.";
        case 5:
          return "Cinque notti con poco sonno. Prova a rilassarti con tecniche come la meditazione o la lettura prima di dormire.";
        case 6:
          return "Sei notti con poco riposo. Il tuo corpo ha bisogno di recuperare! Cerca di stabilire una routine del sonno regolare.";
        case 7:
          return "Non hai dormito abbastanza per tutta la settimana. È importante rivedere le tue abitudini e dare più spazio al riposo.";
        default:
          return "Dati non disponibili. Assicurati che il file CSV sia corretto.";
      }
    };

  return (
    <>
        <Helmet>
            <title>Ore di sonno - Report Settimanale</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="keywords" content="sonno, salute, benessere, dormire, REM, sonno leggero, sonno profondo" />
            <meta name="description" content="Visualizza la tua attività di sonno settimanale con la tabella e il grafico delle ore di sonno. Scopri i giorni in cui hai raggiunto l'obiettivo e ricevi suggerimenti personalizzati." />
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
          <ReactMarkdown >{sleepTab}</ReactMarkdown>

          <Table celled striped textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Giorno</Table.HeaderCell>
                <Table.HeaderCell>Ore totali</Table.HeaderCell>
                <Table.HeaderCell>Sonno leggero (h)</Table.HeaderCell>
                <Table.HeaderCell>Sonno profondo (h)</Table.HeaderCell>
                <Table.HeaderCell>Sonno REM (h)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sleepData.map((entry, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{entry.day}</Table.Cell>
                  <Table.Cell
                    style={{
                      backgroundColor: entry.sleep_hours < 8 ? "#ffc2c2" : entry.sleep_hours >= 8 ? "#c2ffc2" : "transparent",
                      color: entry.sleep_hours < 8 ? "white" : "black",
                    }}
                  >
                    {entry.sleep_hours}
                  </Table.Cell>
                  <Table.Cell>{entry.light_sleep}</Table.Cell>
                  <Table.Cell>{entry.deep_sleep}</Table.Cell>
                  <Table.Cell>{entry.rem_sleep}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
        <ReactMarkdown >{sleepChart}</ReactMarkdown>
            <SleepChart data={sleepData} />
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
        <ReactMarkdown >{sleepExp}</ReactMarkdown>
        <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify', fontSize: "14px" }}>
            {getSuggestionMessage(daysBelowTarget)}
          </Header>
        </Segment>



    </Container>
    </div>
    </>
  );
};

export default StepsPage;