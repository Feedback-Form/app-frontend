import React, { FC, ReactElement, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//components
import LoadingWidget from './loadingWidget';

//hooks
import { useCharacterState } from '../hooks/hooks';
import { useText } from '../hooks/contexts/summaryContext';

import { useUserData } from '../hooks/contexts/userContext';

const OutputTextfield: FC = (): ReactElement => {
	const { outputArray, setOutputText, inputText, inputRiskGroup } = useText();
	const params = useParams<{ type: string; language: string }>();
	const { type, language } = params;
	const [isLoading, setLoading] = useState(false);
	const { token } = useUserData();

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
	function postDocument(): void {
		setLoading(true);
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
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4 space-y-10">
			{isLoading && <LoadingWidget />}

			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Have a the generated copy
				</h1>
			</div>
			<div className="w-3/4 h-3/4 space-y-10 flex flex-col justify-center">
				{outputArray.map((item: string, index: number) => {
					return (
						<div
							key={index}
							className="bg-teal-700 text-teal-50 rounded-md tracking-wide text-lg px-4 py-6 w-3/4"
						>
							{item}
						</div>
					);
				})}
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button
					onClick={() => {
						postDocument();
					}}
					disabled={isLoading}
					className="bg-teal-700 hover:bg-teal-600 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Save and finish
				</button>
			</div>
		</section>
	);
};

export default OutputTextfield;
