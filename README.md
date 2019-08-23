# catswork-web-client

## Setup
1. Run `npm install`
2. Run `npm run build`
3. Use `catswork-server` to server built client files

## Dev Mode
To make it running in the dev mode, do 

```
npm run dev
```
And this will make the project up and running in dev mode 

if you are running in dev environment then make sure you have the frontend pointing to the dev server. To make the frontend point to the dev, 

1. Make sure that in `src/services/status.js` we have `get` axios request pointing to `locahost:8080` 
 If not already change the url to `http://localhost:8080/api/status` 

2.  Make sure that `src/config.js` points to localhost:8080

```
const config = {
	server: {
		url: 'http://localhost:8080/',
		graphQLPath: 'graphql'
	}
}
```

In future we will create environment variables for Chrome extension and React

## Understanding frontend 
Frontend on start, makes an api call to backend endpoint `api/status` this will determine the sate, 

The relavent content for the same can determine in `src/state/state.js`. The enum and expected value which `api/status` would give as json is also available as enums.  

If there isn't any cookie or if the key isn't valid it will send empty JSON
