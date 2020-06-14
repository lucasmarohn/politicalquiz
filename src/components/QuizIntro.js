import React from 'react';
import { Container, Section, Box, Tag, Button, Title, Content } from 'rbx'


function QuizIntro({handleBeginQuiz, handleSkipQuiz}) {

    return (
        <Container align="left" style={{minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Section>
                <Box style={{maxWidth: '800px', margin: '0 auto'}}>
                
                <Title size={1}>Hello!</Title>
                <Content align="left">
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
            </Section>
      </Container>
    );
}

export default QuizIntro;

