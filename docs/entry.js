
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/header/header.tsx';
reactComponents['Header'] = Component0;

import Component1 from '../src/components/input-group/input-group.tsx';
reactComponents['InputGroup'] = Component1;

import Component2 from '../src/components/panel/panel.tsx';
reactComponents['Panel'] = Component2;

import Component3 from '../src/components/request-form-view/request-form-view.tsx';
reactComponents['RequestFormView'] = Component3;

import Component4 from '../src/components/requests/requests.tsx';
reactComponents['Requests'] = Component4;