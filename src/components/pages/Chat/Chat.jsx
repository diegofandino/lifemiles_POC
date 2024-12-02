import React, { useEffect, useState } from 'react'
import { customColors } from '../../../custom/custom-colors'
import Header from '../../molecules/header/Header'
import StackImages from '../../molecules/stack-images/StackImages'
import ChatModule from '../../organisms/chat-module/ChatModule'

const Chat = () => {

	const [hideImages, setHideImages] = useState(false);
	
  return (
	<div className='min-h-screen' style={{
		backgroundColor: customColors.background_login,
	}}>
		<Header />
		<section className='content-center h-screen -mt-[72px] overflow-y-auto'>
			{!hideImages && <StackImages />}
			<ChatModule setHideImages={setHideImages} />
		</section>
	</div>
  )
}

export default Chat