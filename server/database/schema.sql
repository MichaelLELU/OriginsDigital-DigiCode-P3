-- Catégorie
CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(80) NOT NULL
);

-- Vidéo
CREATE TABLE video (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(80) NOT NULL,
    url VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME DEFAULT NOW(),
    is_connected BOOLEAN DEFAULT FALSE,
    category_id INT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Utilisateur
CREATE TABLE role (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(80) NOT NULL
);

CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(120) NOT NULL,
    lastname VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT UNSIGNED DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE favorite (
    user_id INT UNSIGNED,
    video_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
)

-- Création de roles
INSERT INTO role (name) VALUES ('user'), ('admin');

-- Création de catégories "exemples"
INSERT INTO category (name) VALUES ('Animals'), ('Sports'), ('Music'), ('Education'), ('Entertainment');