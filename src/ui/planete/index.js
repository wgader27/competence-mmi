import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

class PlaneteView {
    constructor() {
        this.root = htmlToDOM(template);
    }

    html() {
        return template;
    }

    dom() {
        return this.root;
    }

    /**
     * Finds interaction groups in the SVG and maps triggers (Planets) to targets (ACs).
     * @returns {Array<{planet: Element, bubbles: NodeList}>}
     */
    getInteractions() {
        const containers = this.root.querySelectorAll('g[id$="-container"]');
        const interactions = [];

        containers.forEach(container => {
            const planet = container.querySelector('[id^="planete-but"]');
            const bubbles = container.querySelectorAll('[id^="bulle_ac"]');

            if (planet && bubbles.length > 0) {
                interactions.push({
                    planet: planet,
                    bubbles: bubbles
                });
            }
        });

        return interactions;
    }

    getGalaxy() {
        return this.root.querySelector('#etoile');
    }

    /**
     * Récupère le groupe principal du système (Orbites, Soleil, Etiquettes).
     */
    getSystem() {
        return this.root.querySelector('#Icon');
    }

    getRocket() {
        return this.root.querySelector('#fusee_container');
    }

    getRocketFire() {
        return this.root.querySelector('#fumee_fusee');
    }

    getSun() {
        return this.root.querySelector('#soleil');
    }

    /**
     * Récupère tous les boutons planètes.
     */
    getPlanets() {
        return this.root.querySelectorAll('[id^="planete-but"]');
    }

    /**
     * Récupère les bulles à l'intérieur du soleil.
     */
    getSunBubbles() {
        const sun = this.getSun();
        if (!sun) return [];
        return sun.querySelectorAll('[id^="rond_"]');
    }

    getPlanetGroups() {
        const containers = this.root.querySelectorAll('g[id$="-container"]');
        const groups = [];

        containers.forEach(container => {
            if (container.querySelector('[id^="planete-but"]')) {
                groups.push(container);
            }
        });

        return groups;
    }

    getOrbits() {
        return [
            this.root.querySelector('#trait_niveau_1'),
            this.root.querySelector('#trait_niveau_2'),
            this.root.querySelector('#trait_niveau_3')
        ];
    }
}

export { PlaneteView };
