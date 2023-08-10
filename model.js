let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = "./model.json";
    const metadataURL = "./metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(372, 212, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    const comOculosProbability = prediction[0].probability;
    const semOculosProbability = prediction[1].probability;

    updateBar(comOculosProbability, 1);
    updateBar(semOculosProbability, 2);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

function updateBar(per, bar) {
    var bar1 = document.querySelector(`.bar-${bar} div`);
    bar1.style.width = `${per * 100}%`;
}

init();