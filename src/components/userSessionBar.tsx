import React, { FC, ReactElement, useState, useEffect } from 'react';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

//modules
import { checkoutHandler } from '../modules/checkoutHandler';

const UserSessionBar: FC = (): ReactElement => {
	//userContext
	const { userObject } = useUserData();
	const { currentSessionCount, maxMonthlySessionCount } = userObject;

	const percentage = (currentSessionCount / maxMonthlySessionCount) * 100;
	const [barWidthCurrent, setBarCurrentMax] = useState(`${percentage}%`);
	const [barWidthMax, setBarWidthMax] = useState(
		`${percentage !== 100 ? 100 - percentage : 0}%`,
	);

	return (
		<div className="absolute invisible md:visible w-full h-20 bottom-0 mb-4 z-50">
			<div className="flex justify-center items-center h-full w-full space-x-4 ">
				<div className="flex flex-col space-y-2 items-center justify-center">
					<h1 className="text-gray-900">
						{`You've used up ${currentSessionCount} of ${maxMonthlySessionCount} free sessions`}
					</h1>
					<div className="w-64 flex h-4">
						<div
							style={{ width: barWidthCurrent }}
							className={`bg-teal-700   ${
								barWidthMax === '0%' ? 'rounded-xl' : 'rounded-l-xl'
							}`}
						></div>
						<div
							style={{ width: barWidthMax }}
							className={`bg-gray-200   ${
								barWidthMax === '100%' ? 'rounded-xl' : 'rounded-r-xl'
							}`}
						></div>
					</div>
				</div>

				<button
					onClick={() => {
						checkoutHandler();
					}}
					className="flex justify-center bg-yellow-400 hover:bg-yellow-300 focus:outline-none text-white rounded-lg
					 py-2 font-medium tracking-wide text-sm transition-all ease-in-out duration-200 w-32"
				>
					Upgrade now
				</button>
			</div>
		</div>
	);
};
export default UserSessionBar;
