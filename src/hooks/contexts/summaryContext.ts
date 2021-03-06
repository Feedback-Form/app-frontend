/* eslint-disable no-console */
import { createContext, useContext } from 'react';

export interface TextContextType {
	inputText: string;
	summaryLength: number;
	summaryType: number;
	outputArray: Array<string>;
	currentComponent: number;
	characterLimitReached: boolean;
	inputRiskGroup: string;
	summaryLanguage: string;
	setInputText: (text: string) => void;
	setLength: (summaryLength: number) => void;
	setType: (summaryType: number) => void;
	setOutputArray: (outputText: Array<string>) => void;
	setCurrentComponent: (currentComponent: number) => void;
	setCharacterLimitReached: (characterLimitReached: boolean) => void;
	setInputRiskGroup: (inputRiskGroup: string) => void;
	setSummaryLanguage: (summaryLanguage: string) => void;
}

export const SummaryContext = createContext<TextContextType>({
	inputText: '',
	summaryLength: 100,
	summaryType: 1,
	outputArray: [''],
	currentComponent: 1,
	characterLimitReached: false,
	inputRiskGroup: '0',
	summaryLanguage: '',
	setInputText: inputText => console.log('text_missing'),
	setLength: summaryLength => console.warn('summaryLength_missing'),
	setType: summaryType => console.warn('summaryType_missing'),
	setOutputArray: outputText => console.warn('OutputText_missing'),
	setCurrentComponent: currentComponent => console.warn('currentComponent_missing'),
	setCharacterLimitReached: characterLimitReached => console.warn('wordlimit_missing'),
	setInputRiskGroup: inputRiskGroup => console.warn('gptriskgroup_missing'),
	setSummaryLanguage: summaryLanguage => console.warn('summarylanguage_missing'),
});
// @typescript-eslint/explicit-module-boundary-types
export const useText = (): any => useContext(SummaryContext);
