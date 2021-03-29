import { createContext, useContext } from 'react';

import { UserObjectInterface } from '../../routes/interfaces/userObject';

export interface UserContextType {
	userPlan: string;
	token: string;
	jwtReceived: boolean;
	isAuthenticating: boolean;
	userObject: {
		productId: string;
		stripeCustomerId: string;
		currentSessionCount: number;
		maxMonthlySessionCount: number;
		userIsTrial: boolean;
		subscriptionStatus: string;
		currentPeriodEnd: number;
	};
	setUserPlan: (userPlan: string) => void;
	setToken: (key: string) => void;
	setJwtReceived: (jwtReceived: boolean) => void;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
	setUserObject: (userObject: UserObjectInterface) => void;
}

export const UserContext = createContext<UserContextType>({
	userPlan: '',
	token: '',
	jwtReceived: false,
	isAuthenticating: true,
	userObject: {
		productId: '',
		stripeCustomerId: '',
		currentSessionCount: 0,
		maxMonthlySessionCount: 0,
		userIsTrial: true,
		subscriptionStatus: 'active',
		currentPeriodEnd: 4110026795,
	},
	setUserPlan: userPlan => console.warn('userplan_missing'),
	setToken: token => console.warn('token_missing'),
	setJwtReceived: jwtReceived => console.warn('jwtreceived_missing'),
	setIsAuthenticating: isAuthenticating => console.warn('isauthenticating_missing'),
	setUserObject: useObject => console.warn('userobj_missing'),
});
export const useUserData = (): any => useContext(UserContext);
