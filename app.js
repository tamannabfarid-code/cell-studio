const cellDatabase = {
    plant: {
        title: "Plant Cell", subtitle: "Eukaryotic Cell",
        iconPath: "icons/plant-cell.png-59092cf7-94b9-45b8-a943-e0fcc01f8322",
        modelPath: "3d_models/plant cell.glb",
        occurrenceImg: "where_they_occur/root plant cell.png-e14fbc23-f9e2-45fb-acc8-cc3930048814",
        organelle: "Nucleus", size: "5 - 10 μm in diameter", location: "Usually central position", lmVisible: "Yes",
        notes: "The nucleus is surrounded by a complex double membrane called the nuclear envelope, which contains intricate pore complexes that systematically regulate macromolecule distribution.",
        versusCell: { name: "Animal Cell", icon: "icons/animal-cell.png-562addd4-34ba-4c78-86e4-451e98df600c" }
    },
    "white-blood": {
        title: "White Blood Cell", subtitle: "Immune System Cell",
        iconPath: "icons/white-blood-cell.png-1828813d-fd16-4718-9a82-ac9eef0c9b45",
        modelPath: "3d_models/white blood cell.glb", 
        occurrenceImg: "where_they_occur/root white blood cell.png-3fe3de70-50f0-4889-b9ac-f1a1bf5749bb",
        organelle: "Lysosome", size: "0.1 - 1.2 μm", location: "Scattered throughout cytoplasm", lmVisible: "No",
        notes: "Highly abundant inside active immune variants to efficiently support the rapid chemical enzymatic breakdown of captured biological pathogens via phagocytosis processes.",
        versusCell: { name: "Plant Cell", icon: "icons/plant-cell.png-59092cf7-94b9-45b8-a943-e0fcc01f8322" }
    },
    neuron: {
        title: "Neuron", subtitle: "Specialized Nerve Cell",
        iconPath: "icons/single-neuron.png-0b95502b-63a9-4e2f-a084-72e119684011",
        modelPath: "3d_models/single neuron.glb",
        occurrenceImg: "where_they_occur/root single neuron cell.png-b1e2b474-5886-4235-83ee-1a991f783f23",
        organelle: "Soma (Cell Body Framework)", size: "4 - 100 μm variable", location: "Integrated neural connection networks", lmVisible: "Yes",
        notes: "The complex elongated dendritic and axonal structural architecture facilitates rapid electrochemical polarization transmission across long spatial pathways.",
        versusCell: { name: "Muscle Cell", icon: "icons/muscle-cell.png-1e54f475-0617-4130-942e-380f938cb8b9" }
    },
    animal: {
        title: "Animal Cell", subtitle: "Eukaryotic Cell",
        iconPath: "icons/animal-cell.png-562addd4-34ba-4c78-86e4-451e98df600c",
        modelPath: "3d_models/animal cell.glb",
        occurrenceImg: "where_they_occur/root animal cell.png-81284668-ce64-4334-b114-43f1a0ad7b6f",
        organelle: "Mitochondria", size: "0.5 - 10 μm average width", location: "Dispersed throughout cellular cytoplasm", lmVisible: "With Staining",
        notes: "Functions as the metabolic generator of the cell's energetic infrastructure, actively generating Adenosine Triphosphate (ATP) compounds via oxygen synthesis channels.",
        versusCell: { name: "Plant Cell", icon: "icons/plant-cell.png-59092cf7-94b9-45b8-a943-e0fcc01f8322" }
    },
    muscle: {
        title: "Muscle Cell", subtitle: "Contractile Muscle Fiber",
        iconPath: "icons/muscle-cell.png-1e54f475-0617-4130-942e-380f938cb8b9",
        modelPath: "3d_models/muscle cell.glb",
        occurrenceImg: "where_they_occur/root human cell.png-2bf579eb-de69-44b5-9134-3d98d77c96ca",
        organelle: "Myofibril Complexes", size: "10 - 100 μm cross-width", location: "Spatially aligned along major tissue axis", lmVisible: "Yes",
        notes: "Interlaced with specialized dense bands of actin and myosin protein blocks designed to slide past one another to generate linear structural muscle contraction forces.",
        versusCell: { name: "Neuron", icon: "icons/single-neuron.png-0b95502b-63a9-4e2f-a084-72e119684011" }
    }
};

// DOM Selections
const listItems = document.querySelectorAll('#cell-types-list .list-item');
const organelleItems = document.querySelectorAll('.organelle-item');
const model3DViewer = document.getElementById('cell-3d-model');
const textMainTitle = document.getElementById('current-cell-title');
const textSubtitle = document.getElementById('current-cell-subtitle');
const imageOccurrencePanel = document.getElementById('occurrence-img');

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
        item.classList.add('active-item');
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