import { useState } from 'react';

export const useCharacterState = (initialCharacters: string): any => {
	//count the words based on the initialWords input
	const [words, setWords] = useState(initialCharacters);

	const [characterCount, setCharacterCount] = useState(
		initialCharacters.length,
	);

	const handleChange = (e: { target: { value: any } }) => {
		const curWords = e.target.value;
		//set the current words
		setWords(curWords);
		//set the current characters
		const curCharacterCount = curWords.length;
		setCharacterCount(curCharacterCount);
	};
	const reset = () => {
		setWords('');
		setCharacterCount(0);
	};
	return [words, characterCount, handleChange, setWords, reset] as const;
};

export const useInputState = (initiaVal: string): any => {
	const [input, setInput] = useState(initiaVal);
	const handleChange = (e: { target: { value: any } }) => {
		setInput(e.target.value);
	};
	const reset = () => {
		setInput('');
	};
	return [input, handleChange, reset] as const;
};

export const useWordState = (initialCharacters: string): any => {
	//count the words based on the initialWords input
	const [words, setWords] = useState(initialCharacters);

	const handleChange = (e: { target: { value: any } }) => {
		const curWords = e.target.value;
		//set the current words
		setWords(curWords);
	};
	const reset = () => {
		setWords('');
	};
	return [words, handleChange, setWords, reset] as const;
};
