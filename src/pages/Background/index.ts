import { notify } from "../Content/modules/notify";
import * as conversions from "../Content/modules/convert";

console.log('This is the background page.');
console.log('Put the background scripts here.');

export const copySelection = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            await chrome.tabs.query(
                {active: true, currentWindow: true},
                async (tabs) => {
                    const tabId = tabs[0].id!;

                    const [{result}] = await chrome.scripting.executeScript({
                        target: {tabId: tabId},
                        func: () => { return getSelection()!.toString() }
                    });

                    const convertedResult = conversions.convertInchesToCentimeters(result);

                    await chrome.scripting.executeScript({
                        target: {tabId: tabId},
                        args: [convertedResult],
                        func: (convertedResult: any) => {
                            const range = getSelection()!.getRangeAt(0);
                            range.deleteContents();
                            range.insertNode(document.createTextNode(convertedResult));
                            resolve(getSelection()!.toString())
                        }
                    });
                }
            )
        } catch (e) {
            reject(e); // ignoring an unsupported page like chrome://extensions
        }
    });
};

const contextClick = (info: any) => {
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