sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"Wizard/Wizard/model/formatter"
], function (jQuery, Controller, JSONModel, MessageToast, MessageBox, formatter) {
	"use strict";

	var WizardController = Controller.extend("Wizard.Wizard.controller.View1", {
		formatter: formatter,
		onInit: function () {
			this._wizard = this.byId("CreateProductWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");
			this._oWizardReviewPage = sap.ui.xmlfragment("Wizard.Wizard.ReviewPage", this);
			this._oNavContainer.addPage(this._oWizardReviewPage);
			this.model = this.getOwnerComponent().getModel("mainModel");
			this.model.setProperty("/izinTurleri", [{
				"key":"okulIzni",
				"text":"Okul İzni"
			},{
				"key":"hastaneIzni",
				"text":"Hastane İzni"
			}
			]);
			this.model.setProperty("/izinTipi",[{
				"key":"yillikIzin",
				"text":"Yıllık İzin"
			},{
				"key":"günlükIzin",
				"text":"Günlük İzin"
			}
			]);
			this.model.setProperty("/izinData",{
				Pernr:"",
				kAdi:"",
				IBegda: new Date(),
				IEndda: new Date(),
				aciklama:"",
				izintip:null,
				izintur:null
			});
			this.getView().setModel(this.model);
		},
		additionalInfoValidationStep1: function () {
			var Pernr = this.byId("pernr").getValue();
			var PerAd = this.byId("kadi").getValue();
			if (Pernr == "" || PerAd == "") {
				this._wizard.invalidateStep(this.byId("ProductTypeStep"));
			} else {
				this._wizard.validateStep(this.byId("ProductTypeStep"));
			}
		},
		additionalInfoValidationStep2: function () {
			var izinTipi=this.byId("izinTipi").getSelectedItem();
			if(izinTipi==null){
					this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			}else{
					this._wizard.validateStep(this.byId("ProductInfoStep"));
			}
			

		},
		additionalInfoValidationStep3:function(){
			var izinTuru=this.byId("izinTuru").getSelectedItem();
			var aciklama=this.byId("aciklama").getValue();
			if(izinTuru==null || aciklama==""){
					this._wizard.invalidateStep(this.byId("PricingStep"));
			}else{
					this._wizard.validateStep(this.byId("PricingStep"));
			}
		},
		
		wizardCompletedHandler: function () {
			this._oNavContainer.to(this._oWizardReviewPage);
		},
		backToWizardContent: function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},
		editStepOne: function () {
			this._handleNavigationToStep(0);
		},
		editStepTwo: function () {
			this._handleNavigationToStep(1);
		},
		editStepThree: function () {
			this._handleNavigationToStep(2);
		},
		_handleNavigationToStep: function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},
		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._handleNavigationToStep(0);
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
					}
				}.bind(this)
			});
		},
		_setEmptyValue: function (sPath) {
			this.model.setProperty(sPath, "n/a");
		},
		handleWizardCancel: function () {
			this.model.setProperty("/izinData",{
				Pernr:"",
				kAdi:"",
				IBegda: new Date(),
				IEndda: new Date(),
				aciklama:"",
				izintip:null,
				izintur:null
			});
			this.byId("izinTipi").setSelectedItem(null);
			this._wizard.invalidateStep(this.byId("ProductTypeStep"));
			this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			this._wizard.invalidateStep(this.byId("PricingStep"));
			this._handleMessageBoxOpen("Silinüyür", "warning");
		},
		handleWizardSubmit: function () {
			this.model.setProperty("/izinData",{
				Pernr:"",
				kAdi:"",
				IBegda: new Date(),
				IEndda: new Date(),
				aciklama:"",
				izintip:null,
				izintur:null
			});
			this.byId("izinTipi").setSelectedItem(null);
			this._wizard.invalidateStep(this.byId("ProductTypeStep"));
			this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			this._wizard.invalidateStep(this.byId("PricingStep"));
			this._handleMessageBoxOpen("Kaydedülüyür", "confirm");
		},
		productWeighStateFormatter: function (val) {
			return isNaN(val) ? "Error" : "None";
		},
		discardProgress: function () {
			this._wizard.discardProgress(this.byId("ProductTypeStep"));
			var clearContent = function (content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};

			this.model.setProperty("/productWeightState", "Error");
			this.model.setProperty("/productNameState", "Error");
			clearContent(this._wizard.getSteps());
		}
	});

	return WizardController;
});