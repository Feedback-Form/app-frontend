import React, { FC, ReactElement } from 'react';
import { useLottie } from 'lottie-react';
import docAnimation from '../assets/docAnimation.json';

type UploadingProps = { message: string };

const Uploading = ({ message }: UploadingProps): ReactElement => {
	const options = {
		animationData: docAnimation,
		loop: true,
		autoplay: true,
	};
	const { View } = useLottie(options);
	return (
		<div className="flex w-3/4 h-3/4 items-center justify-center text-center">
			<div className="w-full ">
				<div className="w-full md:w-1/2 xl:w-1/4 mx-auto">{View}</div>

				<h1 className="text-2xl text-gray-800 font-medium">{message}</h1>
			</div>
		</div>
	);
};

export default Uploading;
