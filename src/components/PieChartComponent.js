import React from 'react';
import { PieChart } from 'react-minimal-pie-chart'


function QuizBox({voteType, primaryColor, secondaryColor, voteFor, voteAgainst, totalVotes}) {
  return (
    <>
    <PieChart 
      data={[
          { value: voteFor, color: voteType === "Yes" ? primaryColor : secondaryColor },
          { value: voteAgainst, color: voteType !== "Yes" ? primaryColor : secondaryColor }
      ]} 
      totalValue={totalVotes}
      lineWidth={20}
      label={() => `${Math.round( (voteType === "Yes" ? voteFor : voteAgainst) / totalVotes * 100 )}%`}
      labelStyle={{
          fontWeight: 'bold',
          fill: primaryColor,
      }}
      labelPosition={0}/>
      {voteType === 'Yes' && <>
      <div><strong style={{color: primaryColor}}>For: {voteFor}</strong></div>
      <div>Against: {voteAgainst}</div>
      </>
      }
      {voteType === 'No' && <>
      <div>For: {voteFor}</div>
      <div><strong style={{color: primaryColor}}>Against: {voteAgainst}</strong></div>
      </>
      }
    </>
  );
}

export default QuizBox;
