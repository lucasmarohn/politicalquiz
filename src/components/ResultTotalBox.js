import React, { useState } from 'react';
import { Section, Title, Column, Content, Container, Notification, Box, Tag, Button } from 'rbx'
import VoteDetails from '../components/VoteDetails'

function ResultTotalBox({sourceData, answerData}) {

    const [filterState, setFilterState] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)

    const handleDetailsOpen = () => {
        setDetailsOpen(!detailsOpen)
    }

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
            <Container>
                <Section>
                    <Box>
                    <Content size="medium" align="center">
                        {(party === 'Democrat' || party === 'Republican') && <Notification color={party === 'Democrat' ? 'link' : 'danger'}>
                            <p style={{marginBottom: 0, opacity: .6, fontSize: '12px'}}>YOU VOTED WITH THE</p>
                            <Title style={{margin: 0}}>{party} Party</Title>
                            <p style={{marginTop: '5px'}}><span style={{opacity: .6, }}>You agree</span> <strong>{percent}%</strong> <span style={{opacity: .6, }}>of the time</span></p>
                        </Notification>}
                        { party === 'Independent' && <Notification color="success">
                            <Title color="success">You voted {party}</Title>
                            <p>You agree both the Democrat and Republican parties 50% of the time</p>
                        </Notification>}
                    </Content>
                    <Content align="left">
                        <Title size={4} style={{marginBottom: '10px'}}>Your Answers</Title>
                        <Button.Group size="small" hasAddons>
                            <Button onClick={handleFilterStateAll} color={filterState === false ? null : 'light'}>Show All My Responses</Button>
                            <Button onClick={handleFilterStateDemocrat} color={filterState === 'd' ? null : 'light'}>Show where I agree with Democrats</Button>
                            <Button onClick={handleFilterStateRepublican} color={filterState === 'r' ? null : 'light'}>Show where I agree with Republicans</Button>
                        </Button.Group>
                        <Button size="small" onClick={handleDetailsOpen}>{detailsOpen ? 'Hide Details For All Responses' : 'Show Details For All Responses'}</Button>
                        <hr />
                        
                            {answerData.map((data, index) => {
                                if( filterState === false || ((whoAgrees(index) === 'Democrat' && filterState === 'd') || (whoAgrees(index) === 'Republican' && filterState === 'r')) ) {
                                    return (
                                    <div key={index} style={{marginBottom: '20px'}}>
                                        <details open={detailsOpen}>
                                            <summary>
                                            {<Column.Group>
                                                <Column narrow>
                                                    <Tag>{index + 1}</Tag>
                                                </Column>
                                                <Column>
                                                    <Title style={{marginBottom: '5px'}} size={6}>{sourceData[index].title}</Title>
                                                    <Tag.Group gapless>
                                                        <Tag size="small" color={whoAgrees(index) === 'Democrat' ? 'link' : 'danger'}>You voted {data} with the {whoAgrees(index)}s</Tag> 
                                                        <Tag>Click for more information</Tag>
                                                    </Tag.Group>
                                                </Column>
                                            </Column.Group>} 
                                            
                                            </summary>
                                            <div style={{marginTop: '10px'}}>
                                                <VoteDetails data={sourceData[index]}/>
                                                <hr />
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
            </Container>
    );

}

export default ResultTotalBox;
