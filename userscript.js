setTimeout(() => {

    const plane = geofs.aircraft.instance;

    console.log("[GLB] formation start (no leader)");

    if (plane.parts.root?.object3d) {
        plane.parts.root.object3d.visible = false;
    }

    const GLB_URL = "https://raw.githubusercontent.com/supermanone-boop/models/main/F18.glb";

    const spacing = 20;

    plane.addParts([
        // 左外
        {
            name: "wingL2",
            model: GLB_URL,
            position: [-spacing * 2, 5, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        },

        // 左内
        {
            name: "wingL1",
            model: GLB_URL,
            position: [-spacing, 5, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        },

        // 中央（自機）
        {
            name: "center",
            model: GLB_URL,
            position: [0, 5, 0],
            rotation: [0, 0, 0],
            scale: [0, 0, 0]
        },

        // 右内
        {
            name: "wingR1",
            model: GLB_URL,
            position: [spacing, 5, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        },

        // 右外
        {
            name: "wingR2",
            model: GLB_URL,
            position: [spacing * 2, 5, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        }
    ]);

}, 4000);