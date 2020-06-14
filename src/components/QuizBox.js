


import React from 'react';
import { Container, Column, Box, Title, Content, Button } from 'rbx'


function QuizBox({handleSkipQuiz, currentData, totalDataLength, voteYes, voteNo, goBack}) {
  return (
    <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh'}}>
      <Box style={{paddingTop: '100px', paddingBottom: '100px'}}>
        <Column.Group>
        <Column narrow style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          
        </Column>
        <Column>
          
          <Title size={4} style={{opacity: .3}}>{totalDataLength - currentData.id > 0 ? `${totalDataLength - currentData.id + 1} / ${totalDataLength} Questions Remaining` : 'Last Question!'}</Title>
          <Title style={{maxWidth: '600px',  marginLeft: 'auto', marginRight: 'auto'}}>{currentData.title}</Title>

          <Content size="medium" style={{maxWidth: 600, marginLeft: 'auto', marginRight: 'auto'}}>{currentData.summary}</Content>
          
          <Button.Group size="large" align="centered">
              <Button color="success" onClick={voteYes}>Vote For This Bill</Button>
              <Button color="warning" onClick={voteNo}>Vote Against This Bill</Button>
          </Button.Group>
          {currentData.id > 1 && 
            <Button onClick={goBack}>Back to Previous Question</Button>
          }
        </Column>

        <Column narrow>
        
        </Column>

          </Column.Group>
      </Box>
      <Button.Group>
        <Button style={{margin: '15px auto 0 auto', opacity: .5}} size="medium" onClick={handleSkipQuiz}>Skip Quiz and View Legislation</Button>
      </Button.Group>
    </Container>
  );
}

export default QuizBox;
