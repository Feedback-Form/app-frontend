import React, { FC, ReactElement, useState } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import ChooseLanguage from '../components/choose-language/chooseLanguage';
import AuthenticationWidget from '../components/authenticationWidget';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const ChooseLanguagePage: FC = (): ReactElement => {
	const { isAuthenticating } = useUserData();
	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="h-screen w-full flex overflow-hidden font-scrptai">
					<Sidebar />
					<ChooseLanguage />
				</section>
			)}
		</>
	);
};
export default ChooseLanguagePage;
