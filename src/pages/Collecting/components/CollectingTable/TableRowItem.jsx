import React, { useCallback } from "react";

import PropTypes from "prop-types";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Avatar, Collapse, TableCell, TableRow } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AnalogTable from "./AnalogTable";
import styles from "./Table.module.scss";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const TableRowItem = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenPanel = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow className={`${styles.anima}`}>
          <TableCell align="center">{item.id}</TableCell>
          <TableCell>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                cursor: "pointer",
              }}
            >
              <Avatar
                alt="Avatar"
                src={item.photoPath}
                variant="square"
                sx={{ mr: 1 }}
              />
              {item.name}
            </div>
          </TableCell>
          <TableCell align="center">
            <a href={item.productUrl} target="_blank">
              {" "}
              {item.productUrl}
            </a>
          </TableCell>
          <TableCell align="center" sx={{ width: "max-content" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <button
                className={styles.expandButton}
                onClick={(e) => handleOpenPanel(e)}
              >
                Товары с 1688
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              padding: 0,
              border: "none",
            }}
            colSpan={7}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <AnalogTable itemId={item.id} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
};

TableRowItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photoPath: PropTypes.string.isRequired,
    productUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRowItem;
