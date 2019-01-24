sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		dateformat: function(sValue) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-ddT00:00:00"
			});
			if (sValue) {
				if (typeof(sValue) == "object")
					return dateFormat.format(sValue);
				else {
					return sValue;
				}
			} else {
				return "";
			}
		},
		dateformatText: function(sValue) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd MM YYYY"
			});
			if (sValue) {
				if (typeof(sValue) == "object")
					return dateFormat.format(sValue);
				else {
					return sValue;
				}
			} else {
				return "";
			}
		},
		timeformat: function(sValue) {
			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "KK:mm:ss a"
			});
			if (sValue) {
				return timeFormat.format(sValue);
			} else {
				return timeFormat.format(new Date());
			}

		},
		egtSrmFormat: function(Rpname,Egsn) {
			if(Egsn){
				return "(Dış) " + Egsn;
			}else{
				return "(İç )" + Rpname;
			}

		}

	};

});