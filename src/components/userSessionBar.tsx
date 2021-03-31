import React, { FC, ReactElement, useState, useEffect } from 'react';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

//modules
import { checkoutHandler } from '../modules/checkoutHandler';

const UserSessionBar: FC = (): ReactElement => {
	//userContext
	const { userObject, token, currentSessionCount } = useUserData();
	const { maxMonthlySessionCount } = userObject;

	const percentage = (currentSessionCount / maxMonthlySessionCount) * 100;
	const [barWidthCurrent, setBarCurrentMax] = useState(`${percentage}%`);
	const [barWidthMax, setBarWidthMax] = useState(`${percentage !== 100 ? 100 - percentage : 0}%`);

	return (
		<div className="absolute invisible md:visible w-full h-20 top-0 z-50">
			<div className="flex justify-center items-center h-full  w-full space-x-4 ">
				<div className="flex  bg-gray-100 max-w-md  items-center px-4 py-2  rounded-lg space-x-4 ">
					<div className="flex flex-col space-y-2 items-center justify-center">
						<h1 className="text-gray-900 text-center text-sm">
							{`You've used up ${currentSessionCount} of ${maxMonthlySessionCount} free sessions`}
						</h1>
						<div className="w-64 flex h-4">
							<div
								style={{ width: barWidthCurrent }}
								className={`bg-teal-700   ${barWidthMax === '0%' ? 'rounded-xl' : 'rounded-l-xl'}`}
							></div>
							<div
								style={{ width: barWidthMax }}
								className={`bg-gray-200   ${barWidthMax === '100%' ? 'rounded-xl' : 'rounded-r-xl'}`}
							></div>
						</div>
					</div>

					<button
						onClick={() => {
							checkoutHandler(token);
						}}
						className="flex justify-center bg-yellow-400 hover:bg-yellow-300 focus:outline-none text-white rounded-lg
					 py-2 font-medium tracking-wide text-sm transition-all ease-in-out duration-200 w-32"
					>
						Upgrade now
					</button>
				</div>
			</div>
		</div>
	);
};
export default UserSessionBar;
