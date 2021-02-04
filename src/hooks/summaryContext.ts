import { createContext, useContext } from 'react';

export type TextContextType = {
	inputText: string;
	summaryLength: string;
	summaryType: number;
	summaryTone: number;
	outputText: string;
	currentComponent: number;
	setInputText: (text: string) => void;
	setLength: (summaryLength: string) => void;
	setType: (summaryType: number) => void;
	setTone: (summaryTone: number) => void;
	setOutputText: (outputText: string) => void;
	setCurrentComponent: (currentComponent: number) => void;
};

export const SummaryContext = createContext<TextContextType>({
	inputText: '',
	summaryLength: 'basic',
	summaryType: 1,
	summaryTone: 1,
	outputText: '',
	currentComponent: 1,
	setInputText: inputText => console.log('text_'),
	setLength: summaryLength => console.warn('summaryLength_missing'),
	setType: summaryType => console.warn('summaryType_missing'),
	setTone: summaryTone => console.warn('summaryLength_missing'),
	setOutputText: outputText => console.warn('OutputText_missing'),
	setCurrentComponent: currentComponent => console.warn('currentComponent is missing'),
});
export const useText = () => useContext(SummaryContext);
