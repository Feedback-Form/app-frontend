import axios from 'axios';
declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}

const stripe = new Stripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
export function checkoutHandler(token: string): void {
	const req = {
		//PROD id:
		priceId: 'price_1IdEDjIy6PlSkETFTJ8kLJhv',
		//TEST id:
		// priceId: 'price_1IaJkoIy6PlSkETFQYIK7859',
	};
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	axios
		.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/create-checkout-session`, req, config)
		.then((res: any) => {
			//redirect to checkout session

			stripe
				.redirectToCheckout({
					sessionId: `${res.data.sessionId}`,
				})
				.then();
		})
		.catch();
}
