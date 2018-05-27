import React from 'react';
import ReactDOM from 'react-dom';
import App from './scripts/components/App';

// import vendor styles
import 'semantic-ui-css/semantic.min.css';

// import polyfills
import 'core-js/fn/string/includes';

ReactDOM.render(<App />, document.getElementById('root'));
