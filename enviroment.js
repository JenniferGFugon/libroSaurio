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