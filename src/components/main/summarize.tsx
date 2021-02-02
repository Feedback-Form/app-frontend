import React, { FC, ReactElement, useState, useReducer, createContext } from 'react';

import InputTextfield from '../inputtextfield';
import SummarySettings from '../summarysettings';
import OutputTextfield from '../outputtexfield';
import { CSSTransition } from 'react-transition-group';

import { SummaryContext } from '../../hooks/summaryContext';

const Summarize: FC = (): ReactElement => {
	const [currentComponent, setCurrentComponent] = useState(1);
	const [inputText, setInputText] = useState('');
	const [summaryLength, setLength] = useState('short');
	const [summaryType, setType] = useState(0);
	const [summaryTone, setTone] = useState(0);
	const [outputText, setOutputText] = useState('');

	console.log('parent:', { text: inputText, summaryLength: summaryLength });

	return (
		<SummaryContext.Provider
			value={{
				inputText,
				summaryLength,
				summaryType,
				summaryTone,
				outputText,
				setInputText,
				setLength,
				setType,
				setTone,
				setOutputText,
			}}
		>
			<main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-evenly space-y-10">
				<CSSTransition in={currentComponent === 1} timeout={400} classNames="menu-primary" unmountOnExit>
					<InputTextfield />
				</CSSTransition>
				<CSSTransition in={currentComponent === 2} timeout={400} classNames="menu-secondary" unmountOnExit>
					<SummarySettings />
				</CSSTransition>
				<CSSTransition in={currentComponent === 3} timeout={400} classNames="menu-primary" unmountOnExit>
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
						onClick={() => setCurrentComponent(3)}
						className={`rounded-full h-5 w-5 ${currentComponent === 3 ? 'bg-indigo-500' : 'bg-gray-300'}`}
					></div>
				</div>
			</main>
		</SummaryContext.Provider>
	);
};

export default Summarize;
