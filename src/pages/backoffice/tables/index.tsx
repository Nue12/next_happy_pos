import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import Link from "next/link";
import { getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Tables = () => {
  const { fetchData, tables } = useContext(BackofficeContext);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getselectedLocationId();
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });
  const validTables = tables.filter(
    (item) => item.location_id === Number(selectedLocationId)
  );

  const createNewTable = async () => {
    const isValid = newTable.name;
    if (!isValid) return alert("Please enter table name");
    await fetch(`${config.backofficeApiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Layout title="Tables">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New table
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validTables.map((table) => (
            <Box sx={{ textAlign: "center", mr: 4 }} key={table.id}>
              <Link
                href={`/backoffice/tables/${table.id}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Box
                  sx={{
                    width: "170px",
                    height: "170px",
                    borderRadius: 2,
                    border: "2px solid #EBEBEB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                ></Box>
              </Link>
              <Typography sx={{ mt: 1 }}>{table.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mt: 1 }}
            onChange={(evt) =>
              setNewTable({
                ...newTable,
                name: evt.target.value,
              })
            }
          />
          <Button
            variant="contained"
            onClick={createNewTable}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tables;
