-- Catégorie
CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(80) NOT NULL
);

-- Vidéo
CREATE TABLE video (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(80) NOT NULL,
    url VARCHAR(4096) NOT NULL,
    image VARCHAR(4096) NOT NULL,
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
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT UNSIGNED DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Favoris (utilisateur)
CREATE TABLE favorite (
    user_id INT UNSIGNED,
    video_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

-- Favoris (admin) -> heroslider
CREATE TABLE heroslider (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    video_id INT UNSIGNED,
    FOREIGN KEY (video_id) REFERENCES video (id) ON DELETE CASCADE
);

--*** Insertion de données ****
-- Création de roles
INSERT INTO role (name) VALUES ('user'), ('admin');

-- Création de catégories par défaut
INSERT INTO category (name) VALUES ('Animals'), ('Sports'), ('Music'), ('Education'), ('Entertainment');