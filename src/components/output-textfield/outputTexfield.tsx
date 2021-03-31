import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//components
import LoadingWidget from '../loadingWidget';
import NavigationDots from '../navigationDots';
import ResponseWidget from '../response-widget/responseWidget';
import Uploading from '../uploading/uploading';
//hooks
import { useText } from '../../hooks/contexts/summaryContext';
import { useUserData } from '../../hooks/contexts/userContext';

const OutputTextfield: FC = (): ReactElement => {
	const { outputArray, setCurrentComponent, setOutputText, inputText, inputRiskGroup, setOutputArray, setInputRiskGroup } = useText();
	const params = useParams<{ type: string; language: string }>();
	const { type, language } = params;
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);
	const { token, setCurrentSessionCount } = useUserData();
	const [errWidget, setErrWidget] = useState(false);
	const [resMessage, setResMessage] = useState('');

	////
	//REMOVE IN PROD
	////
	// useEffect(() => {
	// 	setOutputArray([
	// 		'1. linkedin ad for sonect',
	// 		'2. linkedin ad for sonect',
	// 		'3. linkedin ad for sonect and also for linkedin',
	// 		'4. linkedin ad for sonect and also for linkedin dsadsadsa',
	// 		'5. linkedin ad for sonect and also for linkedin dsadsadsadsadsa',
	// 	]);
	// }, []);

	function postDocument(): void {
		setIsLoading(true);
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const req = {
			generatedOutput: outputArray.join('\n'),
			inputText,
			outputType: type,
			outputLanguage: language,
			inputRiskGroup: inputRiskGroup,
		};
		axios
			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/document/create`, req, config)
			.then((res: any) => {
				console.log('POST res', res);
				setIsLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setIsLoading(false);
			});
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function generateOutput(): void {
		//setCurrentComponent(3);
		setIsLoadingTwo(true);
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
				setIsLoadingTwo(false);
			})
			.catch((err: any) => {
				//setCurrentComponent(2);
				setIsLoadingTwo(false);
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

			{isLoadingTwo ? (
				<Uploading message="Generating results... 🤖" />
			) : (
				<section className="flex-shrink  flex flex-col items-center justify-center w-full h-full max-w-4xl">
					{isLoading && <LoadingWidget />}

					<div className="flex flex-col w-3/4 h-1/5 justify-center">
						<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Have a look at the generated copy</h1>
					</div>
					<div className="flex flex-col w-3/4 xl:w-full h-4/5 space-y-6">
						{outputArray.map((item: string, index: number) => {
							return (
								<div key={index} className="flex justify-between bg-gray-200 rounded-lg tracking-wide text-base md:text-lg px-4 py-6 ">
									<p className="text-gray-900 w-5/6">{item}</p>

									<div className="w-1/6 flex justify-end">
										<svg
											onClick={() => copyToClipboard(item)}
											className="w-7 text-current text-gray-500 items-center h-full hover:text-teal-700  transition-all ease-in-out duration-200 cursor-pointer"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
									</div>
								</div>
							);
						})}

						<div className="flex  justify-between items-center">
							<button
								onClick={() => {
									postDocument();
								}}
								disabled={isLoading}
								className="bg-teal-700 hover:bg-teal-600 focus:outline-none text-white rounded-lg px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
							>
								Save and finish
							</button>
							<button
								onClick={() => {
									generateOutput();
								}}
								className="flex space-x-2 items-center bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out transition-all"
							>
								<h1>Generate again</h1>
								<svg className="w-5 text-current " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
							</button>
						</div>
						<NavigationDots />
					</div>
				</section>
			)}
		</>
	);
};

export default OutputTextfield;
