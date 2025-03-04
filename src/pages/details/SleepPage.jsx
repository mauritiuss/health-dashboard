import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import SleepChart from "../../components/SleepChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati

const StepsPage = () => {
  const navigate = useNavigate();
  const [sleepData, setSleepData] = useState([]);
  
    // Caricamento dati CSV
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchCSV("/data/sleep.csv"); // Carica il CSV
        setSleepData(data); // Salva i dati nello stato
      };
      loadData();
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
            <meta name="description" content="Visualizza la tua attività di sonno settimanale con la tabella e il grafico delle ore di sonno. Scopri i giorni in cui hai raggiunto l'obiettivo e ricevi suggerimenti personalizzati." />
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
                }}
        >
        <Segment style={{ padding: "40px", margin: "0 20px" }}>
          <Header as="h2">🌙 Tabella delle ore di sonno 🌙</Header>
          <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            La tabella riportata mostra i giorni della settimana e le ore di sonno rilevate quotidianamente.
            Ogni riga della tabella rappresenta un giorno specifico, mentre le colonne indicano il totale delle ore di sonno,
            suddivise nelle diverse fasi: sonno leggero, sonno profondo e sonno REM.
            Le caselle con un totale di ore di sonno inferiore a 8 sono evidenziate in rosso, mentre quelle con almeno 8 ore sono evidenziate in verde.
            Questo permette di individuare rapidamente le giornate con un riposo non ottimale o particolarmente prolungato.
          </Header>

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
            <Header as="h2">📈 Grafico delle ore di sonno 📈</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Il grafico sottostante fornisce una rappresentazione visiva della qualità e della durata del sonno giornaliero. 
            Le barre colorate mostrano la suddivisione delle diverse fasi del sonno: il sonno leggero in azzurro, il sonno profondo in blu e il sonno REM in viola. 
            La linea tratteggiata rossa indica l’obiettivo raccomandato di 8 ore di sonno per notte. 
            Questo confronto visivo permette di monitorare facilmente il totale delle ore di riposo e la distribuzione delle varie fasi, aiutando a valutare la qualità complessiva del sonno.
            </Header>
            <SleepChart data={sleepData} />
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
            <Header as="h2">🧐 Spiegazione 🧐</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Dormire regolarmente per circa 8 ore a notte è fondamentale per mantenere una buona salute generale, in quanto permette all'organismo di recuperare le energie consumate durante il giorno e svolgere importanti funzioni di rigenerazione. 
            Un riposo adeguato favorisce il corretto funzionamento di vari sistemi del corpo, contribuendo al benessere fisico, mentale ed emotivo. 
            Rispettare un ciclo di sonno regolare aiuta a stabilizzare l'orologio biologico, migliorando la qualità della vita quotidiana e le performance in diverse attività.<br />
            <Header as="h3">✅ Benefici associati a un sonno adeguato: </Header>
            <ul style={{ textAlign: 'justify', paddingLeft: '20px' }}>
              <li><b>Miglioramento delle funzioni cognitive</b>: durante il sonno, il cervello elabora le informazioni acquisite durante il giorno, consolidando la memoria e migliorando le capacità di apprendimento. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Microbiologia Italia, 2024]</a></li>
              <li><b>Salute cardiovascolare</b>: un riposo adeguato contribuisce a regolare la pressione sanguigna e riduce il rischio di malattie cardiache e ictus. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Microbiologia Italia, 2024]</a></li>
              <li><b>Rafforzamento del sistema immunitario</b>: dormire a sufficienza aiuta a rafforzare le difese immunitarie, rendendo l’organismo più resistente alle infezioni. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Interlab Analisi, 2024]</a></li>
              <li><b>Regolazione del metabolismo</b>: il sonno influisce sulla produzione di ormoni che controllano l’appetito e il metabolismo, contribuendo alla prevenzione di obesità e diabete. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Rete HPH Italia, 2024]</a></li>
              <li><b>Benessere mentale</b>: un sonno di qualità migliora l’umore, riduce lo stress e favorisce l’equilibrio emotivo. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Guida Psicologi, 2024]</a></li>
            </ul>
            È importante sottolineare che la quantità di sonno necessaria può variare da persona a persona; tuttavia, gli esperti raccomandano generalmente tra le 7 e le 9 ore di sonno per notte per garantire un benessere ottimale.
            </Header>
            <Header as="h2">💡 Suggerimenti personalizzati 💡</Header>
          <Header as="p" style={{ fontWeight: 'normal', textAlign: 'center' }}>
            {getSuggestionMessage(daysBelowTarget)}
          </Header>
        </Segment>



    </Container>
    </div>
    </>
  );
};

export default StepsPage;