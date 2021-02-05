import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//hooks
import { useWordState } from '../hooks/hooks';
import { DocsContext } from '../hooks/contexts/docsContext';
//components
import DeleteWidget from './deletewidget';
import Uploading from './uploading';
import LoadingWidget from './loadingWidget';

//const
const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';

type Document = {
	_id: string;
	title: string;
	gptThreeSummary: string;
	createdAt: string;
};

const Documents: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);
	const [documents, setDocuments] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [selectedDocId, setSelectedDocId] = useState('');
	const [isDeleteRequest, setDeleteRequest] = useState(false);
	const [docName, setDocName] = useState('');
	const [docId, setDocId] = useState('');
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	function openDeleteWidget(id: string, title: string): void {
		setDocName(title);
		setDocId(id);
		setDeleteRequest(true);

		console.log('DOC STATE NAME', docName);
		// setIsLoadingTwo(true);
		// axios
		// 	.delete(`${backend_url}/document/delete/${id}`, config)
		// 	.then((res: any) => {
		// 		console.log('succes', res);
		// 		setIsLoadingTwo(false);
		// 	})
		// 	.catch((err: any) => {
		// 		console.log('err', err);
		// 		setIsLoadingTwo(false);
		// 	});
	}

	//get documents
	useEffect(() => {
		axios
			.get(`${backend_url}/documents`, config)
			.then((res: any) => {
				setDocuments(res.data);
				setIsLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setIsLoading(false);
			});
	}, [isLoadingTwo, isDeleteRequest]);

	// const docs = [];
	// for (let i = 0; i < 1; i++) {
	// 	docs.push(`My Document_${i}`);
	// }
	//console.log('docs', docs);

	function openDocument(id: string): void {
		setSelectedDocId(id);
		setRedirect(true);
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
				<section className="flex-shrink flex flex-col items-center justify-center h-3/4 w-full space-y-10 bg-white text-gray-900">
					{isLoadingTwo && <LoadingWidget />}

					{isLoading ? (
						<Uploading message="fetching documents..." />
					) : (
						<>
							<div className="flex items-end w-3/4 ">
								<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Documents</h1>
							</div>
							<section className="flex xs:grid grid-cols-4 flex-wrap w-3/4 xl:w-1/2 h-3/4 gap-4">
								{documents.map((i: Document) => {
									return (
										<div
											key={i._id}
											className="w-48 h-64 shadow-md rounded-md  border-2 flex flex-col justify-evenly
										hover:border-indigo-400 hover:border-2 focus:outline-none
										focus:ring-2 focus:ring-indigo-500
										transition-all ease-in-out duration-200 px-4"
										>
											<div onClick={() => openDocument(i._id)} className="cursor-pointer justify-evenly flex flex-col h-3/4">
												<h1 className="w-full">{i.title}</h1>
												<p className=" text-sm font-thin truncate">{i.gptThreeSummary}</p>
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
