import React, { ReactElement } from 'react';
import axios from 'axios';
// type DeleteWidgetProps = { docName: string; docId: string };
import { useDocsContext } from '../hooks/contexts/docsContext';

//const
const backend_url = 'http://localhost:5000';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmU0YTRiZmE4OTU5NmYwYjk4NjQiLCJpYXQiOjE2MTIyOTk4NTAsImV4cCI6MTYxNDg5MTg1MH0.oNtSKQOG4fUTGCmc28dM72vc9eAZZrVvcL31XNffO1s';

const DeleteWidget = (): ReactElement => {
	const { docName, docId, setDeleteRequest } = useDocsContext();

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	function deleteDocument(): void {
		//add a loading toggler
		axios
			.delete(`${backend_url}/document/delete/${docId}`, config)
			.then((res: any) => {
				console.log('success', res);
				setDeleteRequest(false);
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	}

	return (
		<section className="absolute h-full w-full ">
			<div className="absolute w-full h-full z-50">
				<div className="flex justify-center h-full w-full items-center">
					<div className="w-3/4 md:w-1/3 xl:w-1/4 bg-white rounded-md px-10 py-8 space-y-6">
						<div className="space-y-2">
							<h1 className="tracking-wide font-semibold text-xl text-gray-900">Delete &quot;{docName}&quot;?</h1>
							<h3 className="text-lg text-gray-800">This action can&apos;t be undone.</h3>
						</div>
						<div className="flex space-x-6 justify-end">
							<button
								onClick={() => setDeleteRequest(false)}
								className="py-2 px-6 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
                        tracking-wide font-medium
                        "
							>
								Cancel
							</button>
							<button
								onClick={() => deleteDocument()}
								className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 
                        focus:outline-none focus:ring-2 focus:ring-red-800 transition-all ease-in-out duration-200
                        tracking-wide font-medium
                        "
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute w-full h-full bg-gray-300 z-0 opacity-50"></div>
		</section>
	);
};

export default DeleteWidget;
