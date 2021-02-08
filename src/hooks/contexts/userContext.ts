import { createContext, useContext } from 'react';

type UserObj = {
	productName: string;
	maxSessionWords: number;
	maxResponseWords: number;
	stripeCustomerId: string;
};

export type UserContextType = {
	userPlan: string;
	token: string;
	jwtReceived: boolean;
	isAuthenticating: boolean;
	userObject: {
		productName: string;
		maxSessionWords: number;
		maxResponseWords: number;
		stripeCustomerId: string;
	};
	setUserPlan: (userPlan: string) => void;
	setToken: (token: string) => void;
	setJwtReceived: (jwtReceived: boolean) => void;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
	setUserObject: (userObject: UserObj) => void;
};

export const UserContext = createContext<UserContextType>({
	userPlan: '',
	token: '',
	jwtReceived: false,
	isAuthenticating: true,
	userObject: {
		productName: '',
		maxSessionWords: 0,
		maxResponseWords: 0,
		stripeCustomerId: '',
	},
	setUserPlan: userPlan => console.warn('userplan_missing'),
	setToken: token => console.warn('token_missing'),
	setJwtReceived: jwtReceived => console.warn('jwtreceived_missing'),
	setIsAuthenticating: isAuthenticating => console.warn('isauthenticating_missing'),
	setUserObject: useObject => console.warn('userobj_missing'),
});
export const useUserData = () => useContext(UserContext);
