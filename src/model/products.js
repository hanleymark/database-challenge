const db = require("../database/db.js");

const get_all_products = db.prepare(/*sql*/
    `
    SELECT
        id,
        name,
        quantity_per_unit,
        FORMAT('£%.2f',unit_price) AS unit_price,
        units_in_stock,
        units_on_order,
        FORMAT('£%.2f', units_in_stock * unit_price) AS stock_value
    FROM
        products
    `);

const  listProducts = () => {
    return get_all_products.all();
}

const find_products = db.prepare(/*sql*/`
    SELECT id, name
    FROM products
    WHERE name LIKE $search_string`);

const searchProducts = (searchString) => {
    return find_products.all({search_string: `%${searchString}%`});
};

const find_product = db.prepare(/*sql*/`
    SELECT
        prod.id,
        prod.name,
        cat.name AS category_name,
        cat.description AS category_description
    FROM products AS prod
    JOIN categories AS cat
    ON prod.category_id = cat.id
    WHERE prod.id = ?`);

const getProduct = (id) => {
    return find_product.get(id);
};



module.exports = {listProducts, searchProducts, getProduct};