import { useContext, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { getselectedLocationId } from "@/utils";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { companies as Company, locations as Location } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const Settings = () => {
  const { company, locations, fetchData } = useContext(BackofficeContext);
  const [newCompany, setNewCompany] = useState<Company>({
    id: company?.id as number,
    name: company?.name as string,
    address: company?.address as string,
    is_archived: company?.is_archived || false,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = getselectedLocationId();
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (company) setNewCompany(company);
  }, [locations, company]);

  const handleOnchange = (evt: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocationId", String(evt.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === evt.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  const updateCompany = async () => {
    await fetch(`${config.backofficeApiBaseUrl}/companies`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    });
  };

  return (
    <Layout title="Settings">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={newCompany.name}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            const name = evt.target.value;
            setNewCompany({ ...newCompany, name });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={newCompany.address}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewCompany({ ...newCompany, address: evt.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Locations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ""}
            label="Locations"
            onChange={handleOnchange}
          >
            {locations.map((location) => {
              return (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ mt: 2, width: "fit-content" }}
          onClick={updateCompany}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default Settings;
