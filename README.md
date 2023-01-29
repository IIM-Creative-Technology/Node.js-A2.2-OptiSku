# Node.js-A2.2-OptiSku
## Prérequis:
- Node.JS
- Git
- Postman

## Outils
- Express
- Socket.io
- MongoDB

## Installation
- Express : $ npm install express --save
- Socket.io : $ npm install socket.io express --save
- MongoDB : 

## Gestion de projet
### Crud
- GET /api/user : recupère les utilisateurs
- GET /api/{name}/{password} : recupère les utilisateurs ayant le nom et mot de passe correspondent
- Post /api/user : Crée un user si on lui donne les infos de l'utilisateur via le form sur index.html
- Post /api/user/{name}/{password} : Envoie l'utilisateur correspondent dans une table userplays
- POST /api/user/login : connection, si le compte existe, avec les informations du formulaire
- GET /api/user/logout : verifie si un utlisateur est est connecté et renvoie 1 (true) ou 0 (false) au front
- Delete /api/user : supprime l'utilisateur actuellement connecté

### Authentification

### Liaison au Front-end

### Test


### Base de données
- Liaison de MangoDB à Node.JS
- Récuperer les information de la bdd
- Créer des informations en bdd
- Mettre à jour des information en bdd
