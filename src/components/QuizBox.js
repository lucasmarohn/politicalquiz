


import React from 'react';
import { Container, Box, Title, Content, Button } from 'rbx'


function QuizBox({currentData, totalDataLength, voteYes, voteNo}) {
  return (
    <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh'}}>
      <Box style={{paddingTop: '100px', paddingBottom: '100px'}}>
          <Title size={4} style={{opacity: .3}}>{totalDataLength - currentData.id > 0 ? `${totalDataLength - currentData.id} Questions Remaining` : 'Last Question!'}</Title>
          <Title style={{maxWidth: '600px',  marginLeft: 'auto', marginRight: 'auto'}}>{currentData.title}</Title>

          <Content size="medium" style={{maxWidth: 600, marginLeft: 'auto', marginRight: 'auto'}}>{currentData.summary}</Content>
          
          <Button.Group size="large" align="centered">
              <Button color="success" onClick={voteYes}>Vote For This Bill</Button>
              <Button color="warning" onClick={voteNo}>Vote Against This Bill</Button>
          </Button.Group>
      </Box>
    </Container>
  );
}

export default QuizBox;
