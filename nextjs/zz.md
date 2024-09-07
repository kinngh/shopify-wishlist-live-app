# Schema

`customers` <> `product_wishlist` --> `products`

- a customer can have multiple products
- product data is stationary, except for the customers reference
- for a customer, we need info on when they added a product to wishlist, which stays in `product_wishlist`
  - when they added to wishlist
  - when they bought it
    - the difference of this would give me median time between adding to wishlist and buying it
  - basic filtering
