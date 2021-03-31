export interface UserObjectInterface {
	productId: string;
	stripeCustomerId: string;
	maxMonthlySessionCount: number;
	userIsTrial: boolean;
	subscriptionStatus: string;
	currentPeriodEnd: number;
}
