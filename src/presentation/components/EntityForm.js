import { Box, Button, TextField, Typography, capitalize } from "@mui/material";

export const EntityForm = (props) => {
    const { formConfig, add } = props;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
            {
                formConfig.fields.map(field => {
                    return (
                        <Box sx={{ marginTop: "2%" }} id={field.fieldName}>
                            <Typography variant="subtitle1" >{capitalize(field.fieldName)}</Typography>
                            <TextField size="small" id="outlined-basic" variant="outlined"
                                helperText={field.help != undefined ? field.help : ""} />
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
            }}>
                {add ? "Add clothing garment" : "Update clothing garment"}
            </Button>
        </Box>
    );
}