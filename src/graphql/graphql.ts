import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./typeDefs/user.typeDef";
import { userResolvers } from "./resolvers/user.resolver";
import { authResolver } from "./resolvers/auth.resolver";
import { authTypeDefs } from "./typeDefs/auth.typeDef";

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, authResolver]);
