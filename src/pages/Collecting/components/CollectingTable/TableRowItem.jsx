import check from "@assets/table/check.svg";
import deleteIcon from "@assets/table/delete.svg";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import {
  approvedProductById,
  hideProductById,
} from "@api/operator/useGoodsAPI";
// import AnalogTable from "./analogTable";
import styles from "./Table.module.scss";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const TableRowItem = ({ item }) => {
  const [rowStatus, setRowStatus] = useState(item.status);
  const [open, setOpen] = React.useState(false);

  const status = {
    CREATED: "Создан",
    APPROVED: "Подтвержден",
    DELETED: "Удален",
  };

  const handleOpenPanel = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const approveHandler = useCallback((itemId) => {
    setRowStatus("APPROVED");
    approvedProductById(itemId);
  }, []);

  const hideHandler = useCallback((itemId) => {
    setRowStatus("DELETED");
    hideProductById(itemId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow className={`${styles.anima}`}>
          <TableCell align="center">{item.article}</TableCell>
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
                src={item.image}
                variant="square"
                sx={{ mr: 1 }}
              />
              {item.name}
            </div>
          </TableCell>
          <TableCell align="center">{item.category}</TableCell>
          <TableCell align="center">{item.price} ₽</TableCell>
          <TableCell align="center">{item.weight} гр.</TableCell>
          <TableCell className={styles.statusCell}>
            <div
              className={`${styles.statusWrapper} ${
                styles[rowStatus.toLowerCase()]
              }`}
            >
              {status[rowStatus]}
            </div>
          </TableCell>

          <TableCell align="center" sx={{ width: "max-content" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className={styles.expandButton}
                onClick={(e) => handleOpenPanel(e)}
              >
                Товары с 1688
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </button>

              <Tooltip title="Подтвердить">
                <IconButton onClick={() => approveHandler(item.id)}>
                  <img src={check} width={20} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Не отображать">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => hideHandler(item.id)}
                >
                  <img src={deleteIcon} width={20} />
                </IconButton>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              border: "none",
            }}
            colSpan={12}
          >
            {/* <Collapse in={open} timeout="auto" unmountOnExit>
              <AnalogTable product={item.id} />
            </Collapse> */}
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
};

TableRowItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    article: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRowItem;
