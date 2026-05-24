from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from api import router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-commerce Shopping Cart API",
    description="Backend API for React + FastAPI + MySQL e-commerce cart project",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "E-commerce Cart API is running"}