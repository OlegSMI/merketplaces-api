import { DeleteForever } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { hideProductById, approveProductById } from "@api/operator/useChinaAPI";
import styles from "./Table.module.scss";

const AnalogRow = ({ item }) => {
  const [rowStatus, setRowStatus] = useState(item.status);

  const navigate = useNavigate();

  const approveHandler = (itemId) => {
    setRowStatus("APPROVED");
    approveProductById(itemId);
  };

  const hideHandler = (itemId) => {
    setRowStatus("DELETED");
    hideProductById(itemId);
  };

  const handleClickRow = () => {
    // navigate("/admin/prodinfo", { state: { id: item.id } });
    navigate("/admin/prodinfo", { state: { data: item, sourse: "china" } });
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "none" } }}
        className={`${styles[rowStatus.toLowerCase()]}`}
      >
        <Tooltip title="Посмотреть товар 1688" placement="left-start">
          <TableCell
            sx={{
              display: "flex",
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={() => handleClickRow()}
          >
            <Avatar alt="Remy Sharp" src="" variant="square" sx={{ mr: 1 }} />
            {item.title}
          </TableCell>
        </Tooltip>
        <TableCell align="center">{item.priceInfo.origin_price}</TableCell>
        <TableCell align="center">{item.shopInfo.company_name}</TableCell>
        <TableCell align="center">{item.productUrl}</TableCell>

        <TableCell align="center">
          <span className={`${styles.status} `}>{rowStatus}</span>
        </TableCell>
        <TableCell align="center" sx={{ display: "flex" }}>
          <Tooltip title="Подтвердить">
            <IconButton onClick={() => approveHandler(item.id)}>
              <CheckCircleIcon color="success" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Не отображать">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => hideHandler(item.id)}
            >
              <DeleteForever color="red" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AnalogRow.propTypes = {
  item: PropTypes.shape({
    // avatar: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    priceInfo: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    productUrl: PropTypes.number.isRequired,
    shopInfo: PropTypes.string.isRequired,
    // rating: PropTypes.number.isRequired,
    // market: PropTypes.string.isRequired,
    // sales: PropTypes.number.isRequired,
    // revenue: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnalogRow;
