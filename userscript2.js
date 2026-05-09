'use strict';

let phase = 0;
let startTime = 0;

const speed = 1.5; // m/s

const names = ["wingL2","wingL1","center","wingR1","wingR2"];

const rotationTarget = {
    wingR1: 45,
    wingR2: 45,
    wingL1: -45,
    wingL2: -45,
    center: 0
};

let basePos = {};
let direction = {};


const btn = document.createElement("button");
btn.innerText = "FORMATION START";
btn.style.position = "absolute";
btn.style.top = "10px";
btn.style.left = "10px";
btn.style.zIndex = 99999;

btn.onclick = () => {

    const plane = geofs.aircraft.instance;

    names.forEach(n => {
        const p = plane.parts[n];
        if (!p) return;

        basePos[n] = [...p.position];
        p._rot = 0;
    });

    phase = 1;
    startTime = performance.now();
};

document.body.appendChild(btn);


geofs.api.addFrameCallback(() => {

    const plane = geofs.aircraft.instance;
    if (phase === 0) return;

    const t = (performance.now() - startTime) / 1000;

    
    if (phase === 1) {

        let done = 0;

        names.forEach(name => {

            const p = plane.parts[name];
            if (!p) return;

            const target = rotationTarget[name] || 0;

            p._rot += (target - p._rot) * 0.12;

            if (p.object3d) {
                p.object3d.rotateY(-p._rot * Math.PI / 180);
            }

            if (Math.abs(p._rot - target) < 0.3) {
                done++;
            }
        });

        if (done >= 4) {

            names.forEach(name => {

                const angle = (rotationTarget[name] || 0) * Math.PI / 180;

                // 回転方向（Y平面）
                direction[name] = {
                    x: Math.sin(angle),
                    z: Math.cos(angle)
                };
            });

            phase = 2;
            startTime = performance.now();

            console.log("[Formation] PHASE 2");
        }
    }

    
    if (phase === 2) {

        const dt = t;

        names.forEach(name => {

            const p = plane.parts[name];
            if (!p || !basePos[name]) return;

            if (name === "center") return;

            const dir = direction[name];
            if (!dir) return;

            const targetPos = [
                basePos[name][0] + dir.x * speed * dt,
                basePos[name][1],
                basePos[name][2] + dir.z * speed * dt
            ];

            
            p.position[0] += (targetPos[0] - p.position[0]) * 0.06;
            p.position[1] += (targetPos[1] - p.position[1]) * 0.06;
            p.position[2] += (targetPos[2] - p.position[2]) * 0.06;
        });
    }
});