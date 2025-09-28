let currentQRUrl = null;

function generateQR() {
    const input = document.getElementById('text-input').value.trim();
    const qrElement = document.getElementById('qrcode');
    const actions = document.getElementById('actions');

    if (!input) {
        alert('Please enter some text or URL');
        return;
    }

    // Build free API URL (api.qrserver.com)
    const size = '200x200';
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(input)}`;
    currentQRUrl = apiUrl;

    // Render image
    qrElement.innerHTML = '';
    const img = document.createElement('img');
    img.id = 'qrcode-img';
    img.src = apiUrl;
    img.alt = 'Generated QR Code';
    img.width = 200;
    img.height = 200;
    qrElement.appendChild(img);

    // Show actions
    actions.style.display = 'flex';
}

async function downloadQR() {
    if (!currentQRUrl) return;
    try {
        const res = await fetch(currentQRUrl, { mode: 'cors' });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        // Fallback: open image in new tab if download via blob fails
        window.open(currentQRUrl, '_blank');
    }
}

function clearQR() {
    const qrElement = document.getElementById('qrcode');
    const actions = document.getElementById('actions');
    const input = document.getElementById('text-input');

    qrElement.innerHTML = '';
    input.value = '';
    actions.style.display = 'none';
    currentQRUrl = null;
}

// Allow generating QR code with Enter key
document.getElementById('text-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateQR();
    }
});
