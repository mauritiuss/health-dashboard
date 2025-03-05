import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import StepsChart from "../../components/StepsChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati
import ReactMarkdown from 'react-markdown';

const StepsPage = () => {
  const navigate = useNavigate();
  const [stepsData, setStepsData] = useState([]);
  const [stepsTab, setStepsTab] = useState(""); // Stato per il markdown
  const [stepsChart, setStepsChart] = useState(""); // Stato per il markdown
  const [stepsExp, setStepsExp] = useState(""); // Stato per il markdown

  // Caricamento dati CSV
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCSV("/data/steps.csv"); // Carica il CSV
      setStepsData(data); // Salva i dati nello stato
    };
    loadData();

    // **Caricare il file markdown**
    fetch("/testo/stepsTab.md")
      .then(response => response.text())
      .then(text => setStepsTab(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));

    fetch("/testo/stepsChart.md")
      .then(response => response.text())
      .then(text => setStepsChart(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));
    
    fetch("/testo/stepsExp.md")
      .then(response => response.text())
      .then(text => setStepsExp(text))
      .catch(error => console.error("Errore nel caricamento del file markdown:", error));
  }, []);

  const daysBelowTarget = stepsData.filter(entry => entry.steps < 8000).length; //Tengo traccia dei giorni con meno di 8000 passi

  const getSuggestionMessage = (daysBelow) => {
    switch (daysBelow) {
      case 0:
        return "Ottimo lavoro! Hai raggiunto il tuo obiettivo di passi ogni giorno della settimana. Continua così!";
      case 1:
        return "Hai avuto solo un giorno in cui non hai raggiunto l'obiettivo. È comunque un ottimo risultato! Cerca di mantenere questa costanza. Prova ad aggiungere una breve passeggiata serale.";
      case 2:
        return "Hai avuto due giorni in cui non hai raggiunto l'obiettivo. Va bene, ma potresti cercare di migliorare un po' la tua routine. Considera di fare una camminata durante la pausa pranzo.";
      case 3:
        return "Tre giorni in cui non hai raggiunto l'obiettivo. Forse è il momento di pianificare delle passeggiate più regolari. Potresti provare a usare le scale invece dell'ascensore.";
      case 4:
        return "Quattro giorni in cui non hai raggiunto l'obiettivo. Prova a fare piccoli cambiamenti, come fare una passeggiata dopo i pasti o parcheggiare più lontano dalla tua destinazione.";
      case 5:
        return "Cinque giorni in cui non hai raggiunto l'obiettivo. È importante dare più attenzione alla tua attività fisica quotidiana. Imposta un promemoria per alzarti e camminare ogni ora.";
      case 6:
        return "Sei giorni in cui non hai raggiunto l'obiettivo. Cerca di trovare motivazioni nuove, magari coinvolgendo un amico per camminare insieme o ascoltando podcast durante le passeggiate.";
      case 7:
        return "Non hai raggiunto l'obiettivo per tutta la settimana. È un buon momento per ripensare alla tua routine e trovare il modo di essere più attivo. Prova a pianificare delle camminate mattutine o serali.";
      default:
        return "Dati non disponibili. Assicurati che il file CSV sia corretto.";
    }
  };

  return (
    <>
    <Helmet>
        <title>Passi Giornalieri - Report Settimanale</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="steps, salute, benessere, camminare, passi" />
        <meta name="description" content="Visualizza la tua attività settimanale con la tabella e il grafico dei passi giornalieri. Scopri i giorni in cui hai raggiunto l'obiettivo e ricevi suggerimenti personalizzati." />
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
            <ReactMarkdown >{stepsTab}</ReactMarkdown>

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
                        backgroundColor: entry.steps < 8000 ? "#ffc2c2" : "transparent",
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

          <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <ReactMarkdown >{stepsChart}</ReactMarkdown>
            <StepsChart data={stepsData} />
          </Segment>

          <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <ReactMarkdown >{stepsExp}</ReactMarkdown>
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