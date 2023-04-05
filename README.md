# Amazonian Prime

Working from home has become a norm for many people since the pandemic, but it has also brought negative impacts such as decreased productivity, isolation, and blurred boundaries between work and personal life. The absence of in-person interactions and face-to-face communication can lead to feelings of loneliness and disconnection from one's colleagues and workplace culture.

As such, this project aims to provide a secure and user-friendly platform for employees to buy and sell items within the company. The marketplace will be accessible by all employees and will provide an opportunity for them to communicate and transact, leading to increased employee morale and improved work relationships. The ultimate goal of the project is to promote a positive and collaborative work environment for employees. 

The e-commerce marketplace will feature a user profile, listing & purchasing, payment and shipping status systems, and an admin panel. The project timeline is estimated to be 12 weeks, including design, development, testing, and deployment. 

The budget for this project will leverage the free-tier of AWS services which include Amazon RDS for the database. This will cover costs for development, testing, and deployment, as well as any additional expenses such as hardware and software requirements. If there are more costs required, we will reevaluate our budget with the sponsor.

The deliverables for this project will be a fully functional e-commerce application that is easy to use, secure, and accessible by all employees. The project team will also provide support to ensure that any bugs identified after the deployment of the application are addressed. 


[embed]https://www.dropbox.com/s/x9ys1ie9xj75oji/User%20Documentation.docx.pdf?dl=0 [/embed]

## Local Developement
Check `READ.ME` within `frontend`

## Git Actions Deployment
When committing directly to the `main` branch, it will automatically trigger a Github action to start the deployment process. When the deployment/ Git action finishes, the production application should update itself.

### Invalidate cache
Check if CloudFront is caching the frontend by looking for blank pages or syntax errors in the console on the production site.
If you find an error in the console and the file it is referencing no longer exists in the S3 frontend bucket, then you need to clear the cache.
Go to the CloudFront console and create an invalidation by copying one of the existing invalidations.
In the new invalidation, specify the path or paths to the files you want to invalidate. You can use wildcards to specify multiple files.
Click "Create Invalidation" to clear the cache.
Inform the team that you plan to clear the cache, so they are aware of the change.

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
