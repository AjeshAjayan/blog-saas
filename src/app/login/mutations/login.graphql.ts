import { gql } from "@apollo/client";

export const LOGIN_GRAPHQL = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            message
        }
    }
`