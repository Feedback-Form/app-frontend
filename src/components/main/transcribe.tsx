import React, { FC, ReactElement, useState, useReducer, createContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import AudioDropzone from '../audiodropzone';

import Uploading from '../uploading';
import TranscriptionOutput from '../transcriptionoutput';
const Transcribe: FC = (): ReactElement => {
	const [currentComponent, setCurrentComponent] = useState(1);
	return (
		<main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-evenly space-y-10">
			<CSSTransition in={currentComponent === 1} timeout={400} classNames="menu-primary" unmountOnExit>
				<AudioDropzone />
			</CSSTransition>
			<CSSTransition in={currentComponent === 2} timeout={400} classNames="menu-secondary" unmountOnExit>
				<Uploading message="Your audio is being transcribed." />
			</CSSTransition>
			<CSSTransition in={currentComponent === 3} timeout={400} classNames="menu-primary" unmountOnExit>
				<TranscriptionOutput />
			</CSSTransition>
		</main>
	);
};

export default Transcribe;
