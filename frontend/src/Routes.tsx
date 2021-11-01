import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BlockList from './pages/BlockList';
import BlockDetails from './pages/BlockDetails';
import { PageNotFound } from './shared/components';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/details/:hash" exact>
          <BlockDetails />
        </Route>
        <Route path="/" exact>
          <BlockList />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
