function calculate() {
    const truckW = Number(document.getElementById("truckWidth").value);
    const truckH = Number(document.getElementById("truckHeight").value);

    const itemW = Number(document.getElementById("itemWidth").value);
    const itemH = Number(document.getElementById("itemHeight").value);
    const count = Number(document.getElementById("itemCount").value);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // масштаб (чтобы кузов влезал в canvas)
    const scale = Math.min(
        canvas.width / truckW,
        canvas.height / truckH
    );

    const scaledTruckW = truckW * scale;
    const scaledTruckH = truckH * scale;

    // рисуем кузов
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, scaledTruckW, scaledTruckH);

    let x = 0;
    let y = scaledTruckH - itemH * scale;

    let placed = 0;

    for (let i = 0; i < count; i++) {
        if (x + itemW * scale > scaledTruckW) {
            x = 0;
            y -= itemH * scale;
        }

        if (y < 0) break;

        ctx.fillStyle = "#4caf50";
        ctx.fillRect(x, y, itemW * scale, itemH * scale);
        ctx.strokeRect(x, y, itemW * scale, itemH * scale);

        x += itemW * scale;
        placed++;
    }

    const stats = document.getElementById("stats");
    stats.textContent =
        `Уложено: ${placed} из ${count}`;
}
