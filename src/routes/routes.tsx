import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import axios from 'axios';

//pages
import GenerateTextPage from '../pages/generateTextPage';
import DocumentsPage from '../pages/documentsPage';
import SingleDocPage from '../pages/singleDocumentPage';
import LoginPage from '../pages/loginPage';
import DummyPlans from '../components/dummyPlans';
import StatusPage from '../components/status-page/statusPage';
import TrialEndedPage from '../pages/trialEndedPage';
import SignUpPage from '../pages/signUpPage';
import PasswordForgotPage from '../pages/passwordForgotPage';
import PasswordChangePage from '../pages/passwordChangePage';
import ChooseLanguagePage from '../pages/chooseLanguagePage';
import ChooseTypePage from '../pages/chooseTypePage';
import VerifyAccountPage from '../pages/verifyAccountPage';
//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

//interfaces
import { UserObject } from './interfaces/userObjectInterface';

const Routes: FC = (): ReactElement => {
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);

	//PROD
	const [userObject, setUserObject] = useState({
		productName: '',
		stripeCustomerId: '',
		currentSessionCount: 0,
		maxMonthlySessionCount: 0,
		userIsTrial: true,
	});

	//TEST
	// const [userObject, setUserObject] = useState({
	// 	productName: '',
	// 	stripeCustomerId: '',
	// 	currentSessionCount: 6,
	// 	maxMonthlySessionCount: 25,
	// 	userIsTrial: true,
	// });

	const [endedTrialRedirect, setEndredTrialRedirect] = useState(false);
	//console.log('jwt received 🍀', jwtReceived);
	useEffect(() => {
		// /////
		// //REMOVE in PROD
		// ////
		// setIsAuthenticating(false);
		// return;
		// //
		// ////

		//if one of the paths below, not AUTH is required.
		const shortPath = /[^*][^/]*/.exec(pathname)!;

		if (
			shortPath[0] !== '/login' &&
			shortPath[0] !== '/plans' &&
			shortPath[0] !== '/success' &&
			shortPath[0] !== '/cancelled' &&
			shortPath[0] !== '/signup' &&
			shortPath[0] !== '/password' &&
			shortPath[0] !== '/user'
		) {
			if (token === '' || token === undefined || token === null) {
				console.log('REDIRECT USER TO LOGIN PAGE 🚨');
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
					.get<UserObject>(
						`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/info`,
						config,
					)
					.then(res => {
						const { currentSessionCount } = res.data.user.usage.sessions;
						const { productName } = res.data.user.billing.subscription;
						const { stripeCustomerId, userIsTrial } = res.data.user.billing;

						setUserObject({
							productName,
							stripeCustomerId,
							currentSessionCount,
							userIsTrial,
							maxMonthlySessionCount:
								res.data.user.usage.sessions.maxMonthlySessionCount,
						});

						//triggers if the user has used up all trial sessions
						if (
							currentSessionCount >= 50 &&
							productName !== 'SCRPTAI_BASIC_PLAN'
						) {
							setEndredTrialRedirect(true);
						}

						setIsAuthenticating(false);
					})
					.catch((err: any) => {
						console.log('err', err);
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
				}}
			>
				{redirect && <Redirect to="/login" />}
				{endedTrialRedirect && <Redirect to="/trial/ended" />}
				<Route exact path="/" render={() => <Redirect to="/login" />} />

				{/* remove in PROD */}
				{/* <Redirect to="/" />
				<Route exact path="/" render={() => <ChooseTypePage />} /> */}
				{/* ---- */}
				<Route exact path="/login" render={() => <LoginPage />} />
				<Route exact path="/documents" render={() => <DocumentsPage />} />
				<Route exact path="/document/:id" render={() => <SingleDocPage />} />
				<Route exact path="/plans" render={() => <DummyPlans />} />
				<Route exact path="/generate" render={() => <ChooseTypePage />} />
				<Route
					exact
					path="/generate/:type/"
					render={() => <ChooseLanguagePage />}
				/>
				<Route
					exact
					path="/generate/:type/:language"
					render={() => <GenerateTextPage />}
				/>
				<Route exact path="/trial/ended" render={() => <TrialEndedPage />} />
				<Route exact path="/signup" render={() => <SignUpPage />} />
				<Route
					exact
					path="/user/verify/:userId/:token"
					render={() => <VerifyAccountPage />}
				/>
				<Route
					exact
					path="/password/reset/initiate"
					render={() => <PasswordForgotPage />}
				/>
				<Route
					exact
					path="/password/reset/:userId/:token"
					render={() => <PasswordChangePage />}
				/>

				<Route
					path="/success"
					render={() => (
						<StatusPage success={true} destinationPathName={'summarize'} />
					)}
				/>
				<Route
					path="/cancelled"
					render={() => (
						<StatusPage success={false} destinationPathName={'summarize'} />
					)}
				/>
			</UserContext.Provider>
		</Switch>
	);
};

export default Routes;
