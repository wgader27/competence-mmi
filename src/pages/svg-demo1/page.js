import gsap from "gsap";
import { PlaneteView } from "@/ui/planete";
import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";
import { Animation } from "@/lib/animation.js";
import { ButtonsView } from "@/ui/buttons/index.js";
import { StatsView } from "@/ui/stats/index.js";
import { PopupAC } from "@/ui/popup-ac/index.js";
import { Tooltip } from "@/ui/tooltip/index.js";
import { HistoryView } from "@/ui/history/index.js";
import { Profile } from "@/model/profile.js";
import { pn } from "@/model/programme.js";

// --- MODEL ---
let M = {
    dataAC: null,
    profile: null
};

M.init = async function () {
    this.profile = new Profile();
};

/**
 * Trouve les infos d'une AC par son code (ex: "AC11.01")
 * Retourne l'objet AC ainsi que son contexte (Niveau, Compétence)
 */
M.getInfosAC = function (code) {
    return pn.getInfos(code);
};

// --- CONTROLLER ---
let C = {};

C.init = async function () {
    await M.init();
    return V.init();
}

/**
 * Gère le clic sur une planète (ouvrir/fermer bulles)
 */
C.handleClickPlanet = function (planet, bubbles) {
    const isOpen = planet.dataset.opened === "true";
    const shouldOpen = !isOpen;

    // Gérer l'animation des bulles
    Animation.showBubbles(bubbles, shouldOpen);
    planet.dataset.opened = shouldOpen;

    // Gérer la fusée
    const rocket = V.planete.getRocket();

    if (shouldOpen) {
        // Atterrissage sur la planète cliquée
        Animation.animateRocketLanding(rocket, planet, () => { });
    } else {
        // Redécollage / Idle si on ferme
        // On relance l'idle
        const fire = V.planete.getRocketFire();
        Animation.animateRocketIdle(rocket, fire);
    }
};

/**
 * Gère le clic sur une bulle AC
 */
C.handleClickAC = function (acElement) {
    const id = acElement.id;
    const match = id.match(/ac(\d{2})-(\d{2})/i);

    if (match) {
        const code = `AC${match[1]}.${match[2]}`;
        console.log("Clic AC:", code);

        const context = M.getInfosAC(code);
        if (context) {
            // Utiliser getData pour avoir statut + commentaire + fichier
            const currentData = M.profile.getData(code);

            V.popupAC.open(context, currentData, (newData) => {
                // Sauvegarder { status, comment, file }
                M.profile.setStatus(code, newData);

                V.updateBubbleStyle(acElement, newData.status);
                // Mettre à jour les stats
                V.updateStats();
            });
        }
    } else {
        console.warn("Impossible d'extraire le code AC de l'ID:", id);
    }
};


/**
 * Gère le survol d'une AC (Tooltip)
 */
C.handleHoverAC = function (acElement, event) {
    const id = acElement.id;
    const match = id.match(/ac(\d{2})-(\d{2})/i);
    if (match) {
        const code = `AC${match[1]}.${match[2]}`;
        const context = M.getInfosAC(code);
        if (context) {
            const status = M.profile.getStatus(code);
            V.tooltip.show(context.ac, event, status);
        }
    }
};



/**
 * Gère l'export des données
 */
C.handleExport = function () {
    const dataStr = M.profile.exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `sae303-profile-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};



/**
 * Gère l'import simple
 */
C.handleImport = function (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        if (M.profile.importData(e.target.result)) {
            V.updateBubblesState();
            V.updateStats();
            alert("Profil chargé !");
        } else {
            alert("Erreur format fichier");
        }
    };
    reader.readAsText(file);
};


// --- VIEW ---
let V = {
    rootPage: null,
    planete: null,
    tooltip: null,
    popupAC: null,
    historyView: null,
};

V.init = function () {
    this.build();
    this.animate();
    this.interactions();
    this.ui();
    return this.rootPage;
};

V.build = function () {
    this.rootPage = htmlToDOM(template);
    this.planete = new PlaneteView();
    this.rootPage.querySelector('slot[name="svg"]').replaceWith(this.planete.dom());
};

V.animate = function () {
    // Galaxie
    Animation.animateGalaxy(this.planete.getGalaxy());

    // Soleil
    const sun = this.planete.getSun();
    Animation.floatElement(sun, 25, 4);

    // Bulles Soleil
    const sunBubbles = this.planete.getSunBubbles();
    Animation.pulseElement(sunBubbles, 0.8, 1.2, 2);
    Animation.wanderElement(sunBubbles, 30, 4);

    // Planètes
    const planetGroups = this.planete.getPlanetGroups();
    Animation.floatElement(planetGroups, 20, 3);

    // Fusée
    const rocket = this.planete.getRocket();
    const fire = this.planete.getRocketFire();
    Animation.animateRocketIdle(rocket, fire);

    // Ambiance Système Solaire
    Animation.animateSystem(this.planete.getOrbits());
};

V.interactions = function () {
    // Planètes (pour ouvrir les bulles)
    const interactions = this.planete.getInteractions();
    interactions.forEach(({ planet, bubbles }) => {
        gsap.set(bubbles, { autoAlpha: 0, scale: 0, transformOrigin: "center center" });

        planet.style.cursor = "pointer";
        planet.dataset.opened = "false";
        planet.addEventListener("click", (e) => {
            e.stopPropagation();
            C.handleClickPlanet(planet, bubbles);
        });
    });

    // Clic sur les bulles AC (Planètes + Soleil)
    const acBubbles = this.rootPage.querySelectorAll('[id^="bulle_ac"]');

    acBubbles.forEach(bubble => {
        bubble.style.cursor = "pointer";
        bubble.style.pointerEvents = "bounding-box";

        bubble.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            C.handleClickAC(bubble);
        });

        // Effet de survol
        bubble.addEventListener('mouseenter', (e) => {
            Animation.animateHover(bubble, true);
            C.handleHoverAC(bubble, e);
        });
        bubble.addEventListener('mouseleave', () => {
            Animation.animateHover(bubble, false);
            V.tooltip.hide();
        });
        // Suivre la souris
        bubble.addEventListener('mousemove', (e) => {
            V.tooltip.move(e);
        });
    });
};

V.ui = function () {
    const buttons = new ButtonsView();
    this.statsView = new StatsView();
    this.tooltip = new Tooltip();
    this.popupAC = new PopupAC();
    this.historyView = new HistoryView();

    this.rootPage.appendChild(buttons.dom());
    this.rootPage.appendChild(this.statsView.dom());
    this.rootPage.appendChild(this.historyView.dom());
    this.rootPage.appendChild(this.tooltip.dom());
    this.rootPage.appendChild(this.popupAC.dom());

    buttons.onClickStats(() => {
        this.statsView.toggle();
    });

    buttons.onClickExport(() => {
        C.handleExport();
    });

    buttons.onImportFile((file) => {
        C.handleImport(file);
    });

    // Bouton Historique
    const btnHistory = buttons.dom().querySelector('#btn-history');
    if (btnHistory) {
        btnHistory.addEventListener('click', () => this.historyView.toggle());
    }

    this.statsView.onReset(() => {
        M.profile.reset();
        this.updateBubblesState();
        this.updateStats();
    });

    this.updateBubblesState();
    this.updateStats();
};

/**
 * Recalcule et affiche les stats
 */
V.updateStats = function () {
    const stats = M.profile.calculateStats(pn);
    this.statsView.update(stats);

    // Mets à jour l'historique
    if (this.historyView) {
        this.historyView.update(M.profile.history, pn);
    }

    // Mets à jour les planètes (effet Mort/Feu)
    this.updatePlanetsVisuals();
};

/**
 * Met à jour l'apparence de toutes les bulles selon le profil
 */
V.updateBubblesState = function () {
    const acBubbles = this.rootPage.querySelectorAll('[id^="bulle_ac"]');
    acBubbles.forEach(bubble => {
        const id = bubble.id;
        const match = id.match(/ac(\d{2})-(\d{2})/i);
        if (match) {
            const code = `AC${match[1]}.${match[2]}`;
            const status = M.profile.getStatus(code);
            this.updateBubbleStyle(bubble, status);
        }
    });
};

/**
 * Met à jour le style d'une bulle spécifique
 */
V.updateBubbleStyle = function (bubble, status) {
    Animation.updateBubbleStyle(bubble, status);
};

/**
 * Met à jour l'état visuel des planètes (Mort/Feu)
 */
V.updatePlanetsVisuals = function () {
    const levelStats = M.profile.getLevelStats(pn); // { "but1-concevoir": 0.5, ... }

    for (const [key, ratio] of Object.entries(levelStats)) {
        const planetId = `planete-${key}`;
        const planetEl = this.rootPage.querySelector(`#${planetId}`);

        if (planetEl) {
            Animation.updatePlanetVisuals(planetEl, ratio);
        }
    }
};

export function SvgDemo1Page() {
    return C.init();
}
