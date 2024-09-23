let users = [
  { key: "1", name: "Aleksei Vavulo", age: 36, address: "Russia" },
];

export const mockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/users",
        method: "get",
        routes: [
          {
            data: () => users,
          },
        ],
      },
      {
        path: "/users",
        method: "post",
        routes: [
          {
            data: (req) => {
              const newUser = req.body;
              users.push(newUser);
              return newUser;
            },
          },
        ],
      },
      {
        path: "/users/:key",
        method: "delete",
        routes: [
          {
            data: (req) => {
              const { key } = req.params;
              users = users.filter(user => user.key !== key);
              return { success: true };
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
