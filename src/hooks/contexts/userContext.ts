import { createContext, useContext } from 'react';

export type UserContextType = {
	userPlan: string;
	token: string;
	setUserPlan: (userPlan: string) => void;
	setToken: (token: string) => void;
};

export const UserContext = createContext<UserContextType>({
	userPlan: '',
	token: '',
	setUserPlan: userPlan => console.warn('userplan_missing'),
	setToken: token => console.warn('token_missing'),
});
export const useUserData = () => useContext(UserContext);
