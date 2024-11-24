import React from 'react';
import ImageChat1 from '../../../assets/chat_image_1.png';
import ImageChat2 from '../../../assets/chat_image_2.png';
import ImageChat3 from '../../../assets/chat_image_3.png';

const StackImages = () => {
  return (
	<section className='hidden md:flex flex-col md:flex-row gap-5 justify-evenly py-10'>
		<article>
			<img className='w-full md:w-full h-auto object-contain' src={ImageChat1} alt="image_chat_1" />
		</article>
		<article>
			<img className='w-full md:w-full h-auto object-contain' src={ImageChat2} alt="image_chat_2" />
		</article>
		<article>
			<img className='w-full md:w-full h-auto object-contain' src={ImageChat3} alt="image_chat_3" />
		</article>
	</section>
  )
}

export default StackImages