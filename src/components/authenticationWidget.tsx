import React, { ReactElement, FC } from 'react';
import { useLottie } from 'lottie-react';
import docAnimation from '../lottie/docAnimation.json';

const AuthenticationWidget: FC = (): ReactElement => {
	const options = {
		animationData: docAnimation,
		loop: true,
		autoplay: true,
	};
	const { View } = useLottie(options);
	return (
		<section className="absolute h-full w-full bg-white">
			<div className="flex justify-center h-full w-full items-center">
				<div className="w-3/4 md:w-1/3 xl:w-1/4  rounded-md px-10 py-8  text-center">
					<div>{View}</div>
					<h1 className="text-2xl text-gray-800 font-medium">
						Getting account information.
					</h1>
				</div>
			</div>
		</section>
	);
};

export default AuthenticationWidget;
