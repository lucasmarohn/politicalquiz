import React, { useState } from 'react';
import { Section, Container, Box, Title, Button, Content, Tag } from 'rbx'

import Cookies from 'js-cookie'

import sourceData from './data/simpledata.json'
import ResultsContainer from './containers/ResultsContainer'
import QuizBox from './components/QuizBox'
import ResultBox from './components/ResultBox'
import ResultTotalBox from './components/ResultTotalBox'

import "rbx/index.css";
import './App.css';

function App() {
  console.log(Cookies.get('response'))
  const [beginQuiz, setBeginQuiz] = useState(false)
  const [skipQuiz, setSkipQuiz] = useState(false)

  const [quizInProgress, setQuizInProgress] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerData, setAnswerData] = useState(Cookies.get('response') ? Cookies.get('response').split(',') : [])
  const currentData = sourceData[currentIndex]

  console.log(answerData)

  const handleBeginQuiz = () => {
    setBeginQuiz(true)
  }

  const handleRestartQuiz = () => {
    setBeginQuiz(false)
    setSkipQuiz(false)
    setQuizInProgress(true)
    setCurrentIndex(0)
    setAnswerData([])
    Cookies.set('response', '')
  }

  const handleSkipQuiz = () => {
    setBeginQuiz(false)
    setSkipQuiz(true)
  }

  const voteYes = () => {
    setAnswerData([...answerData, 'Yes'])
    console.log(answerData)
    incrementQuiz('Yes')
  }

  const voteNo = () => {
    setAnswerData([...answerData, 'No'])
    console.log(answerData)
    incrementQuiz('No')
  }

  const goBack = () => {
    const currentAnswerData = answerData
    
    if(currentIndex - 1 >= 0 ) {
      setAnswerData([...currentAnswerData.pop()])
      setCurrentIndex(currentIndex - 1)
    }
  }

  const incrementQuiz = (ans) => {
    if(currentIndex >= sourceData.length - 1) {
      // We're at the end of the quiz!
      Cookies.set('response', [...answerData, ans].toString())
      setQuizInProgress(false)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="App">


      {skipQuiz && <Button style={{marginTop: '15px'}} color="success" size="large" onClick={handleRestartQuiz}>Start Quiz</Button>}
      { ((!beginQuiz && !skipQuiz) && !Cookies.get('response') ) &&  
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

          <Button.Group >
            <Button onClick={handleBeginQuiz} color="success" size="large">Begin the Quiz!</Button>
            <Button onClick={handleSkipQuiz} color="white" style={{opacity: .5}}>Skip the quiz and view data</Button>
          </Button.Group>

        </Box>
      </Container>}


      {((beginQuiz && quizInProgress && !skipQuiz) && !Cookies.get('response') )&& <QuizBox currentData={currentData} totalDataLength={sourceData.length} voteYes={voteYes} voteNo={voteNo} goBack={goBack} />}

      {((answerData.length > 0 && !quizInProgress) || Cookies.get('response') ) && <ResultTotalBox handleRestartQuiz={handleRestartQuiz} sourceData={sourceData} answerData={answerData} />}
      
      {((answerData.length > 0 && !quizInProgress) || Cookies.get('response')  ) && 
        <ResultBox sourceData={sourceData} answerData={answerData} />
      }

      {skipQuiz && <Section><Container><Box><ResultsContainer dataSet={sourceData} /></Box></Container></Section>}

      
      
    </div>
  );
}

export default App;
