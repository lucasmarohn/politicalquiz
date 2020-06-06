import React from 'react';
import { Section, Title, Content, Column } from 'rbx'
import { PieChart } from 'react-minimal-pie-chart'


function VoteDetails({data}) {

    
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
                        <PieChart 
                        data={[
                            { value: data.rFor, color: '#EB5757' },
                            { value: data.rAgainst, color: '#EFEFEF' }
                        ]} 
                        totalValue={totalVotesR}
                        lineWidth={20}
                        label={({ dataEntry }) => `${Math.round(data.rFor / totalVotesR * 100 )}%`}
                        labelStyle={{
                            fontWeight: 'bold',
                            fill: '#EB5757',
                        }}
                        labelPosition={0}
                        />
                        <p>
                        For: {data.rFor} <br/>
                        Against: {data.rAgainst}
                        </p>
                    </Content>
                </Column>
                <Column>
                    <Content align="center">
                        <Title size={6}>Democrats</Title>
                        <PieChart 
                        data={[
                            { title: 'For', value: data.dFor, color: '#2F80ED' },
                            { title: 'Against', value: data.dAgainst, color: '#EFEFEF' },
                        ]} 
                        totalValue={totalVotesD}
                        lineWidth={20}
                        label={({ dataEntry }) => `${Math.round(data.dFor / totalVotesD * 100 )}%`}
                        labelStyle={{
                            fontWeight: 'bold',
                            fill: '#2F80ED',
                        }}
                        labelPosition={0}
                        />
                        <p>
                        For: {data.dFor}  <br/>
                        Against:  {data.dAgainst}
                        </p>
                    </Content>
                </Column>
            </Column.Group>
        </Section>
    );
}

export default VoteDetails;

