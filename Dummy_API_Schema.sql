-- Table: status_details
CREATE TABLE status_details (
    id SERIAL PRIMARY KEY,
    status_code INTEGER NOT NULL CHECK (status_code BETWEEN 100 AND 599),
    status_message VARCHAR(255) NOT NULL
);

-- Table: images
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    link TEXT NOT NULL
);

-- Table: meta
CREATE TABLE meta (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    barcode BIGINT,
    qr_code TEXT
);

-- Table: categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Table: dimensions
CREATE TABLE dimensions (
    id SERIAL PRIMARY KEY,
    width FLOAT,
    height FLOAT,
    depth FLOAT
);

-- Table: product_tags
CREATE TABLE product_tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(100) NOT NULL
);

-- Table: availability_status
CREATE TABLE availability_status (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')) NOT NULL
);

-- Table: reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating FLOAT CHECK (rating BETWEEN 0 AND 5),
    comment TEXT,
    review_date DATE,
    reviewer_id INT REFERENCES users(id)
);

-- Table: products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    category_id INT REFERENCES categories(id),
    price DECIMAL(10,2),
    discount_percentage FLOAT,
    rating FLOAT,
    stock INT,
    brand VARCHAR(100),
    sku VARCHAR(100),
    weight FLOAT,
    dimension_id INT REFERENCES dimensions(id),
    warranty_information TEXT,
    shipping_information TEXT,
    availability_status_id INT REFERENCES availability_status(id),
    return_policy TEXT,
    minimum_order_quantity INT,
    meta_id INT REFERENCES meta(id),
    thumbnail_id INT REFERENCES images(id)
);

-- Junction table: product_tags_relation
CREATE TABLE product_tags_relation (
    product_id INT REFERENCES products(id),
    tag_id INT REFERENCES product_tags(id),
    PRIMARY KEY (product_id, tag_id)
);

-- Junction table: product_images
CREATE TABLE product_images (
    product_id INT REFERENCES products(id),
    image_id INT REFERENCES images(id),
    PRIMARY KEY (product_id, image_id)
);

-- Table: ingredients
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255)
);

-- Table: instructions
CREATE TABLE instructions (
    id SERIAL PRIMARY KEY,
    instruction_step TEXT
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    middle_name VARCHAR(100),
    phone VARCHAR(20),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password TEXT,
    image TEXT,
    blood_group VARCHAR(5),
    height FLOAT,
    weight FLOAT,
    eye_color VARCHAR(50),
    hair_id INT REFERENCES hair(id),
    address_id INT REFERENCES addresses(id),
    dob DATE,
    access_token TEXT,
    refresh_token TEXT
);

-- Table: hair
CREATE TABLE hair (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    color VARCHAR(50)
);

-- Table: coordinates
CREATE TABLE coordinates (
    id SERIAL PRIMARY KEY,
    lat FLOAT,
    lng FLOAT
);

-- Table: addresses
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    state_code VARCHAR(10),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    coordinates_id INT REFERENCES coordinates(id),
    mac_address VARCHAR(50),
    university VARCHAR(100),
    bank_id INT REFERENCES bank(id),
    company_id INT REFERENCES company(id),
    ein_ssn VARCHAR(20),
    user_agent TEXT,
    crypto_id INT REFERENCES crypto(id),
    role_id INT REFERENCES role(id)
);

-- Table: bank
CREATE TABLE bank (
    id SERIAL PRIMARY KEY,
    card_expire DATE,
    card_number VARCHAR(20),
    card_type VARCHAR(20),
    currency VARCHAR(10),
    iban VARCHAR(34)
);

-- Table: company
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    department VARCHAR(100),
    name VARCHAR(100),
    title VARCHAR(100),
    address_id INT REFERENCES addresses(id)
);

-- Table: crypto
CREATE TABLE crypto (
    id SERIAL PRIMARY KEY,
    coin VARCHAR(50),
    wallet TEXT,
    network VARCHAR(50)
);

-- Table: role
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) CHECK (status IN ('User', 'Admin')) NOT NULL
);
