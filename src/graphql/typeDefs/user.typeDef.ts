import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(name: String!, email: String!): User
        getUserByEmail(email: String!): User
    }
`;
