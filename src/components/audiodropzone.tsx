import React, { FC, ReactElement, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// const audioUpload: FC = (): ReactElement => {
// const [maxWords, setMaxWords] = useState(300);
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE1ZGNiMDBjYzlmNjc2MzMyM2MxYjIiLCJpYXQiOjE2MTIwNDU0ODgsImV4cCI6MTYxNDYzNzQ4OH0.256nsq_HP0YLmYfeLvIugVdq7bEjnKIZRzG-fiDGZcw';
const backend = 'http://localhost:5000/transcribe/audio';
const AudioDropzone: FC = (): ReactElement => {
	const onDrop = (acceptedFile: any) => {
		const formData = new FormData();

		formData.append('audioFile', acceptedFile[0]);
		console.log('acceptedFile', acceptedFile[0]);

		//api call comes here.

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.post(`${backend}`, formData, config)
			.then((response: any) => {
				console.log(response);
			})
			.catch((err: any) => {
				console.log('err', err);
			});
	};
	const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
		accept: 'audio/mpeg, audio/wav, audio/flac',
		maxFiles: 1,
		// application/pdf
		onDrop,
	});

	return (
		<>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Summarize</h1>
			</div>
			<div {...getRootProps()} className="w-3/4 h-3/4 shadow-md rounded-md  ">
				<input
					{...getInputProps()}
					className="w-full h-full rounded-md  tracking-wide
						focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
						"
				/>
				{isDragAccept && <p className="text-base text-gray-900 font-medium">All files will be accepted</p>}

				{isDragReject && <p className="text-base text-gray-900 font-medium">reject</p>}

				{!isDragActive && <p className="text-base text-gray-900 font-medium">drop some files</p>}
			</div>
			<div className="flex justify-between w-3/4 items-center">
				<button className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200">
					Next step
				</button>
			</div>
		</>
	);
};

export default AudioDropzone;
