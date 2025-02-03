import { gql } from "@apollo/client";

export const SAVE_BLOG = gql`
    mutation AddBlog($title: String!, $contents: String!, $id: ID) {
        addBlog(title: $title, contents: $contents, id: $id) {
            id
        }
    }

`