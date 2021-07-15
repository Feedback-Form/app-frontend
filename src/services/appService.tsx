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

export const getFormById = async (bearerToken: string, formId: string): Promise<FormBodyResponse> => {
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

export const rateForm = async (formId: string, requestBody: FormResponseBody): Promise<any> => {
	try {
		const response = await axios.post(`${backendUrl}/v1/response/${formId}`, requestBody);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};

export const getResponseSuggestion = async (formId: string, requestBody: ResponseSuggestionRequest): Promise<any> => {
	try {
		const response = await axios.post(`${backendUrl}/v1/response/suggestion/${formId}`, requestBody);
		return response.data.payload;
	} catch (err) {
		return err;
	}
};

export const getFormResponses = async (bearerToken: string, formId: string): Promise<any> => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};
		const response = await axios.get(`${backendUrl}/v1/responses/${formId}`, config);
		return response.data.payload.responses;
	} catch (err) {
		return err;
	}
};
