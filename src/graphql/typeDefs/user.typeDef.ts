import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
    }

    type AddUserResponse {
        message: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String): AddUserResponse
        getUserByEmail(email: String!): User
    }
`;
