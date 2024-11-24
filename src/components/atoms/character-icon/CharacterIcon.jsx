import React, { useEffect, useState } from 'react'
import { customColors } from '../../../custom/custom-colors';

const CharacterIcon = ({ string }) => {

	const [character, setCharacter] = useState(null);

	useEffect(() => {
		const convertString = (string) => {
			const char = string.charAt(0).toUpperCase();
			setCharacter(char);
		}

		if (string) convertString(string);

	}, [string]);

  return (
	<div style={{
		backgroundColor: customColors.background_iconChar,
	}} className='rounded-full w-[32px] h-[32px] flex justify-center items-center text-bold text-white'>
		{character}
	</div>
  )
}

export default CharacterIcon