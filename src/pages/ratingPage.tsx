import React, { FC, ReactElement, useState, useEffect } from 'react';

//hooks
import { useParams } from 'react-router-dom';
//services
import { getFormById, rateForm } from '../services/appService';

//interfaces
import { QuestionResponse } from '../interfaces/responseBodyInterface';
import { FormBodyResponse, FormQuestionResponse, FormQuestion } from '../interfaces/formBodyInterface';

//components
import ResponseQuestionField from '../components/response-question-field/responseQuestionField';
import LoadingWidget from '../components/loadingWidget';
const RatingPage: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRequestLoading, setIsRequestLoading] = useState(false);
	const [form, setForm] = useState<FormBodyResponse>();
	const { formId } = useParams<{ formId: string }>();
	const [authToken, setAuthToken] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZDVhN2Q1OGFmYjE0MWU0NTY4M2EiLCJpYXQiOjE2MjYyOTQwNzAsImV4cCI6MTYyODg4NjA3MH0.SwfbjueUZ5cJZ2rMeT7v8x5h7JmRUb2q83nS7t4fyDk',
	);
	const [responses, setResponses] = useState<QuestionResponse[]>([]);

	async function getFormById_(): Promise<void> {
		try {
			setIsLoading(true);
			const response = await getFormById(authToken, formId);
			setForm(response);
			document.title = `rate ${form?.formName}` || '';

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}

	//create a new array for the answers to the form questions
	function createQuestionResponsesArray(questions: FormQuestionResponse[]): QuestionResponse[] {
		const newQuestions: QuestionResponse[] = [];
		questions.forEach((question: FormQuestionResponse) => {
			newQuestions.push({
				questionId: question._id,
				rating: 0,
				response: '',
				question: question.question,
			});
		});
		// eslint-disable-next-line no-console
		console.log(newQuestions);
		return newQuestions;
	}
	const getQuestionValue = (questionId: string, input: any, key: 'response' | 'rating') => {
		const newResponses = responses;
		if (key === 'response') {
			// if (input !== typeof 'string') {
			// 	throw new Error('response key has to be a string');
			// }
			newResponses.forEach((question, index) => {
				if (question.questionId === questionId) {
					return (newResponses[index].response = input);
				}
				setResponses(newResponses);
			});
		}

		if (key === 'rating') {
			// if (input !== typeof 'number') {
			// 	throw new Error('rating key has to be a number');
			// }
			newResponses.forEach((question, index) => {
				if (question.questionId === questionId) {
					return (newResponses[index].rating = input);
				}
				setResponses(newResponses);
			});
		}
		// eslint-disable-next-line no-console
		console.log(responses);
	};

	//initiate the component
	useEffect(() => {
		getFormById_();
		setResponses(createQuestionResponsesArray(form?.questions || []));
	}, [formId]);
	return (
		<>
			<section className="w-full min-h-screen flex flex-col bg-white text-gray-900 items-center ">
				{isRequestLoading && <LoadingWidget />}
				{isLoading ? (
					<h1>fetching</h1>
				) : (
					<>
						<main className="flex flex-col w-3/4 max-w-xl flex-grow justify-center">
							<div className="flex space-x-6 pb-12 items-center">
								<h1 className="text-4xl font-semibold capitalize text-gray-900 ">{form?.formName}</h1>
								<div className="bg-primary-300 text-primary-900 rounded-full font-medium text-center px-4 py-1 text-base items-center">
									<span>{form?.questions.length} Questions</span>
								</div>
							</div>

							<div className="flex flex-col space-y-10 ">
								{form?.questions.map((item: FormQuestionResponse, index) => (
									<ResponseQuestionField
										key={item._id}
										question={item.question}
										maxRating={item.maxRating}
										aiSuggestions={form?.aiSuggestions || false}
										questionId={item._id}
										questionNumber={index + 1}
										authToken={authToken}
										formId={formId}
										getQuestionValue={getQuestionValue}
									/>
								))}
							</div>
						</main>
					</>
				)}
			</section>
		</>
	);
};
export default RatingPage;
