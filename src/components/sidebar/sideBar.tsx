import React, { ReactElement, FC, useState } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import scrptAiLogo from '../../images/scrptai_logo.svg';
import scrptAiLogoShort from '../../images/scrptai_logo_short.svg';
import axios from 'axios';

//hooks
import { useUserData } from '../../hooks/contexts/userContext';

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

const Sidebar: FC = (): ReactElement => {
	const [redirect, setRedirect] = useState(false);
	const { token, userObject } = useUserData();
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);
	function customerPortalHandler(): void {
		const req = {
			stripeCustomerId: userObject.stripeCustomerId,
		};

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/customer-portal`,
				req,
				config,
			)
			.then((res: any) => {
				// console.log(res.data);
				window.location.href = res.data.url;
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	}

	function logOutUser(): void {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/logout`, {}, config)
			.then((res: any) => {
				//clear localStorage
				localStorage.clear();
				setRedirect(true);
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	}

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
		<nav className="bg-gray-50 w-20 xl:w-auto flex-shrink-0 h-full flex flex-col justify-between ">
			{/* Group 1 */}

			<div className="space-y-3">
				<div className="pt-10 pb-20 pl-5 xl:pl-3 ">
					<img
						className="w-32 invisible xl:visible"
						src={scrptAiLogo}
						alt="scrpt_ai_logo"
					/>
					<img
						className="w-9 visible xl:invisible"
						src={scrptAiLogoShort}
						alt="scrpt_ai_logo"
					/>
				</div>
				<div>
					<NavLink exact to="/summarize">
						<li
							className={`${
								pathname === '/summarize'
									? 'text-teal-700 hover:text-teal-600 '
									: ' hover:text-teal-600 text-gray-500'
							}    list-none block xl:flex items-center  
                			transition-all duration-200 ease-in-out rounded-r-md pt-6 xl:py-2 xl:pr-14 pl-6 xl:pl-3 cursor-pointer  `}
						>
							<svg
								className="w-7 xl:w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
								/>
							</svg>

							<h1 className="invisible xl:visible font-medium pl-2 text-base tracking-wide">
								Summarize
							</h1>
						</li>
					</NavLink>
				</div>
				{/* <li
						className="text-gray-600 list-none flex items-center hover:bg-teal-300 hover:text-teal-700
            transition-all duration-200 ease-in-out rounded-r-md py-2 xl:pr-14 pl-3 cursor-pointer"
					>
						<svg 
							className="w-6 stroke-current stroke-2 "
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							/>
						</svg>
						<h1 className="font-medium pl-2 text-base tracking-wide">Transcribe</h1>
					</li> */}
				<div>
					<NavLink exact to="/documents" activeClassName="bg-teal-200">
						<li
							className={`${
								pathname === '/documents'
									? 'text-teal-700 hover:text-teal-600 '
									: ' hover:text-teal-600'
							} text-gray-500 list-none block xl:flex items-center  
                			transition-all duration-200 ease-in-out rounded-r-md pt-6 xl:py-2 xl:pr-14 pl-6 xl:pl-3 cursor-pointer`}
						>
							<svg
								className="w-7 xl:w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium pl-2 text-base tracking-wide">
								Documents
							</h1>
						</li>
					</NavLink>
				</div>
			</div>

			{/* Group 2 */}
			<div className="space-y-3">
				<div>
					<li className="list-none">
						<button
							onClick={() => logOutUser()}
							className="text-gray-500 list-none block xl:flex items-center  hover:text-teal-600
                			transition-all duration-200 ease-in-out rounded-r-md pt-6 xl:py-2 xl:pr-14 pl-6 xl:pl-3 cursor-pointer w-full focus:ring-0 focus:outline-none"
						>
							<svg
								className="w-7 xl:w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium pl-2 text-base tracking-wide">
								Logout
							</h1>
						</button>
					</li>
				</div>
				<div>
					{/* <NavLink exact to="/settings"> */}
					<li className="list-none">
						<button
							disabled={userObject.stripeCustomerId !== 'xxxx'}
							onClick={() => {
								customerPortalHandler();
							}}
							className={` ${
								userObject.stripeCustomerId !== 'xxx' &&
								'text-gray-500 hover:text-gray-600 cursor-not-allowed '
							}   block xl:flex items-center disabled:opacity-50 
            				transition-all duration-200 ease-in-out rounded-r-md pt-6 xl:py-2 xl:pr-14 pl-6 xl:pl-3 cursor-pointer w-full`}
						>
							<svg
								className="w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium pl-2 text-base tracking-wide">
								Manage Billing
							</h1>
						</button>
					</li>

					{/* </NavLink> */}
				</div>
				<div>
					<li className="list-none">
						<button
							disabled={userObject.productName !== 'SCRPTAI_BASIC_PLAN'}
							onClick={() => {
								checkoutHandler('price_1IDc8VIy6PlSkETFdUzqL63A');
							}}
							className={` ${
								userObject.productName !== 'SCRPTAI_BASIC_PLAN'
									? 'text-gray-500 bg-gray-300  hover:text-gray-400 opacity-50 cursor-not-allowed'
									: 'text-yellow-600 bg-yellow-200  hover:text-yellow-700 '
							}  list-none block xl:flex items-center 
            	transition-all duration-200 ease-in-out   pt-6 xl:py-2 xl:pr-14 pl-6 xl:pl-3 cursor-pointer w-full `}
						>
							<svg
								className="w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium pl-2 text-base tracking-wide">
								Upgrade
							</h1>
						</button>
					</li>
				</div>
			</div>
			{redirect && <Redirect to="/login" />}
		</nav>
	);
};

export default Sidebar;
