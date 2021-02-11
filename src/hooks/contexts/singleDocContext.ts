import { createContext, useContext } from 'react';

export type SingleDocumentContextType = {
	title: string;
	transcript: string;
	gptThreeSummary: string;
	docId: any;
	setTitle: (title: string) => void;
	setTranscript: (transcript: string) => void;
	setGptThreeSummary: (gptThreeSummary: string) => void;
	setDocId: (id: string) => void;
};

export const SingleDocContext = createContext<SingleDocumentContextType>({
	title: '',
	transcript: '',
	gptThreeSummary: '',
	docId: '',
	setTitle: title => console.warn('title_missing'),
	setTranscript: transcript => console.warn('transcript_missing'),
	setGptThreeSummary: gptThreeSummary => console.warn('gptThreeSummary_missing'),
	setDocId: docId => console.warn('docId_missing'),
});
export const useSingleDocContext = (): any => useContext(SingleDocContext);
