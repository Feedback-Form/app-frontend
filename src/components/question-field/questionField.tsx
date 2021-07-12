import React, { FC, ReactElement, useState } from 'react';
//hooks
import { useCharacterState } from '../../hooks/hooks';
import { QuestionProps } from './questionPropsType';
const QuestionField = ({ questionNumber, questionRemoveFunction, questionId, getFormValue }: QuestionProps): ReactElement => {
	const [question, characterCountThree, handleWordChangeThree, resetWordsThree] = useCharacterState('');
	return (
		<div className="flex space-x-3 items-center">
			<h3 className="text-lg text-gray-800 font-normal ">{questionNumber}.</h3>
			<input
				value={question}
				onChange={e => {
					handleWordChangeThree(e);
					getFormValue(questionId, e.target.value);
				}}
				type="text"
				placeholder="Type your question here"
				className="bg-white text-lg text-gray-800 font-base tracking-wide ring-2 rounded-lg px-2 py-3 ring-gray-100 w-full
focus:outline-none hover:ring-primary-400 focus:ring-primary-400 transition-all ease-in-out duration-100"
			/>
			<button
				value={questionId}
				className="p-1 text-white  bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 rounded-full 
                                        transition-all ease-in-out duration-100 cursor-pointer"
				onClick={questionRemoveFunction}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 currentColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>
		</div>
	);
};
export default QuestionField;
