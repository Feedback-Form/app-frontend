import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//hooks
import { DocsContext } from '../../hooks/contexts/docsContext';
import { useUserData } from '../../hooks/contexts/userContext';
//components
import DeleteWidget from '../deleteWidget';
import Uploading from '../uploading/uploading';
import LoadingWidget from '../loadingWidget';
import UserSessionBar from '../userSessionBar';

import { Document } from './document-interface';

const Documents: FC = (): ReactElement => {
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

	function outputTypeColor(outputType: string): string {
		switch (outputType) {
			case 'googleadheadlines':
				return 'purple';
				break;
			case 'googleaddescriptions':
				return 'yellow';
				break;
			case 'headlines':
				return 'lime';
				break;
			case 'facebookheadlines':
				return 'cyan';
				break;
			case 'valuepropositions':
				return 'teal';
				break;
			case 'slogans':
				return 'indigo';
				break;
			case 'productdescriptions':
				return 'rose';
				break;
			case 'productnames':
				return 'emerald';
				break;
			case 'taglines':
				return 'red';
				break;
			case 'articleheadlines':
				return 'blue';
				break;
			case 'articleideas':
				return 'purple';
				break;
			default:
				return 'gray';
				break;
		}
	}
	function sliceStrings(document: Document): string {
		const { outputType } = document;
		switch (outputType) {
			case 'googleadheadlines':
				return 'googlehead';
				break;
			case 'googleaddescriptions':
				return 'googledesc';
				break;
			case 'facebookheadlines':
				return 'facebookhead';
			case 'productdescriptions':
				return 'productdesc';
			case 'articleheadlines':
				return 'articlehead';
			default:
				return outputType;
		}
	}

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

				<section className="flex-shrink flex flex-col items-center justify-center h-full w-full bg-white text-gray-900">
					{isLoadingTwo && <LoadingWidget />}

					{isLoading ? (
						<Uploading message="fetching documents..." />
					) : (
						<>
							<div className="flex flex-col w-3/4 h-1/5 justify-center">
								<h1 className="tracking-wide text-3xl text-gray-900 font-medium pl-20">Documents</h1>
							</div>
							<section className="flex w-3/4 h-4/5 overflow-y-auto pb-10 pl-20">
								{/* <div className="h-1/2 flex gap-6 xs:grid grid-cols-4 flex-wrap"> */}
								<div className="h-1/2 flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 md:gap-6">
									{documents.map((i: Document) => {
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
														className={`relative inline-flex rounded-md  bg-${outputTypeColor(i.outputType)}-300 text-${outputTypeColor(
															i.outputType,
														)}-800   font-base text-xs w-full h-full justify-center`}
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
									})}
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

export default Documents;
