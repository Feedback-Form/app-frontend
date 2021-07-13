import React, { ReactElement } from 'react';
import { ButtonProps } from './buttonInterface';
const Button = ({ label, clickHandlerFunction, isDisabled }: ButtonProps): ReactElement => {
	return (
		<button
			onClick={clickHandlerFunction}
			disabled={isDisabled}
			type="button"
			// disabled={isLoading}
			className="w-64 rounded-lg bg-primary-500 hover:bg-primary-400 focus:bg-primary-400  focus:outline-none text-white py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50
"
		>
			{label}
		</button>
	);
};
export default Button;
