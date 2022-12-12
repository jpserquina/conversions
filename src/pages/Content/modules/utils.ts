export const validateString = (string: any) => {
    if (string && string !== '' && typeof(string) !== 'undefined')
        return string;
    return null;
}