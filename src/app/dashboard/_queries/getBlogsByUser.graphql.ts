import { gql } from "@apollo/client";

export const GET_BLOGS_BY_USER = gql`
    query Blogs {
        blogBuUser {
            content
            title
            slug
            id
            createdAt
            published
        }
    }
`

export const GET_SINGLE_BLOG = gql`
    query BlogById($blogByIdId: ID!) {
        blogById(id: $blogByIdId) {
            content
            title
            published
        }
    }
`