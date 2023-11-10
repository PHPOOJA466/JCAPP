sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
	
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("com.sap.sa_app.ZSA_RepairOrderDetails.utils.customerDetails", {
		constructor: function (that) {

		},
		getInsuranceDetails: function (that) {
			var sPath = "/Insurance_DetailSet";
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, that.vinNo));
			var oSuccess = function (oData) {
				sap.ui.core.BusyIndicator.hide();
				var oInsuranceModel = new JSONModel(oData.results);
				for(var i=0 ;i<oInsuranceModel.getData().length;i++ ){
				oInsuranceModel.getData()[i].Future_Date = new Date(oInsuranceModel.getData()[i].Future_Date);
			}
				that.getView().byId("idInsuranceTable").setModel(oInsuranceModel, "oInsuranceModel");
			};
			var oError = function (error) {
				sap.ui.core.BusyIndicator.hide();
			};
			sap.ui.core.BusyIndicator.show();
			// that.getOwnerComponent().getModel().read(sPath, {
			// 	success: oSuccess,
			// 	error: oError,
			// 	filters: sFilters
			// });
		},

		getPolicyType: function (that) {
			var sPath = "/Ins_FilterSet";
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "Policy_Type"));
			var oSuccess = function (oData) {
				sap.ui.core.BusyIndicator.hide();
				var policyTypeJSON = new JSONModel(oData.results);
				that.getView().setModel(policyTypeJSON, "policyTypeModel");
			};
			var oError = function (error) {
				sap.ui.core.BusyIndicator.hide();
			};
			sap.ui.core.BusyIndicator.show();
			// that.getOwnerComponent().getModel().read(sPath, {
			// 	success: oSuccess,
			// 	error: oError,
			// 	filters: sFilters
			// });
		},

		insurerValueHelp: function (that) {
			var sPath = "/Ins_FilterSet";
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "Insurance"));
			var oSuccess = function (oData) {
				sap.ui.core.BusyIndicator.hide();
				var insurerValueHelpJSON = new JSONModel(oData.results);
				that.getView().setModel(insurerValueHelpJSON, "insurerValueHelpModel");
			};
			var oError = function (error) {
				sap.ui.core.BusyIndicator.hide();
			};
			sap.ui.core.BusyIndicator.show();
			that.getOwnerComponent().getModel().read(sPath, {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},
		openComplaints: function (that) {
			var sPath = "/open_complaints";
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "Insurance"));
			var oSuccess = function (oData) {
				sap.ui.core.BusyIndicator.hide();
				var insurerValueHelpJSON = new JSONModel(oData.results);
				that.getView().setModel(insurerValueHelpJSON, "insurerValueHelpModel");
			};
			var oError = function (error) {
				sap.ui.core.BusyIndicator.hide();
			};
			sap.ui.core.BusyIndicator.show();
			that.getOwnerComponent().getModel().read(sPath, {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		vallidateInsuranceForm: function (that) {
			var flag;
			var controls = that.getView().getControlsByFieldGroupId("insuranceForm");
			var aControls = [];
			for (var x = 0; x < controls.length; x++) {
				if (controls[x].getName !== undefined) {
					aControls.push(controls[x]);
				}
			}
			$.each(aControls, function (i, oControl) {
				if (oControl.getRequired() !== undefined && oControl.getRequired()) {
					if (oControl.getValue() === "") {
						oControl.setValueState("Error");
						oControl.setValueStateText("RequiredField");
					} else {
						oControl.setValueState("None");
					}
				}
			});

			var bValidated = aControls.every(function (oControl) {
				return oControl.getValueState() === "None";
			});
			if (bValidated) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		}
	});
});