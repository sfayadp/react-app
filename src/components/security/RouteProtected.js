import React from 'react';
import { Redirect, Route } from 'react-router';
import auth from './Auth'

const RouteProtected = ({component: Component, ...rest}) => {
    return (
        <Route 
        {...rest} 
        render = { props => {
                if(auth.isAuthenticaded()){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    );
};

export default RouteProtected;
