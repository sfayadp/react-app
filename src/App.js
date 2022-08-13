import { ThemeProvider } from "@material-ui/styles";
import React from 'react';
import theme from './theme/theme'
import NavBar from "./components/navigation/NavBar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/security/Login";
import EOPLimitHistory from "./components/views/EOPLimitHistory";
import RouteProtected from "./components/security/RouteProtected";
import ThreadFamilyCatalog from "./components/views/ThreadFamilyCatalog";
import ThreadProgramCatalog from "./components/views/ThreadProgramCatalog";




function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login}/>
          <RouteProtected exact path="/EOPLimitHistory" component={EOPLimitHistory}/>
          <RouteProtected exact path="/ThreadFamilyCatalog" component={ThreadFamilyCatalog}/>
          <RouteProtected exact path="/ThreadProgramCatalog" component={ThreadProgramCatalog}/>
          <Route path="*" component={() => "404 NOT FOUND"}/>
        </Switch>        
      </Router>

    </ThemeProvider>

  );
}

export default App;

