import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//components
import Sidebar from '../components/sidebar/sideBar';
import EditDocument from '../components/editDocument';
import Uploading from '../components/uploading/uploading';
import UserSessionBar from '../components/userSessionBar';
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
	const [inputText, setInputText] = useState('');
	const [generatedOutput, setGeneratedOutput] = useState('');
	const [outputType, setOutputType] = useState('');
	const [outputLanguage, setOutputLanguage] = useState('');

	const { token, userObject } = useUserData();

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
				const inputText = res.data?.inputText;
				const generatedOutputText = res.data?.generatedOutput;
				const outputType = res.data?.outputType;
				const outputLanguage = res.data?.outputLanguage;

				//set props
				setTitle(title);
				setInputText(inputText);
				setGeneratedOutput(generatedOutputText);
				setOutputType(outputType);
				setOutputLanguage(outputLanguage);

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
				docId,
				setTitle,
				setDocId,
				inputText,
				setInputText,
				generatedOutput,
				setGeneratedOutput,
				outputType,
				setOutputType,
				outputLanguage,
				setOutputLanguage,
			}}
		>
			<section className="h-screen w-full flex font-scrptai overflow-y-auto">
				<Sidebar />
				{userObject.userIsTrial === true && <UserSessionBar />}
				{isLoading ? (
					<Uploading message="Getting document" />
				) : (
					<EditDocument />
				)}
			</section>
		</SingleDocContext.Provider>
	);
};
export default SingleDocPage;
