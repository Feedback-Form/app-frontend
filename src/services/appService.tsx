import axios from 'axios';
import { FormBody, FormBodyResponse } from '../interfaces/formBodyInterface';
import { FormResponseBody, QuestionResponse, ResponseSuggestionRequest } from '../interfaces/responseBodyInterface';
const backendUrl = 'http://localhost:5000';

export const postForm = async (bearerToken: string, requestBody: FormBody): Promise<any> => {
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

export const getForms = async (bearerToken: string): Promise<FormBodyResponse[]> => {
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

export const getFormById = async (bearerToken: string, formId: string): Promise<FormBody[]> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.get(`${backendUrl}/v1/form/${formId}`, config);
		return response.data.payload.form;
	} catch (err) {
		return err;
	}
};

export const rateForm = async (bearerToken: string, formId: string, requestBody: FormResponseBody): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.post(`${backendUrl}/v1/response/${formId}`, requestBody, config);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};

export const getResponseSuggestion = async (bearerToken: string, formId: string, requestBody: ResponseSuggestionRequest): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};

		const response = await axios.post(`${backendUrl}/v1/response/suggestion/${formId}`, requestBody, config);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};
