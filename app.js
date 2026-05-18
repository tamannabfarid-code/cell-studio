const cellDatabase = {
    plant: {
        title: "Plant Cell", subtitle: "Eukaryotic Cell",
        iconPath: "plant-cell.png",
        modelPath: "plant cell.glb",
        occurrenceImg: "root plant cell.png",
        microImg: "microscope.png",
        organelle: "Nucleus", size: "5 - 10 μm in diameter", location: "Usually central position", lmVisible: "Yes",
        notes: "The nucleus is surrounded by a complex double membrane called the nuclear envelope, which contains intricate pore complexes that systematically regulate macromolecule distribution.",
        versusCell: { name: "Animal Cell", icon: "animal-cell.png" }
    },
    "white-blood": {
        title: "White Blood Cell", subtitle: "Immune System Cell",
        iconPath: "white-blood-cell.png",
        modelPath: "white blood cell.glb", 
        occurrenceImg: "root white blood cell.png",
        microImg: "microscope.png",
        organelle: "Lysosome", size: "0.1 - 1.2 μm", location: "Scattered throughout cytoplasm", lmVisible: "No",
        notes: "Highly abundant inside active immune variants to efficiently support the rapid chemical enzymatic breakdown of captured biological pathogens via phagocytosis processes.",
        versusCell: { name: "Plant Cell", icon: "plant-cell.png" }
    },
    neuron: {
        title: "Neuron", subtitle: "Specialized Nerve Cell",
        iconPath: "single-neuron.png",
        modelPath: "single neuron.glb",
        occurrenceImg: "root single neuron cell.png",
        microImg: "microscope.png",
        organelle: "Soma (Cell Body Framework)", size: "4 - 100 μm variable", location: "Integrated neural connection networks", lmVisible: "Yes",
        notes: "The complex elongated dendritic and axonal structural architecture facilitates rapid electrochemical polarization transmission across long spatial pathways.",
        versusCell: { name: "Muscle Cell", icon: "muscle-cell.png" }
    },
    animal: {
        title: "Animal Cell", subtitle: "Eukaryotic Cell",
        iconPath: "animal-cell.png",
        modelPath: "animal cell.glb",
        occurrenceImg: "root animal cell.png",
        microImg: "microscope.png",
        organelle: "Mitochondria", size: "0.5 - 10 μm average width", location: "Dispersed throughout cellular cytoplasm", lmVisible: "With Staining",
        notes: "Functions as the metabolic generator of the cell's energetic infrastructure, actively generating Adenosine Triphosphate (ATP) compounds via oxygen synthesis channels.",
        versusCell: { name: "Plant Cell", icon: "plant-cell.png" }
    },
    muscle: {
        title: "Muscle Cell", subtitle: "Contractile Muscle Fiber",
        iconPath: "muscle-cell.png",
        modelPath: "muscle cell.glb",
        occurrenceImg: "root human cell.png",
        microImg: "microscope.png",
        organelle: "Myofibril Complexes", size: "10 - 100 μm cross-width", location: "Spatially aligned along major tissue axis", lmVisible: "Yes",
        notes: "Interlaced with specialized dense bands of actin and myosin protein blocks designed to slide past one another to generate linear structural muscle contraction forces.",
        versusCell: { name: "Neuron", icon: "single-neuron.png" }
    }
};

// DOM Selections
const listItems = document.querySelectorAll('#cell-types-list .list-item');
const organelleItems = document.querySelectorAll('.organelle-item');
const model3DViewer = document.getElementById('cell-3d-model');
const textMainTitle = document.getElementById('current-cell-title');
const textSubtitle = document.getElementById('current-cell-subtitle');
const imageOccurrencePanel = document.getElementById('occurrence-img');
const imageOccurrencePanel = document.getElementById('occurrence-img');
const imageMicroscopePanel = document.getElementById('microscope-view-img');

const textOrganelleName = document.getElementById('organelle-name');
const textMetricSize = document.getElementById('info-size');
const textMetricLocation = document.getElementById('info-location');
const textMetricLM = document.getElementById('info-lm');
const textBiologicalNotes = document.getElementById('bio-notes-text');

const imgCompareCurrent = document.getElementById('compare-current-img');
const textCompareCurrent = document.getElementById('compare-current-name');
const imgCompareVersus = document.getElementById('compare-versus-img');
const textCompareVersus = document.getElementById('compare-versus-name');

// Cell List Selection Engine
listItems.forEach(item => {
    item.addEventListener('click', () => {
        listItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        const lookupKey = item.getAttribute('data-cell');
        const record = cellDatabase[lookupKey];
        
        if (record) {
            textMainTitle.textContent = record.title;
            textSubtitle.textContent = record.subtitle;
            model3DViewer.setAttribute('src', record.modelPath);
            imageOccurrencePanel.setAttribute('src', record.occurrenceImg);
            model3DViewer.setAttribute('src', record.modelPath);
            imageOccurrencePanel.setAttribute('src', record.occurrenceImg);
            imageMicroscopePanel.setAttribute('src', record.microImg);
            
            textOrganelleName.textContent = record.organelle;
            textMetricSize.textContent = record.size;
            textMetricLocation.textContent = record.location;
            textMetricLM.textContent = record.lmVisible;
            textBiologicalNotes.textContent = record.notes;

            imgCompareCurrent.setAttribute('src', record.iconPath);
            textCompareCurrent.textContent = record.title;
            imgCompareVersus.setAttribute('src', record.versusCell.icon);
            textCompareVersus.textContent = record.versusCell.name;
        }
    });
});

// Organelle Selection Logic
organelleItems.forEach(item => {
    item.addEventListener('click', () => {
        organelleItems.forEach(el => el.classList.remove('active-item'));
        item.clusterList = item.classList.add('active-item');
    });
});

// Viewport System Adjustments
document.getElementById('btn-reset').addEventListener('click', () => {
    model3DViewer.cameraOrbit = "0deg 75deg auto";
    model3DViewer.cameraTarget = "auto auto auto";
});

let rotationActiveFlag = true;
document.getElementById('btn-rotate').addEventListener('click', () => {
    rotationActiveFlag = !rotationActiveFlag;
    model3DViewer.autoRotate = rotationActiveFlag;
});
