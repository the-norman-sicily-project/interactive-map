import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InteractiveMapContainer from '../containers/interactive_map';
import ResourceLoader from './ResourceLoader';
import ErrorBoundary from './ErrorBoundary';
import './app.css';

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        {/* Resource page route - matches new IRI pattern */}
        <Route path="/place/:type/:id">
          <ResourceLoader />
        </Route>

        {/* Default map view */}
        <Route path="/">
          <ErrorBoundary
            title="Map Loading Error"
            message="There was a problem loading the interactive map. Please check your internet connection and try again.">
            <InteractiveMapContainer />
          </ErrorBoundary>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
