import React, { FC, ReactElement } from 'react';
import AuthenticationWidget from '../components/authenticationWidget';

//components
import FormBuilder from '../components/form-builder/formBuilder';
//hooks
import { useUserData } from '../hooks/contexts/userContext';

const FormBuilderPage: FC = (): ReactElement => {
	const { isAuthenticating } = useUserData();
	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="flex overflow-hidden font-scrptai">
					<FormBuilder />
				</section>
			)}
		</>
	);
};

export default FormBuilderPage;
