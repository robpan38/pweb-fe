import { Grid, Box, TextField, Typography, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function SignUp() {
    const [logInCallback] = useOutletContext();
    const [isSignup, setIsSignup] = useState(false);

    const nameTextFieldRef = useRef('');
    const emailTextFieldRef = useRef('');
    const passTextFieldRef = useRef('');

    const toggleSignup = () => {
        setIsSignup((prevSignup) => !prevSignup);
    };

    const onSubmitCallback = (event) => {
        event.preventDefault();
        let login = true;
        if (nameTextFieldRef.current.value !== undefined) {
            login = false;
        }
        logInCallback(nameTextFieldRef?.current?.value, emailTextFieldRef?.current?.value, passTextFieldRef?.current?.value, login);
    }

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
                <form onSubmit={onSubmitCallback} style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center" }} >
                    {isSignup && (
                        <TextField
                            label="Name"
                            margin="normal"
                            required
                            inputRef={nameTextFieldRef}
                            sx={{ width: 0.9 }}
                        />
                    )}
                    <TextField
                        label="Email"
                        margin="normal"
                        required
                        inputRef={emailTextFieldRef}
                        type="email"
                        sx={{ width: 0.9 }}
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                        required
                        inputRef={passTextFieldRef}
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
