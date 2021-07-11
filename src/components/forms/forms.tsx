import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//hooks
import { DocsContext } from '../../hooks/contexts/docsContext';
import { useUserData } from '../../hooks/contexts/userContext';
//components
import DeleteWidget from '../deleteWidget';
import LoadingWidget from '../loadingWidget';
import UserSessionBar from '../userSessionBar';

const Forms: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);
	const [documents, setDocuments] = useState([]);

	const [redirect, setRedirect] = useState(false);
	const [selectedDocId, setSelectedDocId] = useState('');
	const [isDeleteRequest, setDeleteRequest] = useState(false);
	const [docName, setDocName] = useState('');
	const [docId, setDocId] = useState('');

	const { token } = useUserData();

	function openDeleteWidget(id: string, title: string): void {
		setDocName(title);
		setDocId(id);
		setDeleteRequest(true);
	}

	//get documents
	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${process.env.REACT_APP_SCRPTAI_BACKEND}/documents`, config)
			.then((res: any) => {
				setDocuments(res.data);
				setIsLoading(false);
			})
			.catch((err: any) => {
				setIsLoading(false);
			});
	}, [isLoadingTwo, isDeleteRequest]);

	function openDocument(id: string): void {
		setSelectedDocId(id);
		setRedirect(true);
	}

	// function sliceStrings(document: Document): string {
	// 	const { outputType } = document;
	// 	switch (outputType) {
	// 		case 'googleadheadlines':
	// 			return 'googlehead';

	// 		case 'googleaddescriptions':
	// 			return 'googledesc';

	// 		case 'facebookheadlines':
	// 			return 'facebookhead';
	// 		case 'productdescriptions':
	// 			return 'productdesc';
	// 		case 'articleheadlines':
	// 			return 'articlehead';
	// 		default:
	// 			return outputType;
	// 	}
	// }

	return (
		<>
			<DocsContext.Provider
				value={{
					isDeleteRequest,
					docName,
					docId,
					setDeleteRequest,
					setDocName,
					setDocId,
				}}
			>
				{isDeleteRequest && <DeleteWidget />}

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
									<div className="bg-primary-500 rounded-md w-48 h-48 flex flex-col px-4 py-8 justify-center  text-white items-center hover:bg-primary-400 ease-in-out transition-all duration-200 cursor-pointer">
										<h1 className="font-semibold tracking-wide text-base pb-2">Create new form</h1>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 currentColor" viewBox="0 0 20 20" fill="currentColor">
											<path
												fillRule="evenodd"
												d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									{/* DOCUMENT CREATED BY USER */}
									<div className="bg-gray-50 rounded-md w-48 h-48 flex flex-col px-4 py-8 justify-between border-2 cursor-pointer hover:border-primary-500 ease-in-out transition-all duration-200">
										<div>
											<h1 className="font-semibold text-gray-800 tracking-wide text-base">Lukas Form v1</h1>
											<h4 className="text-gray-500 text-sm pt-4">Created 11.07.21 11:00pm</h4>
										</div>

										<div className="flex items-end justify-end text-gray-400 hover:text-red-500 ">
											<svg
												id={'x'}
												onClick={() => openDeleteWidget('xx', 'lukas doc')}
												className="w-6 h-6 cursor-pointer"
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
									{/* {documents.map((i: Document) => {
										return (
											<div
												key={i._id}
												className="w-48 h-64 shadow-md rounded-md border-2 flex-col justify-evenly relative inline-flex
										hover:border-gray-400 hover:border-2 focus:outline-none
										focus:ring-2 focus:ring-teal-600
										transition-all ease-in-out duration-200 px-4"
											>
												<span className="flex absolute h-5 w-20 top-0 right-0 ">
													<div
														className={`relative inline-flex rounded-md bg-${outputTypeColor(i.outputType)}-300 text-${outputTypeColor(
															i.outputType,
														)}-800 font-base text-xs w-full h-full justify-center`}
													>
														{sliceStrings(i)}
													</div>
												</span>
												<div onClick={() => openDocument(i._id)} className="cursor-pointer justify-evenly flex flex-col h-3/4">
													<h1 className="w-full text-lg trackin-wide truncate">{i.title}</h1>
													<p className=" text-sm font-thin truncate">{i.generatedOutput}</p>
												</div>

												<div className="flex items-end justify-end text-gray-400 hover:text-red-500 ">
													<svg
														id={i._id}
														onClick={() => openDeleteWidget(i._id, i.title)}
														className="w-6 h-6 cursor-pointer"
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
									})} */}
								</div>
							</section>
						</>
					)}

					{redirect && <Redirect to={`/document/${selectedDocId}`} />}
				</section>
			</DocsContext.Provider>
		</>
	);
};

export default Forms;
