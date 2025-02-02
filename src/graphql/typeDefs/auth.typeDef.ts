import { gql } from '@apollo/client';

export const authTypeDefs = gql`
    type LoginResponse {
        message: String!
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse
    }
`;
