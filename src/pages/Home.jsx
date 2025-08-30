import Typography from "@mui/material/Typography";
import { Box, IconButton, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
const Home = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await fetch("http://localhost:3000/transactions")
          .then((res) => res.json())
          .then((data) => setTransactions(data));
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  const handleDelete = async (id) => {
    const url = `http://localhost:3000/transactions/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        // احذف العنصر من المصفوفة مباشرة
        setTransactions((prev) => prev.filter((item) => item.id !== id));
      } else {
        setError(
          `Failed to delete item with ID ${id}. Status: ${response.status}`
        );
      }
    } catch (error) {
      setError("There was a network error:" + error.message);
    }
  };


  if (loading) {
    return (
      <Box sx={{ p: 2, m: "0 auto", width: "80%", textAlign: "center" }}>
        Loading...
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ p: 2, m: "0 auto", width: "80%", textAlign: "center" }}>
        Error: {error}
      </Box>
    );
  }
  if (transactions === null) {
    return (
      <Box sx={{ p: 2, m: "0 auto", width: "80%", textAlign: "center" }}>
        No data available.
      </Box>
    );
  }

  if (transactions) {
    if (transactions.length === 0) {
      return (
        <Box sx={{ p: 2, m: "0 auto", width: "80%", textAlign: "center" }}>
          No transactions found.
        </Box>
      );
    }
    return (
      <Box>
        {transactions.map((item) => (
          <Paper
            key={item.id}
            sx={{
              m: "0 auto",
              mb: 2,
              width: "80%",
              backgroundColor: theme.palette.background.paper,
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              component="h4"
              variant="body1"
              color="initial"
            >
              {item.transaction}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                mr: 4,
              }}
              component="h4"
              variant="body1"
              color="initial"
            >
              {`${item.amount}$`}
            </Typography>
            <IconButton
              onClick={() => handleDelete(item.id)}
              sx={{
                color: theme.palette.text.primary,
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <Close />
            </IconButton>
          </Paper>
        ))}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">Total Amount:</Typography>
          <Typography variant="body1">
            {transactions.reduce((total, item) => total + Number(item.amount), 0)}
            $
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default Home;
