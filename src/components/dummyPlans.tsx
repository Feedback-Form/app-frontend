import React, { ReactElement, FC } from 'react';
import docAnimation from '../assets/docAnimation.json';
// import { redirectToCheckout } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// eslint-disable-next-line react/prop-types

declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}
const stripe = new Stripe('pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK');

const DummyPlans: FC = (): ReactElement => {
	function checkoutHandler(): void {
		// eslint-disable-next-line react/prop-types
		stripe
			.redirectToCheckout({
				sessionId: 'cs_test_a1Z4lfSpRTSv3dZeNUTYqWqxw4f325VTaR2238AW2BKOa3atRTTjGuhRZF',
			})
			.then(res => {
				console.log(res);
			});
	}
	return (
		<section className="absolute h-full w-full bg-white">
			<div className="flex justify-center h-full w-full items-center">
				<div className="w-3/4 md:w-1/3 xl:w-1/4  rounded-md px-10 py-8  text-center">
					<button
						onClick={() => {
							checkoutHandler();
						}}
						className="bg-red-500 text-white rounded-md p-4 hover:bg-red-400"
					>
						39.99
					</button>
				</div>
			</div>
		</section>
	);
};

export default DummyPlans;
