//addBackdrop(25);

function addBackdrop(d) {
    
    const dimensions = d || 50;
    const two = new Two({
    type: Two.Types.canvas,
    width: dimensions,
    height: dimensions
    });

    const r = dimensions / 5;
    const center = dimensions / 2;

    const a = two.makeLine(center - r, center, center + r, center);
    const b = two.makeLine(center, center - r, center, center + r);

    a.stroke = b.stroke = '#aaa';
    a.linewidth = b.linewidth = 0.25;

    two.update();

    const container = document.querySelector("header");
    // container.style.width = "100%";
    // container.style.height = "600px";
    container.style.backgroundImage = `url(${two.renderer.domElement.toDataURL()})`;
    container.style.backgroundRepeat = 'repeat';
    container.style.backgroundSize = `${dimensions}px`;
}