/**
 * Gère le profil de l'utilisateur et l'état de ses compétences (AC).
 */
class Profile {

    constructor() {
        // status (0: Non acquis, 1: En cours, 2: Acquis)
        this.data = {};
        this.history = []; // Array of { date, code, oldStatus, newStatus }
        this.load();
    }

    /**
     * Charge les données
     */
    load() {
        const dataSaved = localStorage.getItem('sae303-profile');
        if (dataSaved) {
            try {
                const parsed = JSON.parse(dataSaved);
                if (parsed.history && Array.isArray(parsed.history)) {
                    this.data = parsed.data || {};
                    this.history = parsed.history;
                } else {
                    this.data = parsed;
                    this.history = [];
                }
            } catch (e) {
                console.error("Erreur chargement profil", e);
                this.data = {};
                this.history = [];
            }
        }
    }

    /**
     * Réinitialise toutes les données
     */
    reset() {
        this.data = {};
        this.history = [];
        this.save();
    }

    /**
     * Sauvegarde les données
     */
    save() {
        const payload = {
            data: this.data,
            history: this.history
        };
        localStorage.setItem('sae303-profile', JSON.stringify(payload));
    }

    /**
     * Récupère le statut d'une AC
     * @param {string} code - Ex: "AC11.01"
     * @returns {number} 0, 1 ou 2
     */
    getStatus(code) {
        const val = this.data[code];
        if (val && typeof val === 'object') {
            return val.status || 0;
        }
        return val || 0;
    }

    /**
     * Récupère les données complètes (status, comment, file)
     */
    getData(code) {
        const val = this.data[code];
        if (val && typeof val === 'object') {
            return val;
        }
        return { status: val || 0, comment: "", file: null };
    }

    /**
     * Définit le statut (et données associées)
     * @param {string} code 
     * @param {number|object} statusOrData 
     */
    setStatus(code, statusOrData) {
        let newStatus = 0;
        let newData = {};

        // Récupérer l'existant
        const oldData = this.getData(code);
        const oldStatus = oldData.status;

        if (typeof statusOrData === 'object') {
            newStatus = statusOrData.status;
            newData = statusOrData;
        } else {
            newStatus = statusOrData;
            newData = { ...oldData, status: newStatus };
        }

        // Sauvegarde si changement de statut OU changement de données
        if (newStatus !== oldStatus || JSON.stringify(newData) !== JSON.stringify(oldData)) {
            this.data[code] = newData;

            // Historique seulement si changement de statut
            if (newStatus !== oldStatus) {
                this.history.unshift({
                    date: new Date().toISOString(),
                    code: code,
                    oldStatus: oldStatus,
                    newStatus: newStatus
                });
            }

            this.save();
        }
    }

    /**
     * Exporte les données en JSON avec la structure { acs, history }
     */
    exportData() {
        const data = {
            acs: this.data,
            history: this.history
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * Importe les données depuis un JSON string
     */
    importData(jsonString) {
        const parsed = JSON.parse(jsonString);
        if (parsed && typeof parsed === 'object') {
            //format { acs, history }
            if (parsed.acs) {
                this.data = parsed.acs;
                this.history = Array.isArray(parsed.history) ? parsed.history : [];
            } else {
                this.data = parsed;
            }
            this.save();
            return true;
        }
        console.error("Erreur import JSON");
        return false;
    }

    /**
     * Calcule les stats par compétence
     * @param {Object} dataAC - Le JSON complet des ACs
     * @returns {Object} - Ex: { "Comprendre": { current: 10, total: 20, percent: 50 }, ... }
     */
    calculateStats(dataAC) {
        if (!dataAC) return {};

        const stats = {};

        for (const key in dataAC) {
            const competData = dataAC[key];

            if (!competData || !competData.niveaux) continue;

            const name = competData.nom_court;
            let current = 0;
            let total = 0;

            for (const niveau of competData.niveaux) {
                for (const ac of niveau.acs) {
                    // Chaque AC vaut 2 points (0: Non acquis, 1: En cours, 2: Acquis)
                    total += 2;
                    current += this.getStatus(ac.code);
                }
            }

            const percent = total === 0 ? 0 : Math.round((current / total) * 1000) / 10; // 1 decimal

            stats[name] = {
                current,
                total,
                percent
            };
        }

        return stats;
    }

    /**
     * Calcule les stats par Niveau de Compétence (pour les planètes)
     * @param {Array} pn - Le programme (tableau de compétences)
     * @returns {Object} Map: { "but1-comprendre": 0.5, "but2-concevoir": 1.0, ... } (0 à 1)
     */
    getLevelStats(pn) {
        const stats = {};
        if (!pn || !Array.isArray(pn)) return stats;

        pn.forEach(competence => {
            if (!competence.niveaux) return;
            const name = competence.nom_court.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            competence.niveaux.forEach((niveau, index) => {
                const levelNum = index + 1; // 1, 2, 3
                let total = 0;
                let current = 0;

                niveau.acs.forEach(ac => {
                    total += 2; // Max score
                    current += this.getStatus(ac.code);
                });

                const ratio = total === 0 ? 0 : current / total;
                stats[`but${levelNum}-${name}`] = ratio;
            });
        });
        return stats;
    }
}

export { Profile };
