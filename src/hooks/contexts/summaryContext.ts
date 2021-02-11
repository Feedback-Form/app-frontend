import { createContext, useContext } from 'react';

export type TextContextType = {
	inputText: string;
	summaryLength: number;
	summaryType: number;
	summaryTone: number;
	outputText: string;
	currentComponent: number;
	characterLimitReached: boolean;
	setInputText: (text: string) => void;
	setLength: (summaryLength: number) => void;
	setType: (summaryType: number) => void;
	setTone: (summaryTone: number) => void;
	setOutputText: (outputText: string) => void;
	setCurrentComponent: (currentComponent: number) => void;
	setCharacterLimitReached: (characterLimitReached: boolean) => void;
};

export const SummaryContext = createContext<TextContextType>({
	inputText: '',
	summaryLength: 100,
	summaryType: 1,
	summaryTone: 1,
	outputText: '',
	currentComponent: 1,
	characterLimitReached: false,
	setInputText: inputText => console.log('text_missing'),
	setLength: summaryLength => console.warn('summaryLength_missing'),
	setType: summaryType => console.warn('summaryType_missing'),
	setTone: summaryTone => console.warn('summaryLength_missing'),
	setOutputText: outputText => console.warn('OutputText_missing'),
	setCurrentComponent: currentComponent => console.warn('currentComponent_missing'),
	setCharacterLimitReached: characterLimitReached => console.warn('wordlimit_missing'),
});
// @typescript-eslint/explicit-module-boundary-types
export const useText = (): any => useContext(SummaryContext);
