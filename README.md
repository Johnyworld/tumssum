# tumssum-frontend

## Dependencies

### Frontend

- Preact
- Typescript
- SASS
- i18next
- Storybook
- PWA

### Backend

- Python & Django
- MySQL
- SSR
- Docker
- AWS EC2 (Ubunto 20.04 LTS) with Elastic IP
- AWS RDS (MySQL)
- AWS Route 53



## CLI Commands

### Frontend

- `client/npm install`: Installs dependencies
- `client/npm run start`: Run a development, with Parcel Builder
- `client/npm run build`: Run a production build, with Parcel Builder
- `client/npm run lint`: Pass TypeScript files using ESLint
- `client/npm run test`: Run Jest and Enzyme with
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for your tests

### Backend

- `source venv/bin/activate`: Run a virtual env.
- `python3 manage.py runserver --settings=server.settings.local`: Run a development.
