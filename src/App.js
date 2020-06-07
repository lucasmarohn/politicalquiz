import React, { useState } from 'react';
import { Section, Container, Box, Button } from 'rbx'

import Cookies from 'js-cookie'

import sourceData from './data/datasmall.json'
import ResultsContainer from './containers/ResultsContainer'
import QuizBox from './components/QuizBox'
import ResultBox from './components/ResultBox'
import ResultTotalBox from './components/ResultTotalBox'
import QuizIntro from './components/QuizIntro'

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
      <QuizIntro handleBeginQuiz={handleBeginQuiz} handleSkipQuiz={handleSkipQuiz} />}


      {((beginQuiz && quizInProgress && !skipQuiz) && !Cookies.get('response') )&& <QuizBox currentData={currentData} totalDataLength={sourceData.length} voteYes={voteYes} voteNo={voteNo} goBack={goBack} />}

      {((answerData.length > 0 && !quizInProgress) || Cookies.get('response') ) && <ResultTotalBox handleRestartQuiz={handleRestartQuiz} sourceData={sourceData} answerData={answerData} />}
      
      {((answerData.length > 0 && !quizInProgress) || Cookies.get('response')  ) && 
        <ResultBox sourceData={sourceData} answerData={answerData} />
      }

      {skipQuiz && <Section><Container><Box><ResultsContainer dataSet={sourceData} /></Box></Container></Section>}
      <p style={{display: 'block', textAlign: 'center', opacity: .5, fontSize: '14px'}}>Favicon made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
      
      
    </div>
  );
}

export default App;
