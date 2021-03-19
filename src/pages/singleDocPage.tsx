import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//components
import Sidebar from '../components/sidebar/sideBar';
import EditDocument from '../components/editDocument';
import Uploading from '../components/uploading/uploading';

//hooks
import { SingleDocContext } from '../hooks/contexts/singleDocContext';
import { useUserData } from '../hooks/contexts/userContext';
type ParamType = {
	id: string;
};

const SingleDocPage: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams<ParamType>();

	const [docId, setDocId] = useState(id);

	//singledoc context related
	const [title, setTitle] = useState('');
	const [transcript, setTranscript] = useState('');
	const [gptThreeSummary, setGptThreeSummary] = useState('');

	const { token } = useUserData();

	function getDocument() {
		//config
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.get(`${process.env.REACT_APP_SCRPTAI_BACKEND}/document/${docId}`, config)
			.then((res: any) => {
				//check if the props are there
				const title = res.data?.title || '';
				const transcript = res.data?.transcript;
				const gptThreeSummary = res.data?.gptThreeSummary;

				//set props
				setTitle(title);
				setTranscript(transcript);
				setGptThreeSummary(gptThreeSummary);

				setIsLoading(false);
			})
			.catch((err: any) => {
				console.log('err', err);
				setIsLoading(false);
			});
	}

	//fetching the document if the state is undefined or ''
	useEffect(() => {
		getDocument();
	}, []);
	return (
		<SingleDocContext.Provider
			value={{
				title,
				transcript,
				gptThreeSummary,
				docId,
				setTitle,
				setTranscript,
				setGptThreeSummary,
				setDocId,
			}}
		>
			<section className="h-screen w-full flex font-scrptai overflow-y-auto">
				<Sidebar />
				{isLoading ? (
					<Uploading message="getting document" />
				) : (
					<EditDocument />
				)}
			</section>
		</SingleDocContext.Provider>
	);
};
export default SingleDocPage;
