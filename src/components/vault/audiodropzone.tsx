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
			.then((res: any) => {
				console.log(res);
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
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Transcribe</h1>
			</div>
			<div
				{...getRootProps()}
				className="cursor-pointer flex w-3/4 h-3/4 shadow-md rounded-md  transition-all ease-in-out duration-200  border-2 border-dashed border-gray-300 p-4 hover:outline-none hover:border-indigo-500 text-center items-center"
			>
				<input
					{...getInputProps()}
					className="w-full h-full rounded-md  tracking-wide
						 transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 
						"
				/>
				{isDragAccept && <p className="text-xl text-green-400 font-medium w-full">Your file will be accepted.</p>}

				{isDragReject && (
					<div className="w-full space-y-1">
						<p className="text-xl text-red-400 font-medium w-full">Wrong file type.</p>
						<p className="text-lg text-gray-600 font-normal w-full">Please upload .MP3, .WAV or .FLAC </p>
					</div>
				)}

				{!isDragActive && (
					<div className="w-full space-y-1">
						<p className="text-xl text-gray-800 font-medium w-full">Drop an audio file here or click to upload</p>
						<p className="text-lg text-gray-600 font-normal w-full">.MP3, .WAV or .FLAC </p>
					</div>
				)}
			</div>
		</>
	);
};

export default AudioDropzone;
