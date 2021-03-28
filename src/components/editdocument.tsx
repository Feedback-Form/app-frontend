import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';
//hooks
import { useCharacterState } from '../hooks/hooks';
import { useSingleDocContext } from '../hooks/contexts/singleDocContext';
import { useUserData } from '../hooks/contexts/userContext';
//components
import LoadingWidget from './loadingWidget';

const EditDocument: FC = (): ReactElement => {
	const { title, inputText, generatedOutput, docId } = useSingleDocContext();

	const [
		summaryLocal,
		characterCountOne,
		handleWordChangeOne,
		resetWordsOne,
	] = useCharacterState(inputText);
	const [
		transcriptLocal,
		characterCountTwo,
		handleWordChangeTwo,
		resetWordsTwo,
	] = useCharacterState(generatedOutput);
	const [
		titleLocal,
		characterCountThree,
		handleWordChangeThree,
		resetWordsThree,
	] = useCharacterState(title);
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
			.patch(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/document/edit/${docId}`,
				req,
				config,
			)
			.then((res: any) => {
				console.log('patch res', res);
				setIsLoading(false);
			})
			.catch((err: any) => {
				setIsLoading(false);
			});
	}

	return (
		<main className="flex-1 flex flex-col bg-white text-gray-900  items-center space-y-10">
			<section className="flex-shrink  flex flex-col items-center justify-center w-full h-full max-w-4xl">
				{isLoading && <LoadingWidget />}

				<div className="flex flex-col w-3/4 h-1/6 justify-center ">
					<input
						value={titleLocal}
						onChange={e => {
							handleWordChangeThree(e);
						}}
						type="text"
						placeholder="Add a title"
						className="bg-white text-3xl text-gray-900 font-medium tracking-wide border-2 rounded-lg p-2 border-gray-100
                    focus:outline-none "
					/>
				</div>
				<section className="flex flex-col w-3/4 h-full space-y-6 mb-5">
					<div className="flex items-end">
						<h1 className="tracking-wide text-2xl text-gray-500 font-normal">
							Your input
						</h1>
					</div>
					<div className="flex flex-col h-1/2 shadow-md rounded-lg ">
						<textarea
							value={summaryLocal}
							onChange={e => {
								handleWordChangeOne(e);
							}}
							className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
                    focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ease-in-out duration-200
                    "
						/>
					</div>
					<div className="flex items-end ">
						<h1 className="tracking-wide text-2xl text-gray-500 font-normal">
							The generated text
						</h1>
					</div>
					<div className="flex flex-col h-1/2 shadow-md rounded-lg">
						<textarea
							value={transcriptLocal}
							onChange={e => {
								handleWordChangeTwo(e);
							}}
							className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
                    focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ease-in-out duration-200
                    "
						/>
					</div>
					<div className="flex justify-between items-center">
						<button
							onClick={() => {
								saveEdit();
							}}
							disabled={isLoading}
							className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600  focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50
					"
						>
							Save
						</button>
					</div>
				</section>
			</section>
		</main>
	);
};
export default EditDocument;
