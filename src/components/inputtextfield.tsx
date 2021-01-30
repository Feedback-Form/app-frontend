import React, { FC, ReactElement, useState } from 'react';
import { useWordState } from '../hooks/hooks';

const InputTextfield: FC = (): ReactElement => {
	const [maxWords, setMaxWords] = useState(300);

	const [words, wordCount, handleWordChange, resetWords] = useWordState('');

	return (
		<>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Summarize</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<textarea
					value={words}
					onChange={handleWordChange}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
						focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
						"
					placeholder="Type or paste (⌘ + V) your text here."
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200">
					Next step
				</button>
				<div className="rounded-md bg-gray-300 text-gray-600 py-1 px-2">
					<span className="tracking-wider font-medium">
						{wordCount} / {maxWords} words
					</span>
				</div>
			</div>
		</>
	);
};

export default InputTextfield;
