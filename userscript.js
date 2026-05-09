'use strict';

let smokeEmitters = [];

setTimeout(() => {

    const plane = geofs.aircraft.instance;

    console.log("[Formation] init");

    // 元機体非表示
    if (plane.parts.root?.object3d) {
        plane.parts.root.object3d.visible = false;
    }

    const GLB_URL = "https://raw.githubusercontent.com/supermanone-boop/models/main/F18.glb";

    const spacing = 20;

    // -----------------------
    // ✈️ 編隊生成
    // -----------------------
    plane.addParts([
        { name: "wingL2", model: GLB_URL, position: [-spacing * 2, 5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        { name: "wingL1", model: GLB_URL, position: [-spacing, 5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        { name: "center", model: GLB_URL, position: [0, 5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        { name: "wingR1", model: GLB_URL, position: [spacing, 5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
        { name: "wingR2", model: GLB_URL, position: [spacing * 2, 5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }
    ]);

    console.log("[Formation] planes added");

    // -----------------------
    // 🔴 スモーク生成
    // -----------------------
    const color = new Cesium.Color(1, 0, 0, 1);

    const keys = ["wingL2", "wingL1", "center", "wingR1", "wingR2"];

    keys.forEach(name => {

        const part = plane.parts[name];
        if (!part) return;

        const emitter = new geofs.fx.ParticleEmitter({

            anchor: {
                worldPosition: part.object3d?.worldPosition || part.position
            },

            duration: 1e10,
            rate: 0.05,
            life: 2500,

            startScale: 0.01,
            endScale: 0.1,

            randomizeStartScale: 0.01,
            randomizeEndScale: 0.15,

            startOpacity: 1,
            endOpacity: 0.2,

            startRotation: "random",
            texture: "whitesmoke",

            velocity: new Cesium.Cartesian3(0, 0, 1000),
        });

        smokeEmitters.push(emitter);
    });

    
    setInterval(() => {
        geofs.fx.setParticlesColor(color);
    }, 50);

    console.log("[Smoke] formation smoke ON");

}, 4000);