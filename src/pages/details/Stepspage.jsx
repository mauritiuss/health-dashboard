import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import StepsChart from "../../components/StepsChart"; //Import per il grafico
import { Helmet } from 'react-helmet-async'; //Per i metadati

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
          }}
        >
          <Segment style={{ padding: "40px", margin: "0 20px" }}>
            <Header as="h2">🚶🏻‍♂️‍➡️ Tabella dei passi giornalieri 🚶🏻‍♂️‍➡️</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            La tabella riportata mostra i giorni della settimana e il numero di passi effettuati quotidianamente. 
            Ogni riga della tabella rappresenta un giorno specifico, mentre la colonna accanto indica il conteggio dei passi registrati.
            Eventuali caselle che contengono un numero di passi inferiore a 8000 sono evidenziate in rosso. 
            Questo accorgimento permette di individuare rapidamente i giorni in cui l'obiettivo giornaliero di attività fisica non è stato raggiunto, offrendo un'immediata visualizzazione delle giornate meno attive.
            </Header>

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
            <Header as="h2">📈 Grafico dei passi 📈</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Il grafico sottostante fornisce una rappresentazione visiva dell'andamento dei passi giornalieri.
            La linea viola rappresenta i passi effettivamente compiuti dall'utente, mentre la linea rossa indica l'obiettivo di passi da raggiungere ogni giorno. 
            Questo confronto visivo permette di valutare facilmente i giorni in cui non sono stati raggiunti i passi giornalieri.
            </Header>
            <StepsChart data={stepsData} />
          </Segment>

          <Segment style={{ padding: "40px", margin: "0 20px" }}>
            <Header as="h2">🧐 Spiegazione 🧐</Header>
            <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
            Camminare regolarmente è fondamentale per mantenere una buona salute generale. 
            Studi recenti hanno evidenziato che raggiungere un obiettivo di 8.000 passi al giorno può apportare numerosi benefici.<br />
                        <Header as="h3">✅ Benefici associati al raggiungimento di 8.000 passi al giorno: </Header>
            <ul style={{ textAlign: 'justify', paddingLeft: '20px' }}>
              <li><b>Riduzione del rischio di mortalità</b>: uno studio ha dimostrato che le persone che compiono circa 8.000 passi al giorno presentano un rischio di mortalità inferiore del 51% rispetto a chi ne compie solo 4.000. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Corriere della Sera, Salute, 2023]</a></li>
              <li><b>Benefici cardiovascolari</b>: camminare regolarmente contribuisce a migliorare la salute del cuore, riducendo il rischio di malattie cardiovascolari. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Kosuke Inoue, Amanda E. Paluch, 2023]</a></li>
              <li><b>Miglioramento del benessere generale</b> l’attività fisica moderata, come la camminata, favorisce il controllo del peso corporeo, migliora l’umore e aumenta i livelli di energia. <a href="/documentation" style={{ fontSize: '0.8em' }}>[Kosuke Inoue, Amanda E. Paluch, 2023]</a></li>
            </ul>
            È importante sottolineare che, sebbene l’obiettivo tradizionale sia spesso stato fissato a 10.000 passi giornalieri, recenti ricerche indicano che già con 8.000 passi si possono ottenere significativi benefici per la salute.
            </Header>
            <Header as="h2">💡 Suggerimenti 💡</Header>
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