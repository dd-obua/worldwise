import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = function ({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles[type]} ${styles.btn}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
