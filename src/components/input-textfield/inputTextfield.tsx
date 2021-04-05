import React, { FC, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
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
		inputText,
		setOutputArray,
		setCurrentComponent,
		setInputRiskGroup,
		setInputText,
		setCharacterLimitReached,
		characterLimitReached,
	} = useText();

	const [fullText, handleTextChange, setText, resetText] = useWordState(inputText);

	const [currentCharacterCount, setCurrentCharacterCount] = useState(0);

	const { token, userObject, setCurrentSessionCount } = useUserData();
	const [errWidget, setErrWidget] = useState(false);
	const [resMessage, setResMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();

	const params = useParams<{ type: string; language: string }>();
	const { type, language } = params;

	useEffect(() => {
		setInputText(fullText);
	}, [fullText]);

	useEffect(() => {
		setCharacterLimitReached(currentCharacterCount > 400);
	}, [currentCharacterCount]);

	function generateOutput(): void {
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

			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/generate/${type}/${language}`, req, config)

			.then((res: any) => {
				const responseList: Array<string> = res.data.outputArray;
				setOutputArray(responseList);
				setInputRiskGroup(res.data.inputRiskGroup);
				//redirect to output component
				setCurrentComponent(2);
				setCurrentSessionCount(res.data.userCurrentSessionCount);
				// setIsLoading(false);
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
				<Uploading message="Generating results... 🤖" />
			) : (
				<section className="flex-shrink  flex flex-col items-center justify-center h-full w-full max-w-screen-lg">
					<div className="flex flex-col w-3/4 h-1/5 justify-center">
						<div className="flex items-center justify-center md:justify-start space-x-6">
							<span
								onClick={() => {
									history.goBack();
								}}
								className="p-2 bg-gray-100 hover:bg-teal-50 rounded-lg text-gray-600 hover:text-teal-700 cursor-pointer transition-all duration-200 ease-in-out"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-7 w-7 text-current  "
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
								</svg>
							</span>
							<h1 className=" tracking-wide text-3xl text-gray-900 font-medium ">Describe your product, service or company.</h1>
						</div>
					</div>
					<div className="flex flex-col w-3/4 h-4/5 space-y-20 ">
						<div className="flex flex-col shadow-md h-1/2 rounded-lg">
							<textarea
								value={fullText}
								onChange={(e: any) => {
									handleTextChange(e);

									setCurrentCharacterCount(e.target.value.length);
								}}
								onPaste={e => {
									const pastedText = e.clipboardData.getData('Text');
									setText((existingText: string) => existingText.concat(pastedText));

									setCurrentCharacterCount(pastedText.length);
									e.preventDefault();
								}}
								onCut={(e: any) => {
									setText(e.target.value);
								}}
								className="w-full h-full rounded-lg resize-none break-words  p-6 font-thin text-lg tracking-wide
					focus:outline-none focus:ring-2 focus:ring-teal-700 transition-all ease-in-out duration-200
					"
								placeholder="Type or paste (⌘ + V) your text here."
							/>
						</div>
						<div className="flex justify-between items-center">
							<button
								disabled={characterLimitReached || fullText.length === 0}
								onClick={() => {
									setInputText(fullText);
									generateOutput();
								}}
								className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-lg
								 px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Generate output
							</button>
							<div className="rounded-lg bg-gray-200 text-gray-700 py-2 px-3">
								<span className="tracking-wider font-medium ">
									{currentCharacterCount} / {400} characters
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
