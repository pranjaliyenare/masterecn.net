AcuityWidgets.globals({
    apikey: '9dafea9c-9c31-490a-8425-0166acdb1cd9',
    locale: 'en-GB'
});

var widget = AcuityWidgets.CreateWidget(
	'SentimentComplex',
	document.getElementById('sentiment-complex.'),
	{
		'settingId': 812
	}
);

widget.mount();
