import { createContext, useContext } from 'react';

export interface SingleDocumentContextType {
	title: string;
	inputText: string;
	docId: any;
	generatedOutput: string;
	outputType: string;
	outputLanguage: string;
	setOutputLanguage: (outputLanguage: string) => void;
	setOutputType: (outputType: string) => void;
	setGeneratedOutput: (generatedOutput: string) => void;
	setTitle: (title: string) => void;
	setInputText: (inputText: string) => void;
	setDocId: (id: string) => void;
}

export const SingleDocContext = createContext<SingleDocumentContextType>({
	title: '',
	inputText: '',
	docId: '',
	generatedOutput: '',
	outputType: '',
	outputLanguage: '',
	setOutputLanguage: (outputLanguage: string) =>
		console.warn('outputLanguage_missing'),
	setOutputType: outputType => console.warn('outputType_missing'),
	setGeneratedOutput: generatedOutput =>
		console.warn('generatedOutput_missing'),
	setTitle: title => console.warn('title_missing'),
	setInputText: (inputText: string) => console.warn('input_missing'),
	setDocId: docId => console.warn('docId_missing'),
});
export const useSingleDocContext = (): any => useContext(SingleDocContext);
