import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './layout/layout';

import routes from './config/routes';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Route path='/**' render={(props) => <NotFound {...props} />} />
      </Switch>
    </Layout>
  );
}

export default App;
