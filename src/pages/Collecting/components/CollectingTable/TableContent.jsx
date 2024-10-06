import { TableBody } from "@mui/material";
import PropTypes from "prop-types";

import TableRowItem from "./TableRowItem";

const TableContent = ({ products, sessionId }) => {
  return (
    <TableBody>
      {products?.map((item) => (
        <TableRowItem key={item.id} item={item} sessionId={sessionId} />
      ))}
    </TableBody>
  );
};

TableContent.propTypes = {
  products: PropTypes.array,
  sessionId: PropTypes.string,
};

export default TableContent;
