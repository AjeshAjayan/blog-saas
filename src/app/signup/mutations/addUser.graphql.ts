import { gql } from "@apollo/client";

export const ADD_USER_GRAPHQL = gql`
    mutation AddUser($name: String!, $email: String!, $password: String) {
        addUser(name: $name, email: $email, password: $password) {
            message
        }
    }
`