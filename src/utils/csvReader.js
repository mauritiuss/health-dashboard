import Papa from "papaparse";

export const fetchCSV = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,  // Interpreta la prima riga come intestazione
        skipEmptyLines: true, 
        complete: (result) => resolve(result.data), 
      });
    });
  } catch (error) {
    console.error("Errore nel caricamento del file CSV:", error);
    return [];
  }
};