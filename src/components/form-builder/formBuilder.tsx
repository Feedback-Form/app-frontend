import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { stringify, v4 as uuidv4 } from 'uuid';
//components
import Toggler from '../../components/toggler/toggler';
import QuestionField from '../question-field/questionField';
import DeleteWidget from '../delete-widget/deleteWidget';
import Button from '../button/button';
import LoadingWidget from '../loadingWidget';
//hooks
import { useCharacterState } from '../../hooks/hooks';

//helper functions
import { postForm } from '../../services/appService';

//interfaces/types
import { FormQuestion } from '../../services/interfaces/formBodyInterface';
const FormBuilder: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFormLoading, setIsFormLoading] = useState(false);
	const [formTitle, characterCountThree, handleWordChangeThree, resetWordsThree] = useCharacterState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [questions, setQuestions] = useState<{ id: string; value: string }[]>([{ id: uuidv4(), value: '' }]);
	const [aiSuggestions, setAiSuggestions] = useState(false);
	const [allowPersonalDetails, setAllowPersonalDetails] = useState(false);
	const [toggleFields, setToggleFields] = useState<{ toggleFieldId: string; toggleFieldDescription: string }[]>([
		{
			toggleFieldId: 'aiSuggestions',
			toggleFieldDescription: 'Allow AI generated response suggestions',
		},
		{
			toggleFieldId: 'personalDetails',
			toggleFieldDescription: 'Enable personal response details',
		},
	]);
	const [authToken, setAuthToken] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZDVhN2Q1OGFmYjE0MWU0NTY4M2EiLCJpYXQiOjE2MjYwOTEzMjMsImV4cCI6MTYyODY4MzMyM30.oCHH23R-A_HWQ133OtgYOiXnV4T8FVayeq_3BE8s3tw',
	);
	const [deleteWidgetIsOpen, setDeleteWidgetIsOpen] = useState(false);
	const history = useHistory();
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigateBack = () => {
		history.push('/forms');
	};

	function nextPage(): void {
		if (currentPage === 2) {
			return;
		}
		setCurrentPage(currentPage + 1);
	}

	function previousPage(): void {
		if (currentPage === 1) {
			return;
		}
		setCurrentPage(currentPage - 1);
	}

	function addNewQuestion(): void {
		const newQuestion = { id: uuidv4(), value: '' };
		setQuestions([...questions, newQuestion]);
	}

	const removeQuestion = (questionId: string): void => {
		const newArray = questions.filter(question => question.id !== questionId);
		setQuestions(newArray);
	};
	const getFormValue = (questionId: string, input: string) => {
		const newQuestions = questions;
		newQuestions.forEach((question, index) => {
			if (question.id === questionId) {
				return (newQuestions[index].value = input);
			}
			setQuestions(newQuestions);
		});
	};
	const getToggleFieldValue = (toggleFieldId: string, toggleFieldValue: boolean): void => {
		if (toggleFieldId === 'aiSuggestions') {
			setAiSuggestions(toggleFieldValue);
		}

		if (toggleFieldId === 'personalDetails') {
			setAllowPersonalDetails(toggleFieldValue);
		}
	};

	async function postForm_(): Promise<void> {
		try {
			if (questions.length === 0) {
				setShowErrorMessage(true);
				setErrorMessage('Please add a question.');
				setTimeout(() => {
					setShowErrorMessage(false);
					setErrorMessage('');
				}, 5000);
			}
			if (formTitle === '') {
				setShowErrorMessage(true);
				setErrorMessage('Please give your form a title.');
				setTimeout(() => {
					setShowErrorMessage(false);
					setErrorMessage('');
				}, 5000);
			}
			setIsFormLoading(true);
			const updatedQuestions: FormQuestion[] = [];
			questions.forEach(question => {
				updatedQuestions.push({
					question: question.value,
					responseType: 'string',
					maxRating: 5,
				});
			});
			const newForm = await postForm(authToken, {
				formName: formTitle,
				aiSuggestions,
				allowPersonalDetails,
				questions: updatedQuestions,
			});
			setIsFormLoading(false);
			navigateBack();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
			setIsFormLoading(false);
		}
	}

	return (
		<>
			{deleteWidgetIsOpen && (
				<DeleteWidget
					closeWidgetHandlerFunction={() => setDeleteWidgetIsOpen(false)}
					deleteHandlerFunction={() => navigateBack()}
					itemName={formTitle}
				/>
			)}
			<section className="w-full min-h-screen flex flex-col bg-white text-gray-900 items-center">
				{isFormLoading && <LoadingWidget />}
				{isLoading ? (
					<h1>fetching</h1>
				) : (
					<>
						<div className={`flex w-3/4 ${currentPage !== 1 ? 'justify-between' : 'justify-end'} pt-20`}>
							{currentPage !== 1 && (
								<svg
									onClick={() => previousPage()}
									xmlns="http://www.w3.org/2000/svg"
									className="h-10 w-10 text-gray-400 cursor-pointer hover:text-gray-800 ease-in-out transition-all duration-100"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							)}

							<svg
								onClick={() => setDeleteWidgetIsOpen(true)}
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 text-gray-400 cursor-pointer hover:text-red-500 ease-in-out transition-all duration-100"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
						<main className="flex flex-col w-3/4 max-w-xl flex-grow">
							{currentPage === 1 && (
								<>
									<div className="pb-16">
										<h1 className="tracking-wide text-3xl text-gray-900 font-medium pb-10">Give your form a name</h1>
										<input
											value={formTitle}
											onChange={e => {
												handleWordChangeThree(e);
											}}
											type="text"
											placeholder="Add a title"
											className="bg-white text-xl text-gray-900 font-medium tracking-wide border-2 rounded-lg p-2 border-gray-100 w-full
                    focus:outline-none "
										/>
									</div>
									<div className="pb-16">
										<h1 className="tracking-wide text-3xl text-gray-900 font-medium pb-10">Settings</h1>

										<div className="flex flex-col space-y-6">
											{toggleFields.map(field => (
												<div key={field.toggleFieldId} className="flex space-x-1 items-center">
													<Toggler togglerId={field.toggleFieldId} getToggleFieldValue={getToggleFieldValue} />
													<span>{field.toggleFieldDescription}</span>
												</div>
											))}
										</div>
									</div>
									<div className="flex justify-center">
										<Button
											isDisabled={false}
											label={'next page'}
											clickHandlerFunction={() => {
												nextPage();
											}}
										/>
									</div>
								</>
							)}

							{currentPage === 2 && (
								<>
									<div className="pb-16">
										<h1 className="tracking-wide text-3xl text-gray-900 font-medium pb-10">Questions</h1>
										<div className="flex flex-col space-y-10">
											{questions.map((question, index) => (
												<QuestionField
													key={question.id}
													questionId={question.id}
													questionNumber={index + 1}
													questionRemoveFunction={() => removeQuestion(question.id)}
													getFormValue={getFormValue}
												/>
											))}
										</div>

										<div className="flex justify-center pt-10">
											<div
												className=" p-1 text-white  bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 rounded-full 
                                        transition-all ease-in-out duration-100 cursor-pointer"
												onClick={() => {
													addNewQuestion();
												}}
											>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 currentColor" viewBox="0 0 20 20" fill="currentColor">
													<path
														fillRule="evenodd"
														d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										</div>
									</div>
									<div className="flex justify-center">
										<Button
											isDisabled={isFormLoading}
											label={'save form'}
											clickHandlerFunction={() => {
												postForm_();
											}}
										/>
									</div>
									{showErrorMessage && (
										<div className="flex space-x-2 items-center text-red-500 pt-4 justify-center ">
											<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
												/>
											</svg>
											<span>{errorMessage}</span>
										</div>
									)}
								</>
							)}
						</main>
					</>
				)}
			</section>
		</>
	);
};

export default FormBuilder;
