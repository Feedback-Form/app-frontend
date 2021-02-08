import React, { FC, ReactElement, useState, useContext } from 'react';

//hooks
import { useWordState } from '../hooks/hooks';
import { useText } from '../hooks/contexts/summaryContext';
import { useUserData } from '../hooks/contexts/userContext';

const InputTextfield: FC = (): ReactElement => {
	// const [maxWords, setMaxWords] = useState(300);
	const { inputText, setInputText, setCurrentComponent, setWordLimitReached, wordLimitReached } = useText();

	const [fullText, wordCount, handleWordChange, setWords, resetWords] = useWordState(inputText);
	const { userObject } = useUserData();

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center h-3/4 w-full space-y-10">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Summarize</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<textarea
					value={fullText}
					onChange={e => {
						handleWordChange(e);
						setInputText(fullText);
						setWordLimitReached(wordCount > userObject.maxSessionWords);
						console.log('jwqe', wordLimitReached);
					}}
					onPaste={e => {
						setWords(e.clipboardData.getData('Text'));
						setInputText(fullText);
						setWordLimitReached(wordCount > userObject.maxSessionWords);
					}}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
						focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
						"
					placeholder="Type or paste (⌘ + V) your text here."
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button
					disabled={wordLimitReached}
					onClick={() => {
						setInputText(fullText);
						setCurrentComponent(2);
					}}
					className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Next step
				</button>
				<div className="rounded-md bg-gray-300 text-gray-600 py-1 px-2">
					<span className="tracking-wider font-medium">
						{wordCount} / {userObject.maxSessionWords} words
					</span>
				</div>
			</div>
		</section>
	);
};

export default InputTextfield;
