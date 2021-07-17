export interface QuestionResponse {
	tags: string[];
	_id: string;
	questionId: string;
	rating: number;
	maxRating: number;
	response: string;
	question: string;
}

export interface RatingResponseBody {
	personalDetails: {
		firstName: string;
		lastName: string;
		linkedInProfile: string;
	};
	allowPublishing: boolean;
	_id: string;
	formdI: string;
	createdAt: string;
	questionResponses: QuestionResponse[];
}
