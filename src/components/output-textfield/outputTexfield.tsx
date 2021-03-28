import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//components
import LoadingWidget from '../loadingWidget';
import NavigationDots from '../navigationDots';
//hooks
import { useText } from '../../hooks/contexts/summaryContext';
import { useUserData } from '../../hooks/contexts/userContext';

const OutputTextfield: FC = (): ReactElement => {
	const {
		outputArray,
		setOutputText,
		inputText,
		inputRiskGroup,
		setOutputArray,
	} = useText();
	const params = useParams<{ type: string; language: string }>();
	const { type, language } = params;
	const [isLoading, setLoading] = useState(false);
	const { token } = useUserData();

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
		setLoading(true);
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
			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/document/create`,
				req,
				config,
			)
			.then((res: any) => {
				console.log('POST res', res);
				setLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setLoading(false);
			});
	}

	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-full max-w-4xl">
			{isLoading && <LoadingWidget />}

			<div className="flex flex-col w-3/4 h-1/5 justify-center">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Have a look at the generated copy
				</h1>
			</div>
			<div className="flex flex-col w-3/4 h-4/5 space-y-6">
				{outputArray.map((item: string, index: number) => {
					return (
						<div
							key={index}
							className="bg-gray-200  text-gray-900 rounded-lg tracking-wide text-base md:text-lg px-4 py-6 "
						>
							{item}
						</div>
					);
				})}

				<div className="flex justify-between items-center">
					<button
						onClick={() => {
							postDocument();
						}}
						disabled={isLoading}
						className="bg-teal-700 hover:bg-teal-600 focus:outline-none text-white rounded-lg px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
					>
						Save and finish
					</button>
				</div>
				<NavigationDots />
			</div>
		</section>
	);
};

export default OutputTextfield;
