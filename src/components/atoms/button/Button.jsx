import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, classNames, type}) => {
  return (
	<button type={type} className={classNames}>
		{title}
	</button>
  )
};

Button.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	classNames: PropTypes.string
};

export default Button