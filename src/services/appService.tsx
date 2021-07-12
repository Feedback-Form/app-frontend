import axios from 'axios';
import { FormBodyInterface } from './interfaces/formBodyInterface';
const backendUrl = 'http://localhost:5000';

export const postForm = async (bearerToken: string, requestBody: FormBodyInterface): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const request = await axios.post(`${backendUrl}/v1/form`, requestBody, config);
		return request.data.payload;
	} catch (err) {
		return err;
	}
};
