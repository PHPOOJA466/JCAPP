sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("com.sap.sa_app.ZSA_RepairOrderDetails.utils.ImageMap", {
		constructor: function (that) {

		},
		handlePress: function (that) {
			// var that = this;
			that.getView().byId("idInvChkBox").setVisible(true);
			var idSelectionPart = that.getView().byId("idSelectionPart");

			// Front Image
			$(".F1").on("click", function (e) {
				that.clearProblemRadioBtn();
				var imgcord = "F1";
				idSelectionPart.setText("FRONT WINDSHIELD GLASS");
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F2").on("click", function (e) {
				var imgcord = "F2";
				that.clearProblemRadioBtn();
				idSelectionPart.setText("WIPER BLADE");
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);

			});

			$(".F3").on("click", function (e) {
				idSelectionPart.setText("BONNET");
				that.clearProblemRadioBtn();
				var imgcord = "F3";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F4").on("click", function (e) {
				idSelectionPart.setText("BUMPER");
				that.clearProblemRadioBtn();
				var imgcord = "F4";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F5").on("click", function (e) {
				idSelectionPart.setText("HEAD LIGHTS");
				that.clearProblemRadioBtn();
				var imgcord = "F5";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F6").on("click", function (e) {
				idSelectionPart.setText("FOG LIGHT");
				that.clearProblemRadioBtn();
				var imgcord = "F6";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F7").on("click", function (e) {
				idSelectionPart.setText("DRL");
				that.clearProblemRadioBtn();
				var imgcord = "F7";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".F8").on("click", function (e) {
				idSelectionPart.setText("BATTERY");
				that.clearProblemRadioBtn();
				var imgcord = "F8";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			// Interior
			$(".I01").on("click", function (e) {
				idSelectionPart.setText("INSTRUMENT PANEL");
				that.clearProblemRadioBtn();
				var imgcord = "I01";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I02").on("click", function (e) {
				idSelectionPart.setText("AC VENT");
				that.clearProblemRadioBtn();
				var imgcord = "I02";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I03").on("click", function (e) {
				idSelectionPart.setText("INFOTAINMENT");
				that.clearProblemRadioBtn();
				var imgcord = "I03";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I04").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("PARKING BRAKE");
				} else {
					idSelectionPart.setText("GEAR");
				}
				that.clearProblemRadioBtn();
				var imgcord = "I04";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".I05").on("click", function (e) {
				idSelectionPart.setText("SEAT BELTS");
				that.clearProblemRadioBtn();
				var imgcord = "I05";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I06").on("click", function (e) {
				idSelectionPart.setText("SEAT RECLINER");
				that.clearProblemRadioBtn();
				var imgcord = "I06";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I07").on("click", function (e) {
				idSelectionPart.setText("SIDE VIEW MIRROR");
				that.clearProblemRadioBtn();
				var imgcord = "I07";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I08").on("click", function (e) {
				idSelectionPart.setText("REAR VIEW MIRROR");
				that.clearProblemRadioBtn();
				var imgcord = "I08";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I09").on("click", function (e) {
				idSelectionPart.setText("CABIN LIGHT");
				that.clearProblemRadioBtn();
				var imgcord = "I09";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
				// $(".Grill").off("click");
			});

			$(".I10").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("UPHOLSTERY");
				} else {
					idSelectionPart.setText("GLOVE BOX");
				}
				that.clearProblemRadioBtn();
				var imgcord = "I10";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I11").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("GLOVE BOX");
				} else {
					idSelectionPart.setText("CLUTCH PEDAL");
				}
				that.clearProblemRadioBtn();
				var imgcord = "I11";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I12").on("click", function (e) {
				idSelectionPart.setText("STEERING WHEEL");
				that.clearProblemRadioBtn();
				var imgcord = "I12";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".I13").on("click", function (e) {
				idSelectionPart.setText("HORN");
				that.clearProblemRadioBtn();
				var imgcord = "I13";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			// $(".I14").on("click", function (e) {
			// 	idSelectionPart.setText("STEERING WHEEL");
			// 	that.clearProblemRadioBtn();
			// 	var imgcord = "I14";
			// 	that.problemDescription(imgcord);

			// 	that.getView().byId("idInspBtn").setVisible(true);
			// });

			// Left Image
			$(".L1").on("click", function (e) {
				idSelectionPart.setText("FRONT LH FENDER");
				that.clearProblemRadioBtn();
				var imgcord = "L1";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L2").on("click", function (e) {
				idSelectionPart.setText("FRONT LH TYRE");
				that.clearProblemRadioBtn();
				var imgcord = "L2";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L3").on("click", function (e) {
				idSelectionPart.setText("FRONT LH WHEEL");
				that.clearProblemRadioBtn();
				var imgcord = "L3";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L4").on("click", function (e) {
				idSelectionPart.setText("PASSENGER DOOR MIRROR PANEL");
				that.clearProblemRadioBtn();
				var imgcord = "L4";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L5").on("click", function (e) {
				idSelectionPart.setText("PASSENGER DOOR MIRROR");
				that.clearProblemRadioBtn();
				var imgcord = "L5";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L6").on("click", function (e) {
				idSelectionPart.setText("FRONT LH DOOR");
				that.clearProblemRadioBtn();
				var imgcord = "L6";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L7").on("click", function (e) {
				idSelectionPart.setText("FRONT LH DOOR HANDLE");
				that.clearProblemRadioBtn();
				var imgcord = "L7";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L8").on("click", function (e) {
				idSelectionPart.setText("REAR LH DOOR");
				that.clearProblemRadioBtn();
				var imgcord = "L8";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L9").on("click", function (e) {
				idSelectionPart.setText("REAR LH DOOR HANDLE");
				that.clearProblemRadioBtn();
				var imgcord = "L9";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L10").on("click", function (e) {
				idSelectionPart.setText("REAR LH QUARTER PANEL");
				that.clearProblemRadioBtn();
				var imgcord = "L10";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".L11").on("click", function (e) {
				idSelectionPart.setText("REAR LH TYRE");
				that.clearProblemRadioBtn();
				var imgcord = "L11";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".L12").on("click", function (e) {
				idSelectionPart.setText("REAR LH WHEEL");
				that.clearProblemRadioBtn();
				var imgcord = "L12";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});

			//Right Image
			$(".R1").on("click", function (e) {
				idSelectionPart.setText("FRONT RH FENDER");
				that.clearProblemRadioBtn();
				var imgcord = "R1";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R2").on("click", function (e) {
				idSelectionPart.setText("FRONT RH TYRE");
				that.clearProblemRadioBtn();
				var imgcord = "R2";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R3").on("click", function (e) {
				idSelectionPart.setText("FRONT RH WHEEL");
				that.clearProblemRadioBtn();
				var imgcord = "R3";
				that.problemDescription(imgcord);

				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R4").on("click", function (e) {
				idSelectionPart.setText("DRIVER DOOR MIRROR PANEL");
				that.clearProblemRadioBtn();
				var imgcord = "R4";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R5").on("click", function (e) {
				idSelectionPart.setText("DRIVER DOOR MIRROR");
				that.clearProblemRadioBtn();
				var imgcord = "R5";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R6").on("click", function (e) {
				idSelectionPart.setText("FRONT RH DOOR");
				that.clearProblemRadioBtn();
				var imgcord = "R6";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R7").on("click", function (e) {
				idSelectionPart.setText("FRONT RH DOOR HANDLE");
				that.clearProblemRadioBtn();
				var imgcord = "R7";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R8").on("click", function (e) {
				idSelectionPart.setText("REAR RH DOOR");
				that.clearProblemRadioBtn();
				var imgcord = "R8";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R9").on("click", function (e) {
				idSelectionPart.setText("REAR RH DOOR HANDLE");
				that.clearProblemRadioBtn();
				var imgcord = "R9";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R10").on("click", function (e) {
				idSelectionPart.setText("REAR RH QUARTER PANEL");
				that.clearProblemRadioBtn();
				var imgcord = "R10";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R11").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("REAR RH TYRE");
				} else {
					idSelectionPart.setText("FUEL CAP");
				}
				that.clearProblemRadioBtn();
				var imgcord = "R11";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R12").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("REAR RH WHEEL");
				} else {
					idSelectionPart.setText("REAR RH TYRE");
				}
				that.clearProblemRadioBtn();
				var imgcord = "R12";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".R13").on("click", function (e) {
				idSelectionPart.setText("REAR RH WHEEL");
				that.clearProblemRadioBtn();
				var imgcord = "R13";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});

			// Top
			$(".T1").on("click", function (e) {
				idSelectionPart.setText("Sun Roof");
				that.clearProblemRadioBtn();
				var imgcord = "T1";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".T2").on("click", function (e) {
				if (that.oImageFlag === "MG_ZS_EV") {
					idSelectionPart.setText("Roof");
				} else {
					idSelectionPart.setText("Antenna");
				}
				that.clearProblemRadioBtn();
				var imgcord = "T2";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".T3").on("click", function (e) {
				idSelectionPart.setText("Roof Top Carrier");
				that.clearProblemRadioBtn();
				var imgcord = "T3";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});

			$(".B1").on("click", function (e) {
				idSelectionPart.setText("REAR WINDSHIELD GLASS");
				that.clearProblemRadioBtn();
				var imgcord = "B1";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B2").on("click", function (e) {
				idSelectionPart.setText("REAR WIPER BLADE");
				that.clearProblemRadioBtn();
				var imgcord = "B2";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B3").on("click", function (e) {
				idSelectionPart.setText("TAIL GATE");
				that.clearProblemRadioBtn();
				var imgcord = "B3";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B4").on("click", function (e) {
				idSelectionPart.setText("REAR BUMPER");
				that.clearProblemRadioBtn();
				var imgcord = "B4";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B5").on("click", function (e) {
				idSelectionPart.setText("TAIL LAMP");
				that.clearProblemRadioBtn();
				var imgcord = "B5";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B6").on("click", function (e) {
				idSelectionPart.setText("REVERSE LAMP");
				that.clearProblemRadioBtn();
				var imgcord = "B6";
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
			$(".B7").on("click", function (e) {
				idSelectionPart.setText("REVERSE FOG LAMP");
				that.clearProblemRadioBtn();
				var imgcord = "B7";
				that.problemDescription(imgcord);

			});

		}
	});
});