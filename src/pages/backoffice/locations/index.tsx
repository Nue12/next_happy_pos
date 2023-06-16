import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { locations as Location } from "@prisma/client";
import { BackofficeContext } from "@/contexts/BackOfficeContext";
import { config } from "@/config/config";
import Layout from "@/components/Layout";

const Locations = () => {
  const { locations, company, fetchData } = useContext(BackofficeContext);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const [updatedLocations, setUpdateLocations] =
    useState<Location[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);

  const updateLocation = async (location: Location) => {
    const locationId = location.id;
    const oldLocation = locations.find((loc) => loc.id === locationId);
    const newLocation = updatedLocations.find(
      (updateLocation) => updateLocation.id === locationId
    );
    if (
      oldLocation?.name !== newLocation?.name ||
      oldLocation?.address !== newLocation?.address
    ) {
      await fetch(`${config.backofficeApiBaseUrl}/locations`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });
      fetchData();
    }
  };

  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address;
    if (!isValid) return alert("Name and address are required.");
    newLocation.companyId = company?.id;
    const response = await fetch(`${config.backofficeApiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };

  const deleteLocation = async (location: Location) => {
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/locations/${location.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return fetchData();
    }
    alert(
      "Cannot delete this location. Please delete menus associated with it first."
    );
  };

  return (
    <Layout title="Locations">
      <Box>
        {updatedLocations.map((location, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
              key={location.id}
            >
              <Typography variant="h5" sx={{ mr: 1 }}>
                {index + 1}.
              </Typography>
              <TextField
                value={location.name}
                sx={{ mr: 3 }}
                onChange={(evt) => {
                  const newLocations = updatedLocations.map(
                    (updateLocation) => {
                      if (updateLocation.id === location.id) {
                        return { ...updateLocation, name: evt.target.value };
                      }
                      return updateLocation;
                    }
                  );
                  setUpdateLocations(newLocations);
                }}
              />
              <TextField
                value={location.address}
                sx={{ mr: 3, minWidth: 300 }}
                onChange={(evt) => {
                  const newLocations = updatedLocations.map(
                    (updateLocation) => {
                      if (updateLocation.id === location.id) {
                        return { ...updateLocation, address: evt.target.value };
                      }
                      return updateLocation;
                    }
                  );
                  setUpdateLocations(newLocations);
                }}
              />
              <Button
                variant="contained"
                onClick={() => updateLocation(location)}
                sx={{ mr: 2 }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={() => deleteLocation(location)}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ px: 3.5, display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          placeholder="Name"
          value={newLocation.name}
          onChange={(evt) =>
            setNewLocation({ ...newLocation, name: evt.target.value })
          }
          sx={{ mr: 3 }}
        />
        <TextField
          placeholder="Address"
          value={newLocation.address}
          onChange={(evt) =>
            setNewLocation({ ...newLocation, address: evt.target.value })
          }
          sx={{ mr: 3, minWidth: 300 }}
        />
        <Button variant="contained" onClick={createLocation}>
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default Locations;
