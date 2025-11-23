import "dotenv/config";
import { config, list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  integer,
  relationship,
  image,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { insertSeedData } from "./seed-data";

function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

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
      photo: relationship({
        ref: "ProductImage.product",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
          inlineEdit: { fields: ["image", "altText"] },
          linkToItem: true,
        },
      }),
    },
  }),
  ProductImage: list({
    access: allowAll,
    fields: {
      image: cloudinaryImage({
        label: "Source",
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_API_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
          folder: `${process.env.CLOUDINARY_API_FOLDER}`,
        },
      }),
      altText: text(),
      product: relationship({ ref: "Product.photo" }),
    },
  }),
};

export default config(
  withAuth({
    db: {
      provider: "sqlite",
      url: `${process.env.DATABASE_URL}`,
      onConnect: async (ctx) => {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(ctx);
        }
      },
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
