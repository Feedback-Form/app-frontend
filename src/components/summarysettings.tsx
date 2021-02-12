import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';

//components
import ResponseWidget from './responseWidget';

//hooks
import { useText } from '../hooks/contexts/summaryContext';
import { useUserData } from '../hooks/contexts/userContext';

const SummarySettings: FC = (): ReactElement => {
	const {
		setLength,
		setType,
		setTone,
		summaryLength,
		summaryType,
		summaryTone,
		inputText,
		setOutputText,
		currentComponent,
		setCurrentComponent,
		setInputRiskGroup,
	} = useText();
	const { token, userObject } = useUserData();
	const [errWidget, setErrWidget] = useState(false);
	const [resMessage, setResMessage] = useState('');

	const clickedClasses = 'bg-indigo-400 text-white hover:indigo-500';
	const defaultClasses = 'bg-gray-300 text-gray-600 hover:text-white hover:bg-indigo-400';

	function summarizeText(): void {
		setCurrentComponent(3);

		const req = {
			inputText: inputText,
			//has to change to word amount in FE
			responseLengthInCharacters: summaryLength,
			summaryType: summaryType,
			temperature: summaryTone,
		};

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		console.log('req', req);
		axios

			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/summarize/text`, req, config)

			.then((res: any) => {
				console.log('POST res', res);
				setOutputText(res.data.gptSummary.text);
				setInputRiskGroup(res.data.inputRiskGroup);
				setCurrentComponent(4);
				//redirect to output component
			})
			.catch((err: any) => {
				console.log({ err });
				setCurrentComponent(2);
				setResMessage(err.message);
				setErrWidget(true);
				setTimeout(() => {
					setErrWidget(false);
				}, 5000);
			});
	}

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4 space-y-10">
			{errWidget && <ResponseWidget success={false} response={resMessage} />}

			<div className="flex items-start w-3/4">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Summary settings</h1>
			</div>
			<div className="w-3/4 h-3/4 rounded-md  space-y-12 ">
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary length</h1>

					<div className="flex space-x-12">
						<button
							onClick={() => setLength(100)}
							className={`flex-shrink ${summaryLength === 100 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center `}
						>
							100 characters
						</button>
						<button
							onClick={() => setLength(500)}
							className={`flex-shrink ${summaryLength === 500 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center `}
						>
							500 characters
						</button>
						<span className="relative inline-flex">
							<button
								disabled={userObject.maxResponseCharacters < 1250}
								onClick={() => setLength(1250)}
								className={` flex-shrink  ${summaryLength === 1250 ? clickedClasses : defaultClasses}
							focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center disabled:opacity-50 `}
							>
								1250 characters
							</button>
							{userObject.maxResponseCharacters < 1250 && (
								<span className="flex absolute h-5 w-32 top-0 right-0 -mt-3  text-center items-center justify-center shadow-xs select-none">
									{/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> */}
									<span className="text-center absolute inline-flex w-full h-full bg-yellow-500 rounded-full"></span>
									{/* <span className="relative inline-flex rounded-full h-6 w-40 bg-purple-500 text-base ">Upgrade to unlock</span> */}
									<h1 className="relative inline-flex text-xs text-white">Upgrade to unlock</h1>
								</span>
							)}
						</span>
						<span className="relative inline-flex">
							<button
								disabled={userObject.maxResponseCharacters < 2000}
								onClick={() => setLength(2000)}
								className={`flex-shrink ${summaryLength === 2000 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center disabled:opacity-50`}
							>
								2000 characters
							</button>
							{userObject.maxResponseCharacters < 2000 && (
								<span className="flex absolute h-5 w-32 top-0 right-0 -mt-3  text-center items-center justify-center shadow-xs select-none">
									{/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> */}
									<span className="text-center absolute inline-flex w-full h-full bg-yellow-500 rounded-full"></span>
									{/* <span className="relative inline-flex rounded-full h-6 w-40 bg-purple-500 text-base ">Upgrade to unlock</span> */}
									<h1 className="relative inline-flex text-xs text-white">Upgrade to unlock</h1>
								</span>
							)}
						</span>
					</div>
				</div>
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary type</h1>

					<div className="flex space-x-12">
						<button
							onClick={() => setType(0)}
							className={`flex-shrink ${summaryType === 0 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							normal
						</button>
						<button
							onClick={() => setType(1)}
							className={`flex-shrink ${summaryType === 1 ? clickedClasses : defaultClasses}
							focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							one-sentence
						</button>
						<button
							onClick={() => setType(2)}
							className={`flex-shrink ${summaryType === 2 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							for a second grader
						</button>
					</div>
				</div>
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary tone</h1>

					<div className="flex space-x-12">
						<button
							onClick={() => setTone(0)}
							className={`flex-shrink ${summaryTone === 0 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							pragmatic
						</button>
						<button
							onClick={() => setTone(1)}
							className={`flex-shrink ${summaryTone === 1 ? clickedClasses : defaultClasses}
							focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							normal
						</button>
						<button
							onClick={() => setTone(2)}
							className={`flex-shrink ${summaryTone === 2 ? clickedClasses : defaultClasses}
								focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center`}
						>
							creative
						</button>
					</div>
				</div>
				<div className="flex w-3/4 items-center">
					<button
						onClick={() => {
							summarizeText();
						}}
						className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg"
					>
						Summarize text
					</button>
				</div>
			</div>
		</section>
	);
};

export default SummarySettings;
