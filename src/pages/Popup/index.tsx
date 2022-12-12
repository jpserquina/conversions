import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { copySelection } from "../Background";
import {notify} from "../Content/modules/notify";

render(<Popup />, window.document.querySelector('#app-container'));

document.getElementById("save-btn")!.onclick =
    () => {
        copySelection().then(
            (result: any) => {
                if (result) notify(result)
            }
        )
    };

if (module.hot) module.hot.accept();
