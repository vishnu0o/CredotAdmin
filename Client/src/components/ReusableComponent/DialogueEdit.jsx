import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "./Button";
import {
  ProductCreateAction,
  ProductUpdateAction,
} from "../../Redux/Action/productAction";

function DialogueEdit({ handleClose, open, data }) {
  console.log(data, "daataaaaaaaaaaaaaaaaaaaaaaaaa");
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState("paper");
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  };

  const getFileType = (file) => {
    const fileParts = file.name.split(".");
    return fileParts[fileParts.length - 1].toLowerCase();
  };

  const handleCreate = () => {
    dispatch(
      ProductUpdateAction(name, price, category, description, data?._id)
    );
    handleClose();
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPrice(data?.price);
      setDescription(data?.descriptioin);
      setCategory(data?.category);
    }
  }, [data]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            width: "850px",
            marginTop: "4%",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">
          {" "}
          <Typography
            variant="h5"
            sx={{
              mt: "18px",
              fontWeight: 700,
              fontSize: "24px",
              fontFamily: "Montserrat', sans-serif",
            }}
          >
            Edit Product
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              "& input": {
                border: "1px solid #ECECEC",
                padding: "16px",
                width: "100%",
                boxSizing: "border-box",
                color: "#05050F",
                outline: "none !important",
                borderRadius: "4px",
              },
              "& input::placeholder": {
                border: "#ECECEC",
              },
            }}
          >
            <Typography
              sx={{
                color: "#05050F",
                mb: "10px",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Product name
            </Typography>
            <input
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Typography
              sx={{
                color: "#05050F",
                mb: "10px",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Product price
            </Typography>
            <input
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Typography
              sx={{
                color: "#05050F",
                mb: "10px",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Product Category
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Product Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Product category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"sports"}>Sports</MenuItem>
                <MenuItem value={"Mountain"}>Mountain</MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
              </Select>
            </FormControl>
            <Typography
              sx={{
                color: "#05050F",
                mb: "10px",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Product description
            </Typography>
            <textarea
              placeholder="Product Description"
              value={description}
              style={{
                height: "173px",
                width: "551px",
                marginBottom: "10px",
              }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton
            title="Update"
            submit=""
            widthSize="81px"
            heightSize="35px"
            handleSubmit={handleCreate}
            type="click"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogueEdit;
