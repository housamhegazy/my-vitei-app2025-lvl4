import { ArrowForwardIos } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Create = () => {
  const [alertMsg, setAlertMsg] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmitfunc = async ({ transaction, amount }) => {
    //post data only if it not found in db
    const res = await fetch("http://localhost:3000/transactions");
    const data = await res.json();
    const exists = data.find(
      (item) => item.transaction === transaction && item.amount === amount
    );

    if (exists) {
      alert("Transaction already exists");
      return;
    }
    await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction,
        amount,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        if (transaction && amount) {
          setAlertMsg(true);
          setTimeout(() => {
            setAlertMsg(false);
          }, 3000);
        }
      })
      .then(() => {
        // Clear form fields after submission
      });
  };

  return (
    <Box
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onsubmitfunc)();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <TextField
        {...register("transaction", {
          required: { value: true, message: "Transaction is required" },
          validate: {
            value: (value) =>
              /^[a-zA-Z0-9\s]+$/.test(value) ||
              "Transaction must be a valid string",
          },
          maxLength: {
            value: 20,
            message: "Transaction must be at most 20 characters",
          },
        })}
        label="Transaction"
        sx={{ m: 1, width: "300px", color: "inherit", display: "block" }}
        slotProps={{
          inputLabel: { style: { color: "inherit" } },
          formHelperText: {
            sx: {
              color: "error.main",
              fontSize: "0.9rem",
            },
          },
          input: {
            sx: { width: "100%" },
            startAdornment: (
              <InputAdornment position="start"> 👉</InputAdornment>
            ),
          },
        }}
        variant="filled"
        // validation message for transaction
        helperText={errors?.transaction?.message.toString() || ""}
      />
      <br />
      {/* amount  */}
      <TextField
        {...register("amount", {
          required: { value: true, message: "Amount is required" },
          validate: {
            value: (value) =>
              (!isNaN(value) && value.trim() !== "") ||
              "Amount must be a number and not empty",
          },
        })}
        label="Amount"
        sx={{ m: 1, width: "300px", color: "inherit", display: "block" }}
        slotProps={{
          inputLabel: { style: { color: "inherit" } },
          formHelperText: {
            sx: {
              color: "error.main",
              fontSize: "0.9rem",
            },
          },
          input: {
            sx: { width: "100%" },
            startAdornment: (
              <InputAdornment position="start"> $</InputAdornment>
            ),
          },
        }}
        variant="filled"
        helperText={errors?.amount?.message.toString() || ""}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit <ArrowForwardIos sx={{ ml: 1, fontSize: "medium" }} />
      </Button>
      {alertMsg && (
        <Alert
          sx={{ position: "fixed", top: 16, right: 16 }}
          variant="filled"
          severity="success"
        >
          Transaction added successfully!
        </Alert>
      )}
    </Box>
  );
};

export default Create;
