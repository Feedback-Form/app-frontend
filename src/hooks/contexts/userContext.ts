/* eslint-disable no-console */
import { createContext, useContext } from 'react';

import { UserObjectInterface } from '../../interfaces/userObjectInterface';

export interface UserContextType {
	token: string;
	jwtReceived: boolean;
	isAuthenticating: boolean;
	userObject: {
		_id: string;
		firstName: string;
		lastName: string;
		company: string;
		email: string;
		productServiceDescription: string;
		userIsVerified: boolean;
	};
	setToken: (key: string) => void;
	setJwtReceived: (jwtReceived: boolean) => void;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
	setUserObject: (userObject: UserObjectInterface) => void;
}

export const UserContext = createContext<UserContextType>({
	token: '',
	jwtReceived: false,
	isAuthenticating: true,
	userObject: {
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		productServiceDescription: '',
		userIsVerified: false,
		_id: '',
	},
	setToken: token => console.warn('token_missing'),
	setJwtReceived: jwtReceived => console.warn('jwtreceived_missing'),
	setIsAuthenticating: isAuthenticating => console.warn('isauthenticating_missing'),
	setUserObject: useObject => console.warn('userobj_missing'),
});
export const useUserData = (): any => useContext(UserContext);
