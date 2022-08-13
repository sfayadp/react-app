import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import Auth from "../security/Auth";
import { frameURLProgram } from "../../services/apiURL";

const ThreadProgramCatalog = () => {
  const classes = useStyles();

  return (
    

    <Container className={classes.containermt}>
      {/* Container principal */}
      <Grid container justifyContent="left">
        <Typography id="userName" variant="body1" color="inherit">
          Usuario: <strong>{Auth.Idenfication+ ' '+ Auth.userName}</strong>
        </Typography>

        <iframe
          className={classes.iframe}
          src={frameURLProgram+Auth.Idenfication}
        ></iframe>

      </Grid>
    </Container>
  );
};

export default ThreadProgramCatalog;
