import "dotenv/config";
import { config, list } from "@keystone-6/core";
import { text, password, select, integer } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
});

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `id name email`,
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password(),
    },
  }),
  Product: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      description: text({
        ui: {
          displayMode: "textarea",
        },
      }),
      status: select({
        options: [
          { label: "Draft", value: "DRAFT" },
          { label: "Available", value: "AVAILABLE" },
          { label: "Unavailable", value: "UNAVAILABLE" },
        ],
        defaultValue: "DRAFT",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "hidden" },
        },
      }),
      price: integer(),
      // photo
    },
  }),
};

export default config(
  withAuth({
    db: {
      provider: "sqlite",
      url: `${process.env.DATABASE_URL}`,
    },
    server: {
      cors: { origin: [process.env.FRONTEND_URL], credentials: true },
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (ctx) => !!ctx.session?.data,
    },
  })
);
