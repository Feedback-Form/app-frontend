export interface FilterParameters {
	start: string;
	end: string;
	formId: string;
}

export interface AverageRatingDaily {
	dayNumber: number;
	date: string;
	averageRatingDaily: number;
}

export interface AverageRatingWeekly {
	weekNumber: number;
	date: string;
	averageRatingWeekly: number;
}

export interface RatingCountDaily {
	dayNumber: number;
	responseCountDaily: number;
	date: string;
}
export interface RatingCountWeekly {
	weekNumber: number;
	responseCountWeekly: number;
	date: string;
}

export interface ResponseStatisticsBody {
	filterParameters: FilterParameters;
	reviewsCount: {
		ratingCountDaily: RatingCountDaily[];
		ratingCountWeekly: RatingCountWeekly[];
	};
	averageRating: {
		averageRatingDaily: AverageRatingDaily[];
		averageRatingWeekly: AverageRatingWeekly[];
	};
}
