# catswork-web-client

## Setup
1. Run `npm install`
2. Run `npm run build`
3. Use `catswork-server` to server built client files

## Dev Mode
To make it running in the dev mode, do 

```
npm run start
```
And this will make the project up and running in dev mode 


## Understanding frontend 
Frontend on start, makes an api call to backend endpoint `api/status` this will determine the sate, 

The relavent content for the same can determine in `src/state/state.js`. The enum and expected value which `api/status` would give as json is also available as enums.  

If there isn't any cookie or if the key isn't valid it will send empty JSON
