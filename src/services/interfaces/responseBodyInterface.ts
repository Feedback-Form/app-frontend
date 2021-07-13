export interface QuestionResponse {
	question: string;
	response: string;
	rating: number;
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
