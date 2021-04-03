import React, { FC, ReactElement } from 'react';

//hooks
import { useText } from '../hooks/contexts/summaryContext';

const NavigationDots: FC = (): ReactElement => {
	const { characterLimitReached, setCurrentComponent, currentComponent, outputArray } = useText();
	return (
		<div className="w-full items-center justify-center flex  space-x-6 ">
			<button
				disabled={characterLimitReached}
				onClick={() => {
					setCurrentComponent(1);
				}}
				className={`focus:outline-none disabled:opacity-50 rounded-full h-5 w-5 ${currentComponent === 1 ? 'bg-teal-700' : 'bg-gray-300'}`}
			></button>
			<button
				disabled={outputArray.length < 1}
				onClick={() => setCurrentComponent(2)}
				className={`focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed  rounded-full h-5 w-5 ${
					currentComponent == 2 ? 'bg-teal-700' : 'bg-gray-200'
				}    `}
			></button>
		</div>
	);
};

export default NavigationDots;
