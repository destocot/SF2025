import "dotenv/config";
import { KeystoneContext } from "@keystone-6/core/types";
import products from "./products.json";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export async function insertSeedData(ctx: KeystoneContext<any>) {
  console.log("REMOVE THIS LINE TO SEED");
  return;

  await ctx.db.ProductImage.deleteMany({
    where: (
      await ctx.db.ProductImage.findMany({})
    ).map((img) => ({ id: img.id })),
  });
  await ctx.db.Product.deleteMany({
    where: (await ctx.db.Product.findMany({})).map((p) => ({ id: p.id })),
  });

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);

  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);

    const res = await cloudinary.uploader.upload(product.photoUrl, {
      folder: process.env.CLOUDINARY_API_FOLDER,
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
        original_filename: "file",
      },
    };

    const productImage = await ctx.prisma.productImage.create({
      data: {
        image: JSON.stringify(cloudinaryImageData),
        altText: product.description,
      },
    });

    await ctx.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        status: product.status,
        price: product.price,
        photo: { connect: { id: productImage.id } },
      },
    });
  }

  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
}
