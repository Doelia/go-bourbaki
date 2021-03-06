# Protocole

Décrit la liste des paquets et leurs parametres qui passent ente le client et le serveur.

## Envoyés par le client

### LOGIN(user,pass)
Paquet envoyé à la connexion. Mot de passe non crypté

### PUTLINE(x,y,o)
Prévient le placement d'une ligne par le joueur.
- **x** : int, position X
- **y** : int, position Y
- **o** : int, orientation. '1' pour vertical, '0' pour horizontal

### READY
Prévient le serveur que le client est prêt, connecté et a chargé son JS pour recevoir les évènements

### GOAGAIN
Quand une partie est finie, prévient le serveur que le client veut s'inscrire à la nouvelle partie

### ASKLADDER
Envoyé quand le client veut le classement général (voir Serveur / LADDER pour la suite)

## Envoyés par le serveur

### CONNECT_ACCEPT(code, numPlayer)
Packet de retour acceptant ou non la demande de connexion du joueur.

- **code** : int, 0 si mot de passe incorrect, 1 si connexion OK, 2 si connexion OK + compte créé
- **numPlayer** : int, numéro du joueur dans la partie (entre 1 en n). 0 si le code vaut 0 (connexion refusée), -1 si le pseudo est invalide

Tous les packets d'initialiastion du jeu suiveront ce packet

### DISPLAYLINE(x,y,o,n)
Ajoute la barre x,y,o,n à la grille

- **x** : int, position X
- **y** : int, position Y
- **o** : string, orientation. 'v' pour vertical, 'h' pour horizontal
- **n** : int, numéro identifiant du joueur (1 à N)

### DISPLAYSQUARE(x,y,n)
Ajoute le carré à la grille

- **x** : int, position X
- **y** : int, position Y
- **n** : int, numéro identifiant du joueur (1 à N)

### UPDATEPLAYERS(json)
Met à jour du tableau des scores de la partie.
Appelé autant de fois que necéssaire

Exemple :
```
[
    {"numPlayer":"1", "name": "Portrick", "score":"23", isActive: true},
    {"numPlayer":"2", "name": "Faewynn", "score":"178", isActive: true},
    {"numPlayer":"3", "name": "Pancake", "score":"87", isActive: false},
]
```

### SETACTIVEPLAYER(numPlayer)
Définit le joueur actif (celui qui est en train de joueur). Envoyé a chaque changement de joueur

### PAUSE()
Place le jeu en pause (si pas assez de joueurs)

### UNPAUSE()
Retire la pause

### EMPTYGRID()

Remet à zéro la grille
Utilisé pour les fins de partie

### GRID(json)

Envoi la grille (lignes, carrés) à la connexion d'un nouveau joueur.

Exemple :
```
{
    lines:
    [
        {"x": 3, "y": 4, "o": "v", "n": 1},
        {"x": 2, "y": 3, "o": "h", "n": 2},
    ],
    squares:
    [
        {"x": 3, "y": 4, "n": 1},
        {"x": 2, "y": 3, "n": 2},
    ],
}
```

### ENDGAME(json)

Envoi le classement à la fin de la partie

Exemple:
```
[
    {"numPlayer":"1", "name": "Portrick", "score":"23", isActive: true, "classement": 1},
    {"numPlayer":"2", "name": "Faewynn", "score":"178", isActive: true, "classement": 2},
    {"numPlayer":"3", "name": "Pancake", "score":"87", isActive: false, "classement": 3},
]
```

### LADDER(json)

Permet d'envoyer le classement général au client qui le demande (voir paquet ASKLADDER)
