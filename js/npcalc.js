$('input[type="radio"]').change(function() {
	if(!$('.btn-group:not(:has(:radio:checked))').length) {
		var np_score = 0;
		$('div[class="btn-group"]').each(function(i) {
			np_score += Number($(this).find('input:checked').val());
		});

		$('#result-score').text(np_score);
		$('#result-info').text(results[np_score][2]);
		$('#result-heading').text(results[np_score][0]);
		$('#result-panel').removeClass('panel-primary panel-success panel-warning panel-danger');
		$('#result-panel').addClass(results[np_score][1]);
	}
});

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
