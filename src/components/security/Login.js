import React, { useState } from 'react';
import { Avatar, Button, Card, Container, Grid, Icon, Typography, TextField, Snackbar } from '@material-ui/core';
import useStyles from '../../theme/useStyles';
import { apiURL } from '../../services/apiURL';
import MuiAlert from '@material-ui/lab/Alert';
import auth from '../security/Auth';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {

    const classes = useStyles();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const [hasUsuarioChanged, sethasUsuarioChanged] = useState(false);
    const [hasPasswordChanged, sethasPasswordChanged] = useState(false);
    
    
    const [alert, setAlert] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: 'success',
        mensaje: 'mensaje'
      });

    const { vertical, horizontal, open, severity, mensaje } = alert;

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleChangeUsuario = (event) => {  
        setUsuario(event.target.value);
        if(!hasUsuarioChanged){
            sethasUsuarioChanged(true);
        }        
    }

    const handleChangePassword = (event) => {  
        setPassword(event.target.value);
        if(!hasPasswordChanged){
            sethasPasswordChanged(true);
        }        
    }

    const login = async (event) => {
        if(usuario.length === 0 || password.length === 0){
            sethasUsuarioChanged(true);
            sethasPasswordChanged(true);
        }else{

            var formData = {
                Identification: usuario,
                Password: password
            }

            var body = [];

            for(const obj in formData) {
                const key = encodeURIComponent(obj);
                const value = encodeURIComponent(formData[obj]);

                console.log(obj);
                body.push(key+"="+value);

            }
            
            body = body.join("&");

            fetch(apiURL+'/Security/Login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
                body: body
            }).then((res) => res.json())
                .then(
                (result) => {
                    if (result.Status === 2)
                        setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'error', mensaje: 'Error al obtener datos' });
                    else if (result.Status === 2) {
                        setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'error', mensaje: 'Error al obtener datos' });
                    } else{
                        setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'success', mensaje: 'Inicio de sesion exitoso' });
                        var userName = result.Data.FirstName;
                        var identification = result.Data.Identification
                        auth.login(() =>{                 
                            localStorage.setItem("TEST", result.Data.Identification);
                            props.history.push("/ThreadProgramCatalog");
                        }, userName, identification)
                        // auth.login(() =>{
                        //     localStorage.setItem("loggedIn", true);                     
                        //     props.history.push("/EOPLimitHistory");

                        // })
                        //localStorage.setItem("loggedIn", true);             
                        
                        //props.history.push("/EOPLimitHistory");                    
                    }                    
                }, (error) => {
                    setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'success', mensaje: error });
                })      
        }  
    }

    return (
        <Container className={classes.containermt}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleCloseAlert}
                key={vertical + horizontal}
                autoHideDuration={4000}>
                    <Alert severity={severity}>{mensaje}</Alert>
            </Snackbar>
            <Grid container justifyContent="center">
                <Grid item lg={5} md={6}>
                    <Card className={classes.card} align="center">
                        <Typography variant="h4" color="primary">Acceso al sistema de gestion de Catalogos</Typography>
                        {/* <Alert severity="error"></Alert> */}
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>person</Icon>
                        </Avatar>
                        <Typography variant="h6" color="primary">Ingrese su Usuario</Typography>
                        <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Usuario"
                                    variant="outlined"
                                    fullWidth
                                    helperText={usuario.length === 0 && hasUsuarioChanged ?  "El campo no puede estar vacio" : ''}
                                    required
                                    onChange={handleChangeUsuario}
                                    error={usuario.length === 0 && hasUsuarioChanged}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    helperText={password.length === 0  && hasPasswordChanged ? "El campo no puede estar vacio" : ''  }
                                    required
                                    type="password"
                                    error={password.length === 0 && hasPasswordChanged}
                                    onChange={handleChangePassword}/>
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    onClick={login}>
                                        Ingresar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;