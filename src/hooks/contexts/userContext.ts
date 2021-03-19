import { createContext, useContext } from 'react';

interface UserObj {
	productName: string;
	stripeCustomerId: string;
	currentSessionCount: number;
	maxMonthlySessionCount: number;
	maxResponseCharacters: number;
	maxSessionCharacters: number;
}

export interface UserContextType {
	userPlan: string;
	token: string;
	jwtReceived: boolean;
	isAuthenticating: boolean;
	userObject: {
		productName: string;
		stripeCustomerId: string;
		currentSessionCount: number;
		maxMonthlySessionCount: number;
		maxResponseCharacters: number;
		maxSessionCharacters: number;
	};
	setUserPlan: (userPlan: string) => void;
	setToken: (key: string) => void;
	setJwtReceived: (jwtReceived: boolean) => void;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
	setUserObject: (userObject: UserObj) => void;
}

export const UserContext = createContext<UserContextType>({
	userPlan: '',
	token: '',
	jwtReceived: false,
	isAuthenticating: true,
	userObject: {
		productName: '',
		stripeCustomerId: '',
		currentSessionCount: 0,
		maxMonthlySessionCount: 0,
		maxResponseCharacters: 0,
		maxSessionCharacters: 0,
	},
	setUserPlan: userPlan => console.warn('userplan_missing'),
	setToken: token => console.warn('token_missing'),
	setJwtReceived: jwtReceived => console.warn('jwtreceived_missing'),
	setIsAuthenticating: isAuthenticating =>
		console.warn('isauthenticating_missing'),
	setUserObject: useObject => console.warn('userobj_missing'),
});
export const useUserData = (): any => useContext(UserContext);
