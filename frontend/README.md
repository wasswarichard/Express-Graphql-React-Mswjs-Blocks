# Block Explorer

[Live Demo](https://blockexplorer-react-app.herokuapp.com/ 'blockexplorer')

## Libraries/Frameworks used

- **Backend** : Express, TypeScript, Apollo Server, Jest, SuperTest, Nock
- **Frontend** : React, TypeScript, Apollo Client, Material UI, Jest, React Testing Library, mswjs

## Design decisions

### Backend

- **API Design** : The API is implemented in GraphQL using Apollo Server. It supports offset-limit based pagination for the list of blocks and transactions. The resolvers uses blockchain.info's REST API to get the blocks data.
- **Caching & Performance** : The API response is cached using Apollo Server's in-memory cache. The expiry time of the cache is configurable using the `APOLLO_CACHE_EXPIRY_TIME_IN_SECS` env variable. For the given use cases, the in-memory Apollo cache provides excellent performance. For more flexible and advanced use cases Redis or Memcached can be used.
- **Testing** : All the GraphQL operations are tested using integration test cases using Jest and SuperTest. The REST APIs to blockchain.info are mocked using [nock](https://github.com/nock/nock).
- **Linting & Formatting** : The codebase is linted using ESLint and formatted using Prettier.
- **Deployment** :
  - The GraphQL layer can be developed and deployed in AWS AppSync (provides caching for improved performance, subscriptions for real-time updates and authentication and authorization integrations). In this code GraphQL is implemented via `apollo-server-express` as Express middleware.
  - The Express nodejs server can be dockerized and deployed in container orchestration platforms like Kubernetes or AWS EKS, ECS or Fargate.
- **Logging & Monitoring** : The application logs and metrics can be logged and monitored in services like AWS CloudWatch or Datadog.

### Frontend

- **Code Organisation** : The `shared` directory contains all the reusable artifacts. The `pages` directory contain the navigable pages in the UI.
- **API Client** : Apollo Client(React) is used as the GraphQL client. Alternatively, [React Query](https://react-query.tanstack.com/) (supports both REST and GraphQL) can be used. Both of these library supports React hooks based APIs, caching, polling, parallel queries, pagination, etc.
- **Caching & Performance** : Apollo Client caches the queries in-memory. Combined with server-side caching of Apollo, this provides nice performance boost to the application.
- **Testing** : The usecases are covered with integration testing using React testing library. The shared components have unit tests using Jest. API mocking is done using [mswjs](https://mswjs.io/) (intercepts GraphQL and REST requests at ServiceWorker layer and mocks them).
- **Component library** : Components and Grid system of [material-ui](https://material-ui.com/) is used.
- **Component styling** : CSS-in-JS solution of material-ui is used.
- **Linting & Formatting** : The default CRA ESLint config is extended to lint GraphQL queries using `eslint-plugin-graphql`. Prettier for code formatting. husky and lint-staged are used as auxiliary library.
- **Deployment** : Since the Frontend is a static webapp, it can be hosted in AWS S3 and served via a CDN like AWS CloudFront. For demo, this application is hosted in Heroku.
- **Logging & Monitoring** : A service like [Sentry](https://sentry.io/for/react/) can be used to monitor performance and errors.

## Further improvements

- The application can be built as a real-time dashboard like https://www.blockchain.com/explorer/. For this a push-based approach using GraphQL Subscriptions or WebSockets can be used. For a pull-based approach, WebWorker can be used. API clients like Apollo Client and React Query have out-of-the-box support for polling at regular intervals in the background.
- Additional functionalities like the following can be implemented:
  - Browsing a block transaction
  - Filtering and sorting support can be added to the API and the DataTable
  - Switching to dark mode can be added. The useTheme() custom hook used in the code can be extended to implement this feature.
- E2E test cases can be added using Cypress or TestCafe

## To run locally

1. Inside the `backend` directory, run `yarn install` to install the backend dependencies.
2. Create a `.env` file under `backend` directory and set the following environment variables:

```
BLOCKCHAIN_API_ENDPOINT=https://blockchain.info
APOLLO_CACHE_EXPIRY_TIME_IN_SECS=300
```

3. Start the express server using `yarn start`. If everything goes well, you should see the following messages in console:

```
Server listening on port 5000
```

Now that the express server is running, bootstrap the frontend:

4. Inside the `frontend` directory, run `yarn install` to install the frontend dependencies.
5. Create a `.env` file under `frontend` directory and set the following environment variables:

```
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:5000/graphql
```

6. Start the frontend dev server unsing `yarn start`.

## Test cases snapshot

Backend:

![Snapshot of backend cases](/docs/backend-testcases.png)

Frontend:

![Snapshot of backend cases](/docs/frontend-testcases.png)

Thanks for your time :)
