/**
 * Classe représentant le plateau du jeu
 * Regroupe toutes les fonctions qui permettent d'interagire avec celle-ci
 * Notation "_" préfixée pour les attributs/méthodes privées
 *
 */

var Board = function() {

    this._gridSpace = 56; // Espace entre 2 points en pixel (défini aussi dans le .lss)

    /**
     * Méthode générique pour créer un élément sur la grille (carré, ligne, point...)
     */
    this._placeE = function(e, x, y) {
        return e
            .css({
                top: x*this._gridSpace,
                left: y*this._gridSpace
            })
            .attr('x', x)
            .attr('y', y);
    }

    this._addDot = function(x, y) {
        $('#board').append(
            $('<div class="dot"></dot>')
        );

        this._placeE($('#board .dot:last'), x, y);
    }

    this._createInactiveLine = function(x, y, o) {
        $('#board').append(
            $('<div class="line '+o+'"></dot>')
        );

        this._placeE($('#board .line:last'), x, y)
            .addClass('inactive')
            .attr('o', o);
    }

    this._createInactiveSquare = function(x, y) {
        $('#board').append(
            $('<div class="square"></dot>')
        );

        this._placeE($('#board .square:last'), x, y)
            .addClass('inactive');
    }

    this.createGrid = function(size) {
        for (var i = 0; i <= size; i++) {
            for (var j = 0; j <= size; j++) {
                this._addDot(i, j);
                if (i < size) {
                    this._createInactiveLine(i, j, 'v');
                }
                if (j < size) {
                    this._createInactiveLine(i, j, 'h');
                }
                if (i < size && j < size) {
                    this._createInactiveSquare(i, j);
                }
            }
        }
    }

    this.activeLine = function(x, y, o, n) {
        $(".line."+o+"[x='"+x+"'][y='"+y+"']")
            .removeClass('inactive')
            .addClass('cbg')
            .attr('num', n);
    }

    this.activeSquare = function(x, y, n) {
        $(".square[x='"+x+"'][y='"+y+"']")
            .removeClass('inactive')
            .addClass('cbg')
            .attr('num', n);
    }
}