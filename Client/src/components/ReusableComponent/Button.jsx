import { Button } from "@mui/material";

export const SubmitButton = ({
  title,
  submit,
  widthSize,
  heightSize,
  type,
  handleSubmit,
}) => {
  return (
    <Button
      type={submit}
      onClick={type === "click" ? handleSubmit : null}
      sx={{
        width: widthSize,
        height: heightSize,
        color: "white",
        backgroundColor: "rgba(20, 30, 60, 1)",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "12px",
        "&:hover": {
          backgroundColor: "rgba(20, 30, 60, 0.9)",
        },
      }}
    >
      {title}
    </Button>
  );
};
