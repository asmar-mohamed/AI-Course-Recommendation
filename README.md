# 🎓 AI Course Recommendation System

Un système intelligent de recommandation de cours basé sur l'IA qui personnalise les suggestions d'apprentissage en fonction des compétences de l'utilisateur.

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du Projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)

## 🎯 Vue d'ensemble

Ce projet est une plateforme complète de recommandation de cours qui utilise un algorithme de Machine Learning (similarité cosinus) pour suggérer des cours personnalisés aux utilisateurs en fonction de leurs compétences évaluées.

### Comment ça fonctionne ?

1. **Évaluation des compétences** : Les utilisateurs passent des tests pour évaluer leurs compétences
2. **Analyse IA** : L'algorithme compare les compétences de l'utilisateur avec les prérequis des cours
3. **Recommandations personnalisées** : Le système génère une liste de cours triés par pertinence
4. **Suivi de progression** : Les utilisateurs peuvent s'inscrire aux cours et suivre leur progression

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion sécurisées (JWT)
- Gestion des profils utilisateurs
- Protection des routes

### 📊 Évaluation des Compétences
- Tests interactifs à choix multiples
- Calcul automatique des scores
- Mise à jour dynamique des compétences

### 🤖 Recommandations Intelligentes
- Algorithme de similarité cosinus
- Scoring personnalisé pour chaque cours
- Classement par pertinence

### 📚 Gestion des Cours
- Catalogue complet de cours
- Catégorisation par domaines
- Descriptions détaillées
- Liens vers ressources externes

### 📈 Tableau de Bord
- Vue d'ensemble des compétences
- Historique des tests
- Cours recommandés
- Progression des inscriptions

## 🏗️ Architecture

```
AI-Course-Recommendation/
├── backend/          # API FastAPI (Python)
│   ├── routers/      # Endpoints API
│   ├── crud/         # Opérations base de données
│   ├── ml/           # Algorithme de recommandation
│   ├── models.py     # Modèles SQLAlchemy
│   └── schemas.py    # Schémas Pydantic
│
├── frontend/         # Application React (TypeScript)
│   ├── src/
│   │   ├── pages/    # Pages de l'application
│   │   ├── components/ # Composants réutilisables
│   │   ├── services/ # Services API
│   │   ├── store/    # Redux store
│   │   └── types/    # Types TypeScript
│   └── public/
│
└── data/            # Données et scripts SQL
```

## 🛠️ Technologies

### Backend
- **FastAPI** - Framework web moderne et performant
- **SQLAlchemy** - ORM pour la gestion de base de données
- **scikit-learn** - Algorithme de Machine Learning
- **Pydantic** - Validation des données
- **JWT** - Authentification sécurisée
- **bcrypt** - Hachage des mots de passe

### Frontend
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Redux Toolkit** - Gestion d'état
- **React Router** - Navigation
- **Radix UI** - Composants accessibles
- **Axios** - Client HTTP

## 🚀 Installation

### Prérequis
- Python 3.8+
- Node.js 18+
- npm ou yarn

### Backend

```bash
cd backend

# Installer les dépendances
python -m pip install -r requirements.txt

# Lancer le serveur (port 8080)
uvicorn main:app --reload --port 8080
```

Le backend sera accessible sur `http://localhost:8080`

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer l'URL de l'API dans .env
# VITE_API_BASE_URL=http://localhost:8080

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## 💻 Utilisation

### 1. Créer un compte
- Accédez à la page d'inscription
- Remplissez vos informations
- Connectez-vous avec vos identifiants

### 2. Passer des tests
- Naviguez vers la section "Tests"
- Sélectionnez un domaine de compétence
- Répondez aux questions
- Obtenez votre score

### 3. Consulter les recommandations
- Accédez à la page "Recommandations"
- Visualisez les cours suggérés
- Triés par pertinence selon vos compétences

### 4. S'inscrire à un cours
- Cliquez sur un cours recommandé
- Consultez les détails
- Inscrivez-vous pour suivre le cours

## 📁 Structure du Projet

### Modèles de Données

- **Users** - Utilisateurs du système
- **Skills** - Compétences disponibles
- **Courses** - Catalogue de cours
- **UserSkills** - Compétences par utilisateur (avec scores)
- **CourseSkills** - Compétences requises par cours
- **Recommendations** - Recommandations générées
- **Enrollments** - Inscriptions aux cours
- **Tests** - Tests d'évaluation
- **Questions** - Questions des tests
- **Choices** - Choix de réponses
- **UserAnswers** - Réponses des utilisateurs

## 📡 API Documentation

Une fois le backend lancé, accédez à la documentation interactive :

- **Swagger UI** : `http://localhost:8080/docs`
- **ReDoc** : `http://localhost:8080/redoc`

### Endpoints Principaux

```
POST   /auth/register       - Inscription
POST   /auth/login          - Connexion
GET    /auth/me             - Profil utilisateur

GET    /courses             - Liste des cours
GET    /courses/{id}        - Détails d'un cours

GET    /recommendations     - Recommandations personnalisées

GET    /tests               - Liste des tests
POST   /user-answers        - Soumettre une réponse

GET    /skills              - Liste des compétences
GET    /user-skills         - Compétences de l'utilisateur
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

Développé dans le cadre d'un projet académique ISITW.

---

**Note** : Pour plus de détails sur le backend ou le frontend, consultez les README respectifs dans les dossiers `backend/` et `frontend/`.
