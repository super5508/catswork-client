# catswork-web-client

## Setup
1. Run `npm install`
2. Run `npm run build`

## Dev Mode
To make it running in the dev mode, do 

```
npm run dev
```
And this will make the project up and running in dev mode 

To make production build 

```
npm run prod 
```

This will make a production build 

<strong> Note: </strong>: Prefer making build on the client and then take a pull from the server 


## Making it in the production mode. 

Go to the compute instance, select backend-test instance from the list. 

Do `ls` to list all the folder in the directory. 

1. Go to `catswork-web-client` folder or something like that (check the exact name for folder) 

``` cd catswork-web-client``` 

2. then do ```git pull``` to pull production which you commited earlier. 

If you haven't commited production build then do 

```
npm install
```

to install npm dependency 

and then ```npm run build ``` (building React App increases the server processing which might crash the server, best is to build it on your local machine and then commit it out) 

## Understanding frontend 
Frontend on start, makes an api call to backend endpoint `api/status` this will determine the sate, 

The relavent content for the same can determine in `src/state/state.js`. The enum and expected value which `api/status` would give as json is also available as enums.  

If there isn't any cookie or if the key isn't valid it will send empty JSON
