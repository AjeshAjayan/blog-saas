import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_API_URL + '/api/graphql',
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;