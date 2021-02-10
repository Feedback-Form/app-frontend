import React, { ReactElement, FC, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import scrptAiLogo from '../images/scrptai_logo.svg';
import axios from 'axios';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

//const
const backend_url = 'http://localhost:5000';

declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}
const stripe = new Stripe('pk_test_51IDXKLIy6PlSkETF0Aog8XohbZ7mtE8LQln3iQ3rH8RPuEXPQWKgsRsznHXWGQr0Y4ehrRn9iGruDVeA24RX5lEu00IMNMmRkK');

const Sidebar: FC = (): ReactElement => {
	const [redirect, setRedirect] = useState(false);
	const { token, userObject } = useUserData();

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
			.post(`${backend_url}/customer-portal`, req, config)
			.then((res: any) => {
				// console.log(res.data);
				window.location.href = res.data.url;
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	}

	function logOutUser(): void {
		console.log(token);
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.post(`${backend_url}/user/logout`, {}, config)
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
		<nav className="bg-gray-100 flex-shrink-0 h-full flex flex-col justify-between  border-r border-gray-200 ">
			{/* Group 1 */}

			<div className="space-y-3">
				<div className="pt-10 pb-20 pl-3 ">
					<img className="w-32" src={scrptAiLogo} alt="scrpt_ai_logo" />
				</div>
				<div>
					<NavLink exact to="/summarize">
						<li
							className="text-gray-600 list-none flex items-center hover:bg-indigo-200 hover:text-indigo-600
                transition-all duration-200 ease-in-out rounded-r-md py-2 pr-14 pl-3 cursor-pointer"
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
									d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
								/>
							</svg>

							<h1 className="font-medium pl-2 text-base tracking-wide">Summarize</h1>
						</li>
					</NavLink>
				</div>
				{/* <li
						className="text-gray-600 list-none flex items-center hover:bg-indigo-200 hover:text-indigo-600
            transition-all duration-200 ease-in-out rounded-r-md py-2 pr-14 pl-3 cursor-pointer"
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
					<NavLink exact to="/documents">
						<li
							className="text-gray-600 list-none flex items-center hover:bg-indigo-200 hover:text-indigo-600
            transition-all duration-200 ease-in-out rounded-r-md py-2 pr-14 pl-3 cursor-pointer"
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
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<h1 className="font-medium pl-2 text-base tracking-wide">Documents</h1>
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
							className="text-gray-600 flex items-center hover:bg-indigo-200 hover:text-indigo-600
            transition-all duration-200 ease-in-out rounded-r-md py-2 pr-14 pl-3 cursor-pointer w-full"
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
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							<h1 className="font-medium pl-2 text-base tracking-wide">Logout</h1>
						</button>
					</li>
				</div>
				<div>
					{/* <NavLink exact to="/settings"> */}
					<li className="list-none">
						<button
							disabled={userObject.productName !== 'SCRPTAI_BASIC_PLAN'}
							onClick={() => {
								customerPortalHandler();
							}}
							className={` ${
								userObject.productName !== 'SCRPTAI_BASIC_PLAN'
									? 'text-gray-400 cursor-not-allowed'
									: 'hover:bg-indigo-200 hover:text-indigo-600 text-gray-600 '
							}  flex items-center disabled:opacity-50
            transition-all duration-200 ease-in-out rounded-r-md py-2 pr-14 pl-3 cursor-pointer w-full`}
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
							<h1 className="font-medium pl-2 text-base tracking-wide">Manage Billing</h1>
						</button>
					</li>

					{/* </NavLink> */}
				</div>
				<div>
					<li className="list-none">
						<button
							disabled={userObject.productName === 'SCRPTAI_BASIC_PLAN'}
							onClick={() => {
								checkoutHandler('price_1IDc8VIy6PlSkETFdUzqL63A');
							}}
							className={` ${
								userObject.productName === 'SCRPTAI_BASIC_PLAN'
									? 'text-gray-600 bg-gray-300  hover:text-gray-700 opacity-50 cursor-not-allowed'
									: 'text-yellow-600 bg-yellow-200  hover:text-yellow-700 '
							}  list-none flex items-center 
            	transition-all duration-200 ease-in-out  py-2 pl-3 cursor-pointer w-full `}
						>
							<svg
								className="w-6 stroke-current stroke-2 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<h1 className="font-medium pl-2 text-base tracking-wide">Upgrade</h1>
						</button>
					</li>
				</div>
			</div>
			{redirect && <Redirect to="/login" />}
		</nav>
	);
};

export default Sidebar;
