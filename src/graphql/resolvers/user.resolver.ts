import { signUpController } from "@/graphql/controllers/auth/signup.controller";

export const userResolvers = {
    Mutation: {
        addUser: (_ : any, { name, email, password }: any) => {
            return signUpController(name, email, password);
        },
    },
};
