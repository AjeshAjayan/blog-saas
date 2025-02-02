import { gql } from "graphql-tag";

export const authTypeDefs = gql`
    type LoginResponse {
        message: String!
    }

    type Mutation {
        login(name: String!, email: String!, password: String): LoginResponse
    }
`;
