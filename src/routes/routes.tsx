import React, { FC, ReactElement, createContext, useContext, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

//pages
import SummarizePage from '../pages/summarizePage';
import DocumentsPage from '../pages/docsPage';
import SingleDocPage from '../pages/singleDocPage';
import LoginPage from '../pages/loginPage';
import DummyPlans from '../components/dummyPlans';
// import TranscribePage from '../pages/transcribe';

//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

//const
const backend_url = 'http://localhost:5000';

type AuthToken = {
	auth_token: string;
};

interface UserObj {
	user: {
		billing: {
			subscription: {
				productName: string;
			};
		};
		usage: {
			words: {
				maxSessionWords: number;
				maxResponseWords: number;
			};
		};
	};
}

const Routes: FC = (): ReactElement => {
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	// const [authToken, setAuthToken] = useLocalStorage('authToken', '');
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [userObject, setUserObject] = useState({
		productName: '',
		maxSessionWords: 0,
		maxResponseWords: 0,
	});

	console.log('jwt received 🍀', jwtReceived);
	useEffect(() => {
		// const authToken = localStorage.getItem('auth_token');

		if (token === '' || token === undefined || token === null) {
			console.log('REDIRECT USER TO LOGIN PAGE 🚨');
			//activate redirect if authentication failes and user was in one of the following routes
			// /summarize, /documents & /document/:id
			//setRedirect(true);
		} else {
			console.log('localstorage:', { token });

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			axios
				.get<UserObj>(`${backend_url}/user/info`, config)
				.then(res => {
					console.log(res.data);

					setUserObject({
						productName: res.data.user.billing.subscription.productName,
						maxSessionWords: res.data.user.usage.words.maxSessionWords,
						maxResponseWords: res.data.user.usage.words.maxResponseWords,
					});

					setIsAuthenticating(false);
				})
				.catch((err: any) => {
					console.log('err', err);
					//activate redirect if authentication failes and user was in one of the following routes
					// /summarize, /documents & /document/:id
					//setRedirect(true);
				});
		}
	}, [jwtReceived]);

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
				{/* <Route exact path="/" render={() => <Redirect to="/summarize" />} /> */}
				{redirect && <Redirect to="/login" />}
				<Route path="/login" render={() => <LoginPage />} />
				<Route exact path="/summarize" render={() => <SummarizePage />} />
				<Route exact path="/documents" render={() => <DocumentsPage />} />

				<Route path="/document/:id" render={() => <SingleDocPage />} />
				<Route path="/plans" render={() => <DummyPlans />} />
				<Route
					path="/success"
					render={() => (
						<>
							{' '}
							<div>
								<h1 className="text-gray-900">success</h1>
							</div>
						</>
					)}
				/>
				<Route
					path="/cancelled"
					render={() => (
						<>
							{' '}
							<div>
								<h1 className="text-gray-900">cancelled</h1>
							</div>
						</>
					)}
				/>

				{/* <Route
				exact
				path="/transcribe"
				render={() => (
					<UserContext.Provider value={{ userPlan }}>
						<TranscribePage />
					</UserContext.Provider>
				)}
			/> */}
			</UserContext.Provider>
		</Switch>
	);
};

export default Routes;
