import { loginController } from "../controllers/auth/login.controller";
import { statusController } from "../controllers/auth/status.controller";

export type GQLContext = {
    auth: boolean;
    user: any;
}

export const authResolver = {
    Mutation: {
        login: (_: any, { email, password }: any) => {
            return loginController(email, password);
        },
        getStatus: (_: any, __: any, context: any) => {
            return statusController(context);
        }
    }
}