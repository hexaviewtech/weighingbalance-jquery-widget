/*
 *  *** Weighing Balance Analogue Meter v1.0***
 *
 * Assign these 8 values as per your requirement, which are mentioned Below.
 * Rest all calculations are done by itself.
 *
 * Please  Read the comments, 
 * if you want to change anything else in the Weighing Balance Analogue Meter.
 *
 */

/* You just need to change these 8 Values as per your requirement */

var redReadingMin = 0;              /* Lowest Value of the Analogue Meter */
var redReadingMax = 100;            /* Max Value to which the red portion extends */ 
var yellowReadingMin = 100;         /* Min Value from which yellow portion starts */
var yellowReadingMax = 115;         /* Max Value to which the yellow portion extends */
var heightOfWeighingBalance = 700;  /* Height of Weighing Balance  in 'px' */
var maxAngleValue = -30;            /* Max Angle Value for Analgoue meter (-90 to 0) */
var minAngleValue = -150;           /* Min Angle Value for Analgoue meter (-90 to -180) */
var weightValue = 175;              /* Weight Value on Balance */



/* This function will draw Weighing Balance Analogue Meter */
setTimeout(function () { drawBalanceMeterGauge(weightValue); }, 200);

function drawBalanceMeterGauge(balanceVal) {
	var dataVal = balanceVal; 

	var neutralBalanceAngleValue = -90; /* Neutral Balance Angle will be -90 only */  
	var angleOfGaugeForUpper = (maxAngleValue - neutralBalanceAngleValue);
	var angleOfGaugeForLower = (neutralBalanceAngleValue - minAngleValue);

	/* 
	 * Below code will set the max value to 200, if the dataVal is less than 100
	 * Otherwise It will set max value to the neasrest hundered of dataVal + 100  
	 * Example: If dataVal = 99 or less, then dataMaxVal = 200
	 *          If dataVal = 210 , then 
	 *                             dataMaxVal = (nearest 100 of 210 = 300) + 100 = 400		 
	 */

	var dataMaxVal;
	if (dataVal < 100) {
		dataMaxVal = 200;
	} else {
		dataMaxVal = (Math.ceil(dataVal / 100) * 100) + 100;
	}

	/* Upper Portion of Analogue Meter */
	WeighingBalanceAnalogueMeter.analogueMeter('container-up', {
		analogueMeter: {
			type: 'gauge',
			height: heightOfWeighingBalance,
		},
		title: {
			text: ''
		},
		pane: {
			startAngle: neutralBalanceAngleValue,
			endAngle: maxAngleValue, 
			background: [{
				backgroundColor: 'transparent',
				borderColor: 'transparent'
			}]
		},
		yAxis: {
			min: yellowReadingMax,
			max: dataMaxVal,
			minorTickColor: '#7e7a7a',
			tickPixelInterval: 50,
			tickWidth: 2,
			tickPosition: 'inside',
			tickColor: '#7e7a7a',
			plotBands: [{
				from: yellowReadingMax,
				to: dataMaxVal,
				color: '#55BF3B', /* Green Color Portion */
			}]
		},
		series: [{
			name: 'Weight',
			data: [],
		}]

	});

	/* Lower Portion of Analogue Meter */
	WeighingBalanceAnalogueMeter.analogueMeter('container-down', {
		analogueMeter: {
			type: 'gauge',
			height: heightOfWeighingBalance,
		},
		title: {
			text: ''
		},
		pane: {
			startAngle: minAngleValue,
			endAngle: neutralBalanceAngleValue,
			background: [{
				backgroundColor: 'transparent',
				borderColor: 'transparent'
			}]
		},
		yAxis: {
			min: redReadingMin,
			max: yellowReadingMax,
			minorTickColor: '#7e7a7a',
			tickPixelInterval: 30,
			tickWidth: 2,
			tickPosition: 'inside',
			tickColor: '#7e7a7a',
			plotBands: [{
				from: redReadingMin,
				to: redReadingMax,
				color: '#DF5353', /* Red Color Portion */
			}, {
				from: yellowReadingMin,
				to: yellowReadingMax,
				color: '#DDDF0D', /* Yellow Color Portion */
			}]
		},
		series: [{
			name: 'Weight',
			data: [],
		}]

	});

	/* For Setting Angle of Balance */
	function setBalance(readingCount,totalCount) {
		$('.meter-needle-main').css({'display':'block'});
		$('.triangle').css({'display':'block'});
		$('.weighing-balance-main-container').css({height: (heightOfWeighingBalance-200)});
		var containerMeter1_height = ($('#container-up .WeighingBalanceAnalogueMeter-container').height() / 2) -5;
		$('#container-up .WeighingBalanceAnalogueMeter-container').css({ height: containerMeter1_height});
		$('#container-up .WeighingBalanceAnalogueMeter-background').css({ height: containerMeter1_height });
		var widthOfWeighingPanel = heightOfWeighingBalance - (heightOfWeighingBalance * 0.13);
		$('.weighing-panel').css({ width: widthOfWeighingPanel}); /* Setting the width of the Needle as per Weighing Balance Height */
		var midOfWeighingPanel = widthOfWeighingPanel/2;
		var positionOfLeftStand = midOfWeighingPanel/2;
		$('.weighing-panel-stand-left').css({ left: positionOfLeftStand }); /* Positioning of Left Stand */
		var positionOfRightStand = midOfWeighingPanel + (midOfWeighingPanel/2); 
		$('.weighing-panel-stand-right').css({ left: positionOfRightStand }); /* Positioning of Right Stand */
		var positionOfCenterOfBalance = $('#container-up .WeighingBalanceAnalogueMeter-pivot').offset();
		var posLeftOfNeedle = positionOfCenterOfBalance.left - midOfWeighingPanel + 4;
		var posTopOfNeedle = positionOfCenterOfBalance.top + 3;
		$('.meter-needle').css({left: posLeftOfNeedle , top: posTopOfNeedle }); /* Positioning of Needle */

		/*Positioning Triangle of Weighing Balance */
		var widthOfTriangle = $('.triangle').css('border-bottom-width');
		var widthOfTraingleInInt = widthOfTriangle.slice(0,(widthOfTriangle.length - 2));
		$('.triangle').css({ left: (positionOfCenterOfBalance.left - widthOfTraingleInInt + 5.5) , top: positionOfCenterOfBalance.top + 3}); 
		$('.rectangle').css({ left: -(($('.rectangle').width())/2) - 5 , top: widthOfTriangle});
		$('.rectangle').html('Weight Value = '+dataVal); /* Setting the Text in the Rectangle below Balance Panel */

		if (readingCount > yellowReadingMax) {
			var totalReadingOfTop = totalCount - yellowReadingMax; /* For Reading greater than yellowReadingMax */
			var diffBtwnBaseReading = readingCount - yellowReadingMax;
			var rotationAngleForweighingPanelScale = ((diffBtwnBaseReading / totalReadingOfTop) * angleOfGaugeForUpper);
			var weighingPanelRotation = rotationAngleForweighingPanelScale - (rotationAngleForweighingPanelScale * 2);
			$('.meter-needle').css({ 'transform': 'rotate(' + rotationAngleForweighingPanelScale + 'deg)' });
			$('.weighing-container').css({ 'transform': 'rotate(' + weighingPanelRotation + 'deg)' });
		} else {
			var totalReadingOfTop = yellowReadingMax - redReadingMin; /* For Reading less than yellowReadingMax */
			var diffBtwnBaseReading = readingCount - yellowReadingMax;
			var rotationAngleForweighingPanelScale = ((diffBtwnBaseReading / totalReadingOfTop) * angleOfGaugeForLower);
			var weighingPanelRotation = rotationAngleForweighingPanelScale - (rotationAngleForweighingPanelScale * 2);
			$('.meter-needle').css({ 'transform': 'rotate(' + rotationAngleForweighingPanelScale + 'deg)' });
			$('.weighing-container').css({ 'transform': 'rotate(' + weighingPanelRotation + 'deg)' });
		}
	}
	setBalance(dataVal,dataMaxVal); /* This will set Balance as per the "weightValue" */  
};

