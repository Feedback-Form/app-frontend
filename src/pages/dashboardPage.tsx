import React, { FC, ReactElement } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import Dashboards from '../components/dashboard/dashboards';
import AuthenticationWidget from '../components/authenticationWidget';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const DashboardPage: FC = (): ReactElement => {
	const { isAuthenticating, userObject } = useUserData();

	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="flex overflow-hidden font-scrptai">
					{/* {userObject.userIsTrial === true && <UserSessionBar />} */}
					<Sidebar />
					<Dashboards />
				</section>
			)}
		</>
	);
};
export default DashboardPage;
