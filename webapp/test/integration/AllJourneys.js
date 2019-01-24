/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"Wizard/Wizard/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"Wizard/Wizard/test/integration/pages/View1",
	"Wizard/Wizard/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "Wizard.Wizard.view.",
		autoWait: true
	});
});