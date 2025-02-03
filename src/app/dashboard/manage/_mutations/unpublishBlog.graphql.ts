import { gql } from "@apollo/client";

export const UNPUBLISH_BLOG = gql`
    mutation unpublishBlog($publishBlogId: ID!) {
        unpublishBlog(id: $publishBlogId) {
            message
        }
    }
`