import axios from 'axios';
declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}
const stripe = new Stripe('pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK');
export function checkoutHandler(): void {
	const req = {
		priceId: 'price_1IaJkoIy6PlSkETFQYIK7859',
	};
	axios
		.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/create-checkout-session`, req)
		.then((res: any) => {
			//redirect to checkout session
			stripe
				.redirectToCheckout({
					sessionId: `${res.data.sessionId}`,
				})
				.then(res => {
					console.log(res);
				});
		})
		.catch((err: any) => {
			console.log('err', err);
		});
}
