import React, { ReactElement, FC, useState, useEffect } from 'react';
// import copykatLogoLong from '../images/copykat_logo_long.svg';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
//hooks
import { useInputState } from '../hooks/hooks';
import { useUserData } from '../hooks/contexts/userContext';
//components
import LoadingWidget from '../components/loadingWidget';
import TagManager from 'react-gtm-module';
const SignUpPage: FC = (): ReactElement => {
	const history = useHistory();
	const [email, handleEmailChange, resetEmail] = useInputState('');
	const [password, handlePasswordChange, resetPassword] = useInputState('');
	const [name, handleNameChange, resetName] = useInputState('');
	const [company, handleCompanyChange, resetCompany] = useInputState('');
	const [isLoading, setIsLoading] = useState(false);
	const [responseMessage, setResponseMessage] = useState('');
	const [showResponseMessage, setShowResponseMessage] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const { setToken, setJwtReceived, token, jwtReceived } = useUserData();
	const [isError, setIsError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const tagManagerArgs = {
		gtmId: 'GTM-KPDSD3L',
		dataLayer: {
			event: 'user_signed_up',
		},
	};

	function signUpUser(): void {
		setIsLoading(true);

		const req = {
			name,
			company,
			email,
			password,
		};

		axios
			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/create`, req)
			.then((res: any) => {
				setToken(res.data.token);

				setJwtReceived(true);
				setIsLoading(false);

				setResponseMessage(res.data.message);
				setShowResponseMessage(true);

				//fire signedup event
				TagManager.initialize(tagManagerArgs);
				//history.push('/summarize');
				//setRedirect(true);
			})
			.catch((err: any) => {
				setIsLoading(false);
				setIsError(true);
				setResponseMessage(err.response.data.error.message);
				setShowResponseMessage(true);
			});

		//reset fields
		resetEmail();
		resetPassword();
		resetCompany();
		resetEmail();
		resetName();
	}
	function togglePasswordField(): void {
		if (!showPassword) {
			setShowPassword(true);
		} else {
			setShowPassword(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:py-12 font-scrptai">
			{isLoading && <LoadingWidget />}

			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md space-y-6">
				{/* <img className="w-48 mx-auto" src={copykatLogoLong} alt="copykat_ai_logo" /> */}

				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
					<div className="px-5 py-7">
						<form autoComplete="on">
							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">E-mail*</label>
							<input
								value={email}
								onChange={e => {
									handleEmailChange(e);
								}}
								type="text"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full focus:ring-2 ring-teal-700 focus:outline-none duration-200 ease-in-out transition-all"
							/>

							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">Name*</label>
							<input
								value={name}
								onChange={e => {
									handleNameChange(e);
								}}
								type="text"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full focus:ring-2 ring-teal-700 focus:outline-none duration-200 ease-in-out transition-all"
							/>
							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">Company</label>
							<input
								value={company}
								onChange={e => {
									handleCompanyChange(e);
								}}
								type="text"
								className="border rounded-lg px-3 py-3 mt-1 mb-5 text-base w-full focus:ring-2 ring-teal-700 focus:outline-none duration-200 ease-in-out transition-all"
							/>

							<label className="text-base tracking-wide font-medium text-gray-600 pb-1 block">Password*</label>
							<span className="relative inline-flex w-full">
								<input
									value={password}
									onChange={e => {
										handlePasswordChange(e);
									}}
									type={showPassword ? 'text' : 'password'}
									className="inline-flex border rounded-lg px-3 py-3 text-base w-full focus:ring-2 ring-teal-700 focus:outline-none duration-200 ease-in-out transition-all "
								/>
								<span
									onClick={() => {
										togglePasswordField();
									}}
									className="flex flex-col justify-center absolute right-0 h-full mr-3 text-gray-600 w-6 cursor-pointer transition-all duration-200 ease-in-out"
								>
									{!showPassword ? (
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
											/>
										</svg>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</span>
							</span>
							<button
								onClick={() => {
									signUpUser();
								}}
								disabled={isLoading || email === '' || name === '' || password === '' || password.length < 7}
								type="button"
								className="disabled:cursor-not-allowed transition-all duration-200 bg-teal-700 hover:bg-teal-600 focus:bg-teal-600  focus:outline-none  text-white w-full py-3 rounded-lg text-base tracking-wide shadow-sm hover:shadow-md font-medium text-center inline-block disabled:opacity-50 mt-8 mb-4"
							>
								<span className="inline-block mr-2">Create account</span>
							</button>
						</form>
						<div>
							<span className="text-xs text-gray-700 ">
								By signing up, you agree to CopyKatAI&apos;s{' '}
								<a
									className="text-teal-700 hover:text-teal-600 ease-in-out duration-200 transition-all"
									href="https://www.copykat.ai/terms"
								>
									terms of service
								</a>{' '}
								and
								<a
									className="text-teal-700 hover:text-teal-600 ease-in-out duration-200 transition-all"
									href="https://www.copykat.ai/privacy"
								>
									{' '}
									privacy policy
								</a>
							</span>
						</div>
						{showResponseMessage && (
							<div className={`flex space-x-2 items-center ${isError === true ? 'text-red-500' : 'text-green-500'} pt-2`}>
								<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
					<div className="py-5">
						<div className="grid ">
							<div className="text-center whitespace-wrap">
								<span className="inline-block ml-1 text-wrap">
									<p>Need help?</p>
									<p className="text-gray-700">
										Reach out to
										<a
											className="text-teal-700 hover:text-teal-600 ease-in-out duration-200 transition-all pl-1"
											href={`mailto:${process.env.REACT_APP_MAILTO}`}
										>
											{process.env.REACT_APP_MAILTO}
										</a>
									</p>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
