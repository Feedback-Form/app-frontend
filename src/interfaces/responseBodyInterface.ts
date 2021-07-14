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

export interface FormResponseBody {
	personalDetails: {
		firstName: string;
		lastName: string;
		linkedInProfile: string;
	};
	allowPublishing: boolean;
	questionResponses: QuestionResponse[];
}
