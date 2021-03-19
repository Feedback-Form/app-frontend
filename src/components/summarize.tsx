import React, { FC, ReactElement, useEffect } from 'react';

import InputTextfield from './inputTextfield';
import SummarySettings from './summary-settings/summarySettings';
import OutputTextfield from './outputTexfield';
import { CSSTransition } from 'react-transition-group';
import { useText } from '../hooks/contexts/summaryContext';

const Summarize: FC = (): ReactElement => {
	const {
		currentComponent,
		setCurrentComponent,
		characterLimitReached,
	} = useText();

	useEffect(() => {
		console.log('rerender');
	}, [characterLimitReached]);

	return (
		<main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-evenly space-y-10">
			<CSSTransition
				in={currentComponent === 1}
				timeout={400}
				classNames="menu-primary"
				unmountOnExit
			>
				<InputTextfield />
			</CSSTransition>
			<CSSTransition
				in={currentComponent === 2}
				timeout={400}
				classNames="menu-secondary"
				unmountOnExit
			>
				<SummarySettings />
			</CSSTransition>

			<CSSTransition
				in={currentComponent === 3}
				timeout={400}
				classNames="menu-primary"
				unmountOnExit
			>
				<OutputTextfield />
			</CSSTransition>

			<div className="w-full items-center justify-center flex  space-x-6">
				<button
					disabled={characterLimitReached}
					onClick={() => {
						setCurrentComponent(1);
					}}
					className={`focus:outline-none disabled:opacity-50 rounded-full h-5 w-5 ${
						currentComponent === 1 ? 'bg-teal-700' : 'bg-gray-300'
					}`}
				></button>
				<button
					disabled={characterLimitReached}
					onClick={() => setCurrentComponent(2)}
					className={`focus:outline-none  disabled:opacity-50 rounded-full h-5 w-5 ${
						currentComponent === 2 ? 'bg-teal-700' : 'bg-gray-300'
					}`}
				></button>
				<button
					disabled={characterLimitReached}
					onClick={() => setCurrentComponent(3)}
					className={`focus:outline-none disabled:opacity-50 rounded-full h-5 w-5 ${
						currentComponent === 3 ? 'bg-teal-700' : 'bg-gray-300'
					}`}
				></button>
			</div>
		</main>
	);
};

export default Summarize;
