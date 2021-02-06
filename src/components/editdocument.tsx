import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';
//hooks
import { useWordState } from '../hooks/hooks';
import { useSingleDocContext } from '../hooks/contexts/singleDocContext';
import { useUserData } from '../hooks/contexts/userContext';
//components
import LoadingWidget from './loadingWidget';

//const
const backend_url = 'http://localhost:5000';

const EditDocument: FC = (): ReactElement => {
	const { title, transcript, gptThreeSummary, docId } = useSingleDocContext();

	const [summaryLocal, wordCountOne, handleWordChangeOne, resetWordsOne] = useWordState(gptThreeSummary);
	const [transcriptLocal, wordCountTwo, handleWordChangeTwo, resetWordsTwo] = useWordState(transcript);
	const [titleLocal, wordCountThree, handleWordChangeThree, resetWordsThree] = useWordState(title);
	const { token } = useUserData();

	const [isLoading, setIsLoading] = useState(false);

	const req = {
		title: titleLocal,
		transcript: transcriptLocal,
		gptThreeSummary: summaryLocal,
	};

	function saveEdit(): void {
		setIsLoading(true);
		//config
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.patch(`${backend_url}/document/edit/${docId}`, req, config)
			.then((res: any) => {
				console.log('patch res', res);
				setIsLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setIsLoading(false);
			});
	}
	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full space-y-8 overflow-y-auto py-16">
			{isLoading && <LoadingWidget />}

			<div className="flex items-end w-3/4 ">
				<input
					value={titleLocal}
					onChange={e => {
						handleWordChangeThree(e);
					}}
					type="text"
					placeholder="Add a title"
					className="bg-white text-4xl text-gray-900 font-medium tracking-wide
                    focus:outline-none w-full"
				/>
			</div>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-2xl text-gray-500 font-normal">The summary</h1>
			</div>
			<div className="w-3/4 h-full shadow-md rounded-md  ">
				<textarea
					value={summaryLocal}
					onChange={e => {
						handleWordChangeOne(e);
					}}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
                    "
				/>
			</div>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-2xl text-gray-500 font-normal">Your input</h1>
			</div>
			<div className="w-3/4 h-full shadow-md rounded-md  ">
				<textarea
					value={transcriptLocal}
					onChange={e => {
						handleWordChangeTwo(e);
					}}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
                    "
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button
					onClick={() => {
						saveEdit();
					}}
					disabled={isLoading}
					// disabled={isLoading}
					className="bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-600  focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50
					"
				>
					Save
				</button>
			</div>
		</section>
	);
};
export default EditDocument;
