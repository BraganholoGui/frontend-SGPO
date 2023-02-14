import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './appHistory';
import Layout from './components/layout';
import {GlobalStyles} from './global';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
// import store from './reducers/configStore';
import Home from './pages/Home';
import store from './reducers/configStore';


const AppRoutes = () => {
useEffect(() => console.log('tese'), []);

    return (
        <Provider store={store} data-test="component-app">
            <Router history={history}>
            {/* <ThemeProvider theme={theme}> */}
                <GlobalStyles />
                {/* <Wrapper> */}
                <Layout>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Redirect path="/" to="/home" />
                    </Switch>
                </Layout>
                {/* </Wrapper> */}
                {/* </ThemeProvider> */}
            </Router>
        </Provider >
    );
};

export default AppRoutes;
