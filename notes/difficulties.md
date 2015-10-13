
# Difficultés
- Problèmes avec l'usage de socket.io avec GO
    - La déclaration de paquets sans paramètre entraine la désactivation d'autres paquets (la déconnexion par exemple)
- Les nombreux évenements modifiants le déroulement du jeu (déconnexion d'un joueur, démarrage de pause, chronos...) créent souvent des conflits entre eux. Il est courant de tomber dans des appels récursifs ou dans un bloquage total de la partie sans une étude rigoureuse