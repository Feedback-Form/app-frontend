import React, { FC, ReactElement, useState, useEffect } from 'react';
//hooks
import { useCharacterState } from '../../hooks/hooks';

//services

//interfaces
import { PersonalDetailFields } from './personalDetailFieldProps';
const PersonalDetailField = ({
	getFieldValue,
	fieldName,
}: PersonalDetailFields): // { question, maxRating }: ResponseSuggestionRequest,

ReactElement => {
	const [field, characterCount, handleFieldChange, setResponse, resetResponse] = useCharacterState('');

	return (
		<div className="flex flex-col space-y-5 ">
			<h3 className="text-xl text-gray-800 font-semibold 	capitalize">{fieldName}</h3>

			<input
				type="text"
				value={field}
				onChange={e => {
					handleFieldChange(e);
					getFieldValue(fieldName, e.target.value);
				}}
				placeholder=""
				className={`bg-white text-md  text-gray-800 font-base tracking-wide ring-2 rounded-lg px-2 py-3 ring-gray-100 w-full
focus:outline-none hover:ring-primary-400 focus:ring-primary-400 transition-all ease-in-out duration-100 resize-none 
			
				`}
			/>
		</div>
	);
};
export default PersonalDetailField;
