from flask import Flask, request, abort
from config import db
import json
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # WARNING: turn off CORS security check

@app.get("/")
def home():
    return "Hello from flask"

@app.get("/test")
def test():
    return "Hello from another page"

@app.get("/about")
def about():
    me = {"name": "Adrian"}
    return json.dumps(me)


#####################################
# API endpoints
# JSON
#####################################

def fix_id(obj):
    obj["_id"] = str(obj["_id"])
    return obj


@app.get("/api/version")
def version():
    version = {"name": "mouse", "version": 35, "build":2948}
    return json.dumps(version)



@app.get("/api/products")
def get_products():
    products = []
    cursor = db.products.find({})
    for prod in cursor:
        products.append(fix_id(prod))

    return json.dumps(products)



@app.post("/api/products")
def save_product():
    product = request.get_json()

    if "title" not in product or len(product["title"]) < 3:
        return abort(400, "Invalid title")
    
    if "category" not in product or len(product["category"]) < 1:
        return abort(400, "Invalid category")
    
    if "image" not in product or len(product["image"]) < 1:
        return abort(400, "Invalid image")
    

    if "price" not in product:
        return abort(400, "Price is required")
    
    if not isinstance(product["price"], (int, float)):
        return abort(400, "Price should be a number")


    if not product["price"] > 0:
        return abort(400, "Price should be greater than zero")
    

    db.products.insert_one(product)
    return json.dumps(fix_id(product))



@app.get("/api/reports/total")
def report_total():
    cursor = db.products.find({})
    total = 0
    count = 0
    for prod in cursor:
        count += 1
        total += prod["price"]

    return json.dumps({"total": total, "products": count})


@app.get("/api/categories")
def get_categories():
    cursor = db.products.find({})
    categories = []

    for prod in cursor:
        cat = prod["category"]
        if cat not in categories:
            categories.append(cat)

    categories.sort()
    return json.dumps(categories)


@app.get("/api/products/category/<cat>")
def get_prods_by_category(cat):
    products = []
    cursor = db.products.find({"category": cat})
    for prod in cursor:
        products.append(fix_id(prod))

    return json.dumps(products)



@app.get("/api/products/search/<text>")
def search_products(text):
    # search products by title
    products = []
    cursor = db.products.find({"title": {"$regex": text, "$options": "i" } })
    for prod in cursor:
        products.append(fix_id(prod))

    return json.dumps(products)



@app.get("/api/product/<id>")
def product_by_id(id):
    if not ObjectId.is_valid(id):
        return abort(400, "Invalid id")

    db_id = ObjectId(id)
    product = db.products.find_one({"_id": db_id })
    if product is None:
        return abort(404, "No Product found for given id")

    return json.dumps(fix_id(product))






###############################################################
#################   Coupon Codes   ############################
###############################################################



"""
save
read all
read by code



code (required, length > 3)
discount (required, numbers, greater than zero, lower than 40)
"""

@app.post("/api/coupons")
def save_coupon():
    coupon = request.get_json()

    # code is required, at least 3 chars
    if "code" not in coupon or len(coupon["code"]) < 3:
        return abort(400, "Code is required and should contain at least 3 chars")

    # discount is required, should be between 1 and 40
    if "discount" not in coupon:
        return abort(400, "discount is required")
    
    if not isinstance(coupon["discount"], (int, float)):
        return abort(400, "discount should be a number")
    
    if coupon["discount"] < 1 or coupon["discount"] > 40:
        return abort(400, "discount value should be between 1 and 40")

    db.coupons.insert_one(coupon)

    return json.dumps(fix_id(coupon))


@app.get("/api/coupons")
def get_coupons():
    results = []
    cursor = db.coupons.find({})
    for cp in cursor:
        results.append(fix_id(cp))

    return json.dumps(results)



@app.get("/api/coupon/<code>")
def get_coupon(code):
    cupon = db.coupons.find_one({"code": code})
    if cupon == None:
        return abort(404, "Coupon not found")

    return json.dumps(fix_id(cupon))


@app.delete("/api/coupon/<id>")
def delete_coupon(id):
    if not ObjectId.is_valid(id):
        return abort(400, "Invalid id")

    db_id = ObjectId(id)
    result = db.coupons.delete_one({"_id": db_id})
    if result.deleted_count == 0:
        return abort(404, "Coupon not found")

    return json.dumps({"deleted": True})


#app.run(debug=True)


