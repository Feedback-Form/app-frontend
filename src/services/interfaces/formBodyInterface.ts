export type FormQuestion = {
	question: string;
	responseType: string;
	maxRating: number;
};
export interface FormBodyInterface {
	formName: string;
	aiSuggestions: boolean;
	allowPersonalDetails: boolean;
	questions: FormQuestion[];
}
