export const validateString = (string) => {
    if (string && string !== '' && typeof(string) !== 'undefined')
        return string;
    return null;
}