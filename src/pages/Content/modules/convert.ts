import { fetch } from './fetch';

export const convertInchesToMeters = (value: any) => {
    if (isNaN(value) && isNaN(parseFloat(value))) return null;
    return (parseFloat(value) * 0.0254) + " meters";
}

export const convertInchesToCentimeters = (value: any) => {
    if (isNaN(value) && isNaN(parseFloat(value))) return null;
    return (parseFloat(value) * 2.54) + " centimeters";
}