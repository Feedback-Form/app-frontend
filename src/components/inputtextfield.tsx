import React, { FC, ReactElement, useEffect, useState } from 'react';

//hooks
import { useWordState } from '../hooks/hooks';
import { useText } from '../hooks/contexts/summaryContext';
import { useUserData } from '../hooks/contexts/userContext';

const InputTextfield: FC = (): ReactElement => {
	const {
		inputText,
		setInputText,
		setCurrentComponent,
		setCharacterLimitReached,
		characterLimitReached,
	} = useText();

	const [fullText, handleTexthange, setText, resetText] = useWordState(
		inputText,
	);
	const [characterLimit, setCharacterLimit] = useState<number>(0);

	const { userObject } = useUserData();

	//adjust characterLimit
	useEffect(() => {
		setCharacterLimit(fullText.length);
	}, [fullText]);

	useEffect(() => {
		setInputText(fullText);
	}, [fullText]);
	return (
		<section className="flex-shrink  flex flex-col items-center justify-center h-3/4 w-full space-y-10">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Summarize
				</h1>
			</div>
			<div className="w-3/4 h-3/4 shadow-md rounded-md">
				<textarea
					value={fullText}
					onChange={e => {
						handleTexthange(e);
						// setInputText(fullText);
						setCharacterLimitReached(
							characterLimit > userObject.maxSessionCharacters,
						);
					}}
					onPaste={e => {
						setText((existingText: string) =>
							existingText.concat(e.clipboardData.getData('Text')),
						);
						// setInputText(fullText);
						setCharacterLimitReached(
							characterLimit > userObject.maxSessionCharacters,
						);
						e.preventDefault();
					}}
					onCut={(e: any) => {
						setText(e.target.value);
						// setInputText(fullText);
					}}
					className="w-full h-full resize-none break-words rounded-md p-6 font-thin text-lg tracking-wide
						focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ease-in-out duration-200
						"
					placeholder="Type or paste (⌘ + V) your text here."
				/>
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button
					disabled={characterLimitReached}
					onClick={() => {
						setInputText(fullText);
						setCurrentComponent(2);
					}}
					className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Next step
				</button>
				<div className="rounded-md bg-gray-300 text-gray-600 py-1 px-2">
					<span className="tracking-wider font-medium">
						{characterLimit} / {userObject.maxSessionCharacters} characters
					</span>
				</div>
			</div>
		</section>
	);
};

export default InputTextfield;
