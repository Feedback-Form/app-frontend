import React, { FC, ReactElement, createContext, useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/userContext';

//pages
import SummarizePage from '../pages/summarizePage';
import DocumentsPage from '../pages/docsPage';
import SingleDocPage from '../pages/singleDocPage';
// import TranscribePage from '../pages/transcribe';

const Routes: FC = (): ReactElement => {
	const [userPlan, setUserPlan] = useState('SCRPTAI_ADVANCED_PLAN');
	return (
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/documents" />} />
			<Route
				exact
				path="/summarize"
				render={() => (
					<UserContext.Provider value={{ userPlan }}>
						<SummarizePage />
					</UserContext.Provider>
				)}
			/>
			<Route exact path="/documents" render={() => <DocumentsPage />} />
			<Route exact path="/document/:id" render={() => <SingleDocPage />} />
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
