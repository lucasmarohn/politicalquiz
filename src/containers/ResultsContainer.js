import React from 'react';
import VoteDetails from '../components/VoteDetails'


function ResultsContainer({dataSet}) {
    const results = dataSet.map((data, index) => {
        return (
            <VoteDetails key={index} data={data} />
        )
    })
    return (
        <>
            {results}
        </>
    );
}

export default ResultsContainer;
