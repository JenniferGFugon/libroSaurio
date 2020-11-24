App Librosaurio

----Instrucciones para uso de la aplicacion-----
1- Crear un archivo enviroment.js en la raiz de la carpeta de proyecto.
con el siguiente codigo:

----------------------------------------
import Constants from "expo-constants";

const ENV = {
    dev:{
        apiUrl: "https://www.etnassoft.com/api/v1/get/",
        
    }
};

const getEnvVars = (env = Constants.manifest.releasechannel) => {
    if(__DEV__){
        return ENV.dev;
    }
} ;

export default getEnvVars;
---------------------------------------------

2-En cmd irse a la carpeta donde esta el proyecto , lugo correr la app con expo start.

