import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

import styles from "./Table.module.scss";

const AnalogRow = ({ item }) => {
  const navigate = useNavigate();
  const statusClasses = {
    0: styles.status0,
    1: styles.status1,
    2: styles.status2,
  };

  const handleClickRow = () => {
    navigate("/user/prodinfo", { state: { data: item } });
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "none" } }}
        onClick={() => handleClickRow()}
      >
        <TableCell align="center">
          <Stack alignItems="center">
            <Avatar alt="Remy Sharp" src="" />
          </Stack>
        </TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">
          <span
            className={`${styles.status} ${statusClasses[item.status.code]}`}
          >
            {item.status.text}
          </span>
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>
        <TableCell align="center">
          <Stack alignItems="center">
            <Rating
              name="half-rating-read"
              defaultValue={item.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </TableCell>
        <TableCell align="center">{item.market}</TableCell>
        <TableCell align="center">{item.sales}</TableCell>
        <TableCell align="center">{item.revenue}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AnalogRow.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    market: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnalogRow;
