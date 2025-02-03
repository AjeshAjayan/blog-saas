import { gql } from "@apollo/client";

export const PUBLISH_BLOG = gql`
    mutation PublishBlog($publishBlogId: ID!) {
        publishBlog(id: $publishBlogId)
    }
`