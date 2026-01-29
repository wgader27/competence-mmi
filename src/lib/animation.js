
import { gsap } from "gsap";

let Animation = {};

/**
 * Affiche ou cache les bulles "AC" avec une animation.
 * @param {NodeList|Array} elements - Les bulles AC à animer.
 * @param {boolean} show - Vrai pour afficher, Faux pour cacher.
 */
Animation.showBubbles = function (elements, show = true) {
    gsap.killTweensOf(elements);
    if (show) {
        gsap.to(elements, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.5)",
            transformOrigin: "center center",
            overwrite: "auto"
        });
    } else {
        gsap.to(elements, {
            autoAlpha: 0,
            scale: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            transformOrigin: "center center",
            overwrite: "auto"
        });
    }
};

/**
* Anime la galaxie (les étoiles).
*/
Animation.animateGalaxy = function (element) {
    if (!element) return;
    gsap.to(element, {
        rotation: 360,
        duration: 240,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center"
    });
};

Animation.animateSystem = function (orbits) {
    // Animation des orbites
    if (!orbits) return;

    orbits.forEach((el) => {
        if (el) {
            gsap.to(el, {
                rotation: 360,
                duration: 300,
                repeat: -1,
                ease: "linear",
                transformOrigin: "center center"
            });
        }
    });
};

/**
 * Effet de flottement (Idle)
 */
Animation.floatElement = function (elements, distance = 10, duration = 3) {
    if (!elements) return;
    const targets = elements.length ? elements : [elements];

    targets.forEach((el) => {
        if (!el._floatAnim) {
            const delay = Math.random() * 2;
            const randomDuration = duration + (Math.random() - 0.5);

            el._floatAnim = gsap.to(el, {
                y: `+=${distance}`,
                duration: randomDuration,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: delay,
                transformOrigin: "center center"
            });
        }
    });
};

// Effet de pulsation planete
Animation.pulseElement = function (elements, scaleMin = 0.9, scaleMax = 1.1, duration = 2) {
    if (!elements) return;
    const targets = elements.length ? elements : [elements];
    targets.forEach((el) => {
        gsap.fromTo(el,
            { scale: scaleMin },
            {
                scale: scaleMax,
                duration: duration,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                transformOrigin: "center center"
            }
        );
    });
};

// Effet de déplacement aléatoire
Animation.wanderElement = function (elements, distance = 20, duration = 3) {
    if (!elements) return;
    const targets = elements.length ? elements : [elements];
    targets.forEach((el) => {
        const move = () => {
            gsap.to(el, {
                x: (Math.random() - 0.5) * distance * 2,
                y: (Math.random() - 0.5) * distance * 2,
                duration: duration + (Math.random() - 0.5),
                ease: "sine.inOut",
                onComplete: move,
                overwrite: "auto"
            });
        };
        move();
    });
};

Animation.animateRocketIdle = function (rocket, fire) {
    if (!rocket) return;

    // Nettoyage animation précédente
    if (rocket._currentAnimation) {
        rocket._currentAnimation.kill();
        rocket._currentAnimation = null;
    }
    gsap.killTweensOf(rocket);
    if (fire) gsap.killTweensOf(fire);

    // Initialisation origine si inexistante
    if (!rocket._origin) {
        let originX = 1216, originY = 1020;
        try {
            const bbox = rocket.getBBox();
            if (bbox.width > 10) { originX = bbox.x + bbox.width / 2; originY = bbox.y + bbox.height / 2; }
        } catch (e) { }
        rocket._origin = { x: originX, y: originY };
    }

    const cruise = () => {
        const minX = 200, maxX = 2100;
        const minY = 200, maxY = 1700;

        // Cible aléatoire
        const absTargetX = minX + Math.random() * (maxX - minX);
        const absTargetY = minY + Math.random() * (maxY - minY);

        const targetX = absTargetX - rocket._origin.x;
        const targetY = absTargetY - rocket._origin.y;

        // Position actuelle
        const currentX = gsap.getProperty(rocket, "x") || 0;
        const currentY = gsap.getProperty(rocket, "y") || 0;

        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Vitesse 
        const speed = 150;
        const duration = Math.max(2, distance / speed);

        const angleRad = Math.atan2(deltaY, deltaX);
        const angleDeg = angleRad * (180 / Math.PI) + 90;

        const timeline = gsap.timeline({ onComplete: cruise });
        rocket._currentAnimation = timeline;

        // Rotation
        timeline.to(rocket, {
            rotation: angleDeg + "_short",
            duration: 1.0,
            ease: "sine.inOut"
        });

        if (fire) {
            timeline.to(fire, { scaleY: 1.5, opacity: 0.9, duration: 0.5 }, "<");
        }

        // Déplacement
        timeline.to(rocket, {
            x: targetX,
            y: targetY,
            duration: duration,
            ease: "sine.inOut"
        }, ">-0.5");

        if (fire) {
            timeline.to(fire, { scaleY: 1.2, opacity: 0.7, duration: 0.5 }, "<0.5");
            timeline.to(fire, { scaleY: 0.8, opacity: 0.4, duration: 1.0 }, "-=1.0");
        }
    };

    cruise();

    // Flamme
    if (fire) {
        gsap.to(fire, {
            scaleX: 1.2, duration: 0.08, yoyo: true, repeat: -1, ease: "linear"
        });
    }
};

Animation.animateRocketLanding = function (rocket, target, onComplete) {
    if (!rocket || !target) return;

    // Nettoyage
    if (rocket._currentAnimation) {
        rocket._currentAnimation.kill();
        rocket._currentAnimation = null;
    }
    gsap.killTweensOf(rocket);

    const fire = rocket.querySelector('#fumee_fusee');
    if (fire) gsap.killTweensOf(fire);

    const origin = rocket._origin || { x: 1216, y: 1020 };

    // Cible visuelle
    let bestTarget = target;
    if (target.querySelector) {
        const body = target.querySelector('[id*="radial"], circle');
        if (body) bestTarget = body;
    }

    // Calcul coordonnées
    const svg = rocket.ownerSVGElement;

    function getGlobalCoordinates(elem) {
        const point = svg.createSVGPoint();
        const bbox = elem.getBBox();
        const matrix = elem.getCTM();
        point.x = bbox.x + bbox.width / 2;
        point.y = bbox.y + bbox.height / 2;
        return point.matrixTransform(matrix);
    }

    const targetGlobalPoint = getGlobalCoordinates(bestTarget);
    const parentInverseMatrix = rocket.parentNode.getCTM().inverse();
    const finalLocation = targetGlobalPoint.matrixTransform(parentInverseMatrix);

    const targetX = finalLocation.x - origin.x + 20;
    const targetY = finalLocation.y - origin.y;

    const currentX = gsap.getProperty(rocket, "x") || 0;
    const currentY = gsap.getProperty(rocket, "y") || 0;
    const deltaX = targetX - currentX;
    const deltaY = (targetY - 300) - currentY;
    const angleDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    const timeline = gsap.timeline();
    rocket._currentAnimation = timeline;

    timeline.to(rocket, { rotation: angleDegrees + "_short", duration: 1.0, ease: "power2.out" });
    if (fire) timeline.to(fire, { scaleY: 2.5, opacity: 1, duration: 0.5 }, "<");

    timeline.to(rocket, {
        x: targetX,
        y: targetY - 300,
        duration: 1.5,
        ease: "power2.inOut"
    }, "<0.2");

    timeline.to(rocket, { rotation: 0, duration: 0.8, ease: "back.out(1.2)" });
    timeline.to(rocket, { y: targetY, duration: 1.2, ease: "power2.out" });
    if (fire) timeline.to(fire, { scaleY: 0, opacity: 0, duration: 0.2 }, ">-0.2");

    timeline.to(rocket, { y: "+=5", scaleY: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

    timeline.add(() => { if (onComplete) onComplete(); });
    timeline.add(() => { }, "+=4"); // Attente
    timeline.add(() => Animation.animateRocketIdle(rocket, fire));
};

Animation.updateBubbleStyle = function (bubble, status) {
    const circle = bubble.querySelector('circle') || bubble.querySelector('path[id*="cercle"]');
    if (circle) {
        let color = '#1E293B';
        let opacity = '0.4';

        if (status === 1) {
            color = '#f5b70bff';
            opacity = '0.9';
        } else if (status === 2) {
            color = '#4dff88';
            opacity = '1';
        }

        gsap.to(circle, {
            fill: color,
            fillOpacity: opacity,
            duration: 0.3,
            overwrite: "auto"
        });
    }



    const icons = bubble.querySelectorAll('[id*="icon"] path, [id*="Vector"]');
    if (icons.length > 0) {
        let strokeColor = '#64748B'; // Gris par défaut

        if (status > 0) {
            strokeColor = '#FFFFFF'; // Blanc si validé ou en cours
        }

        gsap.to(icons, {
            stroke: strokeColor,
            duration: 0.3,
            overwrite: "auto"
        });
    }
};

Animation.animateHover = function (element, enter) {
    gsap.to(element, {
        scale: enter ? 1.1 : 1,
        duration: 0.2,
        transformOrigin: "center center",
        overwrite: "auto"
    });
};

Animation.animatePlanetAmbient = function (planetGroup) {
    if (!planetGroup) return;
    const rings = planetGroup.querySelectorAll('path');
    rings.forEach((ring) => {
        const id = ring.id || "";
        const isMain = id.includes('stroke') || id.includes('radial');
        const opacity = parseFloat(ring.getAttribute('opacity') || "1");

        if (!isMain && (opacity < 0.6 || id.includes('Vector'))) {
            if (!ring._ambientAnim) {
                ring._ambientAnim = gsap.to(ring, {
                    rotation: 360,
                    duration: 25 + Math.random() * 20,
                    repeat: -1,
                    ease: "linear",
                    transformOrigin: "center center"
                });
            }
        }
    });
};

Animation.updatePlanetVisuals = function (planetGroup, ratio) {
    if (!planetGroup) return;

    // Nettoyage de l'état précédent
    if (planetGroup._stateAnim) {
        planetGroup._stateAnim.kill();
        planetGroup._stateAnim = null;
    }

    // --- ETAT 1: MORT (0%) ---
    if (ratio === 0) {
        gsap.to(planetGroup, {
            filter: "grayscale(100%) brightness(60%) contrast(110%)",
            duration: 1.0,
            overwrite: "auto"
        });

        planetGroup._stateAnim = gsap.to(planetGroup, {
            scale: 0.98,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            transformOrigin: "center center"
        });
    }

    // --- ETAT 2: FEU / VALIDÉ (100%) ---
    else if (ratio >= 1) {
        planetGroup._stateAnim = gsap.timeline({ repeat: -1, yoyo: true });

        planetGroup._stateAnim.fromTo(planetGroup,
            {
                filter: "brightness(130%) saturate(140%) drop-shadow(0 0 20px rgba(255, 100, 0, 0.8))",
                scale: 1
            },
            {
                filter: "brightness(170%) saturate(200%) drop-shadow(0 0 60px rgba(255, 120, 0, 1))",
                duration: 0.8,
                ease: "sine.inOut"
            }
        );

        Animation.animatePlanetAmbient(planetGroup);

        if (planetGroup._floatAnim) { planetGroup._floatAnim.kill(); planetGroup._floatAnim = null; }
        gsap.killTweensOf(planetGroup, "y");
        gsap.set(planetGroup, { y: 0 });
    }

    // --- ETAT 3: NORMAL (>0% et <100%) ---
    else {
        gsap.to(planetGroup, {
            filter: "none",
            scale: 1,
            duration: 1.0,
            overwrite: "auto"
        });
        Animation.animatePlanetAmbient(planetGroup);
    }
};



export { Animation };
