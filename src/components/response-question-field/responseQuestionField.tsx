import React, { FC, ReactElement, useState, useEffect } from 'react';
//hooks
import { useCharacterState } from '../../hooks/hooks';
import { ResponseSuggestionRequest } from '../../interfaces/responseBodyInterface';
//services
import { getResponseSuggestion } from '../../services/appService';
//interfaces
import { ResponseQuestionFieldProps } from './responseQuestionFieldProps';
const ResponseQuestionField = ({
	question,
	maxRating,
	aiSuggestions,
	questionId,
	formId,
	questionNumber,
	authToken,
	getQuestionValue,
}: ResponseQuestionFieldProps): // { question, maxRating }: ResponseSuggestionRequest,

ReactElement => {
	const [response, characterCountThree, handleWordChangeThree, setResponse, resetResponse] = useCharacterState('');
	const [stars, setStars] = useState<number[]>([1, 2, 3, 4, 5]);
	const [selectedStar, setSelectedStar] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);

	async function getResponseSuggestion_(rating: number): Promise<void> {
		try {
			setIsLoading(true);
			const res = await getResponseSuggestion(formId, {
				question,
				rating,
				maxRating,
			});
			setResponse(res.suggestedResponse);

			getQuestionValue(questionId, res.suggestedResponse, 'response');

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}

	//only alters stars, if maxRating is not default of 5
	useEffect(() => {
		if (stars.length === maxRating) {
			return;
		}
		const newStars = [];
		for (let i = 0; i < maxRating; i++) {
			newStars.push(i + 1);
		}
		setStars(newStars);
	}, []);

	return (
		<div className="flex flex-col space-y-5 ">
			<h3 className="text-xl text-gray-800 font-semibold capitalize ">
				{questionNumber}. {question}
			</h3>
			<div className="flex space-x-1">
				{stars.map(star => (
					<button
						key={star}
						onClick={() => {
							//get star value
							setSelectedStar(star);
							if (aiSuggestions) {
								getResponseSuggestion_(star);
							}
							getQuestionValue(questionId, star, 'rating');
						}}
						disabled={isLoading}
						className="focus:outline-none disabled:animate-pulse "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`flex w-10 h-10 transition-all ease-in-out duration-200
                ${selectedStar < star ? 'text-gray-300' : 'text-yellow-400'} `}
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					</button>
				))}
			</div>
			<textarea
				value={response}
				onChange={e => {
					handleWordChangeThree(e);
					getQuestionValue(questionId, e.target.value, 'response');
				}}
				placeholder="Type your question here"
				disabled={isLoading}
				className={`bg-white text-md h-64 text-gray-800 font-base tracking-wide ring-2 rounded-lg px-2 py-3 ring-gray-100 w-full
focus:outline-none hover:ring-primary-400 focus:ring-primary-400 transition-all ease-in-out duration-100 resize-none 
					${isLoading && 'bg-gray-50 cursor-not-allowed'} disabled:animate-pulse
				`}
			/>
		</div>
	);
};
export default ResponseQuestionField;
