-- MySQL version of Dummy_API_Schema.sql

-- Table: status_details
-- CREATE TABLE status_details (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     status_code INT NOT NULL,
--     status_message VARCHAR(255) NOT NULL
-- );

-- Table: images
-- CREATE TABLE images (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     link TEXT NOT NULL
-- );

-- Table: meta
-- CREATE TABLE meta (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     barcode BIGINT,
--     qr_code TEXT
-- );

-- Table: categories
-- CREATE TABLE categories (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     category_name VARCHAR(100) NOT NULL,
--     url VARCHAR(255) NOT NULL,
--     slug VARCHAR(100) NOT NULL
-- );

-- Table: dimensions
-- CREATE TABLE dimensions (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     width FLOAT,
--     height FLOAT,
--     depth FLOAT
-- );

-- Table: product_tags
CREATE TABLE product_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(100) NOT NULL
);

-- Table: availability_status
CREATE TABLE availability_status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(50) NOT NULL 
    
);

-- Table: reviews
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rating FLOAT,
    comment TEXT,
    review_date DATE,
    reviewer_id INT,
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- Table: products
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    category_id INT,
    price DECIMAL(10,2),
    discount_percentage FLOAT,
    rating FLOAT,
    stock INT,
    brand VARCHAR(100),
    sku VARCHAR(100),
    weight FLOAT,
    dimension_id INT,
    warranty_information TEXT,
    shipping_information TEXT,
    availability_status_id INT,
    return_policy TEXT,
    minimum_order_quantity INT,
    meta_id INT,
    thumbnail_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (dimension_id) REFERENCES dimensions(id),
    FOREIGN KEY (availability_status_id) REFERENCES availability_status(id),
    FOREIGN KEY (meta_id) REFERENCES meta(id),
    FOREIGN KEY (thumbnail_id) REFERENCES images(id)
);

-- Junction table: product_tags_relation
CREATE TABLE product_tags_relation (
    product_id INT,
    tag_id INT,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (tag_id) REFERENCES product_tags(id)
);

-- Junction table: product_images
CREATE TABLE product_images (
    product_id INT,
    image_id INT,
    PRIMARY KEY (product_id, image_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (image_id) REFERENCES images(id)
);

-- Table: ingredients
CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ingredient_name JSon not null
);

-- Table: instructions
CREATE TABLE instructions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instruction_step JSON NOT NULL
);

-- Table: users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    maiden_name VARCHAR(100),
    age INT,
    gender VARCHAR(20),
    phone VARCHAR(20),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password TEXT,
    image TEXT,
    blood_group VARCHAR(5),
    height FLOAT,
    weight FLOAT,
    eye_color VARCHAR(50),
    hair_id INT,
    address_id INT,
    dob DATE,
    birth_date DATE,
    ip VARCHAR(45),
    access_token TEXT,
    refresh_token TEXT,
    role VARCHAR(50),
    FOREIGN KEY (hair_id) REFERENCES hair(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Table: hair
-- CREATE TABLE hair (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     type VARCHAR(50),
--     color VARCHAR(50)
-- );

-- Table: coordinates
-- CREATE TABLE coordinates (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     lat FLOAT,
--     lng FLOAT
-- );

-- Table: addresses
CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    state_code VARCHAR(10),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    coordinates_id INT,
    mac_address VARCHAR(50),
    bank_id INT,
    company_id INT,
    ein VARCHAR(20),
    ssn VARCHAR(20),
    user_agent TEXT,
    crypto_id INT,
    role_id INT,
    FOREIGN KEY (coordinates_id) REFERENCES coordinates(id),
    FOREIGN KEY (bank_id) REFERENCES bank(id),
    FOREIGN KEY (company_id) REFERENCES company(id),
    FOREIGN KEY (crypto_id) REFERENCES crypto(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Table: bank
-- CREATE TABLE bank (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     card_expire DATE,
--     card_number VARCHAR(20),
--     card_type VARCHAR(20),
--     currency VARCHAR(10),
--     iban VARCHAR(34)
-- );

-- Table: company
CREATE TABLE company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(100),
    name VARCHAR(100),
    title VARCHAR(100),
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Table: crypto
-- CREATE TABLE crypto (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     coin VARCHAR(50),
--     wallet TEXT,
--     network VARCHAR(50)
-- );

-- Table: role
-- CREATE TABLE role (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     role_name VARCHAR(50) NOT NULL
-- );

-- Table: quotes
-- CREATE TABLE quotes (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     quote TEXT,
--     author VARCHAR(255)
-- );

-- Table: comments
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    body TEXT,
    post_id INT,
    user_id INT
);

-- Table: recipes
CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    ingredients JSON NOT NULL,
    instructions JSON NOT NULL,
    prep_time_minutes INT,
    cook_time_minutes INT,
    servings INT,
    cuisine VARCHAR(100),
    calories_per_serving INT,
    tags JSON NOT NULL,
    user_id INT,
    image TEXT,
    instruction_id INT,
    ingredient_id INT,
    FOREIGN KEY (instruction_id) REFERENCES instructions(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
