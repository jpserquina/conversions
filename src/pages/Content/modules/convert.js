import { fetch } from '../modules/fetch';

export const convertInchesToMeters = value => {
    if (isNaN(value) && isNaN(parseFloat(value))) return null;
    return (parseFloat(value) * 0.0254) + " meters";
}

export const convertInchesToCentimeters = value => {
    if (isNaN(value) && isNaN(parseFloat(value))) return null;
    return (parseFloat(value) * 2.54) + " centimeters";
}