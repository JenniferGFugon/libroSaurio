import Constants from "expo-constants";

const ENV = {
    dev:{
        apiUrl: "https://www.etnassoft.com/api/v1/get/",
        apiImageUrl: "https://image.tmdb.org/t/p/",
        apiImageSize: "w500"
    }
};

const getEnvVars = (env = Constants.manifest.releasechannel) => {
    if(__DEV__){
        return ENV.dev;
    }
} ;

export default getEnvVars;