sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Object, JSONModel, MessageBox) {
	"use strict";
	var oController1 = null;
	var Imagebase64 = "";
	var cordinates = [];
	return Object.extend("ndbs.Z_JobCard.utils.Inspection", {
		constructor: function(that) {
			oController1 = that;
			oController1.cordinates = [];
		},

		getImagefun: function(that1) {
			sap.ui.core.BusyIndicator.show();
			var imgInspLeft1 = document.getElementById("canvasId");
			that1.context = imgInspLeft1.getContext('2d');
			that1.context.clearRect(0, 0, 690, 290);
			that1.base_image = new Image();
			that1.Imageloaded = "";
			// var imgur = $.sap.getModulePath("ndbs.Z_JobCard", "/Images/");
			// that1.base_image.src = imgur + "Front.png";

			that1.base_image.onload = function() {
				that1.context.drawImage(that1.base_image, 0, 0, 690, 290);
			};

			for (var h = 0; h < that1.images.length; h++) {
				if (that1.images[h].Direction_of_Image === that1.Imagviewselected) {
					that1.Imageloaded = that1.images[h].Base64;
				}
			}

			that1.path = "data:image/jpeg;base64," + that1.Imageloaded;
			that1.base_image.src = "data:image/jpeg;base64," + that1.Imageloaded;

			if (that1.inspImgdisable === false) {
				imgInspLeft1.addEventListener("mousedown", that1.ImIns.mouseClicked, false);
			} else if (that1.inspImgdisable === true) {
				imgInspLeft1.removeEventListener("mousedown", that1.ImIns.mouseClicked, false);
			}
			if (that1.cordinates.length > 0) {
				that1.ImIns.updateCanvas();
			}
			sap.ui.core.BusyIndicator.hide();
		},

		mouseClicked: function(mouse) {
			var rect = document.getElementById("canvasId").getBoundingClientRect();
			oController1.x = (mouse.x - rect.left);
			oController1.y = (mouse.y - rect.top);
			var Options = [];
			var Intensi = [];
			//this.getView().addDependent(this._oValueHelpDialogdent);
			//var partsNames = oController1.getView().getModel("partNames");
			var partsNames = oController1.ImagesCoordinates;
			var Fields = "";
			if (oController1.Imagviewselected === "RIGHT") {
				Fields = partsNames.RIGHT;
			} else if (oController1.Imagviewselected === "LEFT") {
				Fields = partsNames.LEFT;
			} else if (oController1.Imagviewselected === "FRONT") {
				Fields = partsNames.FRONT;
			} else if (oController1.Imagviewselected === "REAR") {
				Fields = partsNames.REAR;
			}

			oController1.partName = "";
			oController1.SymptomCode = "";
			Fields.forEach(function(oItem) {
				if (oItem.Coordinates !== "") {
					var coor = oItem.Coordinates.split(":");
					var coor1 = coor[0].split(",");
					var coor2 = coor[1].split(",");

					if (oController1.x > parseInt(coor1[0]) && oController1.x < parseInt(coor2[0])) {
						if (oController1.y > parseInt(coor1[1]) && oController1.y < parseInt(coor2[1])) {
							oController1.partName = oItem.Part_Name;
							oController1.SymptomCode = oItem.Symptom_Code;
							Intensi = oItem.Intensity;
							oController1.Coordinates = oItem.Coordinates;
						}
					}
				}
			});
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up");
			var User = "";
			oModel.attachRequestCompleted(function() {
				User = oModel.getProperty("/id");
				oController1.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/coordinates", oController1.x + ":" + oController1.y);
				if (oController1.partName) {
					if (!oController1._oValueHelpDialogdent) {
						oController1._oValueHelpDialogdent = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.ImageDetails",
							oController1);
						oController1.getView().addDependent(oController1._oValueHelpDialogdent);
					}
					if (User === "RGORENT") {
						oController1.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/coordinatesflag", true);
					} else {
						oController1.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/coordinatesflag", false);
					}
					oController1._oValueHelpDialogdent.open();
				} 
				else {
						if (User === "RGORENT") {
							MessageBox.show("Selected Part Doesn't Exist " + "\n" + oController1.x + ":" + oController1.y);
							oController1.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/coordinatesflag", true);
						} else {
							MessageBox.show("Selected Part Doesn't Exist");
							oController1.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/coordinatesflag", false);
						}
					// });
				}
			});

		},

		thatMark: function(event, partsNames) {
			var markSize = sap.ui.getCore().byId("idsizetype").getSelectedButton().getText();
			var typee = oController1.selVehImagesDamage;
			// oController1._oValueHelpDialogdent.destroy();
			oController1._oValueHelpDialogdent.close();
			var cotype = "blue";
			var textM = "D";
			var markS = 0;
			if (markSize === "Moderate") {
				markS = 4;
			} else if (markSize === "Severe") {
				markS = 6;
			} else {
				markS = 0;
			}
			if (typee === "Dent") {
				cotype = "#0070c0";
				textM = "D";
			} else if (typee === "Scratch") {
				// cotype = "#333FFF";
				textM = "S";
			} else if (typee === "Crack") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Crack") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Leak") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Damage") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Deformed") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Rust") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Discolored") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Missing") {
				// cotype = "#4FFF33";
				textM = "B";
			} else if (typee === "Not working") {
				// cotype = "#4FFF33";
				textM = "B";
			}

			oController1.cordinates.push({
				"X": oController1.x,
				"Y": oController1.y,
				"Xt": oController1.x + 10,
				"Yt": oController1.y + 10,
				"markType": cotype,
				"textM": textM,
				"markS": markS,
				"partName": oController1.partName,
				"Symptom_Code": oController1.SymptomCode,
				"Symptom_Desc": oController1.partName,
				"Problem": typee,
				"Intensity": markSize,
				"View": oController1.Imagviewselected
				// "View": oController1.SelectedView
			});

			var Details = {
				"partName": oController1.partName,
				"Symptom_Code": oController1.SymptomCode,
				"Symptom_Desc": oController1.partName,
				"Problem": typee,
				"Intensity": markSize,
				"View": oController1.Imagviewselected,
				"Concern": oController1.partName + " " + typee + " " + markSize,
				"Part_Coordinate": oController1.Coordinates,
				"Img_X_coordinate": oController1.x,
				"Img_Y_coordinate": oController1.y
			};
			oController1.ImIns.updateCanvas();
			oController1.onAddInspectionResults(Details);
		},

		updateCanvas: function() {
			var scope = oController1;
			var imgInspLeft1 = document.getElementById("canvasId");
			scope.context = imgInspLeft1.getContext('2d');
			scope.context.clearRect(0, 0, 600, 290);
			scope.base_image = new Image();
			scope.base_image.onload = function() {
				scope.context.drawImage(scope.base_image, 0, 0, 690, 290);
				var ctx = document.getElementById("canvasId").getContext("2d");
				sap.ui.core.BusyIndicator.show();
				jQuery.sap.delayedCall(100, oController1, function() {
					for (var a = 0; a < scope.cordinates.length; a++) {
						var sizeseveri = parseInt(scope.cordinates[a].markS);
						var X, Y;
						if (scope.cordinates[a].View === scope.Imagviewselected) {
							ctx.beginPath();
							if (scope.cordinates[a].Problem === "Scratch") {
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 20 + sizeseveri, scope.cordinates[a].Y - 10);
								ctx.moveTo(scope.cordinates[a].X - 10, scope.cordinates[a].Y + 10);
								ctx.lineTo(scope.cordinates[a].X + 30 + sizeseveri, scope.cordinates[a].Y - 9);
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y + 10);
								ctx.lineTo(scope.cordinates[a].X + 20 + sizeseveri, scope.cordinates[a].Y);
								ctx.lineWidth = 2;
								ctx.strokeStyle = "#0070c0";
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Dent") {
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 2 * Math.PI, 1 * Math.PI);
								ctx.strokeStyle = "#0070c0";
								ctx.moveTo(scope.cordinates[a].X - 20, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X - 10, scope.cordinates[a].Y);
								ctx.moveTo(scope.cordinates[a].X + 10, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 20, scope.cordinates[a].Y);
								ctx.lineWidth = 2;
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Crack") {
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 30 + sizeseveri, scope.cordinates[a].Y);
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 15 + sizeseveri / 2, scope.cordinates[a].Y + 40);
								ctx.moveTo(scope.cordinates[a].X + 30, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 15 + sizeseveri / 2, scope.cordinates[a].Y + 40);
								ctx.lineWidth = 2;
								ctx.strokeStyle = "#0070c0";
								ctx.fillStyle = "#0070c0";
								ctx.fill();
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Leak") {
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 0, 1 * Math.PI);
								ctx.moveTo(scope.cordinates[a].X - 10, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + sizeseveri, scope.cordinates[a].Y - 20);
								ctx.moveTo(scope.cordinates[a].X + 10, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + sizeseveri, scope.cordinates[a].Y - 20);
								ctx.lineWidth = 2;
								ctx.fillStyle = "#0070c0";
								ctx.fill();
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Damage") {
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fillStyle = "#0070c0";
								ctx.fill();
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 5 + sizeseveri, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fillStyle = "White";
								ctx.fill();
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y - 10);
								ctx.lineTo(scope.cordinates[a].X + sizeseveri, scope.cordinates[a].Y + 10);
								ctx.strokeStyle = "White";
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Deformed") {
								ctx.beginPath();
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 30 + sizeseveri, scope.cordinates[a].Y);
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y + 35);
								ctx.lineTo(scope.cordinates[a].X + 30 + sizeseveri, scope.cordinates[a].Y + 35);
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 10 + sizeseveri, scope.cordinates[a].Y + 15);
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y + 35);
								ctx.lineTo(scope.cordinates[a].X + 10 + sizeseveri, scope.cordinates[a].Y + 15);
								ctx.moveTo(scope.cordinates[a].X + 30, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 20 + sizeseveri, scope.cordinates[a].Y + 15);
								ctx.moveTo(scope.cordinates[a].X + 30, scope.cordinates[a].Y + 35);
								ctx.lineTo(scope.cordinates[a].X + 20 + sizeseveri, scope.cordinates[a].Y + 15);
								ctx.lineWidth = 2;
								ctx.strokeStyle = "#0070c0";
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Rust") {
								ctx.beginPath();
								ctx.moveTo(scope.cordinates[a].X, scope.cordinates[a].Y);
								ctx.lineTo(scope.cordinates[a].X + 30 + sizeseveri, scope.cordinates[a].Y);
								ctx.lineWidth = 8;
								ctx.stroke();
								// for (scope.cordinates[a].X = 21; scope.cordinates[a].X <= 175; scope.cordinates[a].X += 5) {
								for (var i = scope.cordinates[a].X; i <= scope.cordinates[a].X + 30; i += 5) {
									ctx.moveTo(i, scope.cordinates[a].Y);
									ctx.lineTo(i + 10, scope.cordinates[a].Y - 10);
									ctx.lineWidth = 1;
									ctx.strokeStyle = "#0070c0";
									ctx.stroke();
								}
							} else if (scope.cordinates[a].Problem === "Discolored") {
								ctx.fillStyle = "White";
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 0.5 * Math.PI, 1.5 * Math.PI);
								ctx.closePath();
								ctx.fill();
								ctx.fillStyle = "#0070c0";
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 1.5 * Math.PI, 0.5 * Math.PI);
								ctx.closePath();
								ctx.fill();
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "Missing") {
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fillStyle = "#0070c0";
								ctx.fill();
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 5 + sizeseveri, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fillStyle = "White";
								ctx.fill();
								ctx.stroke();
							} else if (scope.cordinates[a].Problem === "NotWorking") {
								ctx.beginPath();
								ctx.arc(scope.cordinates[a].X, scope.cordinates[a].Y, 10 + sizeseveri, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fillStyle = "#0070c0";
								ctx.fill();
								ctx.beginPath();
								ctx.moveTo(scope.cordinates[a].X - 5, scope.cordinates[a].Y - 5);
								ctx.lineTo(scope.cordinates[a].X + 5 + sizeseveri, scope.cordinates[a].Y + 5);
								ctx.lineWidth = 2;
								ctx.strokeStyle = "white";
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(scope.cordinates[a].X + 5, scope.cordinates[a].Y - 5);
								ctx.lineTo(scope.cordinates[a].X - 5 + sizeseveri, scope.cordinates[a].Y + 5);
								ctx.lineWidth = 2;
								ctx.strokeStyle = "white";
								ctx.stroke();
							}
							ctx.fillStyle = scope.cordinates[a].markType;
							ctx.closePath();
							ctx.fill();
							ctx.stroke();
						}
					}
					sap.ui.core.BusyIndicator.hide();
					scope.ImIns.ImageStoring(scope);
				});
			};

			oController1.base_image.src = "data:image/png;base64," + oController1.Imageloaded;
			if (oController1.inspImgdisable === false) {
				imgInspLeft1.addEventListener("mousedown", oController1.ImIns.mouseClicked, false);
			} else if (oController1.inspImgdisable === true) {
				imgInspLeft1.removeEventListener("mousedown", oController1.ImIns.mouseClicked, false);
			}
		},

		onDeleteCanvasElement: function(that) {
			var imgInspLeft1 = document.getElementById("canvasId");
			that.context = imgInspLeft1.getContext('2d');
			that.base_image = new Image();
			that.base_image.onload = function() {
				that.context.drawImage(that.base_image, 0, 0, 690, 290);
				var ctx = document.getElementById("canvasId").getContext("2d");
				for (var a = 0; a < that.cordinates.length; a++) {
					if (that.cordinates[a].View === that.SelectedView) {
						ctx.beginPath();
						ctx.arc(that.cordinates[a].X, that.cordinates[a].Y, that.cordinates[a].markS, 0, Math.PI *
							2,
							false);
						ctx.stroke();
						ctx.font = "20px Arial";
						ctx.fillStyle = that.cordinates[a].markType;
						ctx.fill();
						ctx.closePath();
					}
				}
				//	that.base_image.src = document.getElementById("canvasId").toDataURL();
				oController1.ImIns.ImageStoring(oController1);
			};
			that.base_image.src = "data:image/png;base64," + oController1.Imageloaded;
			imgInspLeft1.addEventListener("mousedown", oController1.ImIns.mouseClicked, false);

		},

		ImageStoring: function(oController1) {
			if (oController1.Imagviewselected === "RIGHT") {
				oController1.ImagesPlaned.RIGHT = document.getElementById("canvasId").toDataURL("image/png");
			} else if (oController1.Imagviewselected === "FRONT") {
				oController1.ImagesPlaned.FRONT = document.getElementById("canvasId").toDataURL("image/png");
			} else if (oController1.Imagviewselected === "REAR") {
				oController1.ImagesPlaned.REAR = document.getElementById("canvasId").toDataURL("image/png");
			} else if (oController1.Imagviewselected === "LEFT") {
				oController1.ImagesPlaned.LEFT = document.getElementById("canvasId").toDataURL("image/png");
			}
		}

	});
});