import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = createHttpLink ({
    uri: 'https://api.graph.cool/simple/v1/ck3kfd60w0rem0119435prs9v'
    
})

const client = new ApolloClient ({
    link: httpLink,
    cache: new InMemoryCache()
})

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)


ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
