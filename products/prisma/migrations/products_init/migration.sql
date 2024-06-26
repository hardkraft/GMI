-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL DEFAULT (nextval('products_id_seq'::regclass) + 11),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL DEFAULT 1000000,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document" JSON,

    CONSTRAINT "products_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_id_idx" ON "products"("id");

