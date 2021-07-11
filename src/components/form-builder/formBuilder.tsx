import React, { FC, ReactElement, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
//components
import Toggler from '../../components/toggler/toggler';
import QuestionField from '../question-field/questionField';
//hooks
import { useCharacterState } from '../../hooks/hooks';

const FormBuilder: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [titleLocal, characterCountThree, handleWordChangeThree, resetWordsThree] = useCharacterState('Lukas Form v1');
	const [currentPage, setCurrentPage] = useState(1);
	const idOne = uuidv4();
	const [questions, setQuestions] = useState<string[]>([idOne]);

	function nextPage(): void {
		if (currentPage === 4) {
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
		const newQuestion = uuidv4();
		setQuestions([...questions, newQuestion]);
	}

	const removeQuestion = (question: string) => {
		const newArray = questions.filter(item => item !== question);
		setQuestions(newArray);
	};

	return (
		<>
			<section className="w-full min-h-screen flex flex-col bg-white text-gray-900 items-center">
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
											value={titleLocal}
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

										<div>
											<div className="flex space-x-1 items-center">
												<Toggler />
												<span>Allow AI generated response suggestions</span>
											</div>
										</div>
									</div>
								</>
							)}
							{currentPage === 2 && (
								<>
									<div className="pb-16">
										<h1 className="tracking-wide text-3xl text-gray-900 font-medium pb-10">Questions</h1>
										<div className="flex flex-col space-y-10">
											{questions.map((questionId, index) => (
												<QuestionField
													key={questionId}
													questionId={questionId}
													questionNumber={index + 1}
													questionRemoveFunction={() => removeQuestion(questionId)}
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
								</>
							)}

							<button
								onClick={() => {
									nextPage();
								}}
								// disabled={isLoading}
								className="rounded-lg bg-primary-500 hover:bg-primary-400 focus:bg-primary-400  focus:outline-none text-white px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50
					"
							>
								next page
							</button>
						</main>
					</>
				)}
			</section>
		</>
	);
};

export default FormBuilder;
