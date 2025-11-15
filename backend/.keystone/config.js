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
var import_config = require("dotenv/config");
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
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
      price: (0, import_fields.integer)()
      // photo
    }
  })
};
var keystone_default = (0, import_core.config)(
  withAuth({
    db: {
      provider: "sqlite",
      url: `${process.env.DATABASE_URL}`
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
