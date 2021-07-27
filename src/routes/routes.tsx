import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import axios from 'axios';

//pages
import FormsPage from '../pages/formsPage';
import LoginPage from '../pages/loginPage';
import StatusPage from '../components/status-page/statusPage';
import FormBuilderPage from '../pages/formbuilderPage';
import RatingPage from '../pages/ratingPage';
import ResponsesPage from '../pages/responsesPage';
import DashboardPage from '../pages/dashboardPage';
import ProfilePage from '../pages/profilePage';
// import TrialEndedPage from '../pages/trialEndedPage';
// import SignUpPage from '../pages/signUpPage';
// import PasswordForgotPage from '../pages/passwordForgotPage';
// import PasswordChangePage from '../pages/passwordChangePage';
// import VerifyAccountPage from '../pages/verifyAccountPage';
// import RenewSubscriptionPage from '../pages/renewSubscriptionPage';
//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

//interfaces
import { UserObjectInterface } from '../interfaces/userObjectInterface';

import { getUserInfo } from '../services/userService';

const Routes: FC = (): ReactElement => {
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [currentSessionCount, setCurrentSessionCount] = useState(0);

	//PROD
	const [userObject, setUserObject] = useState<UserObjectInterface>({
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		productServiceDescription: '',
		userIsVerified: false,
		_id: '',
	});

	const [endedTrialRedirect, setEndredTrialRedirect] = useState(false);
	const [endedSubscriptionRedirect, setEndedSubscriptionRedirect] = useState(false);

	useEffect(() => {
		// setIsAuthenticating(false);
		// return;
		//if one of the paths below, not AUTH is required.
		const shortPath = /[^*][^/]*/.exec(pathname)!;

		if (
			// shortPath[0] !== '/login' &&
			shortPath[0] !== '/plans' &&
			shortPath[0] !== '/success' &&
			shortPath[0] !== '/cancelled' &&
			shortPath[0] !== '/signup' &&
			shortPath[0] !== '/password' &&
			shortPath[0] !== '/rate'

			// shortPath[0] !== '/user'
		) {
			console.log(token);
			if (token === '' || token === undefined || token === null) {
				//activate redirect if authentication failes and user was in one of the following routes
				// /summarize, /documents & /document/:id
				setRedirect(true);
			} else {
				setIsAuthenticating(true);

				(async () => {
					try {
						const response = await getUserInfo(token);
						const { firstName, lastName, company, email, productServiceDescription, userIsVerified, _id } = response.user;

						setUserObject({
							firstName,
							lastName,
							company,
							email,
							productServiceDescription,
							userIsVerified,
							_id,
						});
						setIsAuthenticating(false);
					} catch (err) {
						//activate redirect if authentication failes and user was in one of the following routes
						// /summarize, /documents & /document/:id
						setRedirect(true);
					}
				})();
			}
		}
	}, [jwtReceived, pathname]);

	return (
		<Switch>
			<UserContext.Provider
				value={{
					token,
					setToken,
					jwtReceived,
					setJwtReceived,
					isAuthenticating,
					setIsAuthenticating,
					userObject,
					setUserObject,
				}}
			>
				{redirect && <Redirect to="/login" />}
				{endedTrialRedirect && <Redirect to="/trial/ended" />}
				{endedSubscriptionRedirect && <Redirect to="/subscription/ended" />}
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route exact path="/login" render={() => <LoginPage />} />
				<Route exact path="/forms" render={() => <FormsPage />} />
				<Route exact path="/form/new" render={() => <FormBuilderPage />} />
				{/* <Route exact path="/form/edit/:formId" render={() => <h1>edit an existing form</h1>} /> */}
				<Route exact path="/rate/:formId" render={() => <RatingPage />} />
				<Route exact path="/dashboard" render={() => <DashboardPage />} />
				<Route exact path="/responses" render={() => <ResponsesPage />} />
				<Route exact path="/profile" render={() => <ProfilePage />} />

				{/* <Route exact path="/trial/ended" render={() => <TrialEndedPage />} />
				<Route exact path="/subscription/ended" render={() => <RenewSubscriptionPage />} />
				<Route exact path="/signup" render={() => <SignUpPage />} /> */}
				{/* <Route exact path="/user/verify/:userId/:token" render={() => <VerifyAccountPage />} /> */}
				{/* <Route exact path="/password/reset/initiate" render={() => <PasswordForgotPage />} />
				<Route exact path="/password/reset/:userId/:token" render={() => <PasswordChangePage />} /> */}

				<Route path="/success" render={() => <StatusPage success={true} destinationPathName={'generate'} />} />
				<Route path="/cancelled" render={() => <StatusPage success={false} destinationPathName={'generate'} />} />
			</UserContext.Provider>
		</Switch>
	);
};

export default Routes;
