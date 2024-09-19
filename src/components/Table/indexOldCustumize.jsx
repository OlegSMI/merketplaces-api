// import * as React from "react";

// import { CompactTable } from "@table-library/react-table-library/compact";
// import { useTheme } from "@table-library/react-table-library/theme";

// const nodes = [
//   {
//     id: "0",
//     name: "Shopping List",
//     deadline: new Date(2020, 1, 15),
//     type: "TASK",
//     isComplete: true,
//     nodes: 3,
//   },
//   {
//     id: "1",
//     name: "Shopping List",
//     deadline: new Date(2020, 1, 15),
//     type: "TASK",
//     isComplete: true,
//     nodes: 3,
//   },
// ];

// const Component = () => {
//   const data = { nodes };

//   const theme = useTheme({
//     HeaderRow: `
//         .th {
//           border-bottom: 1px solid #a0a8ae;
//           color: red;
//           background-color: green;
//         }

//       `,
//     BaseCell: `
//         margin: 9px;
//         padding: 11px;
//       `,
//     Cell: `
//         &:not(:last-of-type) {
//           border-right: 1px solid #a0a8ae;
//         }
//       `,
//   });

//   const [ids, setIds] = React.useState([]);

//   const handleExpand = (event, item) => {
//     console.log(event);
//     console.log(item);
//     if (ids.includes(item.id)) {
//       setIds(ids.filter((id) => id !== item.id));
//     } else {
//       setIds(ids.concat(item.id));
//     }
//   };

//   const COLUMNS = [
//     { label: "Task", renderCell: (item) => item.name },
//     {
//       label: "Deadline",
//       renderCell: (item) =>
//         item.deadline.toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//         }),
//     },
//     { label: "Type", renderCell: (item) => item.type },
//     {
//       label: "Complete",
//       renderCell: (item) => item.isComplete.toString(),
//     },
//     { label: "Tasks", renderCell: (item) => item.nodes?.length },
//   ];

//   const ROW_PROPS = {
//     onClick: (event) => handleExpand(event),
//   };

//   const ROW_OPTIONS = {
//     renderAfterRow: (item) => (
//       <>
//         {ids.includes(item.id) && (
//           <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
//             <td style={{ flex: "1" }}>
//               <ul
//                 style={{
//                   margin: "0",
//                   padding: "0",
//                   backgroundColor: "#e0e0e0",
//                 }}
//               >
//                 <li>
//                   <strong>Name:</strong> {item.name.toUpperCase()}
//                 </li>
//                 <li>
//                   <strong>Deadline:</strong>{" "}
//                   {item.deadline.toLocaleDateString("en-US")}
//                 </li>
//                 <li>
//                   <strong>Type:</strong> {item.type}
//                 </li>
//                 <li>
//                   <strong>Complete:</strong> {item.isComplete.toString()}
//                 </li>
//               </ul>
//             </td>
//           </tr>
//         )}
//       </>
//     ),
//   };

//   return (
//     <>
//       <CompactTable
//         columns={COLUMNS}
//         rowProps={ROW_PROPS}
//         rowOptions={ROW_OPTIONS}
//         data={data}
//         theme={theme}
//       />
//     </>
//   );
// };

// export default Component;

import { SparkLineChart } from "@mui/x-charts";
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import "./table.scss";

const THEME = {
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    background-color: #eaf5fd;
  `,
  // Row: `
  //   &:nth-child(odd) {
  //     background-color: #d2e9fb;
  //   }

  //   &:nth-child(even) {
  //     background-color: #eaf5fd;
  //   }
  // `,
};

const list = [
  {
    id: "1",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
  },
  {
    id: "2",
    name: "JavaScript",
    deadline: new Date(2020, 2, 28),
    type: "LEARN",
    isComplete: true,
  },
  {
    id: "3",
    name: "React",
    deadline: new Date(2020, 3, 8),
    type: "LEARN",
    isComplete: false,
  },
];

const App = () => {
  const data = { nodes: list };
  const theme = useTheme(THEME);

  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Task</HeaderCell>
              <HeaderCell>Deadline</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell className="loserok">{item.name}</Cell>
                <Cell>
                  {item.deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Cell>
                <Cell>
                  <SparkLineChart
                    data={[1, 4, 2, 5, 7, 2, 4, 6]}
                    height={100}
                    plotType="bar"
                  />
                </Cell>
                <Cell>
                  <div className="rumerok">
                    <div
                      className={`circle ${item.isComplete ? "green" : "red"}`}
                    ></div>
                    <span> {item.type}</span>
                  </div>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default App;
