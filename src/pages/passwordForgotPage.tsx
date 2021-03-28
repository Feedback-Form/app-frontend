import React, { ReactElement, FC, useState, useEffect } from 'react';
import scrptAiLogo from '../images/scrptai_logo.svg';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
//hooks
import { useInputState } from '../hooks/hooks';
import { useUserData } from '../hooks/contexts/userContext';
//components
import LoadingWidget from '../components/loadingWidget';

const PasswordForgotPage: FC = (): ReactElement => {
	const [email, handleEmailChange, resetEmail] = useInputState('');
	const [isLoading, setIsLoading] = useState(false);
	const [responseMessage, setResponserMessage] = useState('');

	const { setToken, setJwtReceived, token, jwtReceived } = useUserData();

	function sendResetPasswordEmail(): void {
		setIsLoading(true);
		axios
			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/password/reset`, {
				email,
			})
			.then((res: any) => {
				setJwtReceived(true);
				setIsLoading(false);
				setResponserMessage('Success, check your inbox.');
			})
			.catch((err: any) => {
				setResponserMessage('Oops, something went wrong.');
				setIsLoading(false);
			});
		resetEmail();
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 font-scrptai">
			{isLoading && <LoadingWidget />}

			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md space-y-6">
				<img className="w-28 mx-auto" src={scrptAiLogo} alt="copykat_ai_logo" />

				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
					<div className="px-5 py-7">
						<form autoComplete="on">
							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">
								E-mail
							</label>
							<input
								value={email}
								onChange={e => {
									handleEmailChange(e);
								}}
								type="text"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full focus:ring-2 ring-teal-700 focus:outline-none duration-200 ease-in-out transition-all"
							/>

							<button
								onClick={() => {
									sendResetPasswordEmail();
								}}
								disabled={isLoading}
								className="transition-all duration-200 bg-teal-700 hover:bg-teal-600 focus:bg-teal-600  focus:outline-none  text-white w-full py-3 rounded-lg text-base tracking-wide shadow-sm hover:shadow-md font-medium text-center inline-block disabled:opacity-50"
							>
								<span className="inline-block mr-2">Send reset email</span>
							</button>
						</form>
						{responseMessage !== '' && (
							<div
								className={`flex space-x-2 items-center  ${
									responseMessage === 'Oops, something went wrong.'
										? 'text-red-500'
										: 'text-green-500'
								} pt-2`}
							>
								<svg
									className="w-5 h-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								<span>{responseMessage}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordForgotPage;
