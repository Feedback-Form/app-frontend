import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';

//components
import LoadingWidget from './loadingWidget';

//hooks
import { useWordState } from '../hooks/hooks';
import { useText } from '../hooks/contexts/summaryContext';

const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';

const OutputTextfield: FC = (): ReactElement => {
	const { outputText, setOutputText, inputText } = useText();
	const [fullText, wordCount, handleWordChange, resetWords] = useWordState(outputText);
	const [isLoading, setLoading] = useState(false);

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const req = {
		gptThreeSummary: fullText,
		transcript: inputText,
	};
	function postDocument(): void {
		setLoading(true);
		axios
			.post(`${backend_url}/document/create`, req, config)
			.then((res: any) => {
				console.log('POST res', res);
				setLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setLoading(false);
			});
	}

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4 space-y-10">
			{isLoading && <LoadingWidget />}

			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Have a look at the summary</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<textarea
					value={fullText}
					onChange={e => {
						handleWordChange(e);
						setOutputText(fullText);
					}}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
						focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
						"
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button
					onClick={() => {
						postDocument();
					}}
					disabled={isLoading}
					className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Save and finish
				</button>
			</div>
		</section>
	);
};

export default OutputTextfield;
