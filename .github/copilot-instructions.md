# Consignes pour l'IA (Projet SAE303)

Ce document décrit les règles et la structure à suivre pour toutes les interventions sur ce projet.

## 1. Contexte et Niveau
*   **Niveau** : Bachelor 2ème année (Code simple, clair et facile à comprendre).
*   **Rôle** : Assistant pédagogique / Développeur. Pas de sur-ingénierie (over-engineering).

## 2. Structure du Code (Pattern MVC simplifié)
Chaque page ou démo doit suivre la structure des dossiers existants (`svg-demo2`, `svg-demo3`, etc.) :
*   Un fichier `page.js` pour la logique.
*   Un fichier `template.html` pour la structure HTML.

### Structure Type `page.js`
Le code JS doit être organisé avec deux objets principaux : `C` (Controller) et `V` (View).

```javascript
import { LibView } from "@/ui/lib/index.js"; 
import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

let C = {}; // Controller : Gère la logique et les événements

C.init = function() {
    return V.init();
};

C.handler_click = function(ev) {
    // Gestion des événements ici
};

let V = {}; // View : Gère le DOM et l'affichage

V.init = function() {
    V.rootPage = htmlToDOM(template);
    // Initialisation des composants et injection
    return V.rootPage;
};

V.attachEvents = function() {
    V.rootPage.addEventListener("click", C.handler_click);
};

export function SvgDemoXPage() {
    return C.init();
}
```

## 3. Gestion des SVG
*   **Structure** : Les SVG doivent être chargés via des composants (ex: `src/ui/shapes/` ou `src/ui/spinner/`).
*   **Événements** : Les événements du SVG (clic, survol) doivent être gérés au niveau de la **PAGE** (dans `C.handler_click` par exemple), via la délégation d'événements ou en attachant des écouteurs sur le DOM du composant.
*   **Style SVG** : 
    *   Utiliser CSS standard ou GSAP pour le style interne des SVG.
    *   **NE PAS** utiliser Tailwind à l'intérieur des balises `<svg>`.

## 4. Animation (GSAP Obligatoire)
*   **Outil** : Utiliser **exclusivité GSAP** pour les animations SVG.
*   **Référence** : S'inspirer de `src/lib/animation.js`.
*   **Méthode** : Soit utiliser les helpers de `Animation` s'ils existent, soit écrire du code GSAP simple (tween). Il faut tout centraliser dans le fichier `src/lib/animation.js`. Et après importer l'objet `Animation` dans le fichier .


Exemple GSAP simple :
```javascript
import { gsap } from "gsap";

gsap.to(element, {
    rotation: 360,
    duration: 2,
    ease: "linear" 
});
```

## 5. Styling Général (Hors SVG)
*   Utiliser **Tailwind CSS** pour la mise en page (layout) et les éléments HTML classiques (titres, conteneurs, boutons). Utiliser des REM pour les tailles et des variables pour les couleurs, font, etc...

## 6. Commentaire en français et des noms de variables ou fonctions en anglais simple 
*  Utiliser des commentaires pour expliquer le code mais que pour les trucs nécessaires pas pour tout le code ou pour les trucs complexes.

## 7. Code et balisage sémentique pour les composants
*  Utiliser des balises HTML5 et eviter si possible les div pour les composants et des classes Tailwind pour les styles mais pas du tailwind trop complexe.

## 8. Code javascript écrit par un développeur junior
*  Écrire du code pas trop complexe et explicite car je suis un développeur junior et pas senior.

## Résumé
*   Structure : `C` (Controller) + `V` (View).
*   SVG Events : Gérés dans le fichier.
*   Animation : **GSAP uniquement**.
*   Style : Tailwind (Page) + CSS/GSAP (SVG).
*   Complexité : Garder le code simple et explicite.
