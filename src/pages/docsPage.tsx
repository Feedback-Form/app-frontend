import React, { FC, ReactElement } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';

import Documents from '../components/documents/documents';
import AuthenticationWidget from '../components/authenticationWidget';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

const DocumentsPage: FC = (): ReactElement => {
	const { isAuthenticating } = useUserData();

	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="h-screen w-full flex overflow-hidden font-scrptai">
					<Sidebar />
					<Documents />
				</section>
			)}
		</>
	);
};
export default DocumentsPage;
