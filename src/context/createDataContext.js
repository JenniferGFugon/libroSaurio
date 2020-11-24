import React , {useReducer} from "react";

export default (reducer,actions,defaultValue) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state,dispatch] = useReducer(reducer,defaultValue);

        const bounActions = {};
        for (let key in actions){
            bounActions[key] = actions[key](dispatch);
        }

        return(
            <Context.Provider value= {{state, ...bounActions}} >
                {children}
            </Context.Provider>    
        );
    }    

        return {Context,Provider};
    
};