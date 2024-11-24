import React, { useRef, useState } from 'react'
import { stringProject } from '../../../utils/stringProject'
import Button from '../../atoms/button/Button';

import ClipImage from '../../../assets/icons/clip_icon.svg';
import SendIcon from '../../../assets/icons/send_icon.svg';
import ClearIcon from '../../../assets/icons/clear_icon.svg';
import { customColors } from '../../../custom/custom-colors';

const ChatModule = () => {

	const {
	CHAT_TEXT_INIT,
	CHAT_INPUT_PLACEHOLDER,
	CHAT_OPTION_1_HELP,
	CHAT_OPTION_2_HELP,
	PDF_ONLY_TEXT,
	} = stringProject;

	const fileRef = useRef(null);
	const [fileName, setFileName] = useState("");

	const GetInputFile = () => {
		const files = Array.from(fileRef.current.files);
		if(files[0].type !== 'application/pdf'){
			setFileName("");
			alert(PDF_ONLY_TEXT);
		}
		setFileName(files[0].name);
		console.log("files:", files[0]);

	}

	const clearFileInput = () => {
		setFileName(""); 
		fileRef.current.value = ""; 
	}

  return (
	<section className='flex flex-col justify-center px-5 md:px-20 gap-3'>
		<h4 className='text-center'>{CHAT_TEXT_INIT}</h4>
		<div className='relative'>
			<input
				className="input-primary shadow-lg max-w-full w-full outline-none pr-20"
				id="chat_input"
				placeholder={CHAT_INPUT_PLACEHOLDER}
				type="text"
			/>
			{fileName && 
			(<div style={{
				backgroundColor: customColors.button_primary_color
			}} className='max-w-[150px] sm:max-w-full absolute top-[50%] translate-y-[-50%] rounded-xl text-sm text-white left-2 py-1 px-4'>
				<div className='flex gap-2'>
					<span className='max-w-[150px] sm:max-w-full text-ellipsis overflow-hidden sm:text-wrap sm:overflow-auto sm:w-full'>{fileName}</span>
					<button onClick={clearFileInput} type='button'>
						<img src={ClearIcon} alt="clear_icon" />
					</button>
				</div>
			</div>)
			}
			<div className='flex gap-1 absolute top-[50%] translate-y-[-50%] right-5'>
				<label for="upload">
					<img className='w-full max-w-[28px] object-contain cursor-pointer' src={ClipImage} alt="clip_image" />
					<input ref={fileRef} onChange={GetInputFile} accept="application/pdf" type="file" id="upload" className='hidden' />
				</label>
				<button type='button'>
					<img className='w-full max-w-[28px] object-contain' src={SendIcon} alt="send_icon" />
				</button>
			</div>
			
		</div>
		<div className='flex flex-col md:flex-row gap-3'>
			<Button classNames={"bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"} title={CHAT_OPTION_1_HELP} type="button" />
			<Button classNames={"bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"} title={CHAT_OPTION_2_HELP} type="button" />
		</div>
	</section>
  )
}

export default ChatModule