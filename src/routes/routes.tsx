import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import axios from 'axios';

//pages
import GenerateTextPage from '../pages/generateTextPage';
import DocumentsPage from '../pages/documentsPage';
import SingleDocPage from '../pages/singleDocumentPage';
import LoginPage from '../pages/loginPage';
import StatusPage from '../components/status-page/statusPage';
import TrialEndedPage from '../pages/trialEndedPage';
import SignUpPage from '../pages/signUpPage';
import PasswordForgotPage from '../pages/passwordForgotPage';
import PasswordChangePage from '../pages/passwordChangePage';
import ChooseLanguagePage from '../pages/chooseLanguagePage';
import ChooseTypePage from '../pages/chooseTypePage';
import VerifyAccountPage from '../pages/verifyAccountPage';
import RenewSubscriptionPage from '../pages/renewSubscriptionPage';
//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

//interfaces
import { UserResponseObject } from './interfaces/userObjectResponseInterface';
import { UserObjectInterface } from './interfaces/userObject';

const Routes: FC = (): ReactElement => {
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [currentSessionCount, setCurrentSessionCount] = useState(0);

	//PROD
	const [userObject, setUserObject] = useState<UserObjectInterface>({
		productId: '',
		stripeCustomerId: '',
		maxMonthlySessionCount: 0,
		userIsTrial: true,
		subscriptionStatus: '',
		currentPeriodEnd: 4110026795,
		maxTrialSessionCount: 50,
	});

	const [endedTrialRedirect, setEndredTrialRedirect] = useState(false);
	const [endedSubscriptionRedirect, setEndedSubscriptionRedirect] = useState(false);

	useEffect(() => {
		//if one of the paths below, not AUTH is required.
		const shortPath = /[^*][^/]*/.exec(pathname)!;

		if (
			// shortPath[0] !== '/login' &&
			shortPath[0] !== '/plans' &&
			shortPath[0] !== '/success' &&
			shortPath[0] !== '/cancelled' &&
			shortPath[0] !== '/signup' &&
			shortPath[0] !== '/password'
			// shortPath[0] !== '/user'
		) {
			console.log('token', token);
			if (token === '' || token === undefined || token === null) {
				//activate redirect if authentication failes and user was in one of the following routes
				// /summarize, /documents & /document/:id
				setRedirect(true);
			} else {
				setIsAuthenticating(true);

				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};

				axios
					.get<UserResponseObject>(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/info`, config)
					.then(res => {
						const { currentSessionCount } = res.data.user.usage.sessions;
						const { maxTrialSessionCount } = res.data.user.usage;
						const { productId, subscriptionStatus, currentPeriodEnd } = res.data.user.billing.subscription;
						const { stripeCustomerId, userIsTrial } = res.data.user.billing;

						//timestamp related
						const currentPeriodEndInSeconds = new Date(currentPeriodEnd * 1000);

						const today = new Date();

						setUserObject({
							productId,
							stripeCustomerId,
							userIsTrial,
							subscriptionStatus,
							currentPeriodEnd,
							maxMonthlySessionCount: res.data.user.usage.sessions.maxMonthlySessionCount,
							maxTrialSessionCount,
						});
						setCurrentSessionCount(currentSessionCount);

						//triggers if the user has used up all trial sessions
						if (currentSessionCount >= maxTrialSessionCount && userIsTrial === true) {
							setEndredTrialRedirect(true);
						}

						//if the user is on a paid plan && plan is expired
						//redirect user to page, where he can navigate to customer portal
						if (today > currentPeriodEndInSeconds && userIsTrial === false) {
							setEndedSubscriptionRedirect(true);
						}

						setIsAuthenticating(false);
					})
					.catch((err: any) => {
						//activate redirect if authentication failes and user was in one of the following routes
						// /summarize, /documents & /document/:id
						setRedirect(true);
					});
			}
		}
	}, [jwtReceived, pathname]);

	return (
		<Switch>
			<UserContext.Provider
				value={{
					userPlan,
					token,
					setUserPlan,
					setToken,
					jwtReceived,
					setJwtReceived,
					isAuthenticating,
					setIsAuthenticating,
					userObject,
					setUserObject,
					currentSessionCount,
					setCurrentSessionCount,
				}}
			>
				{redirect && <Redirect to="/login" />}
				{endedTrialRedirect && <Redirect to="/trial/ended" />}
				{endedSubscriptionRedirect && <Redirect to="/subscription/ended" />}
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route exact path="/login" render={() => <LoginPage />} />
				<Route exact path="/documents" render={() => <DocumentsPage />} />
				<Route exact path="/document/:id" render={() => <SingleDocPage />} />
				<Route exact path="/generate" render={() => <ChooseTypePage />} />
				<Route exact path="/generate/:type/" render={() => <ChooseLanguagePage />} />
				<Route exact path="/generate/:type/:language" render={() => <GenerateTextPage />} />
				<Route exact path="/trial/ended" render={() => <TrialEndedPage />} />
				<Route exact path="/subscription/ended" render={() => <RenewSubscriptionPage />} />
				<Route exact path="/signup" render={() => <SignUpPage />} />
				<Route exact path="/user/verify/:userId/:token" render={() => <VerifyAccountPage />} />
				<Route exact path="/password/reset/initiate" render={() => <PasswordForgotPage />} />
				<Route exact path="/password/reset/:userId/:token" render={() => <PasswordChangePage />} />

				<Route path="/success" render={() => <StatusPage success={true} destinationPathName={'generate'} />} />
				<Route path="/cancelled" render={() => <StatusPage success={false} destinationPathName={'generate'} />} />
			</UserContext.Provider>
		</Switch>
	);
};

export default Routes;
