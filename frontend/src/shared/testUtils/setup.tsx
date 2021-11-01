import { ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';

import Routes from '../../Routes';
import mockTheme from './mockTheme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App = (
  <ThemeProvider theme={mockTheme}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </ThemeProvider>
);

const customRender = () => render(App);

// override render method
export default customRender;
