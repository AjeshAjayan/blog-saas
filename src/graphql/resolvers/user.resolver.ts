
export const userResolvers = {
    Query: {
        users: () => [
            { id: "1", name: "John Doe", email: "john@example.com" },
            { id: "2", name: "Jane Doe", email: "jane@example.com" },
        ],
    },
    Mutation: {
        addUser: (_ : any, { name, email }: any) => {
            return { id: Date.now().toString(), name, email };
        },
    },
};
