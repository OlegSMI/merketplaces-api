import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";

const Button = ({ title, text, img, onClick }) => {
  return (
    <Tooltip title={title}>
      <button className={styles.button} onClick={onClick}>
        {text}
        {img && <img src={img} alt="image" />}
      </button>
    </Tooltip>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
  onClick: PropTypes.func,
};
