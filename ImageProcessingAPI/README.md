# Image Processing API
Our app is able to take advantage of sharp library to resize images with just adding the dimensions as query url parameters. 

## Packages
Structuring the project is as scalable as it can be with all required packages
### typescript
I used typescript to make the most use of the strict typing.
### prettier
I used prettier to make my code well formatted.
### eslint
I used eslint to make my code more strict against suspected errors.
### express
I used express to build my own server and organizing access to endpoints.
### jasmine and supertest
I used jasmine with supertest to make unit tests to my endpoints.
### sharp
I used sharp to make the main fuctionality of resizing my images.

## Scripts
Here I will show scripts used for build/start/test the application.
### build script
We can build our application by transpiling from typescript to javascript by running the following command:
### start script
We can start our server before transpiling from typescript to javascript by running the following command:
$ npm run start $
### start:dist script
We can start our server after transpiling from typescript to javascript by running the following command:
$ npm run start:dist $
### test script
We can test our script using jasmine by running the following command:
$ npm run test $

## Endpoints
Here I will show endpoints that can be accessed on our server
### localhost:3000/
This is the main endpoint where we can see "Hello there!" message when we access it.
### localhost:3000/images
This is our image processing server endpoint that we should add our following query parameters at its trail.
#### filename
We should input requested image name as a value to this parameter.
#### width
We should input requested image width as a value to this parameter.
#### height
We should input requested image height as a value to this parameter.




