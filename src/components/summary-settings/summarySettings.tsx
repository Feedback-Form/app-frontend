import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';

//components
import ResponseWidget from '../response-widget/responseWidget';
import Uploading from '../uploading/uploading';

//hooks
import { useText } from '../../hooks/contexts/summaryContext';
import { useUserData } from '../../hooks/contexts/userContext';

//interfaces
import { languageObject } from './languageInterface';

const SummarySettings: FC = (): ReactElement => {
	const {
		setLength,
		setType,
		summaryLength,
		summaryType,
		inputText,
		setOutputText,
		currentComponent,
		setCurrentComponent,
		setInputRiskGroup,
		summaryLanguage,
		setSummaryLanguage,
	} = useText();
	const { token, userObject } = useUserData();
	const [errWidget, setErrWidget] = useState(false);
	const [resMessage, setResMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const clickedClasses = 'bg-teal-700 text-white hover:bg-teal-600';
	const defaultClasses =
		'bg-gray-300 text-gray-600 hover:text-white hover:bg-teal-700';
	const languages: Array<languageObject> = [
		{
			language: 'english',
			icon: '🇺🇸',
		},

		{
			language: 'german',
			icon: '🇩🇪 ',
		},
		{
			language: 'french',
			icon: '🇫🇷',
		},
		{
			language: 'spanish',
			icon: '🇪🇸',
		},
		{
			language: 'italian',
			icon: '🇮🇹',
		},
	];
	const summaryTypes: Array<string> = [
		'normal',
		'one-sentence',
		'for a second grader',
	];
	const responseLength: Array<number> = [100, 250, 400];

	function summarizeText(): void {
		//setCurrentComponent(3);
		setIsLoading(true);
		const req = {
			inputText: inputText,
			responseLengthInCharacters: summaryLength,
			summaryType: summaryType,
			summaryLanguage: summaryLanguage,
		};

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios

			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/summarize/text`,
				req,
				config,
			)

			.then((res: any) => {
				setOutputText(res.data.gptSummary.text);
				setInputRiskGroup(res.data.inputRiskGroup);
				//redirect to output component
				setCurrentComponent(3);
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
				<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4 space-y-8">
					<div className="flex items-start w-3/4">
						<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
							Summary settings
						</h1>
					</div>

					<div className="w-3/4 h-3/4 flex flex-col justify-evenly">
						<div className="justify-items-center">
							<h1 className="text-xl pb-4">Summary length</h1>

							<div className="flex space-x-12">
								{responseLength.map((item: number, index) => {
									return (
										<button
											key={index}
											onClick={() => setLength(item)}
											className={`flex-shrink ${
												summaryLength === item ? clickedClasses : defaultClasses
											}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center `}
										>
											{item} characters
										</button>
									);
								})}
							</div>
						</div>
						<div className="justify-items-center">
							<h1 className="text-xl pb-4">Summary type</h1>

							<div className="flex space-x-12">
								{summaryTypes.map((item: string, index) => {
									return (
										<button
											key={index}
											onClick={() => setType(index)}
											className={`flex-shrink ${
												summaryType === index ? clickedClasses : defaultClasses
											}
											focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
										>
											{item}
										</button>
									);
								})}
							</div>
						</div>
						<div className="justify-items-center">
							<h1 className="text-xl pb-4">Summary language</h1>

							<div className="flex gap-10 flex-wrap max-w-5xl">
								{languages.map((item: languageObject, index) => {
									return (
										<button
											key={index}
											onClick={() => setSummaryLanguage(item.language)}
											className={`flex-shrink ${
												summaryLanguage === item.language
													? clickedClasses
													: defaultClasses
											}
									focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
										>
											{item.icon}
											<span className="capitalize pl-2">{item.language}</span>
										</button>
									);
								})}
							</div>
						</div>
						<div className="flex w-3/4 items-center">
							<button
								onClick={() => {
									summarizeText();
								}}
								className="bg-teal-700 hover:bg-teal-600 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg"
							>
								Summarize text
							</button>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default SummarySettings;
