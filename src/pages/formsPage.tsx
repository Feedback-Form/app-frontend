import React, { FC, ReactElement } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';

import Forms from '../components/forms/forms';
import AuthenticationWidget from '../components/authenticationWidget';
import UserSessionBar from '../components/userSessionBar';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const FormsPage: FC = (): ReactElement => {
	const { isAuthenticating, userObject } = useUserData();

	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="flex overflow-hidden font-scrptai">
					{userObject.userIsTrial === true && <UserSessionBar />}
					<Sidebar />
					<Forms />
				</section>
			)}
		</>
	);
};
export default FormsPage;
