CREATE TABLE roles(
    id_role SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE accounts(
    id_account SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,   
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES roles(id_role) ON DELETE CASCADE,
    username VARCHAR(255),
    email VARCHAR(255),
    created_at DATE DEFAULT current_date
    );

CREATE TABLE tokens(
    account_id SERIAL PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL
);

CREATE TABLE inventory(
    id_inventory SERIAL PRIMARY KEY,
    account_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE
);

CREATE TABLE stocks(
    id_stock SERIAL PRIMARY KEY,
    ticker VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo VARCHAR(255) NOT NULL,
    lot INTEGER NOT NULL DEFAULT 1,
    color VARCHAR(6)
);

CREATE TABLE inventory_items(
    id_item SERIAL PRIMARY KEY,
    received_at DATE DEFAULT current_date,
    received_from VARCHAR(255),
    received_price REAL,
    status VARCHAR(255) NOT NULL,
    inventory_id INTEGER,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id_inventory) ON DELETE CASCADE,
    stock_id INTEGER,
    FOREIGN KEY (stock_id) REFERENCES stocks(id_stock) ON DELETE CASCADE
);

CREATE TABLE best_stock(
    id_best_stock SERIAL PRIMARY KEY,
    date DATE DEFAULT current_date,
    price REAL NOT NULL,
    received_from VARCHAR(255),
    account_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    stock_id INTEGER,
    FOREIGN KEY (stock_id) REFERENCES stocks(id_stock) ON DELETE CASCADE
);

CREATE TABLE case_groups(
    id_group SERIAL PRIMARY KEY,
    name VARCHAR(255),
    created_at DATE DEFAULT current_date,
    active BOOLEAN DEFAULT FALSE,
    position INTEGER
);

CREATE TABLE cases(
    id_case SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    sale_price INTEGER,
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES case_groups(id_group) ON DELETE CASCADE
);

CREATE TABLE case_items(
    id_case_item SERIAL PRIMARY KEY,
    case_id INTEGER,
    FOREIGN KEY (case_id) REFERENCES cases(id_case) ON DELETE CASCADE,
    stock_id INTEGER,
    FOREIGN KEY (stock_id) REFERENCES stocks(id_stock) ON DELETE CASCADE
);

CREATE TABLE favorites(
    id_favorite SERIAL PRIMARY KEY,
    account_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES accounts(id_account) ON DELETE CASCADE,
    case_id INTEGER,
    FOREIGN KEY (case_id) REFERENCES cases(id_case) ON DELETE CASCADE
);

INSERT INTO roles(role_name) VALUES ('USER') RETURNING *;
INSERT INTO roles(role_name) VALUES ('ADMIN') RETURNING *;
INSERT INTO case_groups(id_group, name) VALUES (0, '') RETURNING *;