import React, { useState, useEffect, useRef } from "react";
import { Container, Header, Segment, Table, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { fetchCSV } from "../../utils/csvReader"; //Import per leggere i file CSV
import HeartRateChart from "../../components/HeartRateChart"; //Import per il grafico

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

        <Message warning style={{ textAlign: "justify", padding: "20px", margin: "0 20px" }}>
            <Message.Header>⚠️ Disclaimer ⚠️</Message.Header>
            <p>
            Ogni individuo è unico e la frequenza cardiaca può variare in base a numerosi fattori, come l'età, lo stile di vita, il livello di attività fisica, lo stato emotivo e la presenza di eventuali condizioni mediche. 
            I dati riportati sono puramente informativi e non sostituiscono il parere di un professionista sanitario. 
            Per una corretta interpretazione della propria frequenza cardiaca e una valutazione personalizzata, è fondamentale consultare un medico o uno specialista.
            </p>
        </Message>
        
        <Segment style={{ padding: "40px", margin: "0 20px" }}>
  <Header as="h2">🫀 Tabella della frequenza cardiaca giornaliera 🫀</Header>
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
            <HeartRateChart data={heartRateData} />
        </Segment>

        <Segment style={{ padding: "40px", margin: "0 20px" }}>
                    <Header as="h2">🧐 Spiegazione 🧐</Header>
                    <Header as="p" style={{ fontWeight: 'normal', textAlign: 'justify' }}>
                    Mantenere una frequenza cardiaca entro un range ottimale è essenziale per la salute cardiovascolare e il benessere generale. 
                    Studi recenti hanno evidenziato che una frequenza cardiaca a riposo compresa tra 60 e 100 battiti al minuto (bpm) è considerata normale, ma mantenersi tra 50 e 70 bpm può offrire ulteriori benefici per la salute.<br />
                    <Header as="h3">✅ Vantaggi associati a una frequenza cardiaca ottimale: </Header>
                    <ul style={{ textAlign: 'justify', paddingLeft: '20px' }}>
                      <li><b>Riduzione del rischio cardiovascolare</b>: diversi studi hanno dimostrato che una frequenza cardiaca a riposo inferiore a 75-80 bpm è associata a un minor rischio di infarto, ictus e altre patologie cardiache.</li>
                      <li><b>Migliore efficienza del cuore</b>: una frequenza cardiaca più bassa indica un cuore che lavora in modo più efficiente, riducendo lo sforzo necessario per pompare il sangue. Questo è spesso riscontrato negli atleti e nelle persone fisicamente attive</li>
                      <li><b>Aumento della longevità</b>: studi suggeriscono che chi mantiene una frequenza cardiaca più bassa a riposo ha spesso una maggiore aspettativa di vita e una migliore qualità della salute.</li>
                    </ul>
                    Sebbene una frequenza compresa tra 60 e 100 bpm sia considerata nella norma, puntare a valori tra 50 e 70 bpm può offrire ulteriori vantaggi. È sempre consigliabile monitorare la propria frequenza cardiaca e consultare un medico in caso di valori costantemente troppo alti o troppo bassi.
                    </Header>
        </Segment>

        </Container>
      </div>
    </>
  );
};

export default StepsPage;