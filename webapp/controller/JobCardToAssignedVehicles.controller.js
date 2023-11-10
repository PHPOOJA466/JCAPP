sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ndbs.Z_JobCard.controller.JobCardToAssignedVehicles", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("JobCardToAssignedVehicles").attachMatched(this._onRouteFound, this);
		},

		_oNavigateToDetails: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailsView", {}, true);
		},
		
		_onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("MainView", {}, true);
		}

	});

});