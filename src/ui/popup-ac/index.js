import { htmlToDOM } from "@/lib/utils.js";
import template from "./template.html?raw";

export class PopupAC {
    constructor() {
        this.root = htmlToDOM(template);
        this.dialog = this.root;

        this.codeEl = this.root.querySelector('#ac-code');
        this.labelEl = this.root.querySelector('#ac-label');
        this.yearBadge = this.root.querySelector('#badge-year');
        this.ueBadge = this.root.querySelector('#badge-ue');

        this.statusText = this.root.querySelector('#status-text');
        this.progressBar = this.root.querySelector('#progress-bar');

        this.radios = this.root.querySelectorAll('input[name="ac-status"]');
        this.btnCancel = this.root.querySelector('#btn-cancel');
        this.btnSave = this.root.querySelector('#btn-save');

        this.commentEl = this.root.querySelector('#ac-comment');

        // File handling
        this.btnFile = this.root.querySelector('#btn-file');
        this.inputFile = this.root.querySelector('#input-file');
        this.fileName = this.root.querySelector('#file-name');
        this.btnFileDelete = this.root.querySelector('#btn-file-delete');

        this.currentFile = null;

        this.onSave = null;

        this.init();
    }

    // Méthode requise par le contrôleur principal
    dom() {
        return this.root;
    }

    init() {
        // Events
        this.btnCancel.addEventListener('click', () => this.close());

        this.dialog.addEventListener('click', (e) => {
            if (e.target === this.dialog) this.close();
        });

        this.radios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateStatus(parseInt(radio.value));
            });
        });

        // File interaction
        this.btnFile.addEventListener('click', () => this.inputFile.click());

        this.inputFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                this.currentFile = file.name;
                this.fileName.textContent = file.name;
                this.fileName.className = "text-xs text-white truncate max-w-[200px]";
                this.btnFileDelete.classList.remove('hidden');
            }
        });

        this.btnFileDelete.addEventListener('click', () => {
            this.currentFile = null;
            this.inputFile.value = "";
            this.fileName.textContent = "Aucun fichier selectionné";
            this.fileName.className = "text-xs text-gray-500 italic truncate max-w-[200px]";
            this.btnFileDelete.classList.add('hidden');
        });

        this.btnSave.addEventListener('click', () => {
            const selected = Array.from(this.radios).find(r => r.checked);
            if (selected && this.onSave) {
                // Return object with status, comment, file
                this.onSave({
                    status: parseInt(selected.value),
                    comment: this.commentEl.value,
                    file: this.currentFile
                });
            }
            this.close();
        });
    }

    open(data, currentData, callback) {
        // data = { ac, niveau, competence }
        // currentData = { status, comment, file } 
        const { ac, niveau, competence } = data;

        this.codeEl.textContent = ac.code;
        this.labelEl.textContent = ac.libelle;
        this.yearBadge.textContent = niveau.annee;
        this.ueBadge.textContent = competence.nom_court;

        let status = 0;
        let comment = "";
        let file = null;

        if (typeof currentData === 'object' && currentData !== null) {
            status = currentData.status || 0;
            comment = currentData.comment || "";
            file = currentData.file || null;
        } else if (typeof currentData === 'number') {
            status = currentData;
        }

        this.radios.forEach(r => {
            r.checked = parseInt(r.value) === status;
        });

        this.commentEl.value = comment;
        this.currentFile = file;

        if (file) {
            this.fileName.textContent = file;
            this.fileName.className = "text-xs text-white truncate max-w-[12.5rem]";
            this.btnFileDelete.classList.remove('hidden');
        } else {
            this.fileName.textContent = "Aucun fichier selectionné";
            this.fileName.className = "text-xs text-gray-500 italic truncate max-w-[12.5rem]";
            this.btnFileDelete.classList.add('hidden');
        }

        this.onSave = callback;

        // Mise à jour visuelle
        this.updateColors(competence.nom_court);
        this.updateStatus(status);

        if (this.dialog.showModal) {
            this.dialog.showModal();
        } else {
            this.dialog.setAttribute("open", "");
        }
    }

    close() {
        if (this.dialog.close) {
            this.dialog.close();
        } else {
            this.dialog.removeAttribute("open");
        }
    }

    updateStatus(val) {
        let text = "Non acquis";
        let width = "w-0";
        let color = "bg-[var(--color-red-500)]";

        if (val === 1) {
            text = "En cours";
            width = "w-1/2";
            color = "bg-[var(--color-orange-500)]";
        } else if (val === 2) {
            text = "Acquis";
            width = "w-full";
            color = "bg-[var(--color-green-500)]";
        }

        this.statusText.textContent = text;
        this.progressBar.className = `h-full rounded-full transition-all duration-500 ease-out ${width} ${color}`;
    }

    updateColors(ueName) {
        let colorClass = "text-gray-400";
        let borderClass = "border-gray-700";

        const name = ueName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (name === 'comprendre') {
            colorClass = "text-[var(--color-ue-comprendre)]";
            borderClass = "border-[var(--color-ue-comprendre)]";
        } else if (name === 'concevoir') {
            colorClass = "text-[var(--color-ue-concevoir)]";
            borderClass = "border-[var(--color-ue-concevoir)]";
        } else if (name === 'exprimer') {
            colorClass = "text-[var(--color-ue-exprimer)]";
            borderClass = "border-[var(--color-ue-exprimer)]";
        } else if (name === 'developper') {
            colorClass = "text-[var(--color-ue-developper)]";
            borderClass = "border-[var(--color-ue-developper)]";
        } else if (name === 'entreprendre') {
            colorClass = "text-[var(--color-ue-entreprendre)]";
            borderClass = "border-[var(--color-ue-entreprendre)]";
        }

        this.codeEl.className = `text-3xl font-black tracking-tight mb-2 ${colorClass}`;

        this.yearBadge.className = `px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-800 tracking-wider border ${colorClass} ${borderClass}`;
    }
}
