import React, { FC, ReactElement } from 'react';

//hooks
import { useWordState } from '../hooks/hooks';

const EditDocument: FC = (): ReactElement => {
	const [fullTextOne, wordCountOne, handleWordChangeOne, resetWordsOne] = useWordState('lorem ipsum');
	const [fullTextTwo, wordCountTwo, handleWordChangeTwo, resetWordsTwo] = useWordState('lorem ipsum');
	const [title, wordCountThree, handleWordChangeThree, resetWordsThree] = useWordState('lorem ipsum');

	function saveEdit(): void {
		alert('save');
	}
	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full space-y-8 overflow-y-auto py-16">
			{/* {isLoading && <LoadingWidget />} */}

			<div className="flex items-end w-3/4 ">
				<input
					value={title}
					onChange={e => {
						handleWordChangeThree(e);
					}}
					type="text"
					placeholder="Add a title"
					className="bg-white text-4xl text-gray-900 font-medium tracking-wide
                    focus:outline-none"
				/>
			</div>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-2xl text-gray-500 font-normal">The summary</h1>
			</div>
			<div className="w-3/4 h-full shadow-md rounded-md  ">
				<textarea
					value={fullTextOne}
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
					value={fullTextTwo}
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
					// disabled={isLoading}
					className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Save
				</button>
			</div>
		</section>
	);
};
export default EditDocument;
