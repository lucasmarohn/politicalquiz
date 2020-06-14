import React from 'react';
import { Section, Title, Content, Column } from 'rbx'
import PieChartComponent from './PieChartComponent'


function VoteDetails({data, voteType = 'Yes'}) {

    const totalVotesD = parseInt(data.gsx$dfor.$t) + parseInt(data.gsx$dagainst.$t)
    const totalVotesR = parseInt(data.gsx$rfor.$t) + parseInt(data.gsx$ragainst.$t)

    console.log('d',totalVotesD)
    console.log('r', totalVotesR)

    return (
            <Section key={data.id}>
            <Column.Group gapSize={8}>
                <Column align="left" size="two-fifths">
                    <Title size={3}>{data.gsx$title.$t}</Title>
                    <Content size="small">
                        <a href={data.gsx$link.$t} target="_blank" rel="noopener noreferrer">{data.gsx$link.$t}</a>
                    </Content>
                    <Content>
                        {data.gsx$summary.$t}
                    </Content>
                    
                </Column>
                <Column>
                    <Content align="center">
                        <Title size={6}>Republicans</Title>
                        <PieChartComponent voteType={voteType} totalVotes={totalVotesR} voteFor={data.gsx$rfor.$t} voteAgainst={data.gsx$ragainst.$t} primaryColor="#EB5757" secondaryColor="#EFEFEF" />
                    </Content>
                </Column>
                <Column>
                    <Content align="center">
                        <Title size={6}>Democrats</Title>

                        <PieChartComponent voteType={voteType} totalVotes={totalVotesD} voteFor={data.gsx$dfor.$t} voteAgainst={data.gsx$dagainst.$t} primaryColor="#2F80ED" secondaryColor="#EFEFEF" />

                    </Content>
                </Column>
            </Column.Group>
        </Section>
    );
}

export default VoteDetails;

