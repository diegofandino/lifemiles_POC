import React from 'react'
import { customColors } from '../../../custom/custom-colors'
import Header from '../../molecules/header/Header'
import StackImages from '../../molecules/stack-images/StackImages'
import ChatModule from '../../organisms/chat-module/ChatModule'

const Chat = () => {
  return (
	<div className='min-h-screen' style={{
		backgroundColor: customColors.background_login,
	}}>
		<Header />
		<section className='content-center h-screen -mt-[72px]'>
			<StackImages />
			<ChatModule />
		</section>
	</div>
  )
}

export default Chat