import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

export class Tooltip {
    constructor() {
        this.root = htmlToDOM(template);
        this.codeEl = this.root.querySelector('#tooltip-code');
        this.labelEl = this.root.querySelector('#tooltip-label');
        this.statusEl = this.root.querySelector('#tooltip-status');
    }

    dom() {
        return this.root;
    }

    show(infos, e, status = 0) {
        this.codeEl.textContent = infos.code;
        this.labelEl.textContent = infos.libelle;

        let statusText = "Non acquis";
        let newStatusClass = "text-[var(--color-status-inactive)]";

        if (status === 1) {
            statusText = "En cours d'acquisition";
            newStatusClass = "text-[var(--color-status-progress)]";
        } else if (status === 2) {
            statusText = "Acquis";
            newStatusClass = "text-[var(--color-status-active)]";
        }

        this.statusEl.textContent = statusText;

        if (this._lastStatusClass) {
            this.statusEl.classList.remove(this._lastStatusClass);
        }
        this.statusEl.classList.add(newStatusClass);
        this._lastStatusClass = newStatusClass;

        if (this.codeEl.classList.contains('text-cyan-400')) {
            this.codeEl.classList.remove('text-cyan-400');
        }

        if (this._lastUEClass) {
            this.codeEl.classList.remove(this._lastUEClass);
        }

        const newUEClass = this.getUEColorClass(infos.code);
        this.codeEl.classList.add(newUEClass);
        this._lastUEClass = newUEClass;

        this.codeEl.style.color = '';

        this.root.classList.remove('hidden');
        this.move(e);
    }

    getUEColorClass(code) {
        const match = code.match(/AC\d(\d)\./i);
        if (!match) return 'text-cyan-400';

        const compNum = parseInt(match[1]);
        switch (compNum) {
            case 1: return 'text-[var(--color-ue-comprendre)]';
            case 2: return 'text-[var(--color-ue-concevoir)]';
            case 3: return 'text-[var(--color-ue-exprimer)]';
            case 4: return 'text-[var(--color-ue-developper)]';
            case 5: return 'text-[var(--color-ue-entreprendre)]';
            default: return 'text-cyan-400';
        }
    }

    hide() {
        this.root.classList.add('hidden');
    }

    /**
     * Déplace le tooltip
     * @param {MouseEvent} e 
     */
    move(e) {
        const x = e.clientX + 15;
        const y = e.clientY + 15;
        this.root.style.left = `${x}px`;
        this.root.style.top = `${y}px`;
    }
}
