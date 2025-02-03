import { gql } from '@apollo/client';

export const authTypeDefs = gql`
    type LoginResponse {
        message: String!
    }

    type StatusResponse {
        auth: Boolean!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse
        getStatus: StatusResponse
    }
`;
