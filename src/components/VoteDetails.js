import React from 'react';
import { Section, Title, Content, Column } from 'rbx'
import PieChartComponent from './PieChartComponent'


function VoteDetails({data, voteType = 'Yes'}) {

    const totalVotesD = data.dFor + data.dAgainst
    const totalVotesR = data.rFor + data.rAgainst

    return (
            <Section key={data.id}>
            <Column.Group gapSize={8}>
                <Column align="left" size="two-fifths">
                    <Title size={3}>{data.title}</Title>
                    <Content size="small">
                        <a href={data.link} target="_blank" rel="noopener noreferrer">{data.link}</a>
                    </Content>
                    <Content>
                        {data.summary}
                    </Content>
                    
                </Column>
                <Column>
                    <Content align="center">
                        <Title size={6}>Republicans</Title>
                        <PieChartComponent voteType={voteType} totalVotes={totalVotesR} voteFor={data.rFor} voteAgainst={data.rAgainst} primaryColor="#EB5757" secondaryColor="#EFEFEF" />
                    </Content>
                </Column>
                <Column>
                    <Content align="center">
                        <Title size={6}>Democrats</Title>
                        <PieChartComponent voteType={voteType} totalVotes={totalVotesD} voteFor={data.dFor} voteAgainst={data.dAgainst} primaryColor="#2F80ED" secondaryColor="#EFEFEF" />
                    </Content>
                </Column>
            </Column.Group>
        </Section>
    );
}

export default VoteDetails;

