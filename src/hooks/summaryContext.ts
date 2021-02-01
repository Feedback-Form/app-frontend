import { createContext, useContext } from 'react';

export type TextContextType = {
	inputText: string;
	summaryLength: string;
	summaryType: number;
	summaryTone: number;
	setInputText: (text: string) => void;
	setLength: (summaryLength: string) => void;
	setType: (summaryType: number) => void;
	setTone: (summaryTone: number) => void;
};

export const SummaryContext = createContext<TextContextType>({
	inputText: '',
	summaryLength: 'basic',
	summaryType: 1,
	summaryTone: 1,
	setInputText: inputText => console.log('text_'),
	setLength: summaryLength => console.warn('summaryLength_missing'),
	setType: summaryType => console.warn('summaryType_missing'),
	setTone: summaryTone => console.warn('summaryLength_missing'),
});
export const useText = () => useContext(SummaryContext);
