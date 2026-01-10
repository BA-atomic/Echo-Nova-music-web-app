
### [Frontend] Testing locally: iOS itunes API workaround

> Run this frontend app locally. VScode's live server would usually run your frontend on port 5500 i.e. on http://localhost:5500 for other devices apart from iOS. For iOS, use IP address as directed below.

Step 1: [Get your IP address](https://www.google.com/search?q=how+to+use+IP+address+to+run+localhost+app&oq=how+to+use+IP+address+to+run+localhost+app&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRiPAjIHCAQQIRiPAtIBCjExMDkxM2owajeoAgiwAgHxBW-szHdy5bbI8QVvrMx3cuW2yA&sourceid=chrome&ie=UTF-8)

Step 2: In browser on iOS device, go to http://YOUR_IP_ADDRESS_GOES_HERE:5500, to see the app running.

Step 3: In the frontend's helper.js, locate the iOS code below and replace this part of the backend URL `YOUR_IP_ADDRESS_GOES_HERE` with your IP address.

````
const response = await fetch(`http://YOUR_IP_ADDRESS_GOES_HERE:4000 ...etc.
````

Step 4: Visit the Backend repo's readme for instructions on how to ensure successful itunes music fetch on iOS devices.

### [Backend] Production: iOS itunes API workaround

Step 1: In the frontend's helper.js, in the iOS code, locate the comment that says `This is for development`, comment out the block of code below.

Step 2: Still in the same helper.js, also locate the comment that says: `This is for production`, uncomment the block of code below.

Step 4: Visit the Backend repo's readme for instructions on how to ensure successful itunes music fetch on iOS devices.