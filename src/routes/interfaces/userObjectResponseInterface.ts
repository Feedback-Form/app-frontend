export interface UserResponseObject {
	user: {
		billing: {
			stripeCustomerId: string;
			userIsTrial: boolean;
			subscription: {
				productId: string;
				subscriptionStatus: string;
				currentPeriodEnd: number;
			};
		};

		usage: {
			maxTrialSessionCount: number;
			sessions: {
				currentSessionCount: number;
				maxMonthlySessionCount: number;
			};
		};
	};
}
