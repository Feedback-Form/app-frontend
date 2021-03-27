export interface UserObject {
	user: {
		billing: {
			stripeCustomerId: string;
			userIsTrial: boolean;
			subscription: {
				productName: string;
			};
		};

		usage: {
			sessions: {
				currentSessionCount: number;
				maxMonthlySessionCount: number;
			};
		};
	};
}
