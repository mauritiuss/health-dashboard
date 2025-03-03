import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Segment, Header } from "semantic-ui-react";

const Documentation = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/bibliografia/bibliografia.md")
      .then((response) => response.text())
      .then((text) => {
        const cleanedMarkdown = text.replace(/^---[\s\S]*?---/, "").trim();
        setMarkdown(cleanedMarkdown);
      })
      .catch((error) => console.error("Errore nel caricamento del file Markdown:", error));
  }, []);

  const markdownComponents = {
    p: ({ children }) => <p style={{ marginBottom: "1.5rem" }}>{children}</p>,
    li: ({ children }) => <li style={{ marginBottom: "1rem" }}>{children}</li>,
  };

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
      <Container textAlign="left" style={{ maxWidth: "800px" }}>
        <Segment raised>
          <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
        </Segment>
      </Container>
    </div>
  );
};

export default Documentation;