import React, { FC, ReactElement, createContext, useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import { UserContext } from '../hooks/userContext';
const Routes: FC = (): ReactElement => {
	const [userPlan, setUserPlan] = useState('SCRPTAI_ADVANCED_PLAN');
	return (
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/summarize" />} />
			<Route
				exact
				path="/summarize"
				render={() => (
					<UserContext.Provider value={{ userPlan }}>
						<Dashboard />
					</UserContext.Provider>
				)}
			/>
		</Switch>
	);
};

export default Routes;
