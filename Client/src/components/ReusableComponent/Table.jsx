import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineEye } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

import Swal from "sweetalert2";
import DialogueEdit from "./DialogueEdit";
import { ProductStatusChangeAction } from "../../Redux/Action/productAction";
import { useDispatch } from "react-redux";
import { orderStatusChangeAction } from "../../Redux/Action/orderAction";

function TableData({ data, columns, componet }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States

  const [selectedRows, setSelectedRows] = useState([]);
  const [status, setStatus] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [leadActionButtonShow, setLeadActionButtonShow] = useState(null);
  const [tableId, setTableId] = useState("");
  const [editData, setEditData] = useState({});

  // HandleStatusChange for product

  const handleStatusChange = (status, id) => {
    console.log(status, id);
    setStatus(status);
    dispatch(ProductStatusChangeAction(status, id));
  };

  // HandleStatusChangeFor Order

  const handleStatusChangeOrder = (status, id) => {
    console.log(status, id);
    setStatus(status);
    dispatch(orderStatusChangeAction(status, id));
  };

  // Create a function to handle selecting all rows:
  const handleSelectAllRows = () => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
    } else {
      let Ids = sortedData.map((item) => item.id);
      setSelectedRows(Ids);
    }
  };

  // Create a function to handle selecting individual rows:
  const handleSelectRow = (rowId) => {
    let updatedSelectedRows;
    if (selectedRows.includes(rowId)) {
      updatedSelectedRows = selectedRows.filter((id) => id !== rowId);
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      updatedSelectedRows = [...selectedRows, rowId];
      setSelectedRows(updatedSelectedRows);
    }
  };

  const leadOpenActionButton = Boolean(leadActionButtonShow);

  const handleClickAction = (event, id, item) => {
    setLeadActionButtonShow(event.currentTarget);
    setTableId(id);
    setEditData(item);
  };

  const handleCloseAction = () => {
    setLeadActionButtonShow(null);
  };

  const CustomSortIcon = ({ direction }) => {
    return direction === "asc" ? (
      <img
        src="/menuIcons/tableUpSort.png"
        className="administratCustomIcon"
        alt="gsl"
        style={{ padding: "15px" }}
      />
    ) : (
      <BiSortAlt2 className="LeadCustomIcon" />
    );
  };

  // sorting table
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const requestSort = (column) => {
    let newSortOrder = "asc";
    if (column === sortBy && sortOrder === "asc") {
      newSortOrder = "desc";
    }

    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  let sortedData = useMemo(() => {
    if (sortBy && data) {
      const sortedItems = [...data].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });

      return sortedItems;
    }

    return data;
  }, [data, sortBy, sortOrder]);

  return (
    <Box>
      <div
        style={{
          overflowX: "auto", // Ensure only the table can scroll horizontally
          width: "100%", // Make sure this matches the container's width
          maxWidth: "100%", // Ensure it doesn't exceed its container
          border: "0px solid #ffff",
        }}
        className="scrollBar"
      >
        <Table className="LeadTable" style={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow className="LeadTableCell">
              <TableCell
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                  padding: "1px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fafafa",
                }}
              >
                <Checkbox
                  checked={selectedRows?.length === sortedData?.length}
                  onChange={handleSelectAllRows}
                  style={{ color: "#f81b82" }}
                />
              </TableCell>
              {columns?.map((column) => {
                if (column.hidden) {
                  return null;
                }
                return (
                  <TableCell
                    key={column.field}
                    className="LeadTableCell LeadCommon"
                    style={{
                      padding: "0 16px",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      fontWeight: "600",
                    }}
                  >
                    <TableSortLabel
                      className="LeadHeaderText"
                      active={column === sortBy}
                      direction={sortOrder}
                      onClick={() => requestSort(column)}
                      IconComponent={
                        column.field !== "action" && CustomSortIcon
                      }
                    >
                      {column.title}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item, indx) => (
              <TableRow className="LeadTable" key={indx}>
                <TableCell
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1, // To ensure it's above other cells
                    backgroundColor: "white", // Adjust as needed
                    padding: "1px",
                    border: "1px solid #ddd",
                  }}
                >
                  <Checkbox
                    checked={selectedRows.includes(indx)}
                    onChange={() => handleSelectRow(indx)}
                    style={{ color: "#f81b82" }}
                  />
                </TableCell>
                <TableCell style={{ padding: "0 16px", whiteSpace: "nowrap" }}>
                  {indx + 1}
                </TableCell>

                <TableCell
                  style={{
                    padding: "0 16px",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {componet == "OrderTable" ? item?.orderId : item.name}
                </TableCell>

                <TableCell style={{ padding: "0 16px", whiteSpace: "nowrap" }}>
                  {componet == "OrderTable" ? item?.ProductName : item?.price}
                </TableCell>

                <TableCell style={{ padding: "0 16px", whiteSpace: "nowrap" }}>
                  {componet == "OrderTable" ? item?.price : item?.descriptioin}
                </TableCell>

                <TableCell style={{ padding: "0 16px", whiteSpace: "nowrap" }}>
                  {componet == "OrderTable" ? item?.count : item?.category}
                </TableCell>

                {componet == "OrderTable" && (
                  <TableCell
                    style={{ padding: "0 16px", whiteSpace: "nowrap" }}
                  >
                    {componet == "OrderTable" ? item?.totalPrice : "-"}
                  </TableCell>
                )}

                {/* <TableCell
                  style={{
                    padding: "0 16px",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {item.status == true ? "Active" : "Inactive"}
                </TableCell> */}
                {componet !== "OrderTable" ? (
                  <TableCell>
                    <FormControl
                      fullWidth
                      sx={{
                        mt: 1,
                        bgcolor: item.status === true ? "#228200" : "#E52900",
                        borderRadius: "8px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& .MuiSelect-icon": {
                          top: "3px",
                        },
                        "&.MuiFormControl-root": {
                          width: "100px",
                        },
                      }}
                    >
                      <InputLabel
                        htmlFor="demo-simple-select-placeholder"
                        style={{
                          transform: "translate(10px, 10px)",
                          pointerEvents: "none",
                          zIndex: 1,
                          transition: "transform 0.25s, font-size 0.25s",
                          margin: "-6px",
                          color: "white",
                          fontWeight: 400,
                          paddingLeft: "10px",
                          border: "none !important",
                        }}
                      >
                        {item.status == true ? "Active" : "Inactive"}
                      </InputLabel>
                      <Select
                        // value={status}
                        onChange={(e) =>
                          handleStatusChange(e.target.value, item._id)
                        }
                        inputProps={{
                          // name: {item.status == true ? "Active":"Inactive"},
                          id: "demo-simple-select-placeholder",
                        }}
                        sx={{
                          position: "absolute",
                          top: "0px",
                          right: "0",
                          "& .MuiSelect-select": {
                            padding: "0",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                ) : (
                  <TableCell>
                    <FormControl
                      fullWidth
                      sx={{
                        mt: 1,
                        bgcolor:
                          item.status === "Accepted" ? "#228200" : "#E52900",
                        borderRadius: "8px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& .MuiSelect-icon": {
                          top: "3px",
                        },
                        "&.MuiFormControl-root": {
                          width: "100px",
                        },
                      }}
                    >
                      <InputLabel
                        htmlFor="demo-simple-select-placeholder"
                        style={{
                          transform: "translate(10px, 10px)",
                          pointerEvents: "none",
                          zIndex: 1,
                          transition: "transform 0.25s, font-size 0.25s",
                          margin: "-6px",
                          color: "white",
                          fontWeight: 400,
                          paddingLeft: "10px",
                          border: "none !important",
                        }}
                      >
                        {item.status}
                      </InputLabel>
                      <Select
                        // value={status}
                        onChange={(e) =>
                          handleStatusChangeOrder(e.target.value, item._id)
                        }
                        inputProps={{
                          // name: {item.status == true ? "Active":"Inactive"},
                          id: "demo-simple-select-placeholder",
                        }}
                        sx={{
                          position: "absolute",
                          top: "0px",
                          right: "0",
                          "& .MuiSelect-select": {
                            padding: "0",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            outline: "none !important",
                            border: "none !important",
                          },
                        }}
                      >
                        <MenuItem value={"Accepted"}>Accepted</MenuItem>
                        <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                )}
                {componet !== "OrderTable" && (
                  <TableCell
                    style={{
                      padding: "0 16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <SlOptionsVertical
                      id="demo-positioned-button"
                      aria-controls={
                        leadOpenActionButton
                          ? "demo-positioned-menu"
                          : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={leadOpenActionButton ? "true" : undefined}
                      onClick={(e) => {
                        handleClickAction(e, item?._id, item);
                      }}
                      variant="outlined"
                      style={{ marginLeft: "10px", color: "#F80B7A" }}
                      sx={{
                        backgroundColor: "#141E3C",
                        size: "10px",
                        padding: 1,
                        margin: 3,
                        color: "#fff",
                        width: "75px",
                        height: "40px",
                      }}
                    />
                    {/* TABLE ACTION MENU START*/}
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      open={leadOpenActionButton}
                      onClose={handleCloseAction}
                      anchorEl={leadActionButtonShow}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      sx={{
                        borderColor: "black",
                        borderRadius: "24px",
                        mt: 1.5,
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <MenuItem>
                          <TbEdit
                            style={{
                              fontSize: "lg",
                              width: "20px",
                              height: "19px",
                            }}
                            onClick={() => setEditProduct(true)}
                            className="icons"
                          />
                        </MenuItem>
                        <MenuItem>
                          <RiDeleteBin6Line
                            onClick={() => {
                              // handleCloseAction();
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                // if (result.isConfirmed) {
                                //   dispatch(
                                //     ieltsCenterManagmentCenterDeleteAction(
                                //       tableId
                                //     )
                                //   );
                                //   Swal.fire(
                                //     "Deleted!",
                                //     "Your file has been deleted!.",
                                //     "success"
                                //   );
                                // }
                              });
                            }}
                            style={{
                              fontSize: "lg",
                              width: "20px",
                              height: "19px",
                            }}
                            className="icons"
                          />
                        </MenuItem>
                      </Box>
                    </Menu>{" "}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter />
        </Table>
      </div>
      {editProduct && (
        <DialogueEdit
          open={open}
          handleClose={() => setEditProduct(false)}
          data={editData}
        />
      )}
    </Box>
  );
}

export default TableData;
