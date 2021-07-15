import React, { FC, ReactElement } from 'react';
import AuthenticationWidget from '../components/authenticationWidget';

//components
import Responses from '../components/responses/responses';
import Sidebar from '../components/sidebar/sideBar';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const ResponsesPage: FC = (): ReactElement => {
	const { isAuthenticating } = useUserData();
	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="flex overflow-hidden font-scrptai">
					<Sidebar />
					<Responses />
				</section>
			)}
		</>
	);
};

export default ResponsesPage;
