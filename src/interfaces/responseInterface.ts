export interface QuestionResponse {
	tags: string[];
	_id: string;
	questionId: string;
	rating: number;
	maxRating: number;
	response: string;
	question: string;
}

export interface PersonalDetails {
	personalDetails: {
		firstName: string;
		lastName: string;
		linkedInProfile: string;
	};
}

export interface RatingResponseBody extends PersonalDetails {
	allowPublishing: boolean;
	_id: string;
	formId: string;
	createdAt: string;
	aiSuggestions: boolean;
	questionResponses: QuestionResponse[];
}
