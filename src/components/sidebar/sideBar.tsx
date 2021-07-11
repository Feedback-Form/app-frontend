import React, { ReactElement, FC, useState } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import copykatLogoLong from '../../images/copykat_logo_long.svg';
import copykatLogoShort from '../../images/copykat_logo_short.svg';
import axios from 'axios';

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
			.catch();
	}

	return (
		<nav id="sidebar" className="bg-gray-50 w-32 flex-shrink-0 h-screen block ">
			{/* Group 1 */}
			{redirect && <Redirect to="/login" />}
			<div className="space-y-3">
				<div className="pt-10 pb-20 w-full flex justify-center">
					<img className="w-9 visible " src={copykatLogoShort} alt="copykatai_logo" />
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
								className="w-7 stroke-current stroke-2 "
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
							<h1 className="invisible xl:visible font-medium text-normal tracking-wide pt-1">Forms</h1>
						</li>
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Sidebar;
