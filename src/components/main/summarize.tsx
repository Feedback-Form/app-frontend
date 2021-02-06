import React, { FC, ReactElement, useState, useReducer, createContext } from 'react';

import InputTextfield from '../inputtextfield';
import SummarySettings from '../summarysettings';
import OutputTextfield from '../vault/outputtexfield';
import { CSSTransition } from 'react-transition-group';
import { useText } from '../../hooks/contexts/summaryContext';

import Uploading from '../uploading';
const Summarize: FC = (): ReactElement => {
	const { currentComponent, setCurrentComponent } = useText();

	// console.log('parent:', { text: inputText, summaryLength: summaryLength });

	return (
		<main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-evenly space-y-10">
			<CSSTransition in={currentComponent === 1} timeout={400} classNames="menu-primary" unmountOnExit>
				<InputTextfield />
			</CSSTransition>
			<CSSTransition in={currentComponent === 2} timeout={400} classNames="menu-secondary" unmountOnExit>
				<SummarySettings />
			</CSSTransition>
			<CSSTransition in={currentComponent === 3} timeout={400} classNames="menu-primary" unmountOnExit>
				<Uploading message="Your text is being summarized." />
			</CSSTransition>
			<CSSTransition in={currentComponent === 4} timeout={400} classNames="menu-primary" unmountOnExit>
				<OutputTextfield />
			</CSSTransition>

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
					onClick={() => setCurrentComponent(4)}
					className={`rounded-full h-5 w-5 ${currentComponent === 4 ? 'bg-indigo-500' : 'bg-gray-300'}`}
				></div>
			</div>
		</main>
	);
};

export default Summarize;
