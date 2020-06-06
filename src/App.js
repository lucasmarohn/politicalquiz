import React, { useState } from 'react';
import { Navbar, Section, Column, Container, Box, Title, Button, Content, Tag } from 'rbx'

import sourceData from './data/simpledata.json'
import ResultsContainer from './containers/ResultsContainer'
import QuizBox from './components/QuizBox'
import ResultBox from './components/ResultBox'
import ResultTotalBox from './components/ResultTotalBox'

import "rbx/index.css";
import './App.css';

function App() {
  const [beginQuiz, setBeginQuiz] = useState(false)
  const [skipQuiz, setSkipQuiz] = useState(false)

  const [quizInProgress, setQuizInProgress] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerData, setAnswerData] = useState([])
  const currentData = sourceData[currentIndex]

  const handleBeginQuiz = () => {
    setBeginQuiz(true)
  }

  const handleRestartQuiz = () => {
    setBeginQuiz(false)
    setSkipQuiz(false)
    setQuizInProgress(true)
    setCurrentIndex(0)
    setAnswerData([])
  }

  const handleSkipQuiz = () => {
    setBeginQuiz(false)
    setSkipQuiz(true)
  }

  const voteYes = () => {
    setAnswerData([...answerData, 'Yes'])
    incrementQuiz()
  }

  const voteNo = () => {
    setAnswerData([...answerData, 'No'])
    incrementQuiz()
  }

  const goBack = () => {
    const currentAnswerData = answerData
    
    if(currentIndex - 1 >= 0 ) {
      currentAnswerData.pop()
      setCurrentIndex(currentIndex - 1)
    }
  }

  const incrementQuiz = () => {
    if(currentIndex >= sourceData.length - 1) {
      // We're at the end of the quiz!
      setQuizInProgress(false)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="App">
      <Navbar>
      <Column.Group style={{margin: 0, width: '100%'}}>
        <Column align="left" style={{margin: '0', display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
            Congress Quiz
        </Column>
          
        <Column align="right" narrow>
          <Button style={{marginRight: '15px'}} onClick={handleRestartQuiz}>Restart Quiz</Button>
        </Column>
      </Column.Group>
      </Navbar>
      
      
      {!beginQuiz && !skipQuiz &&  
      <Container align="left" style={{height: '100vh', maxHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Box style={{maxWidth: '800px', margin: '0 auto', padding: '50px'}}>
          
          <Title size={1}>Hello!</Title>
          <Content align="left" size="medium">
            <p>Hi! Welcome to the quiz! Here's how it works:</p>

            <ul>
              <li>You'll be asked to vote <Tag size="medium" color="success">for</Tag> or <Tag size="medium" color="warning">against</Tag> 50 pieces of legislation that have been voted on by the United States Congress</li>
              <li>Each of these pieces of legislation will <strong>include a brief summary</strong> of the contents and intention of the legislation.</li>
              <li>The chosen legislation covers a broad range of topics</li>
              <li><strong>We include links to our sources</strong> (vote counts and the archive of the legislation) at the end of the quiz</li>
              <li>Some questions are duplicates, when a bill was voted on in the house and the senate. We include both versions in some cases.</li>
            </ul>
          </Content>

          <Button.Group size="large">
            <Button onClick={handleBeginQuiz} color="success">Begin the Quiz!</Button>
            <Button onClick={handleSkipQuiz} >Skip the Quiz</Button>
          </Button.Group>

        </Box>
      </Container>}


      { (beginQuiz && quizInProgress && !skipQuiz) && <QuizBox currentData={currentData} totalDataLength={sourceData.length} voteYes={voteYes} voteNo={voteNo} goBack={goBack} />}

      {(answerData.length > 0 && !quizInProgress) && <ResultTotalBox sourceData={sourceData} answerData={answerData} />}
      
      {(answerData.length > 0 && !quizInProgress) && 
        <ResultBox sourceData={sourceData} answerData={answerData} />
      }

      {skipQuiz && <Section><Container><Box><ResultsContainer dataSet={sourceData} /></Box></Container></Section>}
      
    </div>
  );
}

export default App;
