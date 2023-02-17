# Amazonian Prime

## Local Developement
In order to get started, run the following commands:
`cd backend && yarn dev:start`
In a new terminal:
`cd frontend && yarn start` (be sure to run `yarn` in `./frontend` before)


## Manual Deployment
In order to start a deployment process follow these steps:

1. Log into your AWS IAM, go to the cloudformation stacks
2. Delete both stacks (may require mannualy emptying and deleting S3 instances)
3. From `./backend`, run `git pull` in `main` branch
4. run `sam build && sam deploy --guided` (name the stack "amazonian-prime-stack"), use defaults for other inputs
5. From `./frontend` run `yarn build`
6. Copy the **contents** of the build folder into the newly created Frontend S3 instance. Save.
7. Modify the permissions:
  a. Within the Frontend S3 instance, Enable static website (with index.html defaults added)
  b. Within the Frontend S3 error pages, add error page for `403` with index.html default
