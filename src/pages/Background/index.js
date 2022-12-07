console.log('This is the background page.');
console.log('Put the background scripts here.');

export const copySelection = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
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
    return("result: `" + result + "`");
};

const contextClick = (info, tab) => {
    const { menuItemId } = info

    if (menuItemId === 'foo') {
        // do something
        copySelection().then((result) => alert(result))
    }
}

chrome.contextMenus.onClicked.addListener(contextClick)

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'foo',
        title: 'first',
        contexts: ['selection']
    })
});