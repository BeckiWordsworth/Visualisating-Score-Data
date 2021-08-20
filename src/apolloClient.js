import ApolloClient from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {CONFIG} from './config';


const httpLink = createHttpLink({uri: CONFIG.GRAPHQL_URL});

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: `Token: ${CONFIG.TOKEN}`
        }
    });

    return forward(operation);
});


const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;

