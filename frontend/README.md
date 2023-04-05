# Frontend Documentation

## Local Development
### Prerequisites
To get started locally run `yarn` within the `frontend` folder. Doing so should install all frontend dependencies. Furthermore, ensure that you've set up a proxy withint the `package.json` that allows the frotend to communicate with backend technologies. This proxy should be associated with the deployed backend S3 bucket in the respective AWS environment.

Visual Studio Code for IDE (version 1.75)
https://code.visualstudio.com/download 

Extensions: AWS Toolkit, ES7+ React/Redux/React-Native snippets

Yarn v.1.22.19
https://classic.yarnpkg.com/lang/en/docs/install/ 

Language: Typescript (version 4.4.2)

Framework:
- React (version 18.2.0)
- React Dom (version 18.2.0)
- Redux (version 5.0.0)
- SASS (version 1.58.0)

### Localhost
To start development locally, run `yarn dev:start` within the `frontend` folder.
