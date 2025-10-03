import React from 'react';
import InteractiveMapContainer from '../containers/interactive_map';
import ErrorBoundary from './ErrorBoundary';
import './app.css';

const App = () => (
  <div>
    <ErrorBoundary
      title="Map Loading Error"
      message="There was a problem loading the interactive map. Please check your internet connection and try again.">
      <InteractiveMapContainer />
    </ErrorBoundary>
  </div>
);

export default App;
