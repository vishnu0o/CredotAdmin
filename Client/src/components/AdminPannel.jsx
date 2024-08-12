import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  Grid,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
// import Table from "./ReusableComponent/Table";
import TableData from "./ReusableComponent/Table";
import { SubmitButton } from "./ReusableComponent/Button";
import Dialogue from "./ReusableComponent/Dialogue";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
} from "../Redux/Constants/ProductConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductFindAction } from "../Redux/Action/productAction";
import { orderFindAction } from "../Redux/Action/orderAction";

const drawerWidth = 240;

function AdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productManagment, setProductManagment] = useState(false);
  const [orderManagment, setOrderManagment] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // Product create popUp
  // Reducer Create Product:::::::::::::::

  let { productCreateSuccess, productCreateErr } = useSelector((state) => {
    return state.productCreate;
  });

  // Reducer for Find Products

  let { productFindSuccess, productFindErr } = useSelector((state) => {
    return state.productFind;
  });

  // Update reducer

  let { productUpdateSuccess, productUpdateErr } = useSelector((state) => {
    return state.productUpdate;
  });

  // StatusChange reducer

  let { productStatusChangeSuccess, productStatusChangeErr } = useSelector(
    (state) => {
      return state.productStatusChange;
    }
  );

  // orderFind reducer

  let { orderFindSuccess } = useSelector((state) => {
    return state.orderFind;
  });

  // orderStatusChange reducer

  let { orderStatusChangeSuccess } = useSelector((state) => {
    return state.orderStatusChange;
  });

  // Success popup for Creating product:::::::::::::::::::::::

  useEffect(() => {
    if (productCreateSuccess) {
      toast.success(productCreateSuccess.message);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: false });
    }
    if (productUpdateSuccess) {
      toast.success(productUpdateSuccess.message);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: false });
    }
  }, [dispatch, productCreateSuccess, productUpdateSuccess]);

  // useEffect for find All products:::::::::::::::::::::::::::::

  useEffect(() => {
    dispatch(ProductFindAction());
    dispatch(orderFindAction());
  }, [
    dispatch,
    productCreateSuccess,
    productUpdateSuccess,
    productStatusChangeSuccess,
    orderStatusChangeSuccess,
  ]);

  // Handle submit for logout:::::::::::::::::::::::::::::::::::

  const handleLoginSubmit = () => {
    // Remove the login information from local storage
    localStorage.removeItem("loginInfo");
    navigate("/login");
  };

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (!isUserExist) {
      navigate("/login");
    }
  }, [isUserExist]);

  // UseEffect for Add data from all products api into State

  useEffect(() => {
    if (productFindSuccess) {
      setData(productFindSuccess?.data);
    }
    if (orderFindSuccess) {
      setOrderData(orderFindSuccess?.data);
    }
  }, [productFindSuccess, productCreateSuccess]);

  const columns = [
    {
      title: "Sl no",
      field: "sl",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Price",
      field: "Price",
    },
    {
      title: "Description",
      field: "Description",
    },

    {
      title: "Category",
      field: "Category",
    },
    {
      title: "Status",
      field: "Status",
    },
    {
      title: "Action",
      field: "action",
    },
  ];
  const orderTablecolumns = [
    {
      title: "Sl no",
      field: "sl",
    },
    {
      title: "Orderid",
      field: "Orderid",
    },
    {
      title: "Productname",
      field: "Productname",
    },
    {
      title: "Price",
      field: "Price",
    },

    {
      title: "Quantity",
      field: "Quantity",
    },
    {
      title: "Subtotal",
      field: "Subtotal",
    },
    {
      title: "Status",
      field: "Status",
    },
  ];

  console.log(open, "openopenopenopenopenopen");

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Admin Panel
              </Typography>
            </Toolbar>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setProductManagment(false)}
                  primary="Dashboard"
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    setProductManagment(true);
                    setOrderManagment(false);
                  }}
                  primary="Product Management"
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    setOrderManagment(true);
                    setProductManagment(false);
                  }}
                  primary="Order Management"
                />
              </ListItem>
              {/* Add more menu items here */}
            </List>
          </Box>

          {/* Logout button at the bottom */}
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLoginSubmit}
            >
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>
            Welcome to the Product Management section.
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 2,
            }}
          >
            {productManagment && (
              <SubmitButton
                title={"Create Product"}
                type="click"
                handleSubmit={() => setOpen(true)}
              />
            )}
          </Grid>
          {productManagment && <TableData data={data} columns={columns} />}
          {orderManagment && (
            <TableData
              data={orderData}
              columns={orderTablecolumns}
              componet="OrderTable"
            />
          )}
        </Box>
      </Box>

      {open && <Dialogue open={open} handleClose={() => setOpen(false)} />}
    </>
  );
}

export default AdminPanel;
