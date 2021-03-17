import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import axios from 'axios';

//pages
import SummarizePage from '../pages/summarizePage';
import DocumentsPage from '../pages/docsPage';
import SingleDocPage from '../pages/singleDocPage';
import LoginPage from '../pages/loginPage';
import DummyPlans from '../components/dummyPlans';
import StatusPage from '../components/statusPage';

//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

type AuthToken = {
	auth_token: string;
};

interface UserObj {
	user: {
		billing: {
			subscription: {
				productName: string;
			};
			stripeCustomerId: string;
		};
		usage: {
			sessions: {
				currentSessionCount: number;
				maxMonthlySessionCount: number;
			};
			characters: {
				maxSessionCharacters: number;
				maxResponseCharacters: number;
			};
		};
	};
}

const Routes: FC = (): ReactElement => {
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [userObject, setUserObject] = useState({
		productName: '',
		stripeCustomerId: '',
		currentSessionCount: 0,
		maxMonthlySessionCount: 0,
		maxSessionCharacters: 0,
		maxResponseCharacters: 0,
	});

	console.log('jwt received 🍀', jwtReceived);
	useEffect(() => {
		//if one of the paths below, not AUTH is required.
		if (pathname !== '/login' && pathname !== '/plans' && pathname !== '/success' && pathname !== '/cancelled') {
			if (token === '' || token === undefined || token === null) {
				console.log('REDIRECT USER TO LOGIN PAGE 🚨');
				//activate redirect if authentication failes and user was in one of the following routes
				// /summarize, /documents & /document/:id
				setRedirect(true);
			} else {
				console.log('localstorage:', { token });

				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};

				axios
					.get<UserObj>(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/info`, config)
					.then(res => {
						console.log('userobj', res);

						setUserObject({
							productName: res.data.user.billing.subscription.productName,
							stripeCustomerId: res.data.user.billing.stripeCustomerId,
							currentSessionCount: res.data.user.usage.sessions.currentSessionCount,
							maxMonthlySessionCount: res.data.user.usage.sessions.maxMonthlySessionCount,
							maxSessionCharacters: res.data.user.usage.characters.maxSessionCharacters,
							maxResponseCharacters: res.data.user.usage.characters.maxResponseCharacters,
						});

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
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route path="/login" render={() => <LoginPage />} />
				<Route exact path="/summarize" render={() => <SummarizePage />} />
				<Route exact path="/documents" render={() => <DocumentsPage />} />

				<Route path="/document/:id" render={() => <SingleDocPage />} />
				<Route path="/plans" render={() => <DummyPlans />} />
				<Route path="/success" render={() => <StatusPage success={true} destinationPathName={'summarize'} />} />
				<Route path="/cancelled" render={() => <StatusPage success={false} destinationPathName={'summarize'} />} />
			</UserContext.Provider>
		</Switch>
	);
};

export default Routes;
