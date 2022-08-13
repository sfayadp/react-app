import { apiURL } from "./apiURL";

let EOPLimitArray = [];
let key = 0;

export const agregarEOPLimit = async (EOPLimit) => {

    try{
        var formData = {
            Diametermm: EOPLimit.Diametermm,
            Libraje: EOPLimit.Libraje, 
            Threadtype: EOPLimit.Threadtype,
            EopLimitMin: EOPLimit.EopLimitMin,
            EopLImitMax: EOPLimit.EopLImitMax,
            DiameterLimitMin: EOPLimit.DiameterLimitMin,
            DiameterLimitMax: EOPLimit.DiameterLimitMax,
            
        }

        var body = [];

        for(const obj in formData) {
            const key = encodeURIComponent(obj);
            const value = encodeURIComponent(formData[obj]);

            console.log(obj);
            body.push(key+"="+value);

        }

        body = body.join("&");

        const res = await fetch(apiURL+'/Catalog/InsertVDIEOPLimitHistory', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
            body: body
        });

        let EOPLimitHistoryJson = EOPLimit;
        key++;
        EOPLimitHistoryJson.key = key;
        EOPLimitArray.push(EOPLimitHistoryJson);

        const objetoEOP = await res.json();
        
        if(objetoEOP === "ok"){
            return listarEOPLimits();
        }else{
            return objetoEOP;
        }
    }catch(error){
        console.log('No se pudo encontrar la ruta asociada a sus datos', error);
        return [];
    }
    
}

export const listarEOPLimits = async () => {
    try {
      const res = await fetch(apiURL+'/Catalog/GetVDIEOPLimitHistories');
      const result = await res.json();
      return result;
    } catch (error) {
      console.log('No se pudo encontrar la ruta asociada a sus datos', error);
      return [];
    }
};

export const obtenerEOPLimitKey = async (idVDIEOPLimitHistory) => {
    try {
        const res = await fetch(apiURL+'/Catalog/GetVDIEOPLimitHistoryById?idVDIEOPLimitHistory='+idVDIEOPLimitHistory);
        const objetoEOP = await res.json();
        return objetoEOP;
    } catch (error) {
        console.log('No se pudo encontrar la ruta asociada a sus datos', error);
        return [];
    }
}



export const editarEOPLimit = async (dataEOPLimit) => {
    var formData = {
        idVDIEOPLimitHistory: dataEOPLimit.idVDIEOPLimitHistoryEdita,
        Diametermm: dataEOPLimit.DiametermmEdita,
        Libraje: dataEOPLimit.LibrajeEdita, 
        Threadtype: dataEOPLimit.ThreadtypeEdita,
        EopLimitMin: dataEOPLimit.EopLimitMinEdita,
        EopLImitMax: dataEOPLimit.EopLImitMaxEdita,
        DiameterLimitMin: dataEOPLimit.DiameterLimitMinEdita,
        DiameterLimitMax: dataEOPLimit.DiameterLimitMaxEdita        
    }

    var body = [];

    for(const obj in formData) {
        const key = encodeURIComponent(obj);
        const value = encodeURIComponent(formData[obj]);

        console.log(obj);
        body.push(key+"="+value);

    }

    body = body.join("&");

    try{
        const res = await fetch(apiURL+'/Catalog/UpdateVDIEOPLimitHistory', {
            method: 'post',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
        });

        EOPLimitArray.forEach(EOPLimit => {
            if(dataEOPLimit.idVDIEOPLimitHistoryEdita === EOPLimit.idVDIEOPLimitHistory){
                EOPLimit.Diametermm = dataEOPLimit.DiametermmEdita;
                EOPLimit.Libraje = dataEOPLimit.LibrajeEdita;
                EOPLimit.Threadtype = dataEOPLimit.ThreadtypeEdita;
                EOPLimit.EopLimitMin = dataEOPLimit.EopLimitMinEdita;
                EOPLimit.EopLImitMax = dataEOPLimit.EopLImitMaxEdita;
                EOPLimit.DiameterLimitMin = dataEOPLimit.DiameterLimitMinEdita;
                EOPLimit.DiameterLimitMax = dataEOPLimit.DiameterLimitMaxEdita;
            }
        })

        const objetoEOP = await res.json();
        return objetoEOP;


    }catch(error){
        console.log('No se pudo encontrar la ruta asociada a sus datos', error);
        return [];
    }
}

export const eliminarEOPLimit = async (dataEOPLimit) => {
    debugger;
    let active = dataEOPLimit.Active;
    console.log(active);
    if(active){
        active = false;
    }else{
        active = true;
    }

    var formData = {
        idVDIEOPLimitHistory: dataEOPLimit.idVDIEOPLimitHistory,
        Active: active
    }

    var body = [];

    for(const obj in formData) {
        const key = encodeURIComponent(obj);
        const value = encodeURIComponent(formData[obj]);

        console.log(obj);
        body.push(key+"="+value);

    }

    body = body.join("&");

    try{
        await fetch(apiURL+'/Catalog/DeleteVDIEOPLimitHistoryById', {
            method: 'post',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
        });

        EOPLimitArray = EOPLimitArray.filter(objetoEOPLimit=> {return objetoEOPLimit.idVDIEOPLimitHistory !== dataEOPLimit.idVDIEOPLimitHistoryEdita});
        const nuevaDataEOPLimit = listarEOPLimits();
        return nuevaDataEOPLimit;

    }catch(error){
        console.log('No se pudo encontrar la ruta asociada a sus datos', error);
        return [];
    }    
}