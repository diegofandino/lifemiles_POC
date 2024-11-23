import React from "react";
import Button from "../../atoms/button/Button";
import { stringProject } from "../../../utils/stringProject";
import { useForm } from "react-hook-form";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import { CHAT } from "../../../router/paths/Paths";

const LoginForm = () => {
  const {
    BUTTON_LOGIN,
    LOGIN_FORM_USERNAME,
    LOGIN_FORM_USERNAME_PLACEHOLDER,
    LOGIN_FORM_PASSWORD,
    LOGIN_FORM_PASSWORD_PLACEHOLDER,
	REQUIRED_FIELD,
  } = stringProject;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
	const { username_login, password_login } = data;
	const saltRounds = 10;
	localStorage.setItem('username', username_login);
	localStorage.setItem('accessToken', bcrypt.hashSync(password_login, saltRounds));
	navigate(CHAT);
  };

  return (
    <form className="flex flex-col gap-6 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <article>
        <label className="flex flex-col" htmlFor="username_login">
          <span className="text-text_base text_base">{LOGIN_FORM_USERNAME}</span>
          <input
		  className="input-primary"
            id="username_login"
            placeholder={LOGIN_FORM_USERNAME_PLACEHOLDER}
            {...register("username_login", { required: true })}
          />
		   {errors.username_login && <span className="text-red-600">{REQUIRED_FIELD}</span>}
        </label>
      </article>

      <article>
        <label className="flex flex-col" htmlFor="password_login">
          <span className="text-text_base text_base">{LOGIN_FORM_PASSWORD}</span>
          <input
		        className="input-primary w-full"
            id="password_login"
            placeholder={LOGIN_FORM_PASSWORD_PLACEHOLDER}
            type="password"
            {...register("password_login", { required: true })}
          />
        </label>
        {errors.password_login && <span className="text-red-600">{REQUIRED_FIELD}</span>}
      </article>

      <Button classNames={"bg-[#3366CC] w-full md:max-w-[224px] text-white py-[8px] px-8 rounded-[100px]"} title={BUTTON_LOGIN} type="submit" />
    </form>
  );
};

export default LoginForm;
