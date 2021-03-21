import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

//components
import ResponseWidget from '../components/response-widget/responseWidget';
import LoadingWidget from '../components/loadingWidget';

// declare class Stripe {
// 	constructor(publicKey: string);
// 	redirectToCheckout({
// 		sessionId,
// 	}: {
// 		sessionId: string;
// 	}): Promise<{ error: Error }>;
// }
// const stripe = new Stripe(
// 	'pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK',
// );
const TrialEndedPage: FC = (): ReactElement => {
	const { token } = useUserData();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [resMessage, setResMessage] = useState('');
	const [showResWidget, setShowResWidget] = useState(false);
	const [email, setEmail] = useState('support@scrptai.com');

	// 	function checkoutHandler(priceId: string): void {
	// 		const req = {
	// 			priceId,
	// 		};
	// 		axios
	// 			.post(
	// 				`${process.env.REACT_APP_SCRPTAI_BACKEND}/create-checkout-session`,
	// 				req,
	// 			)
	// 			.then((res: any) => {
	// 				//redirect to checkout session
	// 				stripe
	// 					.redirectToCheckout({
	// 						sessionId: `${res.data.sessionId}`,
	// 					})
	// 					.then(res => {
	// 						console.log(res);
	// 					});
	// 			})
	// 			.catch((err: any) => {
	// 				console.log('err', err);
	// 			});
	// 	}

	function patchUser(): void {
		setIsLoading(true);
		//config
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const req = {
			keepUserPosted: true,
		};
		console.log(req);
		axios
			.patch(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/edit`, req, config)
			.then((res: any) => {
				setIsLoading(false);

				setResMessage(`Success! We'll let you know, once you can upgrade.`);
				setIsSuccess(true);
				setShowResWidget(true);
				setTimeout(() => {
					setShowResWidget(false);
				}, 5000);
			})
			.catch((err: any) => {
				setIsLoading(false);
				setResMessage(`Oops! Something went wrong.`);
				setIsSuccess(false);

				setShowResWidget(true);
				setTimeout(() => {
					setShowResWidget(false);
				}, 5000);
			});
	}
	return (
		<>
			{showResWidget && (
				<ResponseWidget success={isSuccess} response={resMessage} />
			)}
			{isLoading && <LoadingWidget />}
			<section className="h-screen w-full flex flex-col font-scrptai overflow-y-auto bg-gray-50 justify-center">
				<div className="text-center space-y-16 ">
					<div className="space-y-8 ">
						<h1 className="font-semibold text-teal-700 text-4xl">
							You&apos;ve used up all your free sessions.
						</h1>

						<div className="flex justify-center">
							<p className="font-medium text-gray-700 text-xl w-1/2 max-w-2xl">
								At this point in time, there&apos;s no paid version of scrptai.
								Sign up for the waiting list so you won&apos;t miss out on the
								paid version once it&apos;s out.
							</p>
						</div>

						<p className="font-medium text-gray-700 text-xl">
							Questions? Reach out to
							<a
								className="text-teal-700 hover:text-teal-600 ease-in-out duration-200 transition-all"
								href={`mailto:${process.env.REACT_APP_MAILTO}`}
							>
								{process.env.REACT_APP_MAILTO}
							</a>
						</p>
					</div>

					<button
						onClick={() => {
							// checkoutHandler('price_1IX58FIy6PlSkETFvrgaFB3J');
							patchUser();
						}}
						className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
					>
						Keep me posted
					</button>
				</div>
			</section>
		</>
	);
};

export default TrialEndedPage;
