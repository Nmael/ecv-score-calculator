var resultsInfo = {
	'9-10': 'Patients with an NP score of 9 or 10 are highly likely to benefit from ECV, with all such patients in the initial NP study experiencing successful version.',
	'8': 'Patients with an NP score of 8 are very likely to benefit from ECV, with 88% of such patients in the initial NP study experiencing successful version.',
	'5-7': 'Patients with an NP score of 5, 6, or 7 are moderately likely to benefit from ECV, with 65% of such patients in the initial NP study experiencing successful version.',
	'5-7': 'Patients with an NP score of 5, 6, or 7 are moderately likely to benefit from ECV, with 65% of such patients in the initial NP study experiencing successful version.',
	'3-4': 'Patients with an NP score of 3 or 4 are unlikely to benefit from ECV; only 21% of patients with a score of 4 or less experienced successful version in the initial NP study.',
	'0-2': 'Patients with an NP score of 0, 1, or 2 are highly unlikely to benefit from ECV, with no such patients in the initial NP study experiencing successful version.',
};

var results = {
	10: ['High likelihood', 'panel-success', resultsInfo['9-10']],
	9: ['High likelihood', 'panel-success', resultsInfo['9-10']],
	8: ['High likelihood', 'panel-success', resultsInfo['8']],
	7: ['Moderate likelihood', 'panel-warning', resultsInfo['5-7']],
	6: ['Moderate likelihood', 'panel-warning', resultsInfo['5-7']],
	5: ['Moderate likelihood', 'panel-warning', resultsInfo['5-7']],
	4: ['Low likelihood', 'panel-danger', resultsInfo['3-4']],
	3: ['Low likelihood', 'panel-danger', resultsInfo['3-4']],
	2: ['Very low likelihood', 'panel-danger', resultsInfo['0-2']],
	1: ['Very low likelihood', 'panel-danger', resultsInfo['0-2']],
	0: ['Very low likelihood', 'panel-danger', resultsInfo['0-2']],
};

function cartQuestion(id, question, options) {
	this.id = id;
	this.question = question;
	this.options = options;
}

function cartOption(text, successRate, nextQ) {
	this.text = text;
	this.successRate = successRate;
	this.nextQ = nextQ;
}

var cartQNullipBreech = new cartQuestion(
	'nullip-breech', 'Breech Type',
	[new cartOption('Frank', 45, null), new cartOption('Non-Frank', 54, null)]
);

var cartQNullipBMI = new cartQuestion(
	'nullip-bmi', 'BMI',
	[new cartOption('&ge;32.7', 39, null), new cartOption('32.7', 51, cartQNullipBreech)]
);

var cartQNullipPlacenta = new cartQuestion(
	'nullip-placenta', 'Placental Location',
	[new cartOption('Anterior', 40, null), new cartOption('Non-anterior', 50, cartQNullipBMI)]
);

var cartQNullipFetalHead = new cartQuestion(
	'nullip-fetal-head', 'Fetal Head',
	[new cartOption('Difficult to palpate', 13, null), new cartOption('Easy to palpate', 47, cartQNullipPlacenta)]
);

var cartQNullipEngagement = new cartQuestion(
	'nullip-engagement', 'Engagement',
	[new cartOption('Engaged', 10, null), new cartOption('Floating/Dipping', 42, cartQNullipFetalHead)]
);

var cartQMultipFetalHead = new cartQuestion(
	'multip-fetal-head', 'Fetal Head',
	[new cartOption('Difficult to palpate', 48, null), new cartOption('Easy to palpate', 78, null)]
);

var cartQMultipPlacenta = new cartQuestion(
	'multip-placenta', 'Placental Location',
	[new cartOption('Anterior', 46, null), new cartOption('Non-anterior', 68, null)]
);

var cartQMultipGA = new cartQuestion(
	'multip-ga', 'Gestational Age',
	[new cartOption('&ge;37 weeks, 0 days', 59, cartQMultipPlacenta), new cartOption('<37 weeks, 0 days', 75, cartQMultipFetalHead)]
);

var cartQMultipEngagement = new cartQuestion(
	'multip-engagement', 'Engagement',
	[new cartOption('Engaged', 15, null), new cartOption('Floating/Dipping', 69, cartQMultipGA)]
);

var cartQParity = new cartQuestion(
	'parity', 'Parity',
	[new cartOption('Nulliparous', 33, cartQNullipEngagement), new cartOption('Multiparous', 61,cartQMultipEngagement)]
);

var cartQTree = cartQParity;

function switchCalcNP() {
	$('#nav-np').addClass('active');
	$('#calc-np').show();
	$('#nav-cart').removeClass('active');
	$('#calc-cart').hide();
}

function switchCalcCart() {
	$('#nav-cart').addClass('active');
	$('#calc-cart').show();
	$('#nav-np').removeClass('active');
	$('#calc-np').hide();
}
function switchCalcNP() {
	$('#nav-np').addClass('active');
	$('#calc-np').show();
	$('#nav-cart').removeClass('active');
	$('#calc-cart').hide();
}

function switchCalcCart() {
	$('#nav-cart').addClass('active');
	$('#calc-cart').show();
	$('#nav-np').removeClass('active');
	$('#calc-np').hide();
}

$(document).ready(function() {
	if(window.location.hash.slice(1) == 'cart') {
		switchCalcCart();
	}
});

$('#nav-np-link').click(switchCalcNP);
$('#nav-cart-link').click(switchCalcCart);

function updateNP() {
	if(!$('.np-btn-group:not(:has(:radio:checked))').length) {
		var np_score = 0;
		$('.np-btn-group').each(function(i) {
			np_score += Number($(this).find('input:checked').val());
		});

		$('#np-result-score').text(np_score);
		$('#np-result-info').text(results[np_score][2]);
		$('#np-result-heading').text(results[np_score][0]);
		$('#np-result-panel').removeClass('panel-primary panel-success panel-warning panel-danger');
		$('#np-result-panel').addClass(results[np_score][1]);
	}
}

$('input[type="radio"]').change(function() {
	updateNP();
});

$('#nav-np-link').click(switchCalcNP);
$('#nav-cart-link').click(switchCalcCart);

function updateNP() {
	if(!$('.np-btn-group:not(:has(:radio:checked))').length) {
		var np_score = 0;
		$('.np-btn-group').each(function(i) {
			np_score += Number($(this).find('input:checked').val());
		});

		$('#np-result-score').text(np_score);
		$('#np-result-info').text(results[np_score][2]);
		$('#np-result-heading').text(results[np_score][0]);
		$('#np-result-panel').removeClass('panel-primary panel-success panel-warning panel-danger');
		$('#np-result-panel').addClass(results[np_score][1]);
	}
}

function addCartRow(cartQuestion) {
	var row = $('<div/>', {
		id: 'cart-' + cartQuestion.id + '-row',
		class: 'row'
	}).appendTo('#calc-cart-questions');
	var questionCol = $('<div/>', {class: 'col-sm-4'}).appendTo(row);

	var questionHeader = $('<h2/>', {class: 'factor-title'}).appendTo(questionCol);
	questionHeader.text(cartQuestion.question);

	var buttonCol = $('<div/>', {class: 'col-sm-6'}).appendTo(row);
	var buttonGroup = $('<div/>', {class: 'btn-group cart-btn-group', 'data-toggle': 'buttons'}).appendTo(buttonCol);

	for(i = 0; i < cartQuestion.options.length; ++i) {
		var label = $('<label/>', {class: 'btn btn-primary'}).appendTo(buttonGroup);
		var input = $('<input/>', {
			type: 'radio',
			name: 'cart-' + cartQuestion.id,
			id: 'cart-' + cartQuestion.id + i,
			value: i,
			'data-success': cartQuestion.options[i].successRate,
			autocomplete: 'off'
		}).appendTo(label);
		var labelText = $('<span/>').html(cartQuestion.options[i].text).appendTo(label);

		label.click(function() {cartChoice(cartQuestion, $(this).find('input')[0].value);});
	}

	var successCol = $('<div/>', {class: 'col-sm-2'}).appendTo(row);
	$('<h2/>', {class: 'cart-success'}).appendTo(successCol);

	return row;
}

function getCartElement(cartQuestion) {
	return $('#cart-' + cartQuestion.id + '-row');
}

var activeCartQuestions = [];
function cartChoice(cartQuestion, optionIndex) {
	var successRate = '' + cartQuestion.options[optionIndex].successRate + '%';
	getCartElement(cartQuestion).find('.cart-success').text(successRate);
	$('#cart-result-score').text(successRate);
	$('#cart-result-info').text(successRate + ' of women examined in the original study who presented with the above characteristics successfully underwent ECV.');

	foundQ = -1;
	for(i = 0; i < activeCartQuestions.length; ++i) {
		if(foundQ >= 0) {
			getCartElement(activeCartQuestions[i]).remove();
		}

		if(activeCartQuestions[i] == cartQuestion) {
			foundQ = i;
		}
	}
	activeCartQuestions = activeCartQuestions.slice(0, foundQ + 1);

	nextQ = cartQuestion.options[optionIndex].nextQ;
	if(nextQ) {
		addCartRow(nextQ);
		activeCartQuestions.push(nextQ);
	}
}

$(document).ready(function() {
	if(window.location.hash.slice(1) == 'cart') {
		switchCalcCart();
	}

	addCartRow(cartQTree);
	activeCartQuestions.push(cartQTree);
});
