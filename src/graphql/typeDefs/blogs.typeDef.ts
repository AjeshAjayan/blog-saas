import { gql } from "@apollo/client";

export const blogsTypeDefs = gql`
    type Blog {
        id: ID!
        title: String!
        userId: ID
        slug: String!
        content: String!
        createdAt: String!
        updatedAt: String!
    }

    type PublishBlogResponse {
        message: String!
    }


    type Query {
        blogs: [Blog]
        blogBuUser: [Blog]
        blogById(id: ID!): Blog
    }

    type Mutation {
        addBlog(id: ID, title: String!, contents: String!): Blog
        updateBlog(id: ID!, title: String, content: String): Blog
        deleteBlog(id: ID!): Blog
        publishBlog(id: ID!): PublishBlogResponse
    }
`