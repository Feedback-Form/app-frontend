import React, { FC, ReactElement, useEffect, useState } from 'react';

//components
import Sidebar from '../components/sidebar';
import Summarize from '../components/main/summarize';
import AuthenticationWidget from '../components/authenticationWidget';

//hooks
import { useUserData } from '../hooks/contexts/userContext';
import { SummaryContext } from '../hooks/contexts/summaryContext';

//const
const backend_url = 'http://localhost:5000';

const SummarizePage: FC = (): ReactElement => {
	//summaryContext related
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState(500);
	const [summaryType, setType] = useState(0);
	const [summaryTone, setTone] = useState(0);
	const [outputText, setOutputText] = useState('');
	const [currentComponent, setCurrentComponent] = useState(1);
	const [characterLimitReached, setCharacterLimitReached] = useState(false);

	const { isAuthenticating } = useUserData();

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
				characterLimitReached,
				setCharacterLimitReached,
			}}
		>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="h-screen w-full flex overflow-hidden font-scrptai">
					<Sidebar />
					<Summarize />
				</section>
			)}
		</SummaryContext.Provider>
	);
};

export default SummarizePage;
