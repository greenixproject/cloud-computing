# cloud-computing

## Documentation

- [API ML Documentation](https://documenter.getpostman.com/view/14640466/Uz5MFZqa#55535879-eec6-49a0-899d-de696afce2c0)
- [API Backend Documentation](https://documenter.getpostman.com/view/23232897/2s93sf2Axt)
- [Database ERD](https://lucid.app/lucidchart/270d9b81-a3d0-43f3-ac7b-0dd1050e204f/edit?viewport_loc=-500%2C-436%2C2719%2C1364%2C0_0&invitationId=inv_86045c3e-4f6b-4d06-a871-5cf6277cd5fe)

## TODO

- [x] Gethering requirements for cloud solutions, design, and architectures
- [x] Developing API Backend using NodeJs
- [x] Configuring GCP Project, budget, and API
- [x] Hosting database Postgre SQL to Cloud SQL
- [x] Deploy API Backend to APP engine
- [x] Deploy Machine Learning to Cloud Run
- [x] Monitoring running resources from GCP

## GCP Resources

- App Engine : to host api
- Cloud SQL : to host postgre sql
- secret manager : save key or credential
- Cloud Run : deploy api for ml

## Repository API
- [Repo API Backend](https://github.com/greenixproject/cloud-computing/tree/test-api)
- [Repo API ML](https://github.com/greenixproject/API-ML)

## Local Installation Instructions

Fork and clone the forked repository:

```shell
git clone git://github.com/<your_fork>/cloud-computing
```

Navigate into cloned repository:

```shell
cd cloud-computing
```

Install all required packages:

```shell
npm install
```

Run the NodeJS API:

```shell
npm run start
```

API will run on [http://localhost:8081(http://localhost:8081)

## GCP Deployment Instructions

Fork and clone the forked repository in cloud shell, enable API and right permission.

```shell
git clone git://github.com/<your_fork>/cloud-computing
```

Move to project directory:

```shell
cd cloud-computing
```

Deploy to appengine:

```shell
gcloud app deploy
