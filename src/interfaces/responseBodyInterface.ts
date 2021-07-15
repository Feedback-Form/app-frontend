export interface QuestionResponse {
	question: string;
	response: string;
	rating: number;
	questionId: string;
}
export interface ResponseSuggestionRequest {
	question: string;
	rating: number;
	maxRating: number;
}

export interface PersonalDetails {
	personalDetails: {
		firstName: string;
		lastName: string;
		linkedInProfile: string;
	};
	allowPublishing: boolean;
}

export interface FormResponseBody extends PersonalDetails {
	questionResponses: QuestionResponse[];
}
