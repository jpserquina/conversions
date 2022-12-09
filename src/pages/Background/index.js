import { notify } from "../Content/modules/notify";
import * as conversions from "../Content/modules/convert";

console.log('This is the background page.');
console.log('Put the background scripts here.');

export const copySelection = async () => {
    const [tab] = await chrome.tabs.query(
        {active: true, currentWindow: true}
    );
    console.log("copySelection: tab.id: " + tab.id);
    let result;
    try {
        [{result}] = await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: () => getSelection().toString(),
        });
    } catch (e) {
        return; // ignoring an unsupported page like chrome://extensions
    }
    const convertedResult = conversions.convertInchesToCentimeters(result);

    return await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        args: [convertedResult],
        func: (convertedResult) => {
            const range = getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(convertedResult));
        },
    }).finally( () => {
        return getSelection().toString();
    });
};

const contextClick = (info, tab) => {
    const { menuItemId } = info

    if (menuItemId === 'foo') {
        // do something
        copySelection().then((result) => notify(result))
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'foo',
        title: 'Convert!',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(contextClick);