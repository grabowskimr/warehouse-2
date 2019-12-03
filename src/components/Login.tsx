import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  paper: {
    minWidth: '300px'
  },
  insideContent: {
    padding: theme.spacing(3, 2),
  },
  form: {
    flexGrow: 1,
    textAlign: 'right'
  },
  submitBtn: {
    marginTop: theme.spacing(2)
  }
}));

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.content}
      >
        <Paper square={true} className={classes.paper}>
          <div className={classes.insideContent}>
            <Typography align="center" variant="h6">
              Insert credentials
            </Typography>
            <form className={classes.form}>
              <TextField label="Login" fullWidth margin="normal"/>
              <TextField label="Password" type="password" fullWidth margin="normal"/>
              <Button variant="contained" color="primary" className={classes.submitBtn}>Sign In</Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </div>
  )

};

export default Login;