# chadGPT

Add context to your chatGpt prompts. It gets the top 2 results from duckduckgo, parses them, gets their embeddings, uploads them to pinecone and gets the most similar result for your query.
Activate it by pressing cmd+enter when you're done typing your prompt.

### How to use

It's not on the chrome extension store yet so you will have to clone it locally. No other setup is required.

- clone the repo
- go to `chrome://extensions`
- click on `enable developer mode`
- click on `load unpacked` and upload saved repo
- go to `https://chat.openai.com/chat`, ask it a question as you would normally
- instead of clicking submit or pressing enter, press `cmd+enter` on macos and `ctrl+enter` on Windows
- chadGpt will add context to your prompt! (you may have to wait for a couple of seconds)
