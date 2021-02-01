import React, { FC, ReactElement, useState } from 'react';
import { useWordState } from '../hooks/hooks';

const OutputTextfield: FC = (): ReactElement => {
	const [words, wordCount, handleWordChange, resetWords] = useWordState('summary summary summary');

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Have a look at the summary</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<textarea
					value={words}
					onChange={handleWordChange}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
						focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
						"
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200">
					Save and finish
				</button>
			</div>
		</section>
	);
};

export default OutputTextfield;
