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
import Button from '../components/button/button';
import Toggler from '../components/toggler/toggler';
import PersonalDetailField from '../components/personal-detail-field/personalDetailField';
const RatingPage: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(true);
	const [isRequestLoading, setIsRequestLoading] = useState(false);
	const [form, setForm] = useState<FormBodyResponse>();
	const { formId } = useParams<{ formId: string }>();

	const [responses, setResponses] = useState<QuestionResponse[]>([]);
	const [timeToFinishForm, setTimeToFinishForm] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isError, setIsError] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [linkedInProfile, setLinkedInProfile] = useState('');
	const [allowPublishing, setAllowPublishing] = useState(false);
	const [personalDetailFields, setPersonalDetailFields] = useState(['first name', 'last name', 'linkedIn profile']);
	const [responseString, setResponseString] = useState('');
	const [responseType, setResponseType] = useState<'error' | 'success' | ''>('');
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
	const getPersonalFieldValue = (fieldName: string, fieldValue: string): void => {
		if (fieldName === 'first name') {
			setFirstName(fieldValue);
		}
		if (fieldName === 'last name') {
			setLastName(fieldValue);
		}
		if (fieldName === 'linkedIn profile') {
			setLinkedInProfile(fieldValue);
		}
	};
	const getToggleFieldValue = (toggleFieldId: string, toggleFieldValue: boolean): void => {
		if (toggleFieldId === 'allow-publishing') {
			setAllowPublishing(toggleFieldValue);
		}
	};

	async function getFormById_(): Promise<void> {
		try {
			const response = await getFormById(formId);
			setForm(response);
			document.title = `${response.formName !== undefined ? `rate ${response.formName}` : 'no form'}`;
			setTimeToFinishForm(estimateTimeToFinish(response.questions, response.allowPersonalDetails));
			setResponses(createQuestionResponsesArray(response.questions));
			setIsLoading(false);
		} catch (err) {
			setIsError(true);
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
				maxRating: question.maxRating,
			});
		});

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
	};

	function estimateTimeToFinish(questions: FormQuestionResponse[], allowPersonalDetails: boolean): number {
		let number = 0;

		//2min for each question
		questions.forEach(() => {
			number = number + 2;
		});

		//2min to fill in personal details
		if (allowPersonalDetails) {
			return (number = number + 2);
		}

		return number;
	}

	async function formButtonClickHandler(): Promise<void> {
		try {
			if (currentPage === 1 && form?.allowPersonalDetails) {
				setCurrentPage(2);
				return;
			}
			setIsRequestLoading(true);

			await rateForm(formId, {
				personalDetails: {
					firstName,
					lastName,
					linkedInProfile,
				},
				allowPublishing,
				aiSuggestions: form?.aiSuggestions || false,
				questionResponses: responses,
			});
			setResponseString(`You've successfully submitted your feedback!`);
			setResponseType('success');
			setIsRequestLoading(false);
			setTimeout(() => {
				setResponseType('');
			}, 5000);
		} catch (err) {
			setResponseString(`Oops, something went wrong. Please try again.`);
			setResponseType('error');
			setIsRequestLoading(false);
			setTimeout(() => {
				setResponseType('');
			}, 5000);
		}
	}

	function getButtonLabel(): string {
		if (currentPage === 1 && !form?.allowPersonalDetails) {
			return 'submit form';
		}
		if (currentPage === 2 && form?.allowPersonalDetails) {
			return 'submit form';
		}
		return 'next page';
	}

	//initiate the component
	useEffect(() => {
		getFormById_();
	}, [formId]);

	return (
		<>
			<section className="w-full min-h-screen flex flex-col bg-white text-gray-900 items-center ">
				{isRequestLoading && <LoadingWidget />}
				{isLoading && <LoadingWidget />}
				{!isLoading && !isError && (
					<>
						<main className="flex flex-col w-3/4 max-w-xl flex-grow justify-center">
							<div className="flex space-x-6 items-center pb-12">
								{currentPage === 2 && (
									<button
										onClick={() => setCurrentPage(1)}
										className="bg-gray-200 rounded-md p-1 group hover:bg-gray-100 ease-in-out transition-all duration-100"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-10 w-10 text-gray-400 "
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
										</svg>
									</button>
								)}
								<div>
									<div className="flex space-x-6 items-center">
										<h1 className="text-4xl font-semibold capitalize text-gray-900 ">{form?.formName}</h1>
										<div className="bg-primary-300 text-primary-900 rounded-full font-medium text-center px-4 py-1 text-base items-center">
											<span>{form?.questions.length} Questions</span>
										</div>
									</div>
									<div className="flex space-x-2 text-base font-normal text-gray-500 pt-5">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span>it takes around {timeToFinishForm} min to complete</span>
									</div>
								</div>
							</div>
							{currentPage === 1 && (
								<>
									<div className="flex flex-col space-y-10 pb-10">
										{form?.questions.map((item: FormQuestionResponse, index: number) => (
											<ResponseQuestionField
												key={item._id}
												question={item.question}
												maxRating={item.maxRating}
												aiSuggestions={form?.aiSuggestions || false}
												questionId={item._id}
												questionNumber={index + 1}
												formId={formId}
												getQuestionValue={getQuestionValue}
											/>
										))}
									</div>
								</>
							)}
							{currentPage === 2 && (
								<>
									<div className="flex flex-col space-y-10 pb-10">
										{personalDetailFields.map((item: string, index: number) => (
											<PersonalDetailField key={index} fieldName={item} getFieldValue={getPersonalFieldValue} />
										))}
										<div className="flex space-x-1 items-center">
											<Toggler togglerId={'allow-publishing'} getToggleFieldValue={getToggleFieldValue} />
											<span className="text-gray-500 text-base">
												I give permission to use this review across social channels and other marketing efforts
											</span>
										</div>
									</div>
								</>
							)}
							<Button
								label={getButtonLabel()}
								isDisabled={buttonIsDisabled}
								clickHandlerFunction={() => {
									formButtonClickHandler();
								}}
							/>
							{responseType !== '' && (
								<div className={`pt-4 ${responseType === 'success' ? 'text-green-500' : 'text-red-500'} font-medium`}>{responseString}</div>
							)}
						</main>
					</>
				)}
				{isError && (
					<div className="flex flex-col justify-center min-h-screen">
						<div className="bg-yellow-300 text-yellow-600 text-lg font-medium py-2 px-3 rounded-lg">
							Oops, there doesn&apos;t seem to be a form.
						</div>
					</div>
				)}
			</section>
		</>
	);
};
export default RatingPage;
