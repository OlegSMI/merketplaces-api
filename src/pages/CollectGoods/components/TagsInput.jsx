import { Chip, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styles from "./TagsInput.module.scss";

export default function TagsInput({ ...props }) {
  const { tags, ...other } = props;
  const [selectedItem, setSelectedItem] = React.useState([]);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <React.Fragment>
      {/* <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        selectedItem={selectedItem}
      > */}
      {/* {({ getInputProps }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps(); */}
      {/* return ( */}
      <div className={styles.textFieldWrapper}>
        <TextField
          InputProps={{
            startAdornment: (
              <div className={styles.chipsContainer}>
                {selectedItem.map((item) => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={styles.chip}
                    size="small"
                    onDelete={handleDelete(item)}
                  />
                ))}
              </div>
            ),

            // onBlur,
            // onChange: (event) => {
            //   handleInputChange(event);
            //   onChange(event);
            // },
            // onFocus,
          }}
          className={styles.textField}
          {...other}
          //   {...inputProps}
        />
      </div>
      {/* ); */}
      {/* }} */}
      {/* </Downshift> */}
    </React.Fragment>
  );
}

TagsInput.defaultProps = {
  tags: [],
};

TagsInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};
