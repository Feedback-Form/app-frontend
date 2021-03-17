import React, { FC, ReactElement, useState } from 'react';

//components
import Sidebar from '../components/sidebar';
import Summarize from '../components/main/summarize';
import AuthenticationWidget from '../components/authenticationWidget';

//hooks
import { useUserData } from '../hooks/contexts/userContext';
import { SummaryContext } from '../hooks/contexts/summaryContext';

const SummarizePage: FC = (): ReactElement => {
	//summaryContext related
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState(100);
	const [summaryType, setType] = useState(0);
	const [summaryTone, setTone] = useState(0);
	const [outputText, setOutputText] = useState('');
	const [currentComponent, setCurrentComponent] = useState(1);
	const [characterLimitReached, setCharacterLimitReached] = useState(false);
	const [inputRiskGroup, setInputRiskGroup] = useState('0');
	const [summaryLanguage, setSummaryLanguage] = useState('english');

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
				inputRiskGroup,
				setInputRiskGroup,
				summaryLanguage,
				setSummaryLanguage,
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
