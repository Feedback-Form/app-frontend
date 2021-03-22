import React, { FC, ReactElement, useState } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import ChooseType from '../components/choose-type/chooseType';
import AuthenticationWidget from '../components/authenticationWidget';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const ChooseTypePage: FC = (): ReactElement => {
	const { isAuthenticating } = useUserData();
	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="h-screen w-full flex overflow-hidden font-scrptai">
					<Sidebar />
					<ChooseType />
				</section>
			)}
		</>
	);
};
export default ChooseTypePage;
