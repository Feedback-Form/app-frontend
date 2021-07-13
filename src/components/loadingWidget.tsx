import React, { FC, ReactElement } from 'react';
import { useLottie } from 'lottie-react';
import loadingDotsAnimation from '../lottie/loadingDotsAnimation.json';

const LoadingWidget: FC = (): ReactElement => {
	const options = {
		animationData: loadingDotsAnimation,
		loop: true,
		autoplay: true,
	};
	const { View } = useLottie(options);
	return (
		<div className="absolute w-32 h-32 z-50 top-0 right-0">
			<div className="pr-2 pt-2 w-3/4 h-3/4 max-w-md">{View}</div>
		</div>
	);
};
export default LoadingWidget;
