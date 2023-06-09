let OptionsUrl = chrome.runtime.getURL("/options.html")
chrome.runtime.onInstalled.addListener(async () => {
    chrome.tabs.create(
      {
        url: OptionsUrl,
      },
    )
  })
export {}
