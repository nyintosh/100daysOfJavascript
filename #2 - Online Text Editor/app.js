const $ = (selector) => document.querySelectorAll(selector);

const optionsButtons = $('.option-button');
const advancedOptionButton = $('.adv-option-button');
const alignButtons = $('.align');
const spacingButtons = $('.spacing');
const formatButtons = $('.format');
const scriptButtons = $('.script');
const [linkButton, fontName, fontSizeRef, writingArea] = $(
	'#createLink, #fontName, #fontSize, #text-input',
);

const fontList = [
	'Arial',
	'Verdana',
	'Times New Roman',
	'Garamond',
	'Georgia',
	'Courier New',
	'Cursive',
];

const highlighter = (className, needsRemoval) => {
	className.forEach((button) => {
		button.addEventListener('click', () => {
			if (needsRemoval) {
				const alreadyActive = button.classList.contains('active');
				highlighterRemover(className);

				if (!alreadyActive) {
					button.classList.add('active');
				}
			} else {
				button.classList.toggle('active');
			}
		});
	});
};

const highlighterRemover = (className) => {
	className.forEach((button) => {
		button.classList.remove('active');
	});
};

const createOption = (value, text) => {
	const option = document.createElement('option');
	option.value = value;
	option.textContent = text;

	return option;
};

const addFontOptions = () => {
	fontList.forEach((font) => {
		fontName.appendChild(createOption(font, font));
	});
};

const addFontSizeOptions = () => {
	for (let i = 1; i <= 7; i++) {
		fontSizeRef.appendChild(createOption(i, i));
	}

	fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
	document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
	button.addEventListener('click', () => {
		modifyText(button.id, false, null);
	});
});

advancedOptionButton.forEach((button) => {
	button.addEventListener('click', () => {
		modifyText(button.id, false, button.value);
	});
});

linkButton.addEventListener('click', () => {
	let userLink = prompt('Enter a URL e.g. https://...');

	if (/https/i.test(userLink)) {
		modifyText(linkButton.id, false, userLink);
	} else {
		userLink = 'https://' + userLink;
		modifyText(linkButton.id, false, userLink);
	}
});

addFontOptions();
addFontSizeOptions();
highlighter(alignButtons, true);
highlighter(spacingButtons, true);
highlighter(formatButtons, true);
highlighter(scriptButtons, true);
