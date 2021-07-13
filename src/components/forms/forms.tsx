import React, { FC, ReactElement, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Redirect } from 'react-router-dom';
//hooks
import { useUserData } from '../../hooks/contexts/userContext';
//components
import DeleteWidget from '../delete-widget/deleteWidget';
import LoadingWidget from '../loadingWidget';

//services
import { deleteForm, getForms } from '../../services/appService';

//interfaces
import { FormBodyResponseInterface } from '../../services/interfaces/formBodyInterface';

const Forms: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);
	const [documents, setDocuments] = useState([]);

	const [redirect, setRedirect] = useState(false);
	const [redirectFormBuilder, setRedirectFormBuilder] = useState(false);
	const [selectedDocId, setSelectedDocId] = useState('');
	const [deleteWidgetIsOpen, setDeleteWidgetIsOpen] = useState(false);

	const { token } = useUserData();
	const [authToken, setAuthToken] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZDVhN2Q1OGFmYjE0MWU0NTY4M2EiLCJpYXQiOjE2MjYwOTEzMjMsImV4cCI6MTYyODY4MzMyM30.oCHH23R-A_HWQ133OtgYOiXnV4T8FVayeq_3BE8s3tw',
	);
	const [forms, setForms] = useState<FormBodyResponseInterface[]>([]);
	const [formId, setFormId] = useState('');
	const [formName, setFormName] = useState('');

	async function getForms_(): Promise<void> {
		try {
			const forms: FormBodyResponseInterface[] = await getForms(authToken);
			setForms(forms);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	useEffect(() => {
		getForms_();
	}, [deleteWidgetIsOpen, isLoadingTwo]);

	async function deleteForm_(): Promise<void> {
		try {
			await deleteForm(authToken, formId);
			setDeleteWidgetIsOpen(false);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	return (
		<>
			{deleteWidgetIsOpen && (
				<DeleteWidget
					closeWidgetHandlerFunction={() => setDeleteWidgetIsOpen(false)}
					deleteHandlerFunction={() => deleteForm_()}
					itemName={formName}
				/>
			)}

			<section className="w-full flex flex-col items-center justify-center bg-white text-gray-900">
				{isLoadingTwo && <LoadingWidget />}

				{isLoading ? (
					<h1>fetching</h1>
				) : (
					<>
						<div className="flex flex-col w-3/4 h-1/5 justify-center">
							<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Documents</h1>
						</div>
						<section className="flex w-3/4 h-4/5 overflow-y-auto pb-10 ">
							{/* <div className="h-1/2 flex gap-6 xs:grid grid-cols-4 flex-wrap"> */}
							<div className="h-1/2 flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 md:gap-6">
								{/* DEFAULT FORM TO CREATE A NEW ONE*/}
								<div
									className="group bg-primary-500 rounded-md w-48 h-48 flex flex-col px-4 py-8 justify-center  text-white items-center hover:bg-primary-400 ease-in transition-all duration-200 cursor-pointer"
									onClick={() => {
										setRedirectFormBuilder(true);
									}}
								>
									<h1 className="font-semibold tracking-wide text-base pb-2 group-hover:scale-105 transform ease-in transition-all duration-100">
										Create new form
									</h1>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8 currentColor  group-hover:scale-110 transform ease-in transition-all duration-100 "
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								{/* DOCUMENT CREATED BY USER */}
								{forms.map((form: FormBodyResponseInterface) => {
									return (
										<div
											key={form._id}
											className="bg-gray-50 rounded-md w-48 h-48 flex flex-col px-4 py-8 justify-between border-2 cursor-pointer hover:border-primary-500 ease-in transition-all duration-200"
										>
											<div>
												<h1 className="font-semibold text-gray-800 tracking-wide text-base">{form.formName}1</h1>
												<h4 className="text-gray-500 text-sm pt-4">{dateFormat(form.createdAt, 'HH:MM tt, dS mmmm, yy')}</h4>
											</div>

											<div className="flex items-end justify-end text-gray-400  space-x-3 ">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 cursor-pointer hover:text-gray-500 ease-in-out transition-all duration-100 hover:scale-110 transform"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
													/>
												</svg>

												<svg
													id={'x'}
													onClick={() => {
														setFormName(form.formName);
														setFormId(form._id);
														setDeleteWidgetIsOpen(true);
													}}
													className="w-5 h-5 cursor-pointer hover:text-red-500 ease-in-out transition-all duration-100 hover:scale-110  transform "
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</div>
										</div>
									);
								})}
							</div>
						</section>
					</>
				)}

				{redirect && <Redirect to={`/document/${selectedDocId}`} />}
				{redirectFormBuilder && <Redirect to={`/form/new`} />}
			</section>
		</>
	);
};

export default Forms;
