import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    //GET, POST, PUT, DELETE
    console.log("Serve this request only if method type is POST");
    return res.status(405).send({ error: true });
  }
  try {
    const reqbody = req.body;

    //Find wishlist for customers
    const wishlistsForCustomer = await prisma.customer.findMany({
      where: {
        id: req.customer_id,
      },
      select: {
        wishlists: true,
      },
    });

    //If wishlists are found, see if that wishlist id is valid
    if (wishlistsForCustomer.length > 0) {
      let wishlistToUpdate = reqbody.wishlist_id ? reqbody.wishlist_id : null;

      wishlistsForCustomer.map((wishlist) => {
        wishlistToUpdate = wishlist.wishlists.find((list) =>
          wishlistToUpdate
            ? JSON.stringify(list?.id) === JSON.stringify(wishlistToUpdate)
            : list.isDefault === true
        );
      });

      //TODO:- Rewrite this to make it simpler
      // What's happening: If it's default, it gives an object, if it's not default, it gives the id as string
      wishlistToUpdate?.id
        ? (wishlistToUpdate = wishlistToUpdate?.id)
        : wishlistToUpdate;

      if (!wishlistToUpdate) {
        return res.status(404).send({ error: "No wishlist found" });
      } else {
        const updateDefaultWishlist = await prisma.wishlists.update({
          where: {
            id: wishlistToUpdate,
          },
          data: {
            wishlist_product: {
              connectOrCreate: {
                where: {
                  product_id_variant_id: {
                    product_id: reqbody.product_id,
                    variant_id: reqbody.variant_id,
                  },
                },
                create: {
                  product_id: reqbody.product_id,
                  variant_id: reqbody.variant_id,
                  title: reqbody.title,
                  variant_title: reqbody.variant_title,
                },
              },
            },
          },
        });
      }
    } else {
      //Else create a new default wishlist
      const createDefaultWishlistForCustomer = await prisma.customer.create({
        data: {
          id: req.customer_id,
          name: "Not Logged In",
          email: "Not Logged In",
          wishlists: {
            create: {
              name: "Default Wishlist",
              isDefault: true,
              wishlist_product: {
                create: {
                  product_id: reqbody.product_id,
                  variant_id: reqbody.variant_id,
                  title: reqbody.title,
                  variant_title: reqbody.variant_title,
                },
              },
            },
          },
        },
      });
    }

    return res.status(200).send({ content: "Prcoxy Be Working" });
  } catch (e) {
    console.error(e);
    return res.status(403).send({ error: true });
  }
};

export default withMiddleware("verifyProxy")(handler);
