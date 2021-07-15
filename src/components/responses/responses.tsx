import React, { FC, ReactElement, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Redirect } from 'react-router-dom';
//hooks
import { useUserData } from '../../hooks/contexts/userContext';
//components
import DeleteWidget from '../delete-widget/deleteWidget';
import LoadingWidget from '../loadingWidget';

//services
import { getForms } from '../../services/appService';

//interfaces

const Responses: FC = (): ReactElement => {
	return (
		<>
			<div></div>
		</>
	);
};

export default Responses;
