export type FormQuestion = {
	question: string;
	responseType: string;
	maxRating: number;
};
export interface FormBody {
	formName: string;
	aiSuggestions: boolean;
	allowPersonalDetails: boolean;
	questions: FormQuestion[];
}

export interface FormQuestionResponse extends FormQuestion {
	_id: string;
}

export interface FormBodyResponse {
	formName: string;
	aiSuggestions: boolean;
	allowPersonalDetails: boolean;
	questions: FormQuestionResponse[];
	createdAt: string;
	_id: string;
}
