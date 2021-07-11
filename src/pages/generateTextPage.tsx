import React, { FC, ReactElement, useState } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import AuthenticationWidget from '../components/authenticationWidget';
import UserSessionBar from '../components/userSessionBar';

//hooks
import { useUserData } from '../hooks/contexts/userContext';
import { SummaryContext } from '../hooks/contexts/summaryContext';

const GenerateTextPage: FC = (): ReactElement => {
	//summaryContext related
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState(100);
	const [summaryType, setType] = useState(0);
	const [outputArray, setOutputArray] = useState<Array<string>>([]);
	const [currentComponent, setCurrentComponent] = useState(1);
	const [characterLimitReached, setCharacterLimitReached] = useState(false);
	const [inputRiskGroup, setInputRiskGroup] = useState('0');
	const [summaryLanguage, setSummaryLanguage] = useState('english');

	const { isAuthenticating, userObject } = useUserData();

	return (
		<SummaryContext.Provider
			value={{
				inputText,
				summaryLength,
				summaryType,
				outputArray,
				currentComponent,
				setInputText,
				setLength,
				setType,
				setOutputArray,
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
					{userObject.userIsTrial === true && <UserSessionBar />}
					<Sidebar />
				</section>
			)}
		</SummaryContext.Provider>
	);
};

export default GenerateTextPage;
