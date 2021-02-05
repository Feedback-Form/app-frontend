import React, { FC, ReactElement, createContext, useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/contexts/userContext';

//pages
import SummarizePage from '../pages/summarizePage';
import DocumentsPage from '../pages/docsPage';
import SingleDocPage from '../pages/singleDocPage';
import LoginPage from '../pages/loginPage';
// import TranscribePage from '../pages/transcribe';

const Routes: FC = (): ReactElement => {
	const [userPlan, setUserPlan] = useState('');
	const [token, setToken] = useState('');
	return (
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/login" />} />
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
			/> */}
		</Switch>
	);
};

export default Routes;
