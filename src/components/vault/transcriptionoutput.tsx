import React, { FC, ReactElement, useState } from 'react';
import { useCharacterState } from '../../hooks/hooks';
import { useText } from '../../hooks/contexts/summaryContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';
const TranscriptionOutput: FC = (): ReactElement => {
	const { outputText, setOutputText } = useText();
	const [fullText, characterCount, handleWordChange, resetWords] = useCharacterState(outputText);
	const [redirect, setRedirect] = useState(false);
	const [id, setId] = useState('luk_375');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const req = {
		transcript: fullText,
	};

	function postDocument(): void {
		axios
			.post(`${backend_url}/document/create`, req, config)
			.then((res: any) => {
				console.log('POST res', res);
				setId(res.data._id);
				setRedirect(true);
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	}

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4 space-y-10">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Have a look at the transcription</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<textarea
					value={fullText}
					onChange={e => {
						handleWordChange(e), setOutputText(fullText);
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
					className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200"
				>
					Go and summarize
				</button>
			</div>

			{redirect && <Redirect to={`/summarize?docid=${id}`} />}
		</section>
	);
};

export default TranscriptionOutput;
