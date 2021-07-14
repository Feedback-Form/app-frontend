import React, { FC, ReactElement, useState, useEffect } from 'react';

//hooks
import { useParams } from 'react-router-dom';
//services
import { getFormById, rateForm } from '../services/appService';

//interfaces
import { ResponseSuggestionRequest } from '../interfaces/responseBodyInterface';
import { FormBodyResponse, FormQuestion } from '../interfaces/formBodyInterface';

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

	async function getFormById_(): Promise<void> {
		try {
			setIsLoading(true);
			const response = await getFormById(authToken, formId);
			setForm(response);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		getFormById_();
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
							<div className="flex space-x-4 pb-12">
								<h1 className="text-3xl font-semibold capitalize text-gray-900 ">{form?.formName}</h1>
								<div className="flex flex-col bg-primary-300 text-primary-900 rounded-full font-medium text-center justify-center px-4 text-base">
									<span>{form?.questions.length} Questions</span>
								</div>
							</div>

							<div className="flex flex-col space-y-10 ">
								{form?.questions.map((item: FormQuestion, index) => (
									<ResponseQuestionField
										key={item._id}
										question={item.question}
										maxRating={item.maxRating}
										aiSuggestions={form?.aiSuggestions || false}
										questionId={item._id}
										questionNumber={index + 1}
										authToken={authToken}
										formId={formId}
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
