import { Container, Grid, Header, Button, Segment } from "semantic-ui-react";

function App() {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment textAlign="center" padded="very">
              <Header as="h1">Health Dashboard</Header>
              <p>Benvenuto nella tua dashboard di monitoraggio della salute.</p>
              <Button primary>Scopri i tuoi dati</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;