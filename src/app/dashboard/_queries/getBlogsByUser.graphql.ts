import { gql } from "@apollo/client";

export const GET_BLOGS_BY_USER = gql`
    query Blogs {
        blogBuUser {
            content
            title
            slug
            id
            createdAt
        }
    }
`