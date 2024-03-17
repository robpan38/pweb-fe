import { Box, Button, TextField, Typography, capitalize } from "@mui/material";
import { useState } from "react";

export const EntityForm = (props) => {
    const { formConfig, add, addDataCallback, closeModalCallback, selectedItem, addDataTitle, updateDataTitle } = props;
    const [formData, setFormData] = useState(
        selectedItem !== null ? { ...selectedItem } : {}
    );

    const handleFieldUpdate = (fieldName, newValue) => {
        setFormData({ ...formData, [fieldName]: newValue });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
            {
                formConfig.fields.map(field => {
                    return (
                        <Box key={field.fieldName} sx={{ marginTop: "2%" }}>
                            <Typography variant="subtitle1" >{capitalize(field.fieldName)}</Typography>
                            <TextField size="small" id="outlined-basic" variant="outlined"
                                defaultValue={add === false ? field.get(selectedItem) : ""}
                                helperText={field.help !== undefined ? field.help : ""}
                                onChange={event => {
                                    handleFieldUpdate(field.fieldName, event.target.value);
                                }} />
                        </Box>
                    );
                })
            }

            <Button sx={{
                marginTop: "2%", marginBottom: "2%", backgroundColor: "black",
                color: "white",
                "&:hover": {
                    backgroundColor: "white",
                    color: "black"
                }
            }}
                onClick={() => {
                    addDataCallback(formData);
                    closeModalCallback();
                }}
            >
                {add ? addDataTitle : updateDataTitle}
            </Button>
        </Box>
    );
}