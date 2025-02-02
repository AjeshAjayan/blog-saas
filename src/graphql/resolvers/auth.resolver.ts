import { loginController } from "../controllers/login.controller";

export const authResolver = {
    Mutation: {
        login: (_: any, { email, password }: any) => {
            return loginController(email, password);
        }
    }
}