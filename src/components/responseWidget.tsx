import React, { ReactElement } from 'react';

type ResponseParams = {
	success: boolean;
	response: string;
};

const ResponseWidget = ({ success, response }: ResponseParams): ReactElement => {
	return (
		<div className="absolute w-64 h-40 z-50 top-0 right-0 pt-5 ">
			<div className={`p-4  space-y-4 ${success ? 'bg-green-400 text-green-800' : 'bg-red-400 text-red-800'} rounded-l-lg`}>
				{/* <h1 className="text-base font-semibold">{success ? 'Success!' : 'Something went wrong.'}</h1> */}
				<p className="text-base font-medium">{response}</p>
			</div>
		</div>
	);
};
export default ResponseWidget;
