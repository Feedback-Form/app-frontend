import axios from 'axios';
//services
import { UserResponseObject } from '../interfaces/userObjectInterface';

export const getUserInfo = async (bearerToken: string): Promise<UserResponseObject> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.get(`${process.env.REACT_APP_BACKEND}/v1/user/info`, config);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};
