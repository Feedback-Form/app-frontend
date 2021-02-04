import React, { FC, ReactElement, useEffect, useState } from 'react';

import Sidebar from '../components/sidebar';
import Summarize from '../components/main/summarize';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserData } from '../hooks/userContext';

const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
import { SummaryContext } from '../hooks/summaryContext';

import AudioUploading from '../components/uploading';

const SummarizePage: FC = (): ReactElement => {
	//summaryContext related
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState('short');
	const [summaryType, setType] = useState(0);
	const [summaryTone, setTone] = useState(0);
	const [outputText, setOutputText] = useState('');
	const [currentComponent, setCurrentComponent] = useState(3);

	//UserContext related
	const { userPlan } = useUserData();

	//query params related
	// const query = useQuery();
	// const [id, setId] = useState(query.get('docid'));

	// const config = {
	// 	headers: {
	// 		'Content-Type': 'multipart/form-data',
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	// const [isLoading, setIsLoading] = useState(true);

	// function getDocument() {
	// 	axios
	// 		.get(`${backend_url}/document/${id}`, config)
	// 		.then((res: any) => {
	// 			console.log('GET res', res.data);
	// 			//pass on to input component of summary
	// 			setInputText(res.data.transcript);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err: any) => {
	// 			console.log('err', err);
	// 		});
	// }

	// useEffect(() => {
	// 	if (id !== undefined && id !== '') {
	// 		getDocument();
	// 	}
	// }, [id]);

	//console.log('docid:', { id: query.get('docid') });
	// console.log('userDataContext:', {
	// 	plan: userPlan,
	// });
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
