export interface UserObjectInterface {
	productId: string;
	stripeCustomerId: string;
	currentSessionCount: number;
	maxMonthlySessionCount: number;
	userIsTrial: boolean;
	subscriptionStatus: string;
	currentPeriodEnd: number;
}
