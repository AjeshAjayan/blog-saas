import { gql } from "@apollo/client";

export const SAVE_BLOG = gql`
    mutation AddBlog($title: String!, $contents: [String]!) {
        addBlog(title: $title, contents: $contents) {
            title
        }
    }
`