import React, { FC, ReactElement, useEffect, useState } from 'react';

import Sidebar from '../components/sidebar';
import Summarize from '../components/main/summarize';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

//hooks
import { useUserData } from '../hooks/contexts/userContext';
import { SummaryContext } from '../hooks/contexts/summaryContext';
const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

import AudioUploading from '../components/uploading';

const SummarizePage: FC = (): ReactElement => {
	//summaryContext related
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState('short');
	const [summaryType, setType] = useState(0);
	const [summaryTone, setTone] = useState(0);
	const [outputText, setOutputText] = useState('');
	const [currentComponent, setCurrentComponent] = useState(1);

	//UserContext related
	const { token } = useUserData();
	console.log('summarypage🚀:', token);

	return (
		<SummaryContext.Provider
			value={{
				inputText,
				summaryLength,
				summaryType,
				summaryTone,
				outputText,
				currentComponent,
				setInputText,
				setLength,
				setType,
				setTone,
				setOutputText,
				setCurrentComponent,
			}}
		>
			<section className="h-screen w-full flex overflow-hidden font-scrptai">
				<Sidebar />

				{/* add a loading animation if isLoading === true */}
				{/* {!isLoading && <Summarize />} */}
				<Summarize />
			</section>
		</SummaryContext.Provider>
	);
};

export default SummarizePage;

{
	/* <main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-center space-y-1 ">
				<Documents />
			</main> */
}
