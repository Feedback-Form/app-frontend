export type FormQuestion = {
	question: string;
	responseType: string;
	maxRating: number;
	_id: string;
};
export interface FormBody {
	formName: string;
	aiSuggestions: boolean;
	allowPersonalDetails: boolean;
	questions: FormQuestion[];
}

export interface FormBodyResponse extends FormBody {
	_id: string;
	createdAt: string;
}
