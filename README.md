# tumssum

직접 쓰는 가계부, 틈씀이

## Dependencies

### Frontend

- Preact
- Typescript
- SASS
- i18next
- Storybook

### Backend

- Python & Django
- NginX, uWsgi
- MySQL
- SSR
- Docker
- AWS EC2 (Ubunto 20.04 LTS) with Elastic IP
- AWS RDS (MySQL)
- AWS Route 53
- ~~AWS EB~~ => AWS CodeDeploy
- Travis CI

## 개발환경설정

### 서버

파이썬 3 설치
[파이썬 홈페이지](https://www.python.org/)에서 다운로드/설치

mysql 설치
```
brew install mysql
```

가상환경 설정
```
// 설치
tumssum/server> python3 -m venv ./venv

// 가상 환경 진입
tumssum/server> source venv/bin/activate
```

의존성 설치
```
pip3 install -r requirements.txt
```



## Environments

### .env files

- `server/server/settings/.env`: for server development.
- `client/.env`: for client development.
- `.env`: for production build with docker-compose including client and server environment variables. if using AWS EB, don't need this.

### Dockerfiles

- `client/Dockerfile.dev`: Dockerfile for running a client development.
- `server/Dockerfile.dev`: Dockerfile for running a server development.
- `docker-compose.dev.yml`: Run development servers
- `Dockerfile`: Dockerfile for production build
- `nginx/Dockerfile`: Dockerfile for production build
- `docker-compose.yml`: Build client static files and run production server (nginx, uwsgi)

if using AWS EB, use only `Dockerfile` and `nginx/Dockerfile` without `docker-compose.yml` file.
if using AWS CodeDeploy, use `docker-compose.yml` with Dockerfiles.


## CLI Commands

### Docker

- `docker-compose -f docker-compose.dev.yml up`: Run development servers.

### Development

- ~~`mysql.server start`: Start a mysql local server.~~
- `source venv/bin/activate`: activating virtual environment.
- `py manage.py runserver --settings=server.settings.local`: Run a django development server.
- `client/yarn start`: Run a preact development server.


### Frontend

- `client/npm install`: Installs dependencies
- `client/npm run start`: Run a development, with Parcel Builder
- `client/npm run build`: Run a production build, with Parcel Builder
- `client/npm run lint`: Pass TypeScript files using ESLint
- `client/npm run test`: Run Jest and Enzyme with
- `client/npm run storybook`: Run a storybook dev server with 6006 port
- `client/npm run build-storybook`: Run a storybook build
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for your tests

### Backend

- `source venv/bin/activate`: Run a virtual env.
- `python3 manage.py runserver --settings=server.settings.local`: Run a development.

### EC2 SSH

- `sudo systemctl stop nginx uwsgi`: Stop webserver
- `sudo sh build.sh`: Build client files and move to static folder
- `sudo systemctl start nginx uwsgi`: Start webserver


## Branding
### Naming
### Concept
### Logo
### Color System
### Style Guide

## UI Planning
### Menu Tree
### Flow Chart
### Wireframes

## Dev Planning
### Features
### Entity Relationship Diagram
[DrawSQL Link](https://drawsql.app/johnyworld/diagrams/tumssum#)
