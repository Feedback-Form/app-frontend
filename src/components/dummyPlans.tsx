import React, { ReactElement, FC } from 'react';
import docAnimation from '../assets/docAnimation.json';
// import { redirectToCheckout } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

//const
const backend_url = 'http://localhost:5000';

declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}
const stripe = new Stripe('pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK');

const DummyPlans: FC = (): ReactElement => {
	function checkoutHandler(priceId: string): void {
		const req = {
			priceId,
		};
		axios
			.post(`${backend_url}/create-checkout-session`, req)
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
	return (
		<section className="absolute h-full w-full bg-white">
			<div className="flex justify-center h-full w-full items-center space-x-10">
				<div className="w-3/4 md:w-1/3 xl:w-1/4  rounded-md px-10 py-8  text-center">
					<button
						onClick={() => {
							checkoutHandler('price_1IIJCpIy6PlSkETFHNYk4l3r');
						}}
						className="bg-red-500 text-white rounded-md p-4 hover:bg-red-400"
					>
						14.99
					</button>
					<button
						onClick={() => {
							checkoutHandler('price_1IDc8VIy6PlSkETFdUzqL63A');
						}}
						className="bg-blue-500 text-white rounded-md p-4 hover:bg-blue-400"
					>
						39.99
					</button>
				</div>
			</div>
		</section>
	);
};

export default DummyPlans;
