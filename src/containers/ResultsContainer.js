import React from 'react';
import VoteDetails from '../components/VoteDetails'


function ResultsContainer({dataSet}) {
    const results = dataSet.map((data) => {
        return (
            <VoteDetails data={data} />
        )
    })
    return (
        <>
            {results}
        </>
    );
}

export default ResultsContainer;
