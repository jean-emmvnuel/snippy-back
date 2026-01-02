# ✂️ Snippy Backend API

Bienvenue sur la documentation officielle du backend de **Snippy**, l'application ultime de gestion de snippets de code.
Cette API RESTful, construite avec **NestJS**, sert de moteur pour l'application frontend, permettant aux développeurs de stocker, organiser et retrouver leurs bouts de code instantanément.

L'API est actuellement déployée en production sur :  
🌍 **[https://snippy-back.onrender.com](https://snippy-back.onrender.com)**

## 📑 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Prérequis & Installation](#-prérequis--installation)
- [Configuration (.env)](#-configuration-env)
- [Base de Données](#-base-de-données)
- [Démarrage](#-démarrage)
- [Architecture de l'API](#-architecture-de-lapi)
  - [Authentification](#authentification)
  - [Dossiers (Folders)](#dossiers-folders)
  - [Snippets](#snippets)
- [Documentation Interactive (Swagger)](#-documentation-interactive-swagger)

---

## 🚀 Fonctionnalités

L'API Snippy offre un ensemble complet de services pour gérer le cycle de vie des snippets :

- **Authentification Sécurisée** : Système complet d'inscription et de connexion via JWT (JSON Web Tokens). Inclut des gardes (Guards) pour protéger les routes et une gestion des rôles (**ADMIN** vs **USER**).
- **Gestion des Snippets** : CRUD complet (Créer, Lire, Mettre à jour, Supprimer) pour les snippets.
- **Organisation par Dossiers** : Possibilité de créer des dossiers (avec couleur personnalisée) pour classer les snippets.
- **Recherche Avancée** : Recherche de snippets par mots-clés, globalement ou au sein d'un dossier spécifique.
- **Administration** : Endpoints dédiés aux administrateurs pour des statistiques globales (nombre d'utilisateurs, de snippets, etc.).

## 🛠 Stack Technique

- **Framework** : [NestJS](https://nestjs.com/) (Node.js framework sur TypeScript)
- **Langage** : TypeScript
- **Base de Données** : PostgreSQL
- **ORM** : [Prisma](https://www.prisma.io/)
- **Documentation** : Swagger (OpenAPI)
- **Validation** : `class-validator` & `class-transformer`
- **Déploiement** : Supporte Render, Railway, ou tout VPS Node.js.

## 📦 Prérequis & Installation

1. **Prérequis** :
   - [Node.js](https://nodejs.org/) (v18+ recommandé)
   - [PostgreSQL](https://www.postgresql.org/) installé localement ou accessible via URL.

2. **Installation** :
   ```bash
   # Cloner le dépôt
   git clone https://github.com/votre-username/snippy-back.git
   cd snippy-back

   # Installer les dépendances
   npm install
   ```

## ⚙️ Configuration (.env)

Créez un fichier `.env` à la racine du projet et configurez les variables suivantes :

```env
# URL de connexion PostgreSQL
# Exemple local : postgresql://user:password@localhost:5432/snippy_db?schema=public
DATABASE_URL="votre_connection_string_postgres"

# Clé secrète pour la signature et vérification des JWT
JWT_SECRET="une_phrase_secrete_tres_longue_et_complexe"
```

## 🗄️ Base de Données

Snippy utilise **Prisma** comme ORM. Voici les commandes utiles pour gérer la BDD :

```bash
# Appliquer les migrations (crée les tables User, Snippet, Folder)
npx prisma migrate dev --name init

# Générer le client Prisma (nécessaire après chaque modfication du schema.prisma)
npx prisma generate

# Ouvrir Prisma Studio (interface visuelle pour explorer la BDD)
npx prisma studio
```

## ▶️ Démarrage

### Mode Développement
Avec rechargement automatique (Hot Reload) :
```bash
npm run start:dev
```
*Le serveur écoute par défaut sur le port 3001.*

### Mode Production
Pour compiler et lancer la version optimisée :
```bash
npm run build
npm run start:prod
```

## 🏗 Architecture de l'API

L'API est organisée en modules NestJS. Voici les principaux endpoints disponibles :

### Authentification (`/auth`)
- `POST /auth/register` : Créer un nouveau compte.
- `POST /auth/login` : Se connecter et obtenir un `access_token`.
- `GET /auth/me` : Obtenir son profil (Nécessite JWT).
- `GET /auth/countUsers` : *(Admin)* Compter les utilisateurs.
- `GET /auth/getAllUsers` : *(Admin)* Liste complète des utilisateurs.

### Dossiers (`/folders`)
- `GET /folders` : Lister mes dossiers.
- `POST /folders` : Créer un dossier.
- `GET /folders/:id` : Voir un dossier.
- `PUT /folders/:id` : Modifier un dossier.
- `DELETE /folders/:id` : Supprimer un dossier et ses relations.
- `GET /folders/count` : *(Admin)* Compter tous les dossiers du système.

### Snippets (`/snippets`)
- `GET /snippets` : Lister mes snippets.
- `GET /snippets/folder/:id` : Lister les snippets d'un dossier spécifique.
- `GET /snippets/search/:query` : Rechercher parmi mes snippets.
- `POST /snippets` : Créer un nouveau snippet.
- `PUT /snippets/:id` : Modifier un snippet.
- `DELETE /snippets/:id` : Supprimer un snippet.
- `GET /snippets/count` : *(Admin)* Compter tous les snippets.

## 📚 Documentation Interactive (Swagger)

Une documentation complète et interactive (Swagger UI) est disponible pour tester les routes directement depuis votre navigateur.

Une fois le serveur lancé, accédez à :  
👉 **http://localhost:3001/api**

---
*Développé avec ❤️ pour Snippy.*
