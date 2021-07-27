import React, { FC, ReactElement, useState, useEffect } from 'react';

//components
import Sidebar from '../components/sidebar/sideBar';
import AuthenticationWidget from '../components/authenticationWidget';
import LoadingWidget from '../components/loadingWidget';
import Button from '../components/button/button';
//hooks
import { useUserData } from '../hooks/contexts/userContext';
import { useWordState } from '../hooks/hooks';

//services
import { editUser } from '../services/userService';

const ProfilePage: FC = (): ReactElement => {
	const { isAuthenticating, userObject, token } = useUserData();
	const [isLoading, setIsLoading] = useState(false);
	const [description, handleDescriptionChange, setDescription, resetDescription] = useWordState('');
	const [responseString, setResponseString] = useState('');
	const [responseType, setResponseType] = useState<'error' | 'success' | ''>('');

	const editUser_ = async () => {
		try {
			setIsLoading(true);
			const response = await editUser(token, { productServiceDescription: description });

			setResponseString(response.message);
			setResponseType('success');
			setIsLoading(false);
			setTimeout(() => {
				setResponseType('');
			}, 5000);
		} catch (err) {
			setResponseString('Oops, something went wrong.');
			setResponseType('error');
			setIsLoading(false);
			setTimeout(() => {
				setResponseType('');
			}, 5000);
		}
	};

	useEffect(() => {
		setDescription(userObject.productServiceDescription);
	}, [isAuthenticating]);

	return (
		<>
			{isAuthenticating ? (
				<AuthenticationWidget />
			) : (
				<section className="flex overflow-hidden font-scrptai">
					<Sidebar />
					{isLoading && <LoadingWidget />}
					<section className="w-full flex flex-col items-center justify-center  bg-gray-50 text-gray-900 ">
						<section className="flex flex-col w-3/4 h-4/5 justify-center">
							<div className="w-3/4">
								<h1 className="tracking-wide text-2xl text-gray-900 font-medium pb-4">Edit Company/Product description</h1>
								<p className="text-gray-600">
									Add a product or company description helps the AI to generate better feedback suggestions for your customers.
								</p>
							</div>
							<div className="py-10">
								<textarea
									value={description}
									onChange={e => {
										handleDescriptionChange(e);
									}}
									placeholder="Type your question here"
									disabled={isLoading}
									className={`bg-white text-md h-64 text-gray-800 font-base tracking-wide ring-2 rounded-lg px-2 py-3 ring-gray-100 w-full
focus:outline-none hover:ring-primary-400 focus:ring-primary-400 transition-all ease-in-out duration-100 resize-none 
					${isLoading && 'bg-gray-50 cursor-not-allowed'} disabled:animate-pulse
				`}
								/>
							</div>

							<Button
								label={'save'}
								clickHandlerFunction={() => {
									editUser_();
								}}
								isDisabled={isLoading}
							/>
							{responseType !== '' && (
								<div className={`pt-4 ${responseType === 'success' ? 'text-green-500' : 'text-red-500'} font-medium`}>{responseString}</div>
							)}
						</section>
					</section>
				</section>
			)}
		</>
	);
};
export default ProfilePage;
