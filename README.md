# Snippy Backend API

Bienvenue sur le backend de **Snippy**, l'application de gestion de snippets de code. Cette API RESTful, propulsée par **NestJS**, fournit toute la logique serveur nécessaire pour lister, créer, organiser et sécuriser vos morceaux de code préférés.

## 🛠 Technologies

Ce projet s'appuie sur une stack robuste et moderne :

- **Core** : [NestJS](https://nestjs.com/) (Node.js framework)
- **Langage** : TypeScript
- **Base de données** : PostgreSQL
- **ORM** : [Prisma](https://www.prisma.io/)
- **Sécurité** : JWT (JSON Web Tokens) & Bcrypt
- **API Docs** : Swagger (OpenAPI)

## 🚀 Fonctionnalités de l'API

L'application Snippy gère les fonctionnalités clés suivantes via cette API :

- **Authentification & Utilisateurs** : Inscription, connexion, et gestion de profils avec rôles (Admin/User).
- **Gestion des Snippets** : Création, lecture, mise à jour et suppression (CRUD) de bouts de code. Support de la coloration syntaxique (via le langage spécifié) et mise en favoris.
- **Organisation** : Classement des snippets dans des dossiers personnalisés (avec nom et couleur).

## 📦 Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [PostgreSQL](https://www.postgresql.org/) installés.

1. **Cloner le projet** :
   ```bash
   git clone <url-du-repo>
   cd snippy-back
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. **Environnement** :
   Créez un fichier `.env` à la racine (basé sur `.env.example` si présent) :

   ```env
   # Connexion Base de données
   DATABASE_URL="postgresql://user:password@localhost:5432/snippy_db?schema=public"

   # Secret JWT pour l'authentification
   JWT_SECRET="votre_cle_secrete_complexe"
   ```

2. **Base de données** :
   Appliquez les migrations pour créer le schéma de Snippy :
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

## ▶️ Démarrage

- **Mode développement** (recommandé pour travailler dessus) :
   ```bash
   npm run start:dev
   ```

- **Mode production** :
   ```bash
   npm run build
   npm run start:prod
   ```

Le serveur démarrera par défaut sur `http://localhost:3001`.

## 🌐 API en Production

L'API est déployée et accessible à l'adresse suivante :
**https://snippy-back.onrender.com**

## 📚 Documentation Interactive

Pour explorer et tester les endpoints de l'API Snippy sans interface frontend :

1. Lancez le serveur.
2. Rendez-vous sur : **http://localhost:3001/api**

Vous y trouverez la documentation Swagger complète listant toutes les routes disponibles.

## 📂 Structure du Code

- `src/auth` : Logique de connexion et protection des routes.
- `src/snippets` : Cœur de l'application, gestion des codes.
- `src/folders` : Gestion pour l'organisation en dossiers.
- `src/generated` : Client Prisma typé.
- `prisma/schema.prisma` : Définition de la structure de la base de données.
