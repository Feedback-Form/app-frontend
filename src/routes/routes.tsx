import React, { FC, ReactElement, createContext, useContext, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import axios from 'axios';

//pages
import SummarizePage from '../pages/summarizePage';
import DocumentsPage from '../pages/docsPage';
import SingleDocPage from '../pages/singleDocPage';
import LoginPage from '../pages/loginPage';
// import TranscribePage from '../pages/transcribe';

//hooks
import { UserContext } from '../hooks/contexts/userContext';
import useLocalStorage from '../hooks/useLocalStorage';

//const
const backend_url = 'http://localhost:5000';

type AuthToken = {
	auth_token: string;
};

const Routes: FC = (): ReactElement => {
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useLocalStorage('authToken', '');
	const [jwtReceived, setJwtReceived] = useState(false);
	// const [authToken, setAuthToken] = useLocalStorage('authToken', '');
	const [redirect, setRedirect] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(true);

	//console.log('jwt received 🍀', jwtReceived);
	useEffect(() => {
		// const authToken = localStorage.getItem('auth_token');

		if (token === '' || token === undefined || token === null) {
			console.log('REDIRECT USER TO LOGIN PAGE 🚨');
			setRedirect(true);
		}
		console.log('localstorage:', { token });

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.get(`${backend_url}/user/info`, config)
			.then((res: any) => {
				console.log(res);
				setIsAuthenticating(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setIsAuthenticating(false);
			});
	}, [jwtReceived]);
	return (
		<Switch>
			<UserContext.Provider
				value={{ userPlan, token, setUserPlan, setToken, jwtReceived, setJwtReceived, isAuthenticating, setIsAuthenticating }}
			>
				{/* <Route exact path="/" render={() => <Redirect to="/summarize" />} /> */}
				{redirect && <Redirect to="/login" />}
				<Route path="/login" render={() => <LoginPage />} />
				<Route exact path="/summarize" render={() => <SummarizePage />} />
				<Route exact path="/documents" render={() => <DocumentsPage />} />

				<Route path="/document/:id" render={() => <SingleDocPage />} />

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

{
	/* <Switch>
<Route exact path="/" render={() => <Redirect to="/summarize" />} />
<Route
	path="/login"
	render={() => (
		<UserContext.Provider value={{ userPlan, token, setUserPlan, setToken }}>
			<LoginPage />
		</UserContext.Provider>
	)}
/>
<Route
	exact
	path="/summarize"
	render={() => (
		<UserContext.Provider value={{ userPlan, token, setUserPlan, setToken }}>
			<SummarizePage />
		</UserContext.Provider>
	)}
/>
<Route exact path="/documents" render={() => <DocumentsPage />} />

<Route path="/document/:id" render={() => <SingleDocPage />} />

{/* <Route
	exact
	path="/transcribe"
	render={() => (
		<UserContext.Provider value={{ userPlan }}>
			<TranscribePage />
		</UserContext.Provider>
	)}
/> 
</Switch> */
}
