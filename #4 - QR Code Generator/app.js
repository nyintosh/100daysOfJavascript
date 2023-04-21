// Get DOM elements
const download = document.querySelector('.download');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qr-code');
const qrText = document.querySelector('.qr-text');
const shareBtn = document.querySelector('.share-btn');
const sizes = document.querySelector('.sizes');

// Set default values
const defaultUrl = 'https://github.com/nyintosh';
let colorLight = '#fff';
let colorDark = '#000';
let text = defaultUrl;
let size = 300;

// Event listeners
dark.addEventListener('input', handleColorChange);
light.addEventListener('input', handleColorChange);
qrText.addEventListener('input', handleQRText);
sizes.addEventListener('change', handleSizeChange);
shareBtn.addEventListener('click', handleShareClick);

// Functions
async function handleColorChange(e) {
	if (e.target === dark) {
		colorDark = e.target.value;
	} else {
		colorLight = e.target.value;
	}
	await generateQRCode();
}

function handleQRText(e) {
	text = e.target.value || defaultUrl;
	generateQRCode();
}

async function generateQRCode() {
	qrContainer.innerHTML = '';
	await QRCode.toCanvas(qrContainer, text, {
		width: size,
		height: size,
		color: {
			light: colorLight,
			dark: colorDark,
		},
	});
	download.href = await resolveDataUrl();
}

async function handleShareClick() {
	try {
		const base64url = await resolveDataUrl();
		const blob = await (await fetch(base64url)).blob();
		const file = new File([blob], 'QRCode.png', {
			type: blob.type,
		});
		await navigator.share({
			files: [file],
			title: text,
		});
	} catch (error) {
		alert("Your browser doesn't support sharing.");
	}
}

function handleSizeChange(e) {
	size = e.target.value;
	generateQRCode();
}

function resolveDataUrl() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const img = document.querySelector('#qr-code img');
			if (img.currentSrc) {
				resolve(img.currentSrc);
			} else {
				const canvas = document.querySelector('canvas');
				resolve(canvas.toDataURL());
			}
		}, 50);
	});
}

// Generate initial QR code
generateQRCode();
