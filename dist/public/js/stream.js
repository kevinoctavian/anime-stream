const btnResolusi = document.querySelector("#btn-resolusi");
const btnProvider = document.querySelector("#btn-provider");
let btnFile;

try {
    btnFile = document.querySelector("#btn-file");
} catch (error) {}

async function changeFile(file) {
    if (!haveMkv) return;

    btnFile.innerHTML = file;
    const data = await (
        await fetch(
            `/api/otakudesu/download/${id}/?resolution=${currentStream.resolusi}&type=${currentProfiver.prov}&file=${file}`,
        )
    ).json();

    typefiles = file;

    if (file === "mkv") {
        data.stream = "/api/stream/?url=" + data.stream;
    }

    document.querySelector(".vjs-tech").src = data.stream;
}

async function changeResolution(res) {
    btnResolusi.innerHTML = res;
    const data = await (
        await fetch(
            `/api/otakudesu/download/${id}/?resolution=${res}&type=${currentProfiver.prov}&file=${typefiles}`,
        )
    ).json();

    if (typefiles === "mkv") {
        data.stream = "/api/stream/?url=" + data.stream;
    }

    currentStream.resolusi = res;

    localStorage.setItem("resolusi", res);

    document.querySelector(".vjs-tech").src = data.stream;
}

async function changeProvider(prov) {
    btnProvider.innerHTML = prov;

    const data = await (
        await fetch(
            `/api/otakudesu/download/${id}/?resolution=${currentStream.resolusi}&type=${prov}&file=${typefiles}`,
        )
    ).json();

    if (typefiles === "mkv") {
        data.stream = "/api/stream/?url=" + data.stream;
    }

    currentProfiver = data[typefiles]
        .find((v) => v.resolusi === currentStream.resolusi)
        .downloadLink.find((v) => v.prov === prov);

    document.querySelector(".vjs-tech").src = data.stream;
}
