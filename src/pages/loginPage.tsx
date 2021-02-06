import React, { ReactElement, FC, useState } from 'react';
import scrptAiLogo from '../images/scrptai_logo.svg';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//hooks
import { useInputState } from '../hooks/hooks';
import { useUserData } from '../hooks/contexts/userContext';
//components
import LoadingWidget from '../components/loadingWidget';

//const
const backend_url = 'http://localhost:5000';

const LoginPage: FC = (): ReactElement => {
	const [email, handleEmailChange, resetEmail] = useInputState('');
	const [password, handlePasswordChange, resetPassword] = useInputState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const { setToken, setJwtReceived } = useUserData();

	function loginUser(email: string, password: string): void {
		setIsLoading(true);
		axios
			.post(`${backend_url}/user/login`, { email, password })
			.then((res: any) => {
				console.log('res', res.data.token);

				// setToken(res.data.token);
				//saves the jwt token to the localstorage

				// localStorage.setItem('auth_token', res.data.token);
				setToken(res.data.token);

				setJwtReceived(true);

				setIsLoading(false);
				setRedirect(true);
			})
			.catch((err: any) => {
				console.log(err);
				setErrorMessage('Unable to login');
				setShowErrorMessage(true);
				setIsLoading(false);
			});
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 font-scrptai">
			{isLoading && <LoadingWidget />}
			{redirect && <Redirect to="/summarize" />}
			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md space-y-6">
				<div className="flex justify-center w-full">
					<img className="w-28 " src={scrptAiLogo} alt="scrpt_ai_logo" />
				</div>

				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
					<div className="px-5 py-7">
						<form autoComplete="on">
							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">E-mail</label>
							<input
								value={email}
								onChange={e => {
									handleEmailChange(e);
								}}
								type="text"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full"
							/>
							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">Password</label>
							<input
								value={password}
								onChange={e => {
									handlePasswordChange(e);
								}}
								type="password"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full"
							/>
							<button
								onClick={() => {
									loginUser(email, password);
									resetEmail();
									resetPassword();
								}}
								disabled={isLoading}
								className="transition-all duration-200 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-600  focus:outline-none  text-white w-full py-3 rounded-lg text-base tracking-wide shadow-sm hover:shadow-md font-medium text-center inline-block disabled:opacity-50"
							>
								<span className="inline-block mr-2">Login</span>
							</button>
						</form>
						{showErrorMessage && (
							<div className="flex space-x-2 items-center text-red-500 pt-2">
								<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								<span>{errorMessage}</span>
							</div>
						)}
					</div>
					<div className="py-5">
						<div className="grid grid-cols-2 gap-1">
							<div className="text-center sm:text-left whitespace-nowrap">
								<button className="transition-all duration-200 ease-in-out mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-4 h-4 inline-block align-text-top"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
										/>
									</svg>
									<span className="inline-block ml-1">Forgot Password</span>
								</button>
							</div>
							<div className="text-center sm:text-right  whitespace-nowrap">
								<button className="transition-all duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-4 h-4 inline-block align-text-bottom	"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<span className="inline-block ml-1">Help</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
