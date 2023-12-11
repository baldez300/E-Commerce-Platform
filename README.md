# Metropolia WebDev Project

## Installation

### Frontend

- cd frontend

- npm install

- npm start

### Backend

- cd backend

- npm install

- npm run dev

### Creating TOKEN_SECRETS

- Create a file called `.env` in the root folder

- Open new terminal and run `node` to open node console

- Run `require('crypto').randomBytes(64).toString('hex')` to generate a random string

- Copy the string and paste it to `.env` file as `ACCESS_TOKEN_SECRET=yourRandomString`

- Do the same for `REFRESH_TOKEN_SECRET`

## Best practices

### Components

- Use `./src/components/ComponentName/ComponentName.js` for component logic

- Export the component as default

  ```javascript
  export default ComponentName;
  ```

- Make `./src/components/ComponentName/index.js`

  ```javascript
  export { default } from "./ComponentName";
  ```

- Usage

  ```javascript
  import ComponentName from "../ComponentName";
  ```

### CSS

- Use `./src/css/style.css` for global styles

- Use `./src/css/styleguide.css` for declaring global variable styles

- Use `./src/components/ComponentName/ComponentName.css` for component specific styles  
  these styles should match the component's classNames and only be used in that component

### Images

- Use `./src/images/subfolder` for images.  
  `/subfolder` can be for example `./src/images/products` or `./src/images/icons`

- Usage

  ```javascript
  import whatever from "../../images/imageFolder/imageName.png";
  ```

### State variable / signals

- Signals have many benefits over react's useState, but  
  useState has it's own purposes and should be used when  
  needed.
  Otherwise it's recommended to use react signal from preact library

  ```javascript
  import { signal } from "@preact/signals-react";
  ```

- Declaration

  ```javascript
  export let signalName = signal('initial value'); // the value can be anything (true, false, 1, "String", [], {})
  ```
  
  Export it in the index.js file
  
  ```javascript
  export { signalName } from "./ComnponentName";
  ```

- Usage in another component

  ```javascript
  import { signalName } from "../ComponentName";
  ```

- Accessing the value

  ```javascript
  signalName.value = "new value";
  ```

### Recommended material 
  - Signals  

    <a href="https://www.youtube.com/watch?v=SO8lBVWF2Y8&list=PLAF7qpb3JaOsnblzvagARCIoO5gplFyR3&index=11&t=690s&ab_channel=WebDevSimplified">
    <img src="https://i.ytimg.com/vi/SO8lBVWF2Y8/maxresdefault.jpg" alt="Watch the video" width="200"/>
    </a>  

    <br>
    
  -  Icons  

     Useful library for icons: [React Icons](https://react-icons.github.io/react-icons/)  

     <br>

  -  Git   

     Best Practices for Naming [Git Branches](https://tilburgsciencehub.com/building-blocks/collaborate-and-share-your-work/use-github/naming-git-branches/)


## Backend
### Setting for DB
  Put in .env url for connecting to DB. If you need to create your own database, the data can be found in the file request.rest in the root directory of the project

  
            ```javascript
            MONGO_URI = mongodb+srv://vladimirpiniazhin:cWHaPUvcw2RekFQm@cluster0.xrdatkq.mongodb.net/test
            ```

### install dependency modal for Payment Method
  ```javascript
  npm install react-modal
  ```