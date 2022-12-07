import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { copySelection } from "../Background";

render(<Popup />, window.document.querySelector('#app-container'));

document.getElementById("save-btn").onclick = copySelection.then((result) => alert(result));

if (module.hot) module.hot.accept();
