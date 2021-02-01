import React, { FC, ReactElement, useState } from 'react';

import InputTextfield from './inputtextfield';
import SummarySettings from './summarysettings';
import OutputTextfield from './outputtexfield';
import { CSSTransition } from 'react-transition-group';

const Summarize: FC = (): ReactElement => {
	const [currentComponent, setCurrentComponent] = useState(1);
	return (
		<main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-evenly space-y-10">
			{currentComponent === 1 && <InputTextfield />}
			{/* {currentComponent === 2 && (
				<CSSTransition in={currentComponent === 2} timeout={300} classNames="alert" unmountOnExit>
					<SummarySettings />
				</CSSTransition>
			)} */}
			<CSSTransition in={currentComponent === 2} timeout={300} classNames="alert" unmountOnExit>
				<SummarySettings />
			</CSSTransition>
			{currentComponent === 3 && <OutputTextfield />}
			<div className="w-full items-center justify-center flex  space-x-6">
				<div
					onClick={() => setCurrentComponent(1)}
					className={`rounded-full h-5 w-5 ${currentComponent === 1 ? 'bg-indigo-500' : 'bg-gray-300'}`}
				></div>
				<div
					onClick={() => setCurrentComponent(2)}
					className={`rounded-full h-5 w-5 ${currentComponent === 2 ? 'bg-indigo-500' : 'bg-gray-300'}`}
				></div>
				<div
					onClick={() => setCurrentComponent(3)}
					className={`rounded-full h-5 w-5 ${currentComponent === 3 ? 'bg-indigo-500' : 'bg-gray-300'}`}
				></div>
			</div>
		</main>
	);
};

export default Summarize;
