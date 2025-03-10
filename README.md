# js-tetris 

## 1. Structure Principale

### La Classe Tetromino
La classe `Tetromino` est la pierre angulaire du jeu. Elle représente chaque pièce de Tetris et contient :
- Une position (pos_x, pos_y)
- Une forme (shape) basée sur une matrice
- Une couleur
- Une méthode de rotation qui permet de faire pivoter la pièce

### Constantes Fondamentales
- `COLORS` : Un tableau définissant les couleurs disponibles pour les pièces
- `SHAPES` : Une collection de matrices définissant les formes possibles des pièces
- `ROWS` (25) et `COLS` (12) : Dimensions de la grille de jeu
- `BLOCK_SIZE` (25) : Taille en pixels de chaque bloc
- `BOARD` : Matrice représentant l'état du jeu

## 2. Système de Rendu

### Canvas Principal
- Utilise deux canvas : un pour le jeu principal et un pour la prochaine pièce
- Le canvas principal fait 12×25 blocs
- Inclut une grille de fond pour meilleure visibilité
- Couleur de fond : bleu foncé semi-transparent

### Fonctions de Dessin
- `drawgrid()` : Dessine la grille de fond
- `draw()` : Fonction principale de rendu qui :
  - Efface le canvas
  - Dessine la grille
  - Affiche les pièces fixées
  - Dessine la pièce active
  - Met à jour l'affichage de la prochaine pièce
- `drawNextTetromino()` : Affiche la prochaine pièce dans un canvas séparé

## 3. Mécanique de Jeu

### Gestion des Collisions
La fonction `checkCollision()` vérifie trois types de collisions :
- Avec les bords du terrain
- Avec le bas du terrain
- Avec les pièces déjà placées

### Gestion des Pièces
- `getNewTetromino()` : Génère aléatoirement une nouvelle pièce
- `merge()` : Fixe une pièce sur le terrain quand elle ne peut plus descendre
- `clearRows()` : Supprime les lignes complètes et met à jour le score

### Boucle de Jeu
`gameLoop()` gère la logique principale :
- Fait descendre la pièce active
- Vérifie les collisions
- Gère la fusion des pièces avec le terrain
- Vérifie les conditions de fin de partie
- Met à jour l'affichage

## 4. Contrôles et Interactions

### Contrôles Clavier
Le jeu répond aux touches suivantes :
- Flèche gauche : Déplace la pièce à gauche
- Flèche droite : Déplace la pièce à droite
- Flèche bas : Accélère la descente
- Flèche haut : Fait pivoter la pièce

### Gestion du Jeu
- `startGame()` : Démarre la boucle de jeu
- `stopGame()` : Arrête la boucle de jeu
- Les boutons start/stop permettent de contrôler le déroulement de la partie

## 5. Système de Score
- Le score augmente de 120 points par ligne complétée
- Le score est mis à jour en temps réel dans l'interface
- Le score final est affiché lors du game over

## 6. Particularités Techniques
- Utilisation de l'API Canvas pour le rendu
- Système de rotation matricielle pour les pièces
- Gestion efficace de la mémoire avec des tableaux
- Architecture modulaire facilitant les modifications

## 7. Améliorations Possibles
- Ajout d'un système de niveaux
- Augmentation progressive de la vitesse
- Sauvegarde des meilleurs scores
- Ajout d'effets sonores
- Implémentation d'un mode pause
- Ajout d'animations pour la suppression des lignes

