import { useState } from 'react';

export const useWordState = (initialVal: string) => {
	const [words, setWords] = useState(initialVal);
	const [wordCount, setWordCount] = useState(0);

	const handleChange = (e: { target: { value: any } }) => {
		const curWords = e.target.value;
		setWords(curWords);
		const curWordCount = (curWords.match(/\s/g) || []).length;
		setWordCount(curWordCount);
	};
	const reset = () => {
		setWords('');
		setWordCount(0);
	};
	return [words, wordCount, handleChange, reset] as const;
};
