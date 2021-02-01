import { createContext, useContext } from 'react';

export type UserContextType = {
	userPlan: string;
};

export const UserContext = createContext<UserContextType>({
	userPlan: 'SCRPTAI_BASIC_PLAN',
});
export const useUserData = () => useContext(UserContext);
