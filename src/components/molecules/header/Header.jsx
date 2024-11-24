import React, { useEffect, useState } from 'react'
import CharacterIcon from '../../atoms/character-icon/CharacterIcon'
import LogoMain from '../../../assets/icons/logo_main.svg';

const Header = () => {

	const [charName, setCharName] = useState(null);
	
	useEffect(() => {
		if(localStorage.getItem('username')) {
			setCharName(localStorage.getItem('username'));
		}
	}, [])
	

  return (
	<section className='flex justify-between p-5'>
		<img className='w-full max-w-[142px] h-auto object-contain' src={LogoMain} alt="logo_main" />
		<CharacterIcon string={charName} />
	</section>
  )
}

export default Header