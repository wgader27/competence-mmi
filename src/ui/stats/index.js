import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

class StatsView {
    constructor() {
        this.root = htmlToDOM(template);
        this.closeBtn = this.root.querySelector('#btn-close');
        this.resetBtn = this.root.querySelector('#btn-reset-data');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }
    }

    dom() {
        return this.root;
    }

    onReset(callback) {
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                if (confirm("Attention : Voulez-vous vraiment effacer toute votre progression ?")) {
                    callback();
                }
            });
        }
    }

    show() {
        this.root.classList.remove('translate-offscreen');
        this.root.classList.add('translate-x-0');
    }

    hide() {
        this.root.classList.remove('translate-x-0');
        this.root.classList.add('translate-offscreen');
    }

    toggle() {
        if (this.root.classList.contains('translate-offscreen')) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * Met à jour les barres de progression et le radar
     * @param {Object} stats 
     */
    update(stats) {
        if (!stats) return;

        this.updateRadar(stats);

        for (const [name, data] of Object.entries(stats)) {
            const card = this.root.querySelector(`li[data-competence="${name}"]`);
            if (card) {
                const valueEl = card.querySelector('.value');
                const detailsEl = card.querySelector('.details');
                const barEl = card.querySelector('.progress-bar');

                if (valueEl) valueEl.textContent = `${data.percent}%`;
                if (detailsEl) detailsEl.textContent = `${data.current} / ${data.total} points`;
                if (barEl) barEl.style.width = `${data.percent}%`;
            }
        }
    }

    updateRadar(stats) {
        const radarPoly = this.root.querySelector('#radar-data');
        if (!radarPoly) return;

        const order = ['Comprendre', 'Concevoir', 'Exprimer', 'Développer', 'Entreprendre'];
        const angles = [-90, -18, 54, 126, 198];


        const points = order.map((name, index) => {
            const stat = stats[name];
            const percent = stat ? stat.percent : 0;

            const r = (percent / 100) * 100;
            const angleRad = angles[index] * (Math.PI / 180);

            const x = r * Math.cos(angleRad);
            const y = r * Math.sin(angleRad);

            return `${x},${y}`;
        });

        radarPoly.setAttribute('points', points.join(' '));
    }
}

export { StatsView };

