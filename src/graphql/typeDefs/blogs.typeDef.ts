import { gql } from "@apollo/client";

export const blogsTypeDefs = gql`
    type Blog {
        id: ID!
        title: String!
        userId: ID
        content: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        blogs: [Blog]
        blogBuUser: [Blog]
    }

    type Mutation {
        addBlog(title: String!, contents: [String]!): Blog
        updateBlog(id: ID!, title: String, content: [String]): Blog
        deleteBlog(id: ID!): Blog
        publishBlog(id: ID!): Boolean
    }
`