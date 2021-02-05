import { createContext, useContext } from 'react';

export type docsContextType = {
	isDeleteRequest: boolean;
	docName: string;
	docId: string;
	setDeleteRequest: (isDeleteRequest: boolean) => void;
	setDocName: (docName: string) => void;
	setDocId: (docId: string) => void;
};

export const DocsContext = createContext<docsContextType>({
	isDeleteRequest: false,
	docName: '',
	docId: '',
	setDeleteRequest: isDeleteRequest => console.warn('deletereq_missing'),
	setDocName: docName => console.warn('docname_missing'),
	setDocId: docId => console.warn('docId_missing'),
});

export const useDocsContext = () => useContext(DocsContext);
