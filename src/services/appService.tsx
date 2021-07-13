import axios from 'axios';
import { FormBodyInterface, FormBodyResponseInterface } from './interfaces/formBodyInterface';
const backendUrl = 'http://localhost:5000';

export const postForm = async (bearerToken: string, requestBody: FormBodyInterface): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.post(`${backendUrl}/v1/form`, requestBody, config);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};

export const getForms = async (bearerToken: string): Promise<FormBodyResponseInterface[]> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.get(`${backendUrl}/v1/forms`, config);
		return response.data.payload.documents;
	} catch (err) {
		return err;
	}
};

export const deleteForm = async (bearerToken: string, formId: string): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.delete(`${backendUrl}/v1/form/${formId}`, config);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};
