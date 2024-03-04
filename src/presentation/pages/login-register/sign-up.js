import { Grid, Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

export function SignUp() {
    const [isSignup, setIsSignup] = useState(false);

    const toggleSignup = () => {
        setIsSignup((prevSignup) => !prevSignup);
    };

    return (
        <Grid container spacing={0} sx={{ width: 1, height: 1 }}>
            <Grid item sx={{ width: 0.5, height: 1 }}
                container
                alignItems="center"
                justifyContent="center">
                <Box
                    component="img"
                    sx={{
                        height: 350,
                        width: 350,
                    }}
                    alt="The house from the offer."
                    src="/logo.jpg"
                />
            </Grid>
            <Grid item sx={{ width: 0.5, height: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                component={Box}>
                <form onSubmit={() => { console.log("swag") }} style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center" }} >
                    {isSignup && (
                        <TextField
                            label="Name"
                            margin="normal"
                            required
                            sx={{ width: 0.9 }}
                        />
                    )}
                    <TextField
                        label="Email"
                        margin="normal"
                        required
                        type="email"
                        sx={{ width: 0.9 }}
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                        required
                        type="password"
                        sx={{ width: 0.9 }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{
                        width: 0.9,
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "white",
                            color: "black"
                        }
                    }}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Button>
                    <Typography variant="body2" sx={{ mt: 1, width: 0.9 }}>
                        {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
                        <Button onClick={toggleSignup} sx={{
                            ml: 1,
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black"
                            }
                        }}>
                            {isSignup ? 'Login' : 'Sign Up'}
                        </Button>
                    </Typography>
                </form>
            </Grid>
        </Grid>
    );
}
