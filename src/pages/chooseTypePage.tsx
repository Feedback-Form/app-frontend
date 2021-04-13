import React, { FC, ReactElement } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import ChooseType from '../components/choose-type/chooseType';
import AuthenticationWidget from '../components/authenticationWidget';
import UserSessionBar from '../components/userSessionBar';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const ChooseTypePage: FC = (): ReactElement => {
	const { isAuthenticating, userObject } = useUserData();

	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="w-full font-scrptai">
					{userObject.userIsTrial === true && <UserSessionBar />}
					<Sidebar />
					<ChooseType />
				</section>
			)}
		</>
	);
};
export default ChooseTypePage;
