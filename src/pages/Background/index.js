import { notify } from "../Content/modules/notify";

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
    return(result);
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