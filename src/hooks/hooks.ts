import { useState } from 'react';

export const useWordState = (initialWords: string) => {
	//count the words based on the initialWords input
	const curWordCount = (initialWords.match(/\s/g) || []).length;
	const [words, setWords] = useState(initialWords);

	const [wordCount, setWordCount] = useState(curWordCount);

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
	return [words, wordCount, handleChange, setWords, reset] as const;
};

export const useInputState = (initiaVal: string) => {
	const [input, setInput] = useState(initiaVal);
	const handleChange = (e: { target: { value: any } }) => {
		setInput(e.target.value);
	};
	const reset = () => {
		setInput('');
	};
	return [input, handleChange, reset] as const;
};
