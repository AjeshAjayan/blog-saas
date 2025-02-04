import { gql } from "@apollo/client";

export const DELETE = gql`
    mutation DeleteBlog($deleteBlogId: ID!) {
        deleteBlog(id: $deleteBlogId) {
            message
        }
    }
`