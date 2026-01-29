import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";
import itemTemplate from "./item.html?raw";

export class HistoryView {
    constructor() {
        this.root = htmlToDOM(template);
        this.closeBtn = this.root.querySelector('#btn-close-history');
        this.listEl = this.root.querySelector('#history-list');
        this.countEl = this.root.querySelector('#history-count');
        this.emptyEl = this.root.querySelector('#empty-history');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }
    }

    dom() {
        return this.root;
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
     * Met à jour la liste d'historique
     * @param {Array} history - Tableau d'objets historique du Profile
     * @param {Object} programmeModel - Pour récupérer les libellés (pn)
     */
    update(history, programmeModel) {
        if (!history || history.length === 0) {
            this.listEl.innerHTML = '';
            this.countEl.textContent = "Total: 0 modifications";
            this.emptyEl.classList.remove('hidden');
            return;
        }

        this.emptyEl.classList.add('hidden');
        this.countEl.textContent = `Total: ${history.length} modifications`;
        this.listEl.innerHTML = '';

        history.forEach(item => {
            const el = this.createItem(item, programmeModel);
            this.listEl.appendChild(el);
        });
    }

    createItem(item, programmeModel) {
        let label = "Compétence inconnue";
        if (programmeModel && typeof programmeModel.getACLibelle === 'function') {
            label = programmeModel.getACLibelle(item.code);
        }

        const dateObj = new Date(item.date);
        const dateStr = dateObj.toLocaleDateString('fr-FR') + ' ' + dateObj.toLocaleTimeString('fr-FR');

        const statusMap = {
            0: {
                text: "Non acquis",
                class: "bg-[color-mix(in_srgb,var(--color-red-500),transparent_90%)] text-[var(--color-red-500)] border-[color-mix(in_srgb,var(--color-red-500),transparent_80%)] border"
            },
            1: {
                text: "En cours",
                class: "bg-[color-mix(in_srgb,var(--color-orange-500),transparent_90%)] text-[var(--color-orange-500)] border-[color-mix(in_srgb,var(--color-orange-500),transparent_80%)] border"
            },
            2: {
                text: "Acquis",
                class: "bg-[color-mix(in_srgb,var(--color-green-500),transparent_90%)] text-[var(--color-green-500)] border-[color-mix(in_srgb,var(--color-green-500),transparent_80%)] border"
            }
        };

        const oldStatusConfig = statusMap[item.oldStatus] || statusMap[0];
        const newStatusConfig = statusMap[item.newStatus] || statusMap[0];

        let html = itemTemplate
            .replace('{{code}}', item.code)
            .replace('{{isoDate}}', item.date)
            .replace('{{dateStr}}', dateStr)
            .replaceAll('{{label}}', label)
            .replace('{{oldStatusClass}}', oldStatusConfig.class)
            .replace('{{oldStatusText}}', oldStatusConfig.text)
            .replace('{{newStatusClass}}', newStatusConfig.class)
            .replace('{{newStatusText}}', newStatusConfig.text);

        return htmlToDOM(html);
    }
}
