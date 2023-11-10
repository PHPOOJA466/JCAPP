sap.ui.define(["sap/ui/core/format/DateFormat", "sap/ui/core/library"],
	function(DateFormat, coreLibrary) {
		"use strict";
		//var ValueState = coreLibrary.ValueState;
		return {
			
			StatusEnabled: function(iToggle) {
				if(iToggle === 'Approved'){
				return false;
				} else {
					return true;
				}
	
			},
			
				StatusToggle: function(iToggle) {
				if(iToggle === 'Status'){
				return false;
				} else {
					return true;
				}
	
			},

			getBtnToolTip:function(val){
                  if(val){
					val = val.toString();
				  }
				  return val;
			},

			stringtodatetimeconversion: function(value) {
				if (!value || value === "00000000" || value === null) {
					return null;
				}
				var date = value.split(",")[0];
				var time = value.split(",")[1].trim();
				var year = date.split(".")[2];
				var month = date.split(".")[1];
				var day = date.split(".")[0];
				return new Date(year, month - 1, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
			},
			IndicatorState: function(iState) {
				if (iState === true) {
					return "Success";
				} else if (iState === false) {
					return "Error";
				}
			},
			WarrantyIndicatorState: function(iState,status) {
				if (iState === true) {
					return "Success";
				} else if (iState === false) {
					return "Error";
				}else if(status === "About to Expire"){
					  return "Warning";
				}
			},

			getImage: function(val) {
				var sRootPath = jQuery.sap.getModulePath("ndbs.Z_JobCard");
				var sImagePath = sRootPath + "/" + val;
				return sImagePath;
			},

			formatIssueType: function(sVal) {
				var sKey = "Error";
				switch (sVal) {
					case "70":
						sKey = "Error";
						break;
					case "71":
						sKey = "Success";
						break;
					case "72":
						sKey = "Error";
						break;
					case "73":
						sKey = "Success";
						break;
					case "74":
						sKey = "Error";
						break;
					case "75":
						sKey = "Success";
						break;
					case "76":
						sKey = "Success";
						break;
					case "77":
						sKey = "Error";
						break;
					case "90":
						sKey = "Success";
						break;
					case "":
						sKey = "None";
						break;
				}
				return sKey;
			},

			myFormatter: function(val) {
				//start - 2000048768- UI validation - item getting deleted recall issue changes by sravani 4/27/21.
				if (val === "PAC" || val === "REC") {
					//end - 2000048768- UI validation - item getting deleted recall issue changes by sravani 4/27/21.
					return false;
				} else if (val === "CRE") {
					return true; // enable edit of items for CRE jobs - customer concern	
				} else {
					return true;
				}
			},
			oStatus: function(Value) {
				if (Value === "T") {
					return true;
				}
				return false;

			},
			formatFloat: function(val) {
				var sVal = val;
				if (sVal) {
					sVal = parseFloat(sVal).toFixed(2);
				} else {
					sVal = "0.00";
				}
				return sVal;
				// return parseFloat(val).toFixed(2);
			},
			formatKeyType: function(oVal) {
				return String(oVal);
			},
			removeZero: function(item) {
				if (item) {
					return item.replace(/^0+/, "");
				} else {
					return "";
				}
			},
			viewDocs: function(value1, value2) {
				return "/ImageSet(VBELN='" + value1 + "',POSNR='" + value2 + "')/$value";
			},

			onExpPartandLabourAmt: function(selectedrow, iQtyVal, sPathIndex) {
				var path, index, oJobDetItems, Unit_Price, sP_L;
				path = selectedrow.getPath();
				index = path.split("/")[1];
				oJobDetItems = selectedrow.getModel("categoryJobPartsTab").getData();
				Unit_Price = this.formatFloat(selectedrow.getProperty("Unit_Price"));
				sP_L = selectedrow.getProperty("P_L");
				if (Unit_Price === "NaN") {
					Unit_Price = this.formatFloat(0);
				}
				if (iQtyVal === "NaN") {
					iQtyVal = this.formatFloat(0);
				}
				if (sP_L === "P") {
					oJobDetItems[index].Total_Price = this.formatFloat(iQtyVal * Unit_Price);
				}
			},
			/*
			 * remove the duplicates while adding the customer concern tree data into 
			 */
			removeDuplicates: function(selectedData) {
				var arr = [],
					collection = [];
				$.each(selectedData, function(index, value) {
					if ($.inArray(value.Job_Details, arr) === -1) {
						arr.push(value.Job_Details);
						collection.push(value);
					}
				});
				return collection;
			},

			jobTableFlag: function(issueType, localFlag) {
				if (issueType === "WTY" && localFlag === "Package") {
					return false;
				} else {
					return true;
				}
			},

			priorityColor: function(priority) {
				if (priority === "High Priority") {
					priority = "Error";
				} else if (priority === "Medium Priority") {
					priority = "Warning";
				} else if (priority === "Low Priority") {
					priority = "Success";
				} else {
					priority = "None";
				}
				return priority;
			},
			getDateFormat: function(v) {
				if (v === null) {
					return null;
				} else {
					var oDateFormatSource = DateFormat.getDateInstance({
						pattern: "dd.MM.YYYY"
					});
					var oDateFormat = DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});
					return oDateFormat.format(oDateFormatSource.parse(v));
				}
			},
			rcDateFormat: function(v) {
				if (v === null) {
					return null;
				} else {
					var oDateFormatSource = DateFormat.getDateInstance({
						pattern: "dd-MM-YYYY"
					});
					var oDateFormat = DateFormat.getDateInstance({
						pattern: "dd.MM.YYYY"
					});
					return oDateFormat.format(oDateFormatSource.parse(v));

				}
			},

			buttonIconFormatter: function(oFlags) {
				var sIcon;
				oFlags.forEach(function(sMessage) {
					switch (sMessage.type) {
						case "Error":
							sIcon = "sap-icon://error";
							break;
						case "Warning":
							sIcon = sIcon !== "sap-icon://error" ? "sap-icon://alert" : sIcon;
							break;
						case "Success":
							sIcon = "sap-icon://error" && sIcon !== "sap-icon://alert" ? "sap-icon://sys-enter-2" : sIcon;
							break;
						default:
							sIcon = !sIcon ? "sap-icon://information" : sIcon;
							break;
					}
				});
				return sIcon;
			},

			imageType: function(value) {
				if (value === "I020" || value === "I021" || value === "T000") {
					return "sap-icon://add-equipment";
				}
				if (value === "I031") {
					return "sap-icon://shipping-status";
				}
				if (value === "I100") {
					return "sap-icon://cart";
				}
				if (value === "T041") {
					return "sap-icon://cart-approval";
				}
				if (value === "I100") {
					return "";
				}
				if (value === "") {
					return "sap-icon://add-product";
				}
			},
			eDitorno: function(value) {
				if (value === "I020" || value === "I021" || value === "T000") {
					return true;
				}
				if (value === "I031") {
					return false;
				}
				if (value === "I100") {
					return true;
				}
				if (value === "T041") {
					return false;
				}
				if (value === "I100") {
					return true;
				}
				if (value === "") {
					return true;
				}
				if (value === "XXXX") {
					return false;
				}
			},
			formatLineItems: function(lineItemsString) {
				// Split the comma-separated string into an array
				var lineItemsArray = lineItemsString.split(',');
			
				// Create an array of items suitable for the ComboBox
				var comboBoxItems = lineItemsArray.map(function(item) {
					return new sap.ui.core.Item({ text: item });
				});
			
				return comboBoxItems;
			},

			WarSwitchVis:function(arr,type){
				var flag = false,check=[];
			 if(arr.length > 0){
			 check = arr.filter(function(val,idx){
				return (val.Ctgry === type);
			 });
			}
			 if(check.length > 0){
				flag = true;
			 }
			 return flag;
			},
			WarSwitchState:function(arr,type){
				var flag = false,check=[];
					if(arr.length > 0){
				   check = arr.filter(function(val,idx){
					   return (val.Ctgry === type);
					});
				}
				if(check.length > 0){
				   flag = check[0].Indicator;
				}
				return flag;
			},

			getdatetimeformat:function(val){
				var datetime = "";
			 if(val && val !== "" && val !=="0" && val !== '0 ' ){
			   var date = new Date(val.slice(0, 4),val.slice(4,6),val.slice(6,8),val.slice(8,10),val.slice(10,12),val.slice(12,14));
				  var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({pattern: "dd-MM-YYYY KK:mm:ss"}); 
				 datetime = timeFormat.format(date);  
			  }
			  return datetime;
		  },
		  getMode:function(val){
			var mode = "";
			if(val !== ""){
                if(val === 'E'){
					mode = "Email";
				}else if(val === 'S'){
					mode = "SMS";
				}
			}
			return mode;
		  }

		};

	});