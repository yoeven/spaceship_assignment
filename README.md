# Spaceship


## Instruction to run locally

Run the following commands in sequence to start node application

1. Install [node & npm](https://nodejs.org/en/) 
2. Install [yarn](https://yarnpkg.com/)
3. Install expo by running `npm install --global expo-cli`
4. Clone the project and navigate to the root using your terminal
5. Run `yarn or npm install` to install dependencies
6. Create `.env` file and add required private keys or add provided `.env` file in root of project
7.  Running `yarn start` will start the react-native and expo instance locally
8. Run either a android or ios emulator
9. Using the web interface either click run on android or run on ios

## Folder Stucture

| name | description |
|--|--|
| App.js | Consist of initialisation and and routing of app
| NavigationService.js| Global Navaigation Manager allowing for full control of alerts and routing in project |
| pages | Consist of all app routes
| components | Consist of individual components micro components. Each component folder is named according to the components name in the index.js file |
| processors | Share functionality within the whole project |
| assets | Local assets such as images and fonts using within the project |

## Contribution
1. Use a IDE that supports plugin support such as prettier and eslint for consistent formating
2. Fork the project and make adjustments based on [trello board](https://trello.com/b/4j1MI8X3/spaceshipdev)
3. Send PR request with appropriate standard
4. Either follow [this](https://github.com/firstcontributions/first-contributions) or [this](https://github.com/freeCodeCamp/how-to-contribute-to-open-source) for better contributions


Current user flow chart:

![enter image description here](https://i.imgur.com/2EwKrHR.png)
