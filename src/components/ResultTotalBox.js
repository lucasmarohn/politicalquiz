import React, { useState } from 'react';
import { Section, Title, Content, Container, Notification, Box, Tag, Button } from 'rbx'
import VoteDetails from '../components/VoteDetails'
import ResultsContainer from '../containers/ResultsContainer'

function ResultTotalBox({sourceData, answerData}) {

    const [filterState, setFilterState] = useState(false)

    const handleFilterStateAll = () => {
        setFilterState(false)
    }

    const handleFilterStateDemocrat = () => {
        setFilterState('d')
    }
    const handleFilterStateRepublican = () => {
        setFilterState('r')
    }
    
    const whoAgrees = (index) => {
        const source = sourceData[index]
        const answer = answerData[index]

        // Get percentages 
        const rPercent = Math.round(source.rFor / (source.rFor + source.rAgainst) * 100)
        const dPercent = Math.round(source.dFor / (source.dFor + source.dAgainst) * 100) 

        // Returns party with higher "For" percentage
        const partyInFavor = dPercent > rPercent ? 'd' : 'r'
        
        
        if((answer === 'Yes' && partyInFavor === 'd') || (answer === 'No' && partyInFavor === 'r')) {
            return 'Democrat'
        } else {
            return 'Republican'
        }

    }

    let agreeWithDemocrat = 0
    let agreeWithRepublican = 0
    let agreeTotal = 0

        
    answerData.forEach( (answerDataPoint, index) => {
        const source = sourceData[index]
        const answer = answerDataPoint

        // Get percentages 
        const rPercent = Math.round(source.rFor / (source.rFor + source.rAgainst) * 100)
        const dPercent = Math.round(source.dFor / (source.dFor + source.dAgainst) * 100) 

        // Returns party with higher "For" percentage
        const partyInFavor = dPercent > rPercent ? 'd' : 'r'
        
        
        if((answer === 'Yes' && partyInFavor === 'd') || (answer === 'No' && partyInFavor === 'r')) {
            agreeWithDemocrat++
            agreeTotal++
        } else {
            agreeWithRepublican++
            agreeTotal++
        }
    })

    const dFinalPercent = Math.round(agreeWithDemocrat / agreeTotal * 100)
    const rFinalPercent = Math.round(agreeWithRepublican / agreeTotal * 100)

    const party = agreeWithDemocrat === agreeWithRepublican ? 'Independent' : (agreeWithDemocrat > agreeWithRepublican ? 'Democrat' : 'Republican')
    const percent = agreeWithDemocrat === agreeWithRepublican ? null : (agreeWithDemocrat > agreeWithRepublican ? dFinalPercent : rFinalPercent)
    
    return (
        <Section>
            <Container>
                <Section>
                <Content size="large" align="center">
                    
                        {(party === 'Democrat' || party === 'Republican') && <Notification color={party === 'Democrat' ? 'link' : 'danger'}>
                            <Title>You are a {party}</Title>
                            <p>You agree with the {party} party {percent}% of the time</p>
                        </Notification>}
                        { party === 'Independent' && <Notification color="success">
                            <Title color="success">You are an {party}</Title>
                            <p>You agree both the Democrat and Republican parties 50% of the time</p>
                        </Notification>}
                </Content>
                </Section>

                <Section>
                    <Box>
                    <Content align="left">
                        <Title>Your Answers</Title>
                        <p>Click the answer for more information</p>
                        <Button.Group>
                            <Button onClick={handleFilterStateAll}>Show All My Responses</Button>
                            <Button color="link" onClick={handleFilterStateDemocrat}>Show where I agree with Democrats</Button>
                            <Button color="danger" onClick={handleFilterStateRepublican}>Show where I agree with Republicans</Button>
                        </Button.Group>
                        
                            {answerData.map((data, index) => {
                                if( filterState === false || ((whoAgrees(index) === 'Democrat' && filterState === 'd') || (whoAgrees(index) === 'Republican' && filterState === 'r')) ) {
                                    return (
                                    <div key={index} style={{marginBottom: '20px'}}>
                                        <details>
                                            <summary>
                                            {<Tag.Group size="large" gapless>
                                                <Tag color="dark">{index + 1}</Tag>
                                                <Tag style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '1'}}>{sourceData[index].title}</Tag>
                                                <Tag color={whoAgrees(index) === 'Democrat' ? 'link' : 'danger'}>You voted {data} with the {whoAgrees(index)}s</Tag>
                                            </Tag.Group>} 
                                            </summary>
                                            <div style={{marginTop: '10px'}}>
                                                <VoteDetails data={sourceData[index]}/>
                                            </div>
                                    </details>
                                    </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        
                    </Content>
                    </Box>
                </Section>
                <Section>
                    <Box>
                    <details>
                        <summary>
                        <Title align="left">Show Details for All > </Title>
                        </summary>
                        <ResultsContainer dataSet={sourceData} />
                    </details>
                    </Box>
                </Section>
            </Container>
        </Section>
    );

}

export default ResultTotalBox;
