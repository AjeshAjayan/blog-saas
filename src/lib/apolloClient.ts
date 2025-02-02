import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;