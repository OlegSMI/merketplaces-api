import check from "@assets/table/check.svg";
import deleteIcon from "@assets/table/delete.svg";
import ContentLoader from "react-content-loader";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Collapse,
} from "@mui/material";
import AnalogTable from "./AnalogTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import {
  approvedProductById,
  hideProductById,
} from "@api/operator/useGoodsAPI";
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
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* TODO: После отправки запроса и до момента ответа отображаем Loader */}
              <AnalogTable />
              {[...Array(5)].map((item) => (
                <ContentLoader
                  speed={2}
                  width={1100}
                  height={50}
                  viewBox="0 0 850 50"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  key={item}
                >
                  <rect x="1" y="NaN" rx="0" ry="0" width="180" height="NaN" />
                  <rect x="12" y="NaN" rx="0" ry="0" width="131" height="NaN" />
                  <rect x="25" y="5" rx="10" ry="10" width="800" height="30" />
                </ContentLoader>
              ))}
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
