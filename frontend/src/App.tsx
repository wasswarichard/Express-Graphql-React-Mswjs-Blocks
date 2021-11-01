import { ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { useTheme } from './shared/theme';
import { Layout } from './shared/components';
import Routes from './Routes';

const App = () => {
  const { theme } = useTheme();

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Layout>
          <Routes />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
