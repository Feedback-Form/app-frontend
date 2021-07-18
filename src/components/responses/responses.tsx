import React, { FC, ReactElement, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Redirect } from 'react-router-dom';
//hooks
import { useUserData } from '../../hooks/contexts/userContext';
//components
import LoadingWidget from '../loadingWidget';
import ResponseCard from '../response-card/responseCard';
import ResponseDetailsCard from '../response-details-card/responseDetailCard';
//services
import { getForms, getFormResponses } from '../../services/appService';

//interfaces
import { FormBodyResponse } from '../../interfaces/formBodyInterface';
import { RatingResponseBody, QuestionResponse, PersonalDetails } from '../../interfaces/responseInterface';

const Responses: FC = (): ReactElement => {
	const [authToken, setAuthToken] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZDVhN2Q1OGFmYjE0MWU0NTY4M2EiLCJpYXQiOjE2MjYzNjM5ODYsImV4cCI6MTYyODk1NTk4Nn0.iq5uP8Q3l4u0JfDndAzVKXp_UCbxeUjen4blyh5rHe8',
	);
	const [forms, setForms] = useState<FormBodyResponse[]>([]);
	const [formResponses, setResponses] = useState<RatingResponseBody[]>([]);
	const [currentFormId, setCurrentFormId] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showReponseDetailsCard, setShowResponseDetailsCard] = useState(false);
	const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
		personalDetails: { firstName: '', lastName: '', linkedInProfile: '' },
	});
	const [responseCreatedAt, setResponseCreatedAt] = useState<string>('');
	const [questionResponses, setQuestionResponses] = useState<QuestionResponse[]>([
		{
			tags: [''],
			_id: '',
			questionId: '',
			rating: 5,
			maxRating: 5,
			response: '',
			question: '',
		},
	]);
	const [allowPublishing, setAllowPublishing] = useState(false);

	async function getForms_(): Promise<void> {
		try {
			setIsLoading(true);
			//get all forms
			const forms_ = await getForms(authToken);
			setIsLoading(false);
			setForms(forms_);
			setCurrentFormId(forms_[0]._id);
		} catch (err) {
			setIsLoading(false);
		}
	}

	async function getFormResponses_() {
		try {
			setIsLoading(true);
			//get all responses from a form
			const responses = await getFormResponses(authToken, currentFormId);
			setIsLoading(false);
			//save all responses from all forms in array
			setResponses(responses);
		} catch (err) {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getForms_();
	}, []);

	useEffect(() => {
		if (currentFormId !== '') {
			getFormResponses_();
		}
	}, [currentFormId]);

	function getAverageRating(questions: QuestionResponse[]): number {
		let ratingSum = 0;
		questions.forEach(question => {
			ratingSum = ratingSum + question.rating;
		});

		const roundedAverage = Math.round(ratingSum / questions.length);
		return roundedAverage;
	}

	function getFormIndex(formId: string): number {
		forms.forEach((form, index) => {
			if (form._id === formId) {
				return index;
			}
		});
		return 0;
	}
	return (
		<>
			{showReponseDetailsCard && (
				<ResponseDetailsCard
					closeCardHandlerFunction={() => {
						setShowResponseDetailsCard(false);
					}}
					_id={''}
					formId={''}
					allowPublishing={allowPublishing}
					aiSuggestions={forms[getFormIndex(currentFormId)].aiSuggestions}
					personalDetails={personalDetails.personalDetails}
					createdAt={responseCreatedAt}
					questionResponses={questionResponses}
				/>
			)}
			{isLoading && <LoadingWidget />}
			<section className="w-full flex flex-col items-center justify-center  bg-gray-50 text-gray-900">
				<div className="flex w-3/4 justify-end">
					<form className="flex items-center justify-end">
						<select
							onChange={e => {
								setCurrentFormId(e.target.value);
							}}
							className="appearance-none bg-transparent text-gray-500 text-lg focus:text-gray-900 transition-colors duration-100 pr-2 py-2 focus:outline-none  "
						>
							{forms.length > 0 ? (
								<>
									{forms.map((form, index) => (
										<option key={index} value={form._id}>
											{form.formName}
										</option>
									))}
								</>
							) : (
								<option value={'no_forms_yet'}>no forms yet</option>
							)}
						</select>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-gray-400  "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</form>
				</div>
				<div className="flex flex-col space-y-6">
					{formResponses.length > 0 ? (
						<>
							{formResponses.map((response: RatingResponseBody, index: number) => {
								return (
									<ResponseCard
										key={index}
										createdAt={response.createdAt}
										firstName={response.personalDetails.firstName || ''}
										lastName={response.personalDetails.lastName || ''}
										maxRating={response.questionResponses[0].maxRating}
										averageRating={getAverageRating(response.questionResponses)}
										tags={response.questionResponses[0].tags}
										clickHandlerFunction={() => {
											setPersonalDetails({ personalDetails: response.personalDetails });
											setResponseCreatedAt(response.createdAt);
											setQuestionResponses(response.questionResponses);
											setAllowPublishing(response.allowPublishing);
											setShowResponseDetailsCard(true);
										}}
									/>
								);
							})}
						</>
					) : (
						<div>
							<span className="font-medium text-gray-900 text-lg tracking-wide">No responses yet!</span>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Responses;
