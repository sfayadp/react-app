import { Button, Card, Container, Grid, Dialog, DialogTitle, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Icon, IconButton, TablePagination, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from '../../theme/useStyles';
import { agregarEOPLimit, editarEOPLimit, listarEOPLimits, eliminarEOPLimit, obtenerEOPLimitKey } from '../../services/eoplimithistory';
import MuiAlert from '@material-ui/lab/Alert';
//import { Link } from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const clearEOPLimit = {
    idVDIEOPLimitHistory: '',
    Diametermm: '',
    Libraje: '',
    Threadtype: '',
    EopLimitMin: '',
    EopLImitMax: '',
    DiameterLimitMin: '',
    DiameterLimitMax: '',
    InsDateTime: '',
    UpDateTime: ''
}

const clearEOPLimitClone = {
    idVDIEOPLimitHistory: '',
    Diametermm: '',
    Libraje: '',
    Threadtype: '',
    EopLimitMin: '',
    EopLImitMax: '',
    DiameterLimitMin: '',
    DiameterLimitMax: '',
    InsDateTime: '',
    UpDateTime: ''
}

console.log("Storage: "+localStorage.getItem("loggedIn"));

const EOPLimitHistory = () => {    


    const classes = useStyles();

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

    const [opened, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openClone, setOpenClone] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [EOPLimitArray, setEOPLimitArray] = useState([]);
    
    const [EOPLimit, setEOPLimit] = useState({
        Diametermm: '',
        Libraje: '',
        Threadtype: '',
        EopLimitMin: '',
        EopLImitMax: '',
        DiameterLimitMin: '',
        DiameterLimitMax: '',
        InsDateTime: '',
        UpDateTime: ''
    });

    const [EOPLimitEdita, setEOPLimitEdita] = useState({
        key: 0,
        idVDIEOPLimitHistory: '',
        Diametermm: '',
        Libraje: '',
        Threadtype: '',
        EopLimitMin: '',
        EopLImitMax: '',
        DiameterLimitMin: '',
        DiameterLimitMax: '',
        InsDateTime: '',
        UpDateTime: ''
    })

    const [EOPLimitClone, setEOPLimitClone] = useState({
        Diametermm: '',
        Libraje: '',
        Threadtype: '',
        EopLimitMin: '',
        EopLImitMax: '',
        DiameterLimitMin: '',
        DiameterLimitMax: '',
        InsDateTime: '',
        UpDateTime: ''
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, EOPLimitArray.length - page * rowsPerPage);
    const [submitValidate, setSubmitValidate] = useState(false);
    
    const [hasDiametermmChanged, sethasDiametermmChanged] = useState(false);
    const [hasLibrajeChanged, sethasLibrajeChanged] = useState(false);
    const [hasThreadtypeChanged, sethasThreadtypeChanged] = useState(false);
    const [hasEopLimitMinChanged, sethasEopLimitMinChanged] = useState(false);
    const [hasEopLImitMaxChanged, sethasEopLImitMaxChanged] = useState(false);
    const [hasDiameterLimitMinChanged, sethasDiameterLimitMinChanged] = useState(false);
    const [hasDiameterLimitMaxChanged, sethasDiameterLimitMaxChanged] = useState(false);

    const handleChangeDiametermm = (event) => {  
        if(!hasDiametermmChanged){
            sethasDiametermmChanged(true);
        }        
    }

    const handleChangeLibraje = (event) => {  
        if(!hasLibrajeChanged){
            sethasLibrajeChanged(true);
        }        
    }

    const handleChangeThreadtype = (event) => {  
        if(!hasThreadtypeChanged){
            sethasThreadtypeChanged(true);
        }        
    }

    const handleChangeEopLimitMin = (event) => {  
        if(!hasEopLimitMinChanged){
            sethasEopLimitMinChanged(true);
        }        
    }

    const handleChangeEopLImitMax = (event) => {  
        if(!hasEopLImitMaxChanged){
            sethasEopLImitMaxChanged(true);
        }        
    }

    const handleChangeDiameterLimitMin = (event) => {  
        if(!hasDiameterLimitMinChanged){
            sethasDiameterLimitMinChanged(true);
        }        
    }

    const handleChangeDiameterLimitMax = (event) => {  
        if(!hasDiameterLimitMaxChanged){
            sethasDiameterLimitMaxChanged(true);
        }        
    }

    const onChangeDiametermm = (e) => {
        handleChangeCreate(e);
        handleChangeDiametermm(e);
    }

    const onChangeLibraje = (e) => {
        handleChangeCreate(e);
        handleChangeLibraje(e);
    }

    const onChangeThreadtype = (e) => {
        handleChangeCreate(e);
        handleChangeThreadtype(e);
    }

    const onChangeEopLimitMin = (e) => {
        handleChangeCreate(e);
        handleChangeEopLimitMin(e);
    }

    const onChangeEopLImitMax = (e) => {
        handleChangeCreate(e);
        handleChangeEopLImitMax(e);
    }

    const onChangeDiameterLimitMin = (e) => {
        handleChangeCreate(e);
        handleChangeDiameterLimitMin(e);
    }

    const onChangeDiameterLimitMax = (e) => {
        handleChangeCreate(e);
        handleChangeDiameterLimitMax(e);
    }

    const onChangeDiametermmClone = (e) => {
        handleChangeClone(e);
        handleChangeDiametermm(e);
    }

    const onChangeLibrajeClone = (e) => {
        handleChangeClone(e);
        handleChangeLibraje(e);
    }

    const onChangeThreadtypeClone = (e) => {
        handleChangeClone(e);
        handleChangeThreadtype(e);
    }

    const onChangeEopLimitMinClone = (e) => {
        handleChangeClone(e);
        handleChangeEopLimitMin(e);
    }

    const onChangeEopLImitMaxClone = (e) => {
        handleChangeClone(e);
        handleChangeEopLImitMax(e);
    }

    const onChangeDiameterLimitMinClone = (e) => {
        handleChangeClone(e);
        handleChangeDiameterLimitMin(e);
    }

    const onChangeDiameterLimitMaxClone = (e) => {
        handleChangeClone(e);
        handleChangeDiameterLimitMax(e);
    }

    
    const handleChangeCreate = (e) => {
        const { name , value} = e.target;
        setEOPLimit(prev => ({
            ...prev,
            [name] : value
        }) )
    }

    const handleChangeClone = (e) => {
        const { name , value} = e.target;
        setEOPLimitClone(prev => ({
            ...prev,
            [name] : value
        }) )
    }

    const handleChangeEdita = (e) => {
        const { name , value} = e.target;
        setEOPLimitEdita(prev => ({
            ...prev,
            [name] : value
        }) )
    }    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const cerrarDialog = () => {
        setOpen(false);
    }

    const cerrarDialogCreate = () => {
        setOpenCreate(false);
        sethasDiametermmChanged(false);
        sethasLibrajeChanged(false);
        sethasThreadtypeChanged(false);
        sethasEopLimitMinChanged(false);
        sethasEopLImitMaxChanged(false);
        sethasDiameterLimitMinChanged(false);
        sethasDiameterLimitMaxChanged(false);
        setEOPLimit(clearEOPLimit);
        setSubmitValidate(false);
    }

    const cerrarDialogClone = () => {
        setOpenClone(false);
        sethasDiametermmChanged(false);
        sethasLibrajeChanged(false);
        sethasThreadtypeChanged(false);
        sethasEopLimitMinChanged(false);
        sethasEopLImitMaxChanged(false);
        sethasDiameterLimitMinChanged(false);
        sethasDiameterLimitMaxChanged(false);
        setEOPLimit(clearEOPLimit);
        setSubmitValidate(false);
    }
    
    
   
    //Submit para guardar datos
    const guardarData = () => {
        setSubmitValidate(true);
        if(EOPLimit.Diametermm.length === 0 || EOPLimit.Libraje.length === 0 || EOPLimit.Threadtype.length === 0 || 
            EOPLimit.EopLimitMin.length === 0 || EOPLimit.EopLImitMax.length === 0 || EOPLimit.DiameterLimitMin.length === 0 ||
            EOPLimit.DiameterLimitMax.length === 0 ){
            console.log("Hay campos vacios");
        }else{
            agregarEOPLimit(EOPLimit);
            setEOPLimit(clearEOPLimit);
            cerrarDialogCreate();
            setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'success', mensaje: 'Se guardo el catalogo con exito' });
        }
    } 

    //Submit para guardar datos
    const guardarDataClone = () => {
        setSubmitValidate(true);
        if(EOPLimitClone.Diametermm.length === 0 || EOPLimitClone.Libraje.length === 0 || EOPLimitClone.Threadtype.length === 0 || 
            EOPLimitClone.EopLimitMin.length === 0 || EOPLimitClone.EopLImitMax.length === 0 || EOPLimitClone.DiameterLimitMin.length === 0 ||
            EOPLimitClone.DiameterLimitMax.length === 0 ){
            console.log("Hay campos vacios");
        }else{
            agregarEOPLimit(EOPLimitClone);
            setEOPLimit(clearEOPLimitClone);
            cerrarDialogClone();
            setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'success', mensaje: 'Se guardo el catalogo con exito' });
        }
    }

    //Funcion para editar datos del registro
    const editarData = async () => {
        const nuevaData = await editarEOPLimit(EOPLimitEdita);
        console.log("Boton editar data...", nuevaData);
        cerrarDialog();
    }

    //Listar datos
    const listarDataEOPLimit = async () => {
        const data = await listarEOPLimits();
        setEOPLimitArray(data);
    }

    //Abrir modal para editar datos
    const abrirDialog = async (idVDIEOPLimitHistory) => {
        setOpen(true);
        const dataEOPLimit = await obtenerEOPLimitKey(idVDIEOPLimitHistory);
        console.log(dataEOPLimit);
        setEOPLimitEdita({
            idVDIEOPLimitHistoryEdita: idVDIEOPLimitHistory,
            DiametermmEdita: dataEOPLimit.Diametermm,
            LibrajeEdita: dataEOPLimit.Libraje,
            ThreadtypeEdita: dataEOPLimit.Threadtype,
            EopLimitMinEdita: dataEOPLimit.EopLimitMin,
            EopLImitMaxEdita: dataEOPLimit.EopLImitMax,
            DiameterLimitMinEdita: dataEOPLimit.DiameterLimitMin,
            DiameterLimitMaxEdita: dataEOPLimit.DiameterLimitMax
        })
        console.log("Mi boton editar");
    }

    //Abrir modal para clonar registro
    const abrirDialogClonar = async (idVDIEOPLimitHistory) => {
        setOpenClone(true);
        debugger;
        const dataEOPLimit = await obtenerEOPLimitKey(idVDIEOPLimitHistory);
        console.log(dataEOPLimit);
        setEOPLimitClone({
            Diametermm: dataEOPLimit.Diametermm,
            Libraje: dataEOPLimit.Libraje,
            Threadtype: dataEOPLimit.Threadtype,
            EopLimitMin: '',
            EopLImitMax: '',
            DiameterLimitMin: '',
            DiameterLimitMax: ''
        })
        console.log(EOPLimitClone);
    }

    //Abrir modal para crear datos
    const abrirDialogCreate = async () => {
        setOpenCreate(true);
        console.log("Mi boton crear");
    }

    const eliminarData = async (data) => {
        const listaNuevaLibros = await eliminarEOPLimit(data);
        setEOPLimitArray(listaNuevaLibros);
        if(data.Active){
            setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'error', mensaje: 'Se desactivo el catalogo' });
        }else{
            setAlert({ open: true, vertical: 'bottom', horizontal: 'right', severity: 'success', mensaje: 'Se activo el catalogo' });            
        }
        console.log("Boton eliminar",data);
    }

    

    useEffect(()=>{
        listarDataEOPLimit();
    }, [EOPLimitArray])

    useEffect(()=>{
        listarDataEOPLimit();
    }, [])

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
            {/* Container principal */}
            <Grid container justifyContent="center">
                <Grid item lg={12} md={12}>
                    <Card className={classes.card} align="center">
                        <Typography variant="h4">EOPLimit Catalog</Typography>
                        <Button variant="contained"
                                color="primary"
                                align="right"
                                onClick={() => abrirDialogCreate()}>Agregar catalogo</Button>                        
                    </Card>

                    {/* Lista de objetos */}
                    <TableContainer component={Paper} className={classes.container}>
                        <Table stickyHeader size="small" aria-label="enhanced table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Diameter (mm)</TableCell>
                                    <TableCell>Libraje</TableCell>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>EOP Limite Minimo</TableCell>
                                    <TableCell>EOP Limite Maximo</TableCell>
                                    <TableCell>Diametro Limite Minimo</TableCell>
                                    <TableCell>Diametro Limite Maximo</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell align="center" colSpan={3}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {EOPLimitArray
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map( (EOPLimitObject, index) => (
                                <TableRow key={index}>
                                    <TableCell>{EOPLimitObject.Diametermm}</TableCell>
                                    <TableCell>{EOPLimitObject.Libraje}</TableCell>
                                    <TableCell>{EOPLimitObject.Threadtype}</TableCell>
                                    <TableCell>{EOPLimitObject.EopLimitMin}</TableCell>
                                    <TableCell>{EOPLimitObject.EopLImitMax}</TableCell>
                                    <TableCell>{EOPLimitObject.DiameterLimitMin}</TableCell>
                                    <TableCell>{EOPLimitObject.DiameterLimitMax}</TableCell>
                                    <TableCell>{EOPLimitObject.InsDateTime}</TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                        color="primary"
                                        onClick={() => abrirDialog(EOPLimitObject.idVDIEOPLimitHistory)}>Editar</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                        
                                        onClick={() => abrirDialogClonar(EOPLimitObject.idVDIEOPLimitHistory)}>Clonar</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained"
                                        color="secondary"
                                        onClick={() => eliminarData(EOPLimitObject)}>{EOPLimitObject.Active ? 'Desactivar' : 'Activar'}</Button>
                                    </TableCell>

                                </TableRow>

                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[10,25,50,100,500]}
                    component="div"
                    count={EOPLimitArray.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>

            {/* Agregar Objeto */}
            <Dialog open={openCreate} onClose={cerrarDialogCreate} maxWidth="md" fullWidth align="center">
                <DialogTitle>
                    <Typography variant="h4" color="inherit">Agregar Catalogo</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={cerrarDialogCreate}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                    type="number"
                    size="small"
                    label="Diameter"
                    variant="outlined"
                    fullWidth
                    className={classes.gridmb}
                    align="left"
                    name="Diametermm"
                    value={EOPLimit.Diametermm}
                    onChange={onChangeDiametermm}
                    helperText={EOPLimit.Diametermm.length === 0 && (hasDiametermmChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.Diametermm.length === 0 && (hasDiametermmChanged || submitValidate) }>
                    </TextField>

                    <TextField
                    type="number"
                    size="small"
                    label="Libraje"
                    variant="outlined"
                    fullWidth
                    name="Libraje"
                    className={classes.gridmb}
                    value={EOPLimit.Libraje}
                    onChange={onChangeLibraje}
                    helperText={EOPLimit.Libraje.length === 0 && (hasLibrajeChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.Libraje.length === 0 && (hasLibrajeChanged || submitValidate)}/>

                    <TextField
                    size="small"
                    label="Producto"
                    variant="outlined"
                    fullWidth
                    name="Threadtype"
                    className={classes.gridmb}
                    value={EOPLimit.Threadtype}
                    onChange={onChangeThreadtype}
                    helperText={EOPLimit.Threadtype.length === 0 && (hasThreadtypeChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.Threadtype.length === 0 && (hasThreadtypeChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="EopLimitMin"
                    className={classes.gridmb}
                    value={EOPLimit.EopLimitMin}
                    onChange={onChangeEopLimitMin}
                    helperText={EOPLimit.EopLimitMin.length === 0 && (hasEopLimitMinChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.EopLimitMin.length === 0 && (hasEopLimitMinChanged || submitValidate) }/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="EopLImitMax"
                    className={classes.gridmb}
                    value={EOPLimit.EopLImitMax}
                    onChange={onChangeEopLImitMax}
                    helperText={EOPLimit.EopLImitMax.length === 0 && (hasEopLImitMaxChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.EopLImitMax.length === 0 && (hasEopLImitMaxChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMin"
                    className={classes.gridmb}
                    value={EOPLimit.DiameterLimitMin}
                    onChange={onChangeDiameterLimitMin}
                    helperText={EOPLimit.DiameterLimitMin.length === 0 && (hasDiameterLimitMinChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.DiameterLimitMin.length === 0 && (hasDiameterLimitMinChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMax"
                    className={classes.gridmb}
                    value={EOPLimit.DiameterLimitMax}
                    onChange={onChangeDiameterLimitMax}
                    helperText={EOPLimit.DiameterLimitMax.length === 0 && (hasDiameterLimitMaxChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimit.DiameterLimitMax.length === 0 && (hasDiameterLimitMaxChanged || submitValidate)}/>

                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.gridmb}
                    type="submit"
                    onClick={guardarData}>
                        Guardar
                    </Button>

                    </form>
                </DialogContent>
            </Dialog>
            
            {/* Clonar Objeto */}
            <Dialog open={openClone} onClose={cerrarDialogClone} maxWidth="md" fullWidth align="center">
                <DialogTitle>
                    <Typography variant="h4" color="inherit">Agregar Catalogo</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={cerrarDialogClone}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                    type="number"
                    size="small"
                    label="Diameter"
                    variant="outlined"
                    fullWidth
                    className={classes.gridmb}
                    align="left"
                    name="Diametermm"
                    value={EOPLimitClone.Diametermm}
                    onChange={onChangeDiametermmClone}
                    helperText={EOPLimitClone.Diametermm.length === 0 && (hasDiametermmChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.Diametermm.length === 0 && (hasDiametermmChanged || submitValidate) }>
                    </TextField>

                    <TextField
                    type="number"
                    size="small"
                    label="Libraje"
                    variant="outlined"
                    fullWidth
                    name="Libraje"
                    className={classes.gridmb}
                    value={EOPLimitClone.Libraje}
                    onChange={onChangeLibrajeClone}
                    helperText={EOPLimitClone.Libraje.length === 0 && (hasLibrajeChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.Libraje.length === 0 && (hasLibrajeChanged || submitValidate)}/>

                    <TextField
                    size="small"
                    label="Producto"
                    variant="outlined"
                    fullWidth
                    name="Threadtype"
                    className={classes.gridmb}
                    value={EOPLimitClone.Threadtype}
                    onChange={onChangeThreadtypeClone}
                    helperText={EOPLimitClone.Threadtype.length === 0 && (hasThreadtypeChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.Threadtype.length === 0 && (hasThreadtypeChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="EopLimitMin"
                    className={classes.gridmb}
                    value={EOPLimitClone.EopLimitMin}
                    onChange={onChangeEopLimitMinClone}
                    helperText={EOPLimitClone.EopLimitMin.length === 0 && (hasEopLimitMinChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.EopLimitMin.length === 0 && (hasEopLimitMinChanged || submitValidate) }/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="EopLImitMax"
                    className={classes.gridmb}
                    value={EOPLimitClone.EopLImitMax}
                    onChange={onChangeEopLImitMaxClone}
                    helperText={EOPLimitClone.EopLImitMax.length === 0 && (hasEopLImitMaxChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.EopLImitMax.length === 0 && (hasEopLImitMaxChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMin"
                    className={classes.gridmb}
                    value={EOPLimitClone.DiameterLimitMin}
                    onChange={onChangeDiameterLimitMinClone}
                    helperText={EOPLimitClone.DiameterLimitMin.length === 0 && (hasDiameterLimitMinChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.DiameterLimitMin.length === 0 && (hasDiameterLimitMinChanged || submitValidate)}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMax"
                    className={classes.gridmb}
                    value={EOPLimitClone.DiameterLimitMax}
                    onChange={onChangeDiameterLimitMaxClone}
                    helperText={EOPLimitClone.DiameterLimitMax.length === 0 && (hasDiameterLimitMaxChanged || submitValidate) ?  "El campo no puede estar vacio" : ''}
                    error={EOPLimitClone.DiameterLimitMax.length === 0 && (hasDiameterLimitMaxChanged || submitValidate)}/>

                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.gridmb}
                    type="submit"
                    onClick={guardarDataClone}>
                        Guardar
                    </Button>

                    </form>
                </DialogContent>
            </Dialog>

            {/* Editar objeto */}
            <Dialog open={opened} onClose={cerrarDialog} maxWidth="md" fullWidth align="center">
                <DialogTitle disableTypography>
                    <Typography variant="subtitle1" color="inherit">Editar Catalogo</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={cerrarDialog}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                    type="number"
                    size="small"
                    label="Diameter"
                    variant="outlined"
                    fullWidth
                    className={classes.gridmb}
                    align="left"
                    name="DiametermmEdita"
                    value={EOPLimitEdita.DiametermmEdita || ''}
                    onChange={handleChangeEdita}>
                    </TextField>

                    <TextField
                    type="number"
                    size="small"
                    label="Libraje"
                    variant="outlined"
                    fullWidth
                    name="LibrajeEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.LibrajeEdita || ''}
                    onChange={handleChangeEdita}/>

                    <TextField
                    size="small"
                    label="Producto"
                    variant="outlined"
                    fullWidth
                    name="ThreadtypeEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.ThreadtypeEdita || ''}
                    onChange={handleChangeEdita}/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="EopLimitMinEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.EopLimitMinEdita || ''}
                    onChange={handleChangeEdita}/>

                    <TextField
                    type="number"
                    size="small"
                    label="EOP Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="EopLImitMaxEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.EopLImitMaxEdita || ''}
                    onChange={handleChangeEdita}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Minimo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMinEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.DiameterLimitMinEdita || ''}
                    onChange={handleChangeEdita}/>

                    <TextField
                    type="number"
                    size="small"
                    label="Diametro Limite Maximo"
                    variant="outlined"
                    fullWidth
                    name="DiameterLimitMaxEdita"
                    className={classes.gridmb}
                    value={EOPLimitEdita.DiameterLimitMaxEdita || ''}
                    onChange={handleChangeEdita}/>

                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.gridmb}
                    type="submit"
                    onClick={editarData}>
                        Guardar
                    </Button>

                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default EOPLimitHistory;