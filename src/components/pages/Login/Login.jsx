import React, { useEffect } from 'react';
import LogoMain from '../../../assets/icons/logo_main.svg';
import ImgRobotLogin from '../../../assets/robot_login_lifemiles.svg';
import { stringProject } from '../../../utils/stringProject';
import { customColors } from '../../../custom/custom-colors';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const {
		WELCOME_LOGIN_TEXT,
		WELCOME_TEXT_LOGIN_DESC
	} = stringProject;

	const navigate = useNavigate();
  
	useEffect(() => {
	  const isAuthenticated = localStorage.getItem("accessToken");
	  
	  if (isAuthenticated) {
		navigate("/chat");
	  }
	}, [navigate]);

  return (
	<section className='grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-screen'>
		<article className='p-8 relative hidden md:block'>
			<img src={LogoMain} alt="logo_main" />
			<img className='absolute top-[50%] translate-y-[-50%] -right-7 z-10' src={ImgRobotLogin} alt="login_robot_lifemiles" />
		</article>
		
		<article className='relative' style={{
			backgroundColor: customColors.background_login
		}} >
			<div className='flex md:hidden my-8 flex-1 justify-center'>
				<img className='w-full max-w-[142px] h-auto object-contain' src={LogoMain} alt="logo_main" />
			</div>
			<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full px-20'>
				<h2 className='text-[26px] font-[600] text-center md:text-left'>{WELCOME_LOGIN_TEXT}</h2>
				<h4 className='text-[21px] leading-6 md:leading-7 -mt-2 text-center md:text-left'>{WELCOME_TEXT_LOGIN_DESC}</h4>
				<LoginForm />
			</div>
		</article>
	</section>
  )
}

export default Login