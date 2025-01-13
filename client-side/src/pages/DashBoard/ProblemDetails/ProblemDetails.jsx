/**
 * @fileoverview ProblemDetails component displays the problems solved by the user.
 */
import React, { useEffect, useState } from 'react';

// Custom hook to get the current width of the window.
function useCurrentWidth() {
  const getWidth = () => window.innerWidth;
  const [width, setWidth] = useState(getWidth());
  
  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  
  return width;
}

// ProblemCard -displays the details of a problem.
function ProblemCard(props) {

  const verdictData = [
    { name: 'Challenged', value: 'CHALLENGED', fill: '#d97706' },
    { name: 'Compilation error', value: 'COMPILATION_ERROR', fill: '#ef4444' },
    { name: 'Crashed', value: 'CRASHED', fill: '#3b82f6' },
    { name: 'Failed', value: 'FAILED', fill: '#dc2626' },
    { name: 'Accepted', value: 'OK', fill: '#22c55e' },
    { name: 'Time limit exceeded', value: 'TIME_LIMIT_EXCEEDED', fill: '#eab308' },
    { name: 'Wrong answer', value: 'WRONG_ANSWER', fill: '#f43f5e' },
  ];

  // Get the color of the verdict else set it to gray.
  const color = verdictData.find(item => item.value === props.verdict)?.fill || '#6b7280';

  return (
    // Problem card displays the details of a problem and on click redirects to the problem page on codeforces.
    <div className="bg-gray-800 text-white shadow-lg border border-gray-700 rounded-lg p-4 mb-4 relative transition-transform hover:scale-[1.02]"
        onClick={() => { window.location.href = "https://codeforces.com/contest/" + props.contestId + "/problem/" + props.index}}>
      <div className="flex flex-col space-y-3">
        <div className="text-lg font-semibold">{props.index}: {props.name}</div>
        <div className="text-sm" style={{ color }}>
          {verdictData.find(item => item.value === props.verdict)?.name || 'Unknown'}
        </div>

        {/*  Display the difficulty and time taken to solve the problem.*/}
        <div className="flex justify-between text-sm">
          <div>
            <span className="font-medium">Difficulty: </span>
            <span className="text-gray-300 font-bold">{props.difficulty || 'N/A'}</span>
          </div>
          <div>
            <span className="font-medium">Time: </span>
            <span className="text-gray-400 font-medium">{props.time || 'N/A'} ms</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ProblemDetails component displays the problems solved by the user.
export default function ProblemDetails(props) {

  const [index, setIndex] = useState(0);
  //one page contains at most 20 problems.
  const totalPage = Math.ceil(props.problemData.length / 20);
  const currentProblems = props.problemData.slice(index * 20, index * 20 + 20);

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h4 className="text-3xl md:text-5xl font-bold mb-6 text-[#05CBDC]">Problems Solved</h4>

        {/* Pagination buttons */}
      <div className="flex justify-between items-center mb-4">

        {/* Button to navigate to the previous page. */}
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          onClick={() => setIndex(index > 0 ? index - 1 : 0)}
        >
          Prev
        </button>

        {/* Display the current page number and total number of pages. */}
        <div className="text-lg">
          Page: <b>{index + 1}</b> / {totalPage}
        </div>

        {/* Button to navigate to the next page. */}
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          onClick={() => setIndex(index < totalPage - 1 ? index + 1 : index)}
        >
          Next
        </button>

      </div>

      {/* Display the problems Details using ProblemCard component. */}
      <div className="space-y-4">
        {currentProblems.map((curProblem, idx) => (
          <ProblemCard
            key={idx}
            index={curProblem.problem.index}
            name={curProblem.problem.name}
            difficulty={curProblem.problem.rating}
            verdict={curProblem.verdict}
            time={curProblem.timeConsumedMillis}
            contestId={curProblem.contestId}
          />
        ))}
      </div>
    </div>
  );
}
