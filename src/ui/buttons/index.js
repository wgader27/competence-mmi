import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

export class ButtonsView {
    constructor() {
        this.root = htmlToDOM(template);
        this.statsBtn = this.root.querySelector('#btn-stats');
        this.exportBtn = this.root.querySelector('#btn-export');
        this.importBtn = this.root.querySelector('#btn-import');
        this.importInput = this.root.querySelector('#input-import');
    }

    dom() {
        return this.root;
    }

    // Méthode simple pour dire quand on clique sur stats, fais cette action
    onClickStats(action) {
        if (this.statsBtn) {
            this.statsBtn.addEventListener('click', (e) => {
                action();
            });
        }
    }

    onClickExport(action) {
        if (this.exportBtn) {
            this.exportBtn.addEventListener('click', () => action());
        }
    }

    onImportFile(action) {
        if (this.importBtn && this.importInput) {
            // Le bouton déclenche l'input file caché
            this.importBtn.addEventListener('click', () => {
                this.importInput.click();
            });

            // Quand le fichier est choisi
            this.importInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    action(file);
                }
                // Reset pour pouvoir réimporter le même fichier si besoin
                this.importInput.value = '';
            });
        }
    }
}
