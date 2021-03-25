import React, { FC, ReactElement, useState, useEffect } from 'react';

const UserSessionBar: FC = (): ReactElement => {
	const [currentSessionCount, SetCurrentSessionCount] = useState(25);
	const [maxSessionCount, SetMaxSessionCount] = useState(25);
	const percentage = (currentSessionCount / maxSessionCount) * 100;
	console.log(percentage);
	const [barWidthCurrent, setBarCurrentMax] = useState(`${percentage}%`);
	const [barWidthMax, setBarWidthMax] = useState(
		`${percentage !== 100 ? 100 - percentage : 0}%`,
	);
	console.log(barWidthMax);

	return (
		<div className="absolute invisible md:visible w-full h-20 top-0">
			<div className="flex flex-col justify-center items-center h-full w-full space-y-2">
				<h1 className="text-gray-900">
					You&apos;ve used up {currentSessionCount} of {maxSessionCount}{' '}
					sessions
				</h1>
				<div className="w-96 flex h-4">
					<div
						style={{ width: barWidthCurrent }}
						className={`bg-teal-700   ${
							barWidthMax === '0%' ? 'rounded-xl' : 'rounded-r-xl'
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
		</div>
	);
};
export default UserSessionBar;
