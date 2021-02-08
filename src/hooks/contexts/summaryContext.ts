import { createContext, useContext } from 'react';

export type TextContextType = {
	inputText: string;
	summaryLength: number;
	summaryType: number;
	summaryTone: number;
	outputText: string;
	currentComponent: number;
	wordLimitReached: boolean;
	setInputText: (text: string) => void;
	setLength: (summaryLength: number) => void;
	setType: (summaryType: number) => void;
	setTone: (summaryTone: number) => void;
	setOutputText: (outputText: string) => void;
	setCurrentComponent: (currentComponent: number) => void;
	setWordLimitReached: (wordLimitReached: boolean) => void;
};

export const SummaryContext = createContext<TextContextType>({
	inputText: '',
	summaryLength: 100,
	summaryType: 1,
	summaryTone: 1,
	outputText: '',
	currentComponent: 1,
	wordLimitReached: false,
	setInputText: inputText => console.log('text_missing'),
	setLength: summaryLength => console.warn('summaryLength_missing'),
	setType: summaryType => console.warn('summaryType_missing'),
	setTone: summaryTone => console.warn('summaryLength_missing'),
	setOutputText: outputText => console.warn('OutputText_missing'),
	setCurrentComponent: currentComponent => console.warn('currentComponent_missing'),
	setWordLimitReached: wordLimitReached => console.warn('wordlimit_missing'),
});
export const useText = () => useContext(SummaryContext);
