"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config2 = require("dotenv/config");
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var import_cloudinary2 = require("@keystone-6/cloudinary");

// seed-data/index.ts
var import_config = require("dotenv/config");

// seed-data/products.json
var products_default = [
  {
    name: "Yeti Hondo",
    description: "soo nice",
    status: "AVAILABLE",
    price: 3423,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg",
    filename: "hondo.jpg"
  },
  {
    name: "Airmax 270",
    description: "Great shoes!",
    status: "AVAILABLE",
    price: 5234,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579815920/sick-fits-keystone/5e2a13f0689b2835ae71d1a5.jpg",
    filename: "270-camo-sunset.jpg"
  },
  {
    name: "KITH Hoodie",
    description: "Love this hoodie",
    status: "AVAILABLE",
    price: 23562,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579815935/sick-fits-keystone/5e2a13ff689b2835ae71d1a7.jpg",
    filename: "kith-hoodie.jpg"
  },
  {
    name: "Fanorak",
    description: "Super hip. Comes in a number of colours",
    status: "AVAILABLE",
    price: 252342,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579815957/sick-fits-keystone/5e2a1413689b2835ae71d1a9.png",
    filename: "TNF-fanorak.png"
  },
  {
    name: "Nike Vapormax",
    description: "Kind of squeaky on some floors",
    status: "AVAILABLE",
    price: 83456,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579815980/sick-fits-keystone/5e2a142c689b2835ae71d1ab.jpg",
    filename: "vapormax.jpg"
  },
  {
    name: "Yeti Cooler",
    description: "Who spends this much on a cooler?!",
    status: "AVAILABLE",
    price: 75654,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579815999/sick-fits-keystone/5e2a143f689b2835ae71d1ad.jpg",
    filename: "coral-yeti.jpg"
  },
  {
    name: "Naked and Famous Denim",
    description: "Japanese Denim, made in Canada",
    status: "AVAILABLE",
    price: 10924,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816030/sick-fits-keystone/5e2a145d689b2835ae71d1af.jpg",
    filename: "naked-and-famous-denim.jpg"
  },
  {
    name: "Rimowa Luggage",
    description: "S T E A L T H",
    status: "AVAILABLE",
    price: 47734,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816060/sick-fits-keystone/5e2a147b689b2835ae71d1b1.png",
    filename: "rimowa.png"
  },
  {
    name: "Black Hole ",
    description: "Outdoorsy ",
    status: "AVAILABLE",
    price: 4534,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816093/sick-fits-keystone/5e2a149b689b2835ae71d1b3.jpg",
    filename: "patagonia black hole.jpg"
  },
  {
    name: "Nudie Belt",
    description: "Sick design",
    status: "AVAILABLE",
    price: 5234,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816114/sick-fits-keystone/5e2a14b1689b2835ae71d1b5.jpg",
    filename: "nudie-belt.jpg"
  },
  {
    name: "Goose",
    description: "Keep warm.",
    status: "AVAILABLE",
    price: 74544,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816128/sick-fits-keystone/5e2a14bf689b2835ae71d1b7.jpg",
    filename: "canada-goose.jpg"
  },
  {
    name: "Ultraboost",
    description: "blacked out",
    status: "AVAILABLE",
    price: 6344,
    photoUrl: "https://res.cloudinary.com/wesbos/image/upload/v1579816141/sick-fits-keystone/5e2a14cc689b2835ae71d1b9.jpg",
    filename: "ultra-boost.jpg"
  }
];

// seed-data/index.ts
var import_cloudinary = require("cloudinary");
import_cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});
async function insertSeedData(ctx) {
  console.log("REMOVE THIS LINE TO SEED");
  return;
  await ctx.db.ProductImage.deleteMany({
    where: (await ctx.db.ProductImage.findMany({})).map((img) => ({ id: img.id }))
  });
  await ctx.db.Product.deleteMany({
    where: (await ctx.db.Product.findMany({})).map((p) => ({ id: p.id }))
  });
  console.log(`\u{1F331} Inserting Seed Data: ${products_default.length} Products`);
  for (const product of products_default) {
    console.log(`  \u{1F6CD}\uFE0F Adding Product: ${product.name}`);
    const res = await import_cloudinary.v2.uploader.upload(product.photoUrl, {
      folder: process.env.CLOUDINARY_API_FOLDER
    });
    const cloudinaryImageData = {
      id: res.public_id,
      filename: product.filename,
      originalFilename: product.filename,
      mimetype: "image/jpeg",
      encoding: "7bit",
      _meta: {
        public_id: res.public_id,
        version: res.version,
        signature: res.signature,
        width: res.width,
        height: res.height,
        format: res.format,
        resource_type: res.resource_type,
        created_at: res.created_at,
        tags: res.tags || [],
        bytes: res.bytes,
        type: res.type,
        etag: res.etag,
        placeholder: false,
        url: res.url,
        secure_url: res.secure_url,
        original_filename: "file"
      }
    };
    const productImage = await ctx.prisma.productImage.create({
      data: {
        image: JSON.stringify(cloudinaryImageData),
        altText: product.description
      }
    });
    await ctx.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        status: product.status,
        price: product.price,
        photo: { connect: { id: productImage.id } }
      }
    });
  }
  console.log(`\u2705 Seed Data Inserted: ${products_default.length} Products`);
}

// keystone.ts
var session = (0, import_session.statelessSessions)({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET
});
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `id name email`,
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)()
    }
  }),
  Product: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "DRAFT" },
          { label: "Available", value: "AVAILABLE" },
          { label: "Unavailable", value: "UNAVAILABLE" }
        ],
        defaultValue: "DRAFT",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "hidden" }
        }
      }),
      price: (0, import_fields.integer)(),
      photo: (0, import_fields.relationship)({
        ref: "ProductImage.product",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
          inlineEdit: { fields: ["image", "altText"] },
          linkToItem: true
        }
      })
    }
  }),
  ProductImage: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      image: (0, import_cloudinary2.cloudinaryImage)({
        label: "Source",
        cloudinary: {
          cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
          apiKey: `${process.env.CLOUDINARY_API_KEY}`,
          apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
          folder: `${process.env.CLOUDINARY_API_FOLDER}`
        }
      }),
      altText: (0, import_fields.text)(),
      product: (0, import_fields.relationship)({ ref: "Product.photo" })
    }
  })
};
var keystone_default = (0, import_core.config)(
  withAuth({
    db: {
      provider: "sqlite",
      url: `${process.env.DATABASE_URL}`,
      onConnect: async (ctx) => {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(ctx);
        }
      }
    },
    server: {
      cors: { origin: [process.env.FRONTEND_URL], credentials: true }
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (ctx) => !!ctx.session?.data
    }
  })
);
//# sourceMappingURL=config.js.map
