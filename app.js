let scene, camera, renderer, controls, currentModel;

const container = document.getElementById('canvas-container');

function init3D() {
    // 1. Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#fdfdfb');

    // 2. Create Camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 5. Controls (Zoom, Pan, Orbit)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Load initial asset
    loadCellModel('plant cell.glb');

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

// Function to handle loading and cleaning up assets
function loadCellModel(fileName) {
    if (currentModel) scene.remove(currentModel);

    const loader = new THREE.GLTFLoader();
    
    // Expecting the .glb files inside the same directory or specified folder path
    loader.load(fileName, function (gltf) {
        currentModel = gltf.scene;
        
        // Auto-center target object geometry
        const box = new THREE.Box3().setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        currentModel.position.x += (currentModel.position.x - center.x);
        currentModel.position.y += (currentModel.position.y - center.y);
        currentModel.position.z += (currentModel.position.z - center.z);
        
        scene.add(currentModel);
    }, undefined, function (error) {
        console.error('An error happened parsing the GLB file:', error);
    });
}

// UI Event Binding Interactivity
document.querySelectorAll('.cell-item').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.cell-item').forEach(b => b.classList.remove('active'));
        const btn = e.currentTarget;
        btn.classList.add('active');
        
        const file = btn.getAttribute('data-model');
        const cellName = btn.querySelector('.cell-name').innerText;
        const cellSub = btn.querySelector('.cell-sub').innerText;
        
        document.getElementById('current-cell-title').innerText = cellName;
        document.getElementById('current-cell-sub').innerText = cellSub;
        
        loadCellModel(file);
    });
});

document.getElementById('btn-reset').addEventListener('click', () => {
    controls.reset();
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Run application
init3D();