import { createContext, useContext } from 'react';

export type UserContextType = {
	userPlan: string;
	token: string;
	jwtReceived: boolean;
	isAuthenticating: boolean;
	setUserPlan: (userPlan: string) => void;
	setToken: (token: string) => void;
	setJwtReceived: (jwtReceived: boolean) => void;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
	userPlan: '',
	token: '',
	jwtReceived: false,
	isAuthenticating: true,
	setUserPlan: userPlan => console.warn('userplan_missing'),
	setToken: token => console.warn('token_missing'),
	setJwtReceived: jwtReceived => console.warn('jwtreceived_missing'),
	setIsAuthenticating: isAuthenticating => console.warn('isauthenticating_missing'),
});
export const useUserData = () => useContext(UserContext);
