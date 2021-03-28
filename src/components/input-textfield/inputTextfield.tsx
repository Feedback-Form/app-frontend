import React, { FC, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//components
import ResponseWidget from '../response-widget/responseWidget';
import Uploading from '../uploading/uploading';
import NavigationDots from '../navigationDots';
//hooks
import { useWordState } from '../../hooks/hooks';
import { useText } from '../../hooks/contexts/summaryContext';
import { useUserData } from '../../hooks/contexts/userContext';

const InputTextfield: FC = (): ReactElement => {
	const {
		setLength,
		setType,
		summaryLength,
		summaryType,
		inputText,
		setOutputArray,
		currentComponent,
		setCurrentComponent,
		setInputRiskGroup,
		summaryLanguage,
		setSummaryLanguage,
		setInputText,
		setCharacterLimitReached,
		characterLimitReached,
	} = useText();

	const [fullText, handleTexthange, setText, resetText] = useWordState(
		inputText,
	);
	const [characterLimit, setCharacterLimit] = useState(0);

	const { token, userObject } = useUserData();
	const [errWidget, setErrWidget] = useState(false);
	const [resMessage, setResMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const params = useParams<{ type: string; language: string }>();
	const { type, language } = params;

	//adjust characterLimit
	useEffect(() => {
		setCharacterLimit(fullText.length);
	}, [fullText]);

	useEffect(() => {
		setInputText(fullText);
	}, [fullText]);

	function generateOutPut(): void {
		//setCurrentComponent(3);
		setIsLoading(true);
		const req = {
			description: inputText,
		};

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios

			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/generate/${type}/${language}`,
				req,
				config,
			)

			.then((res: any) => {
				const responseList: Array<string> = res.data.outputArray;
				setOutputArray(responseList);
				setInputRiskGroup(res.data.inputRiskGroup);
				//redirect to output component
				setCurrentComponent(2);
			})
			.catch((err: any) => {
				//setCurrentComponent(2);
				setIsLoading(false);
				setResMessage(err.response.data.error.message);
				setErrWidget(true);

				setTimeout(() => {
					setErrWidget(false);
				}, 5000);
			});
	}

	return (
		<>
			{errWidget && <ResponseWidget success={false} response={resMessage} />}
			{isLoading ? (
				<Uploading message="Your text is being summarized." />
			) : (
				<section className="flex-shrink  flex flex-col items-center justify-center h-full w-full max-w-4xl">
					<div className="flex flex-col w-3/4 h-1/5 justify-center">
						<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
							Describe your product or service.
						</h1>
					</div>
					<div className="flex flex-col w-3/4 h-4/5 space-y-20 ">
						<div className="flex flex-col shadow-md h-1/2 rounded-lg">
							<textarea
								value={fullText}
								onChange={e => {
									handleTexthange(e);
									// setInputText(fullText);
									setCharacterLimitReached(characterLimit > 400);
								}}
								onPaste={e => {
									setText((existingText: string) =>
										existingText.concat(e.clipboardData.getData('Text')),
									);
									// setInputText(fullText);
									setCharacterLimitReached(
										//characterLimit > userObject.maxSessionCharacters,
										characterLimit > 400,
									);
									e.preventDefault();
								}}
								onCut={(e: any) => {
									setText(e.target.value);
									// setInputText(fullText);
								}}
								className="w-full h-full rounded-lg resize-none break-words  p-6 font-thin text-lg tracking-wide
					focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ease-in-out duration-200
					"
								placeholder="Type or paste (⌘ + V) your text here."
							/>
						</div>
						<div className="flex justify-between items-center">
							<button
								disabled={characterLimitReached}
								onClick={() => {
									setInputText(fullText);
									generateOutPut();
								}}
								className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-lg
								 px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
							>
								Generate output
							</button>
							<div className="rounded-lg bg-gray-300 text-gray-600 py-2 px-3">
								<span className="tracking-wider font-medium ">
									{characterLimit} / {400} characters
								</span>
							</div>
						</div>
						<NavigationDots />
					</div>
				</section>
			)}
		</>
	);
};

export default InputTextfield;
