import data from "@/data/programme_mmi.json";

let pn = [];

for (let cmp of data) {
    pn.push(cmp);
}

pn.getLevelIndex = function (accode) {
    return accode.charAt(2);
}

pn.getSkillIndex = function (accode) {
    return accode.charAt(3);
}

pn.getACIndex = function (accode) {
    return accode.charAt(6);
}

pn.getACLibelle = function (accode) {
    let skill = pn.getSkillIndex(accode) - 1;
    let level = pn.getLevelIndex(accode) - 1;
    let ac = pn.getACIndex(accode) - 1;

    if (pn[skill] && pn[skill].niveaux[level] && pn[skill].niveaux[level].acs[ac]) {
        return pn[skill].niveaux[level].acs[ac].libelle;
    }
    return "Inconnu";
}


//Exemple retourne : { ac: {...}, niveau: {...}, competence: {...}  }
//Et dans l'objet ac il y'a ac:{code, libelle}
pn.getInfos = function (accode) {
    let skill = pn.getSkillIndex(accode) - 1;
    let level = pn.getLevelIndex(accode) - 1;
    let acIndex = pn.getACIndex(accode) - 1;

    if (pn[skill] && pn[skill].niveaux[level] && pn[skill].niveaux[level].acs[acIndex]) {
        return {
            ac: pn[skill].niveaux[level].acs[acIndex],
            niveau: pn[skill].niveaux[level],
            competence: pn[skill]
        };
    }
    return null;
}

export { pn };
