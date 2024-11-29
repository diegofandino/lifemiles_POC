import React, { useEffect, useState } from 'react'
import { customColors } from '../../../custom/custom-colors';

const CharacterIcon = ({ string, classNames, image }) => {

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
	}} className={` ${classNames} rounded-full min-w-[32px] min-h-[32px] w-[32px] h-[32px] flex justify-center items-center text-bold text-white`}>
		{image ? <img className='w-full h-full object-contain' src={image} alt="image_character" /> : character}
	</div>
  )
}

export default CharacterIcon