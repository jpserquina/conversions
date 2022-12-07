import { validateString } from "./utils";

export const notify = (message, title, iconUrl) => {
    const defaultIcon = './icon-34.png';
    const defaultTitle = 'Convert!';

    const vettedTitle = validateString(title) ?? defaultTitle;
    const vettedIcon = validateString(iconUrl) ?? defaultIcon;

    chrome.notifications.create({
        type: 'basic',
        iconUrl: vettedIcon,
        title: vettedTitle,
        message: message,
        priority: 1
    });
}