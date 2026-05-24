from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User, Product, Cart
from schemas import (
    UserRegister,
    UserLogin,
    CartAdd,
    CartUpdate
)
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_admin
)

router = APIRouter()

# User registration
@router.post("/auth/register")
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_data.username).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = User(
        username=user_data.username,
        password_hash=hash_password(user_data.password),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }

# User login
@router.post("/auth/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_data.username).first()

    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token({
        "sub": user.username,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "username": user.username
    }

# Product endpoints
@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

# Get product details
@router.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

# Get cart items
@router.get("/cart")
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_items = (
        db.query(Cart)
        .filter(Cart.user_id == current_user.id)
        .all()
    )

    result = []

    for item in cart_items:
        result.append({
            "cart_item_id": item.id,
            "product_id": item.product.id,
            "name": item.product.name,
            "price": float(item.product.price),
            "quantity": item.quantity,
            "subtotal": float(item.product.price) * item.quantity
        })

    return result

# Add product to cart
@router.post("/cart/add")
def add_to_cart(
    cart_data: CartAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if cart_data.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    product = db.query(Product).filter(Product.id == cart_data.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.stock < cart_data.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    existing_item = (
        db.query(Cart)
        .filter(
            Cart.user_id == current_user.id,
            Cart.product_id == cart_data.product_id
        )
        .first()
    )

    if existing_item:
        existing_item.quantity += cart_data.quantity
    else:
        new_item = Cart(
            user_id=current_user.id,
            product_id=cart_data.product_id,
            quantity=cart_data.quantity
        )
        db.add(new_item)

    product.stock -= cart_data.quantity

    db.commit()

    return {"message": "Product added to cart"}

# Update cart item quantity
@router.put("/cart/{cart_item_id}")
def update_cart_item(
    cart_item_id: int,
    cart_data: CartUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = (
        db.query(Cart)
        .filter(
            Cart.id == cart_item_id,
            Cart.user_id == current_user.id
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if cart_data.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    product = db.query(Product).filter(Product.id == cart_item.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    quantity_difference = cart_data.quantity - cart_item.quantity

    if quantity_difference > 0:
        if product.stock < quantity_difference:
            raise HTTPException(status_code=400, detail="Not enough stock")

        product.stock -= quantity_difference

    elif quantity_difference < 0:
        product.stock += abs(quantity_difference)

    cart_item.quantity = cart_data.quantity

    db.commit()
    db.refresh(cart_item)

    return {"message": "Cart item updated"}

# Delete cart item
@router.delete("/cart/{cart_item_id}")
def delete_cart_item(
    cart_item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = (
        db.query(Cart)
        .filter(
            Cart.id == cart_item_id,
            Cart.user_id == current_user.id
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = db.query(Product).filter(Product.id == cart_item.product_id).first()

    if product:
        product.stock += cart_item.quantity

    db.delete(cart_item)
    db.commit()

    return {"message": "Cart item deleted"}


# Get all users' carts (admin)
@router.get("/admin/carts")
def get_all_carts(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    cart_items = db.query(Cart).all()

    result = []

    for item in cart_items:
        result.append({
            "cart_item_id": item.id,
            "username": item.user.username,
            "product_name": item.product.name,
            "quantity": item.quantity,
            "subtotal": float(item.product.price) * item.quantity
        })

    return result