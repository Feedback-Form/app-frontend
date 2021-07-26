import React, { ReactElement, FC, useState } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';

//hooks
import { useUserData } from '../../hooks/contexts/userContext';

//modules
import { customerPortalHandler } from '../../modules/customerPortalHandler';
declare class Stripe {
	constructor(publicKey: string);
	redirectToCheckout({ sessionId }: { sessionId: string }): Promise<{ error: Error }>;
}

const Sidebar: FC = (): ReactElement => {
	const [redirect, setRedirect] = useState(false);
	const { token, userObject } = useUserData();
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);

	return (
		<nav id="sidebar" className="bg-white w-16 xl:w-28 flex-shrink-0 h-screen block">
			{/* Group 1 */}
			{redirect && <Redirect to="/login" />}
			<div className="w-full flex justify-center bg-yellow-200 text-yellow-800 rounded-b-sm py-2 uppercase text-xs text-center">
				alpha version
			</div>
			<div className="space-y-6">
				<div className="pt-10 pb-20 w-full flex justify-center">
					{/* <img className="w-9 visible " src={copykatLogoShort} alt="logo" /> */}
				</div>

				<div className="flex justify-center w-full  ">
					<NavLink exact to="/forms">
						<li
							className={`${
								pathname === '/forms' ? 'text-primary-700 hover:text-primary-500 ' : ' hover:text-primary-500'
							} text-gray-500 list-none items-center  flex flex-col justify-items-center
                			transition-all duration-200 ease-in-out xl:py-2 cursor-pointer rounded-md`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 xl:w-7 xl:h-7 stroke-current stroke-2 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium text-sm tracking-wide pt-2">Forms</h1>
						</li>
					</NavLink>
				</div>
				<div className="flex justify-center w-full  ">
					<NavLink exact to="/responses">
						<li
							className={`${
								pathname === '/responses' ? 'text-primary-700 hover:text-primary-500 ' : ' hover:text-primary-500'
							} text-gray-500 list-none items-center  flex flex-col justify-items-center
                			transition-all duration-200 ease-in-out xl:py-2 cursor-pointer rounded-md`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 xl:w-7 xl:h-7 stroke-current stroke-2 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium text-sm tracking-wide pt-2">Responses</h1>
						</li>
					</NavLink>
				</div>
				<div className="flex justify-center w-full  ">
					<NavLink exact to="/dashboard">
						<li
							className={`${
								pathname === '/dashboard' ? 'text-primary-700 hover:text-primary-500 ' : ' hover:text-primary-500'
							} text-gray-500 list-none items-center  flex flex-col justify-items-center
                			transition-all duration-200 ease-in-out xl:py-2 cursor-pointer rounded-md`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 xl:w-7 xl:h-7 stroke-current stroke-2 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium text-sm tracking-wide pt-2">Dashboard</h1>
						</li>
					</NavLink>
				</div>
				<div className="flex justify-center w-full  ">
					<NavLink exact to="/profile">
						<li
							className={`${
								pathname === '/profile' ? 'text-primary-700 hover:text-primary-500 ' : ' hover:text-primary-500'
							} text-gray-500 list-none items-center  flex flex-col justify-items-center
                			transition-all duration-200 ease-in-out xl:py-2 cursor-pointer rounded-md`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 xl:w-7 xl:h-7 stroke-current stroke-2 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<h1 className="invisible xl:visible font-medium text-sm tracking-wide pt-2">Profile</h1>
						</li>
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Sidebar;
