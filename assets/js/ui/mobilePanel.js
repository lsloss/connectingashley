export function initBottomSheet(map) {
    const sheet = document.getElementById("filter-panel");
    const header = document.getElementById("sheet-header");
    const minHeight = window.innerHeight * 0.053; // collapsed
    const midHeight = window.innerHeight * 0.40; // peek
    const maxHeight = window.innerHeight * 0.9; // full
    const DRAG_THRESHOLD = 6;

    let dragging = false;
    let sheetDragging = false;
    let startY = 0;
    let startHeight = 0;
    let lastY = 0;
    let velocity = 0;
    let lastTime = 0;

    const snapPoints = [minHeight, midHeight, maxHeight];

    function setHeight(h) {
        sheet.style.height = `${h}px`;
    }

    function expandToMid() {
        const current = sheet.getBoundingClientRect().height;

        // already near mid → do nothing
        if (Math.abs(current - midHeight) < 25) return;

        setHeight(midHeight);
    }

    function getClosestSnap(value) {
        return snapPoints.reduce((a, b) =>
            Math.abs(b - value) < Math.abs(a - value) ? b : a
        );
    }

    function applyRubberBand(value, min, max) {
        if (value < min) {
            return min - (min - value) * 0.3;
        }

        if (value > max) {
            return max + (value - max) * 0.3;
        }

        return value;
    }

    function onStart(clientY) {
        dragging = false;
        sheetDragging = true;

        startY = clientY;
        startHeight = sheet.getBoundingClientRect().height;

        lastY = clientY;
        lastTime = Date.now();
    }

    function onMove(clientY) {
        const deltaY = startY - clientY;

        if (!dragging && Math.abs(deltaY) < DRAG_THRESHOLD) return;

        dragging = true;
        sheet.classList.add("sheet-dragging");
        disableMapInteraction();

        let newHeight = startHeight + deltaY;
        newHeight = applyRubberBand(newHeight, minHeight, maxHeight);
        setHeight(newHeight);

        // velocity tracking
        const now = Date.now();
        const dt = now - lastTime;

        if (dt > 0) {
            velocity = (clientY - lastY) / dt;
            lastY = clientY;
            lastTime = now;
        }
    }

    function onEnd() {
        sheetDragging = false;
        enableMapInteraction();
        sheet.classList.remove("sheet-dragging");

        const currentHeight = sheet.getBoundingClientRect().height;

        // swipe-down-to-dismiss logic
        if (velocity > 0.8 && currentHeight < midHeight) {
            setHeight(minHeight);
            return;
        }

        const snap = getClosestSnap(currentHeight);
        setHeight(snap);
    }

    // TOUCH
    sheet.addEventListener("touchstart", (e) => {
        if (isInteractive(e.target)) {
            return;
        }

        onStart(e.touches[0].clientY);
    });

    sheet.addEventListener("touchmove", (e) => {
        onMove(e.touches[0].clientY);
    });

    sheet.addEventListener("touchend", onEnd);

    // MOUSE (desktop testing)
    sheet.addEventListener("mousedown", (e) => {
        onStart(e.clientY);

        const move = (ev) => onMove(ev.clientY);
        const up = () => {
            onEnd();
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    });

    let popupOpening = false;

    function setPopupOpening(value) {
        popupOpening = value;
    }

    // TAP OUTSIDE TO COLLAPSE
    document.addEventListener("click", (e) => {
         if (popupOpening) {
            popupOpening = false;
            return;
        }

        const clickedInsideMap = e.target.closest("#map");
        const clickedInsideSheet = sheet.contains(e.target);

        if (clickedInsideMap && !clickedInsideSheet) {
            setHeight(minHeight);
        }
    });

    function isInteractive(el) {
        return el.closest(
            'a, button, input, textarea, select, label'
        );
    }

    function disableMapInteraction() {
        map.dragging?.disable?.();
        map.scrollZoom?.disable?.();
    }

    function enableMapInteraction() {
        map.dragging?.enable?.();
        map.scrollZoom?.enable?.();
    }

    return {
        expandToMid,
        setHeight,
        setPopupOpening
    };
}