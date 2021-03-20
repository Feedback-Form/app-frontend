import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';

declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({
		sessionId,
	}: {
		sessionId: string;
	}): Promise<{ error: Error }>;
}
const stripe = new Stripe(
	'pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK',
);
const TrialExpiredPage: FC = (): ReactElement => {
	function checkoutHandler(priceId: string): void {
		const req = {
			priceId,
		};
		axios
			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/create-checkout-session`,
				req,
			)
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
		<section className="h-screen w-full flex flex-col font-scrptai overflow-y-auto bg-gray-50 justify-center">
			<div className="text-center space-y-20">
				<div className="space-y-10">
					<h1 className="font-semibold text-teal-700 text-4xl">
						You&apos;ve used up all your free sessions.
					</h1>
					<h2 className="font-medium text-gray-800 text-xl">
						Please upgrade to continue using scrptAI.
					</h2>
				</div>

				<button
					onClick={() => {
						checkoutHandler('price_1IX58FIy6PlSkETFvrgaFB3J');
					}}
					className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
				>
					Upgrade plan
				</button>
			</div>
		</section>
	);
};

export default TrialExpiredPage;
