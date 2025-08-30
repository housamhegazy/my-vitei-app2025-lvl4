import { ArrowForwardIos } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form"

// Removed TypeScript type alias since this is a JavaScript file


const Create = () => {
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [TrsnErrorMsg, setTrsnErrorMsg] = useState(false);
  const [alert, setAlert] = useState(false);

const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onsubmitfunc = async () => {
    if (transaction && amount) {
      await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transaction, amount }),
      }); 
      setTransaction("");
      setAmount("");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
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
      required
        error={TrsnErrorMsg}
        helperText={transaction === "" ? "Transaction is required" : ""}
        {...register("transaction required", { required: true })} 
        value={transaction}
        onChange={(e) => {
          setTransaction(e.target.value);
        }}
        label="Transaction"
        sx={{ m: 1, width: "25ch", color: "inherit", display: "block" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"> 👉</InputAdornment>
            ),
          },
        }}
        variant="filled"
      />
      <br />
      <TextField
        type="number"
        {...register("amount required", { required: true })} 
        helperText={amount === "" ? "Amount is required" : ""}
        required
        value={amount}
        // type="number"
        onChange={(e) => setAmount(e.target.value)}
        label="Amount"
        sx={{ m: 1, width: "25ch", color: "inherit", display: "block" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"> $</InputAdornment>
            ),
          },
        }}
        variant="filled"
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <Button
        type="submit"
        
        variant="contained"
        sx={{ mt: 3 }}
      >
        Submit <ArrowForwardIos sx={{ ml: 1, fontSize: "medium" }} />
      </Button>
      {alert && (
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
