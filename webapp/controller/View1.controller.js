sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageBox",
	"ndbs/Z_JobCard/model/formatter",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"ndbs/Z_JobCard/utils/Inspection"
	// "sap/m/MessageToast"
], function(Controller, Fragment, JSONModel, DateFormat, MessageBox, formatter, MessagePopover, MessageItem,
	Inspection) {
	"use strict";

	var vinNo, oBusyDialog, selectedIconTab = "JobCard",
		InspSelectedSegButton, RepairOrderNo, VinNo, CustID, JobNo, path, selectedJobj, RegNo, ServiceType, SubServiceType, ServiceTypeCode,
		sImageCaptureContext, selectedTable, SelectedInvoiceVal,SelectedBillto,SplitNumber,selectedBillToForClaim,
		SubSrvTypeCode, OverViewHeadrerDate, overviewSaveFlag, Status, sInpVal,
		Custfilter, SelectedJobNr, SelectedJobName, oRmk,oAssignmentRemarks,
		AssignmentSegButton,
		CheckListTabSegParamspath = 0,
		aSelectedItmFilters = [],
		aSelectedJobItems = [],
		aSelectedSrvMeasures = [],
		aSelectedQuotations = [],
		aSelectedRejJobItems = [],
		custVoiceVal,
		DIfinaldatamain = [],
		urlParams, DBFLAG,
		jobPckorCustVoice, DefJobNo,
		CheckListTabSegButton, CheckListTabSegParamsButton,
		aPackageObj = [],
		AllConcernCode = [],
		AllCustomerVoice = [],
		sleectedassignitems=[],
		aPackageItems=[],
		headerTechnicianformateddata="";
	this.Custfilterid = "";
	this.AdBlueValue = "";
	this.FuelValue = "";
	this.rejectApproveAllVal = "";
	
	return Controller.extend("ndbs.Z_JobCard.controller.View1", {
		formatter: formatter,
		onInit: function() {
            urlParams = "N";
			RepairOrderNo = "";
			SplitNumber = "";
			selectedBillToForClaim = "";
			aPackageItems=[];
            oBusyDialog = new sap.m.BusyDialog({});
            // var that = this;
            var oPage = this.byId("page");
            var startupPramas = this.getOwnerComponent().getComponentData().startupParameters;
           if(startupPramas === undefined){
			startupPramas={};
		   }
			if (Object.keys(startupPramas).length !== 0) {
                urlParams = "Y";
				if(startupPramas.action){
					if(startupPramas.action[0] === "JCB_JOBDETAIL"){
					RepairOrderNo = startupPramas.Job_card[0];
					VinNo = startupPramas.VINNumber[0];
					var that = this;
					var obj = {
						"Flag": "ED",
						"RepairOrderNo": RepairOrderNo,
						"VinNo": VinNo,
						"RegNo": RegNo,
						"SubServiceType": "",
						"ServiceType": "",
						"ServiceTypeCode": ServiceTypeCode,
						"SubSrvTypeCode": SubSrvTypeCode,
						"OverViewHeadrerDate": "",
						"OnSite": "",
						"createDrpAll": false,
						"createInputAll": true,
					};
					var oModel = new JSONModel(obj);
					this.getView().setModel(oModel, "localJCDeatils");
					if (!this.oAssignmenttFragment) {
						this.oAssignmenttFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Assignment", this);
						this.getView().addDependent(this.oAssignmenttFragment);
						oPage.addContent(this.oAssignmenttFragment);
					}
					
				this.getView().byId("iconTabHeader").setSelectedKey("Assignment");
                this.getView().byId("toolheaderButtonsId").setVisible(false);
                this.getView().byId("toolheaderButtonsId1").setVisible(false);
                this.getView().byId("toolheaderButtonsId2").setVisible(false);
                this.getView().byId("toolheaderTextId").setVisible(false);
                this.getView().byId("toolheaderTextId1").setVisible(false);
				this.getView().byId("iconTabHeader").getItems()[0].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
				this.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
					sap.ui.getCore().byId("assignmentSegButtonId").setSelectedKey("Technician");
					
					this.onGetAssignmentTechnicianInfo();
					this.getJCLevelTechnicians();
					AssignmentSegButton = "Technician";
					this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
					this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
					this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
					this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
					this.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				//FOR GETTING VEHICLE DETAILS
				that.getCustomerInformation();
				that.ReadComplaintdata();
				that.getVehicleInformation();
				that.getJobCardInformation();
				that.getOtherInformation();
				that.getWarrantyInfo();
				that.getMeasuresRecalls();
				that.getRejectedJobs();
				that.getServiceCampaign();
				that.getDiagnostics();
				that.getQuotations();
				// that.getWarrantySettingsInfo();
				that.getServiceHistory();
				that.getSoldTo();
				that.getBillTo();
				that.getshipTo();
				that.getServiceType();
				
				}else if(startupPramas.action[0] === "JCB_JOBCARDDETAIL"){
					RepairOrderNo = startupPramas.Job_card[0];
					VinNo = startupPramas.VINNumber[0];
					var that = this;
					var obj = {
						"Flag": "ED",
						"RepairOrderNo": RepairOrderNo,
						"VinNo": VinNo,
						"RegNo": RegNo,
						"SubServiceType": "",
						"ServiceType": "",
						"ServiceTypeCode": ServiceTypeCode,
						"SubSrvTypeCode": SubSrvTypeCode,
						"OverViewHeadrerDate": "",
						"OnSite": "",
						"createDrpAll": false,
						"createInputAll": true,
					};
					var oModel = new JSONModel(obj);
					this.getView().setModel(oModel, "localJCDeatils");

					selectedIconTab = "JobDetails";
                this.getView().byId("toolheaderButtonsId").setVisible(false);
                this.getView().byId("toolheaderButtonsId1").setVisible(false);
                this.getView().byId("toolheaderButtonsId2").setVisible(false);
                this.getView().byId("toolheaderTextId").setVisible(false);
                this.getView().byId("toolheaderTextId1").setVisible(false);
				this.getView().byId("iconTabHeader").getItems()[0].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
				this.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

				if (!that.oJobDetailsFragment) {
					that.oJobDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobDetails", that);
					that.getView().addDependent(that.oJobDetailsFragment);
					oPage.addContent(that.oJobDetailsFragment);
				}

				this.getView().byId("iconTabHeader").setSelectedKey("JobDetails");

                that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				selectedTable = "JobDetails";
				that.oJobDetailsFragment.getAggregation("items")[1].setVisible(true);
				that.oJobDetailsFragment.getAggregation("items")[2].setVisible(false);
				that.getJobDetailsData();
				that.onGetJobItemDetailsDropdowns();
				that.getJobDetailsDropdowns();
				that.getJobStatus();
				that.BillTo();
				that.warrentyItemsLoad();
				that.getpackagehistoryDP();
				that.jobDetailsData = [];
				sap.ui.getCore().byId("idList").setVisible(false);
				sap.ui.getCore().byId("packageListId").setValue("");
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/jobTypeEnable", true);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				// package loading issue YR
				aPackageObj=[];
				aPackageItems=[];
				this.oComboBox = sap.ui.getCore().byId("idJCDStatus");
				if(this.oComboBox !== undefined){
					this.oComboBox.attachBrowserEvent("click", function (e) {
						that.statusCreation(e);
					}.bind(this));
				}
//FOR GETTING VEHICLE DETAILS
				that.getCustomerInformation();
				that.ReadComplaintdata();
				that.getVehicleInformation();
				that.getJobCardInformation();
				that.getOtherInformation();
				that.getWarrantyInfo();
				that.getMeasuresRecalls();
				that.getRejectedJobs();
				that.getServiceCampaign();
				that.getDiagnostics();
				that.getQuotations();
				// that.getWarrantySettingsInfo();
				that.getServiceHistory();
				that.getSoldTo();
				that.getBillTo();
				that.getshipTo();
				that.getServiceType();
				}
				else{
					RepairOrderNo = startupPramas.Job_card[0];
					   VinNo = startupPramas.VINNumber[0];
					   ServiceTypeCode = startupPramas.ServiceType[0];
					   SubSrvTypeCode = startupPramas.SubServiceType[0];
			   
			  
			   this.CheckPcakageid="";
			   var obj = {
				   "Flag": "ED",
				   "RepairOrderNo": RepairOrderNo,
				   "VinNo": VinNo,
				   "RegNo": RegNo,
				   "SubServiceType": "",
				   "ServiceType": "",
				   "ServiceTypeCode": ServiceTypeCode,
				   "SubSrvTypeCode": SubSrvTypeCode,
				   "OverViewHeadrerDate": "",
				   "OnSite": "",
				   "createDrpAll": false,
				   "createInputAll": true,
			   };
			   var oModel = new JSONModel(obj);
			   this.getView().setModel(oModel, "localJCDeatils");
			   // that.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
   
			   this.getView().byId("toolheaderButtonsId").setVisible(false);
			   this.getView().byId("toolheaderButtonsId1").setVisible(false);
			   this.getView().byId("toolheaderButtonsId2").setVisible(false);
			   this.getView().byId("toolheaderTextId").setVisible(false);
			   this.getView().byId("toolheaderTextId1").setVisible(false);

			   this.getView().byId("iconTabHeader").getItems()[0].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
			   this.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
			   this.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);

			   this.getCustomerInformation();
			   this.ReadComplaintdata();
			   this.getVehicleInformation();
			   this.getJobCardInformation();
			   this.getOtherInformation();
			   this.getWarrantyInfo();
			   this.getMeasuresRecalls();
			   this.getRejectedJobs();
			   this.getServiceCampaign();
			   this.getDiagnostics();
			   this.getQuotations();
			   this.getWarrantySettingsInfo();
			   this.getServiceHistory();
			   this.getSoldTo();
			   this.getBillTo();
			   this.getshipTo();
			   this.getServiceType();
			   
			   if (!this.oVehicleDetailsFragment) {
				   this.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", this);
				   this.getView().addDependent(this.oVehicleDetailsFragment);
				   oPage.addContent(this.oVehicleDetailsFragment);
			   }
			   this.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
			   this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
			   // this.privateFunction();
			   }
			}
				else{
					 RepairOrderNo = startupPramas.Job_card[0];
              	  	VinNo = startupPramas.VINNumber[0];
              	  	ServiceTypeCode = startupPramas.ServiceType[0];
              	  	SubSrvTypeCode = startupPramas.SubServiceType[0];
				this.CheckPcakageid="";
                var obj = {
                    "Flag": "ED",
                    "RepairOrderNo": RepairOrderNo,
                    "VinNo": VinNo,
                    "RegNo": RegNo,
                    "SubServiceType": "",
                    "ServiceType": "",
                    "ServiceTypeCode": ServiceTypeCode,
                    "SubSrvTypeCode": SubSrvTypeCode,
                    "OverViewHeadrerDate": "",
                    "OnSite": "",
					"createDrpAll": false,
					"createInputAll": true,
                };
                var oModel = new JSONModel(obj);
                this.getView().setModel(oModel, "localJCDeatils");
                // that.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
    
                this.getView().byId("toolheaderButtonsId").setVisible(false);
                this.getView().byId("toolheaderButtonsId1").setVisible(false);
                this.getView().byId("toolheaderButtonsId2").setVisible(false);
                this.getView().byId("toolheaderTextId").setVisible(false);
                this.getView().byId("toolheaderTextId1").setVisible(false);

				this.getView().byId("iconTabHeader").getItems()[0].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
				this.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
				this.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);

                this.getCustomerInformation();
				this.ReadComplaintdata();
                this.getVehicleInformation();
                this.getJobCardInformation();
                this.getOtherInformation();
                this.getWarrantyInfo();
                this.getMeasuresRecalls();
                this.getRejectedJobs();
                this.getServiceCampaign();
                this.getDiagnostics();
                this.getQuotations();
                this.getWarrantySettingsInfo();
                this.getServiceHistory();
                this.getSoldTo();
                this.getBillTo();
                this.getshipTo();
                this.getServiceType();
				
                if (!this.oVehicleDetailsFragment) {
                    this.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", this);
                    this.getView().addDependent(this.oVehicleDetailsFragment);
					oPage.addContent(this.oVehicleDetailsFragment);
                }
                this.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
                this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
                // this.privateFunction();
				}
			}else{
				if (urlParams === "N") {
					this.getButtonCounts();
					this.getAssignedCalendarData();
					this.getAssignedCalendarTabData();
					this.getAssignedVehicles();
				}
				this.oJobCardFragment = null;
				if (!this.oJobCardFragment) {
					this.oJobCardFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobCard", this);
					this.getView().addDependent(this.oJobCardFragment);
					oPage.addContent(this.oJobCardFragment);
				}

				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",true);

				sap.ui.getCore().byId("Idappt").addEventDelegate({
					onmouseover: this._showPopover,
					onmouseout: this._clearPopover
				}, this);

			}
			this.ImagesCoordinates = {};
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/printchecklist", false);
            this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
            this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
            this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
            this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/UpdateSplit", false);
            //Pooja
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RejButtonFlag", false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/rejectcancelBtnText", 'Cancel');
			// if (urlParams === "N") {
            //     this.getButtonCounts();
            //     this.getAssignedCalendarData();
            //     this.getAssignedCalendarTabData();
            //     this.getAssignedVehicles();
            // }
			// this.oJobCardFragment = "";
            // if (!this.oJobCardFragment) {
            //     this.oJobCardFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobCard", this);
            //     this.getView().addDependent(this.oJobCardFragment);
            // }
            // oPage.addContent(this.oJobCardFragment);
			
            // sap.ui.getCore().byId("Idappt").addEventDelegate({
            //     onmouseover: this._showPopover,
            //     onmouseout: this._clearPopover
            // }, this);
	
            this.subletDetails = [];
            this.jobDetailsData = [];
            this.jobItemDetailsData = [];
            this.roadTestData = [];
            this.selectedRejectedJobs = [];
            this.selectedRecalls = [];
            this.deferredJobItems = [];
            this.ApprovalogJobsItems = [];
            this.AssignmentTechniciansArray = [];
            this.AssignmentPartsArray = [];
            this.InventoryTyreData = [];
            this.DeputationData = [];
            this.subletData = [];
            this.GetPackages = [];
            this.demo = [];
            this.roadTestTableData = [];
            this.inspInventoryData = [];
            this.InspCheckListGlobalData = [];
            this.AdBlueFuelArray = [];
			this.selectedquotationData =[]; 
            jobPckorCustVoice = false;
			this.VehInspImagesArray = [];
			this.saveVehicle = false;
			this.cordinates = [];
			this.inspImgdisable = false;
			this.getView().getModel("oLocalJsonModel").setProperty("/VehImgDisable", this.inspImgdisable);
			this.ImagesPlaned = {
				"LEFT": "",
				"RIGHT": "",
				"FRONT": "",
				"REAR": ""
			};
			this.Inspectedres = [];
			this.AssignedJobNos ="";
			this.AssignedItemNos ="";
			oAssignmentRemarks = "";
			this._VINValueHelpDialog1 = "";
			this.InstFeedback = [];
        },
		statusCreation:function(e){
			var that = this;
			var oSuccess, oError, aJobFilter = [];
			var oComboBox = sap.ui.getCore().byId("idJCDStatus");
			var path = e.delegateTarget.getElementsByTagName("div")[0].id.split("-content")[0];
			//var status = sap.ui.getCore().byId(path).getBindingContext("jobDetailsModel").getObject().Status;//Status_Text;
			var status = sap.ui.getCore().byId(path).getSelectedKey();
			if(status === ""){
				status = null;
			}
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "JOB_STATUS"),
				new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo),
				new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, status));
			oSuccess = function(oData) {
				var oJobJSONModel = new JSONModel(oData.results);
				this.getView().setModel(oJobJSONModel, "JobDetailStatus");
			}.bind(this);
			oError = function(e) {
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},
		onExit: function() {
			var that = this;
			var oPage = that.byId("page");
			
			
			if (that._ReqByPassDialog) {
				that._ReqByPassDialog.destroy(true);
				that.getView().removeDependent(that._ReqByPassDialog);
			}
			if (that._VINValueHelpDialog1) {
				that._VINValueHelpDialog1.destroy(true);
				that.getView().removeDependent(that._VINValueHelpDialog1);
			}

			if (that.oVehicleDetailsFragment) {
				that.oVehicleDetailsFragment.destroy(true);
				that.getView().removeDependent(that.oVehicleDetailsFragment);
			}

			if (that.oJobCardFragment) {
				that.oJobCardFragment.destroy();
				that.getView().removeDependent(that.oJobCardFragment);
			}
			if(sap.ui.getCore().byId("Idappt4")){
				sap.ui.getCore().byId("Idappt4").destroy();
			}

			if(sap.ui.getCore().byId("Idappt")){
			sap.ui.getCore().byId("Idappt").destroy();
			}

			if(sap.ui.getCore().byId("idList")){
				sap.ui.getCore().byId("idList").destroy();
			}

			if(sap.ui.getCore().byId("IdPackHistory")){
				sap.ui.getCore().byId("IdPackHistory").destroy();
			}

			if(sap.ui.getCore().byId("CustVoiceId")){
				sap.ui.getCore().byId("CustVoiceId").destroy();
			}

			if(sap.ui.getCore().byId("packageListId")){
				sap.ui.getCore().byId("packageListId").destroy();
			}

			if(sap.ui.getCore().byId("jobDetailsID")){
				sap.ui.getCore().byId("jobDetailsID").destroy();
			}

			if(sap.ui.getCore().byId("jobItemDetailsID")){
				sap.ui.getCore().byId("jobItemDetailsID").destroy();
			}

			if(sap.ui.getCore().byId("TreeTableitem")){
				sap.ui.getCore().byId("TreeTableitem").destroy();
			}

			if(sap.ui.getCore().byId("idWarrentyType")){
				sap.ui.getCore().byId("idWarrentyType").destroy();
			}
			if(sap.ui.getCore().byId("idBillTo")){
				sap.ui.getCore().byId("idBillTo").destroy();
			}
			if(sap.ui.getCore().byId("idCombo")){
				sap.ui.getCore().byId("idCombo").destroy();
			}
			if(sap.ui.getCore().byId("idJCDStatus")){
				sap.ui.getCore().byId("idJCDStatus").destroy();
			}
			if(sap.ui.getCore().byId("IdDotted")){
				sap.ui.getCore().byId("IdDotted").destroy();
			}
			if(sap.ui.getCore().byId("idInitialAppTable")){
				sap.ui.getCore().byId("idInitialAppTable").destroy();
			}
			if(sap.ui.getCore().byId("IdDotted1")){
				sap.ui.getCore().byId("IdDotted1").destroy();
			}

			if(sap.ui.getCore().byId("DICVApprovalId")){
				sap.ui.getCore().byId("DICVApprovalId").destroy();
			}
			if(sap.ui.getCore().byId("DealerId")){
				sap.ui.getCore().byId("DealerId").destroy();
			}
			if(sap.ui.getCore().byId("idClaimTypeByPass")){
				sap.ui.getCore().byId("idClaimTypeByPass").destroy();
			}
			if(sap.ui.getCore().byId("idReasonByPass")){
				sap.ui.getCore().byId("idReasonByPass").destroy();
			}
			if(sap.ui.getCore().byId("CheckListTabSegParamsButtonId")){
				sap.ui.getCore().byId("CheckListTabSegParamsButtonId").destroy();
			}
			if(sap.ui.getCore().byId("idCLTree")){
				sap.ui.getCore().byId("idCLTree").destroy();
			}
			
			
			
		//	that.oJobCardFragment = null;
			

			if (that.oInspectionFragment) {
				that.oInspectionFragment.destroy(true);
				that.getView().removeDependent(that.oInspectionFragment);
			}

			if (that.oDeputationFragment) {
				that.oDeputationFragment.destroy(true);
				that.getView().removeDependent(that.oDeputationFragment);
			}

			if (that.oSubletFragment) {
				that.oSubletFragment.destroy(true);
				that.getView().removeDependent(that.oSubletFragment);
			}
			if (that.oCheckInFragment) {
				that.oCheckInFragment.destroy(true);
				that.getView().removeDependent(that.oCheckInFragment);
			}
			if (that.oJobDetailsFragment) {
				that.oJobDetailsFragment.destroy(true);
				that.getView().removeDependent(that.oJobDetailsFragment);
			}
			if (that.oRoadTestFragment) {
				that.oRoadTestFragment.destroy(true);
				that.getView().removeDependent(that.oRoadTestFragment);
			}
			if (that.oAssignmenttFragment) {
				that.oAssignmenttFragment.destroy(true);
				that.getView().removeDependent(that.oAssignmenttFragment);
			}
			if (that.oApprovalLogFragment) {
				that.oApprovalLogFragment.destroy(true);
				that.getView().removeDependent(that.oApprovalLogFragment);
			}
			if (that.oAccidentTATFragment) {
				that.oAccidentTATFragment.destroy(true);
				that.getView().removeDependent(that.oAccidentTATFragment);
			}
			if (that.oInvoiceFragment) {
				that.oInvoiceFragment.destroy(true);
				that.getView().removeDependent(that.oInvoiceFragment);
			}

			if (that.oJoblogFragment) {
				that.oJoblogFragment.destroy(true);
				that.getView().removeDependent(that.oJoblogFragment);
			}

			if (that.oMoreInfoFragment) {
				that.oMoreInfoFragment.destroy(true);
				that.getView().removeDependent(that.oMoreInfoFragment);
			}

			if (that.oFeedbackFragment) {
				that.oFeedbackFragment.destroy(true);
				that.getView().removeDependent(that.oFeedbackFragment);
			}

			if (that.oChecklistFragment) {
				that.oChecklistFragment.destroy(true);
				that.getView().removeDependent(that.oChecklistFragment);
			}

			if (that.oDefferredJobsFragment) {
				that.oDefferredJobsFragment.destroy(true);
				that.getView().removeDependent(that.oDefferredJobsFragment);
			}
		},

		_custStepInputFocusOut: function(that) {
			var stepControl = sap.ui.getCore().byId("idParamStep");
			var stepControl1 = sap.ui.getCore().byId("idParamStep1");
			var stepControl2 = sap.ui.getCore().byId("idParamStep2");
			var stepControl3 = sap.ui.getCore().byId("idParamStep3");
			if (stepControl) {
				stepControl.addEventDelegate({
					onfocusin: function(oEvent) {
						if (oEvent.srcControl) {
							oEvent.srcControl.$().find("input").attr("readonly", true);
							// make the control readonly
						}
					},
				});
			}
			if (stepControl1) {
				stepControl1.addEventDelegate({
					onfocusin: function(oEvent) {
						if (oEvent.srcControl) {
							oEvent.srcControl.$().find("input").attr("readonly", true);
						}
					},
				});
			}
			if (stepControl2) {
				stepControl2.addEventDelegate({
					onfocusin: function(oEvent) {
						if (oEvent.srcControl) {
							oEvent.srcControl.$().find("input").attr("readonly", true);
						}
					},
				});
			}
			if (stepControl3) {
				stepControl3.addEventDelegate({
					onfocusin: function(oEvent) {
						if (oEvent.srcControl) {
							oEvent.srcControl.$().find("input").attr("readonly", true);
						}
					},
				});
			}
		},

		onPressAssignedTable: function() {
			sap.ui.getCore().byId("AssignedTableId").setVisible(true);
			sap.ui.getCore().byId("assignedVehCalID").setVisible(false);
		},

		onPressAssignedTableCalendar: function() {
			sap.ui.getCore().byId("AssignedTableId").setVisible(false);
			sap.ui.getCore().byId("assignedVehCalID").setVisible(true);
			this.getAssignedCalendarTabData();
		},

		// isAppointmentOverlap: function(oEvent, oCalendarRow) {
		// 	var oAppointment = oEvent.getParameter("appointment"),
		// 		oStartDate = oEvent.getParameter("startDate"),
		// 		oEndDate = oEvent.getParameter("endDate"),
		// 		bAppointmentOverlapped;
		// 	bAppointmentOverlapped = oCalendarRow.getAppointments().some(function(oCurrentAppointment) {
		// 		if (oCurrentAppointment === oAppointment) {
		// 			return;
		// 		}
		// 		var oAppStartTime = oCurrentAppointment.getStartDate().getTime(),
		// 			oAppEndTime = oCurrentAppointment.getEndDate().getTime();
		// 		if (oAppStartTime <= oStartDate.getTime() && oStartDate.getTime() < oAppEndTime) {
		// 			return true;
		// 		}
		// 		if (oAppStartTime < oEndDate.getTime() && oEndDate.getTime() <= oAppEndTime) {
		// 			return true;
		// 		}
		// 		if (oStartDate.getTime() <= oAppStartTime && oAppStartTime < oEndDate.getTime()) {
		// 			return true;
		// 		}
		// 	});
		// 	return bAppointmentOverlapped;
		// },

		_showPopover: function(oeve) {
			this._timeId = setTimeout(() => {
				var path = oeve.srcControl.sId.split("-")[3];
				var path1 = oeve.srcControl.sId.split("-")[4];
				var datapop = this.getOwnerComponent().getModel('oLocalJsonModel').getData()['calendarModel'][path].SA_CAL.results[path1];
				var popmodel = new JSONModel(datapop);
				this.getView().setModel(popmodel, "PopoverModel");
				sap.ui.getCore().byId("planningCalID").getRows()[path].getAppointments()[path1].
				getDependents()[0].openBy(oeve.relatedTarget)
				// sap.ui.getCore().byId("popover").openBy(oeve.relatedTarget);
			}, 500);
		},

		_clearPopover: function(oeve) {
			clearTimeout(this._timeId);
			// sap.ui.getCore().byId("popover").close();
		},

		onCancelDialog: function() {
			this._ValueUnAssignRO.close();
		},

		onVehicleCellClick: function(oEvt) {
			var that = this;
			RepairOrderNo = oEvt.getParameters().rowBindingContext.getObject().Job_Card;
			VinNo = oEvt.getParameters().rowBindingContext.getObject().Vin_No;
			RegNo = oEvt.getParameters().rowBindingContext.getObject().Reg_No;
			SubServiceType = oEvt.getParameters().rowBindingContext.getObject().Service_Type;
			ServiceType = oEvt.getParameters().rowBindingContext.getObject().Aufart_Desc;
			ServiceTypeCode = oEvt.getParameters().rowBindingContext.getObject().Aufart_Code;
			SubSrvTypeCode = oEvt.getParameters().rowBindingContext.getObject().Srv_Type_Code;
			OverViewHeadrerDate = oEvt.getParameters().rowBindingContext.getObject().Ovrvw_Hdr_Date;
			Status = oEvt.getParameters().rowBindingContext.getObject().Status;
			var selectedmainchecktab="";
			if(SubSrvTypeCode ==="901" || SubSrvTypeCode === "910"){
				selectedmainchecktab="Long Storage";
			}else if(SubSrvTypeCode ==="902"){
				selectedmainchecktab="PDI1";
			}else if(SubSrvTypeCode ==="903"){
				selectedmainchecktab="PDI2";
			}else if(SubSrvTypeCode ==="904"){
				selectedmainchecktab="Accidental";
			}else if(SubSrvTypeCode ==="908"){
				selectedmainchecktab="PMS";
			}
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubServiceTypeValue", SubServiceType);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/printchecklist", false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Selecetedmainchecklistbtn", selectedmainchecktab);
			that._ReadDPAccTYPEOFACCIDENT();
			that._ReadDPAccdelayreason();
			that._ReadDPAcctypeofjob();
			that._ReadDPAccinscmpny();
			that._ReadDPAccCurrentstat();
			that._Readdpinvoicecancelremarks();
			that._Readdpinvoicebanknames();
			that._Readdpinvoicepaymentmode();
			that.ReadDPCheckinReason();
			that.ReadDPCheckinType();
		
			var flag = "";
			if (RepairOrderNo) {
				flag = "ED";
			} else {
				flag = "C";
			}
		
			if (flag === "ED") {
				var obj = {
					"Flag": flag,
					"RepairOrderNo": RepairOrderNo,
					"VinNo": VinNo,
					"RegNo": RegNo,
					"SubServiceType": SubServiceType,
					"ServiceType": ServiceType,
					"ServiceTypeCode": ServiceTypeCode,
					"SubSrvTypeCode": SubSrvTypeCode,
					"OverViewHeadrerDate": OverViewHeadrerDate,
					"Status": Status,
					"OnSite": "",
					"createDrpAll": false,
					"createInputAll": true,
					"saveFlagEnabled": false
				};
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
				that.saveVehicle = true;
			}
			if (flag === "C") {
				var obj = {
					"Flag": flag,
					"RepairOrderNo": "",
					"VinNo": VinNo,
					"RegNo": RegNo,
					"SubServiceType": SubServiceType,
					"ServiceType": ServiceType,
					"ServiceTypeCode": ServiceTypeCode,
					"SubSrvTypeCode": SubSrvTypeCode,
					"OverViewHeadrerDate": OverViewHeadrerDate,
					"Status": "",
					"OnSite": "",
					"createDrpAll": true,
					"createInputAll": false,
					"saveFlagEnabled": true
				};
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				that.saveVehicle = false;
			}
			
			var oModel = new JSONModel(obj);
			that.getView().setModel(oModel, "localJCDeatils");
			that.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
			
			that.getView().byId("toolheaderButtonsId").setVisible(false);
			that.getView().byId("toolheaderButtonsId1").setVisible(false);
			that.getView().byId("toolheaderButtonsId2").setVisible(false);
			that.getView().byId("toolheaderTextId").setVisible(false);
			that.getView().byId("toolheaderTextId1").setVisible(false);

			that.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
			that.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
			var oPage = this.byId("page");
			if (that.getView().byId("iconTabHeader").getSelectedKey() === "VehicleDetails") {
				that.getCustomerInformation();
				that.ReadComplaintdata();
				that.getVehicleInformation();
				that.getJobCardInformation();
				that.getOtherInformation();
				that.getWarrantyInfo();
				that.getMeasuresRecalls();
				that.getRejectedJobs();
				that.getServiceCampaign();
				that.getDiagnostics();
				that.getQuotations();
				// that.getWarrantySettingsInfo();
				that.getServiceHistory();
				that.getSoldTo();
				that.getBillTo();
				that.getshipTo();
				that.getServiceType();
				
				// that.getServiceSubType();
				if (!that.oVehicleDetailsFragment) {
					that.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", that);
					that.getView().addDependent(that.oVehicleDetailsFragment);
					oPage.addContent(that.oVehicleDetailsFragment);
				}
				
				selectedIconTab = "VehicleDetails";
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				// that.privateFunction();
				// that.jobDetailsData = [];
				// that.DeputationData = [];
				// that.subletData = [];
			}
		},

		handleAppointmentSelect: function(oEvt) {
			var that = this;
			var path = oEvt.getParameters().appointment.oBindingContexts.oLocalJsonModel.getPath().split("/");

			var seleteditem = oEvt.getParameters().appointment.oBindingContexts.oLocalJsonModel.getModel().getData()['calendarModel']
				[path[2]]['SA_CAL']['results'][path[5]];

			RepairOrderNo = seleteditem.RoNo;
			VinNo = seleteditem.VinNo;
			RegNo = seleteditem.RegNo;
			SubServiceType = seleteditem.ServiceType;
			ServiceType = seleteditem.AufartDesc;
			ServiceTypeCode = seleteditem.AufartCode;
			SubSrvTypeCode = seleteditem.SrvTypeCode;
			OverViewHeadrerDate = seleteditem.RO_DATE;
			Status = seleteditem.Status;
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubServiceTypeValue", SubServiceType);
			var flag = "";
			if (RepairOrderNo) {
				flag = "ED";
			} else {
				flag = "C";
			}
			if (flag === "ED") {
				var obj = {
					"Flag": flag,
					"RepairOrderNo": RepairOrderNo,
					"VinNo": VinNo,
					"RegNo": RegNo,
					"SubServiceType": SubServiceType,
					"ServiceType": ServiceType,
					"ServiceTypeCode": ServiceTypeCode,
					"SubSrvTypeCode": SubSrvTypeCode,
					"OverViewHeadrerDate": OverViewHeadrerDate,
					"Status": Status,
					"OnSite": "",
					"createDrpAll": false,
					"createInputAll": true,
					"saveFlagEnabled": true
				};
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
				that.saveVehicle = true;
			}
			if (flag === "C") {
				var obj = {
					"Flag": flag,
					"RepairOrderNo": "",
					"VinNo": VinNo,
					"RegNo": RegNo,
					"SubServiceType": SubServiceType,
					"ServiceType": ServiceType,
					"ServiceTypeCode": ServiceTypeCode,
					"SubSrvTypeCode": SubSrvTypeCode,
					"OverViewHeadrerDate": OverViewHeadrerDate,
					"Status": "",
					"OnSite": "",
					"createDrpAll": true,
					"createInputAll": false,
					"saveFlagEnabled": true
				};
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				that.saveVehicle = false;
			}

			var oModel = new JSONModel(obj);
			that.getView().setModel(oModel, "localJCDeatils");
			that.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
		
			that.getView().byId("toolheaderButtonsId").setVisible(false);
			that.getView().byId("toolheaderButtonsId1").setVisible(false);
			that.getView().byId("toolheaderButtonsId2").setVisible(false);
			that.getView().byId("toolheaderTextId").setVisible(false);
			that.getView().byId("toolheaderTextId1").setVisible(false);

			that.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
			that.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);

			var oPage = this.byId("page");
			if (that.getView().byId("iconTabHeader").getSelectedKey() === "VehicleDetails") {
				that.getCustomerInformation();
				that.ReadComplaintdata();
				that.getVehicleInformation();
				that.getJobCardInformation();
				that.getOtherInformation();
				that.getWarrantyInfo();
				that.getMeasuresRecalls();
				that.getRejectedJobs();
				that.getServiceCampaign();
				that.getDiagnostics();
				that.getQuotations();
				// that.getWarrantySettingsInfo();
				that.getServiceHistory();
				that.getSoldTo();
				that.getBillTo();
				that.getshipTo();
				that.getServiceType();
				// that.getServiceSubType();
				if (!that.oVehicleDetailsFragment) {
					that.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", that);
					that.getView().addDependent(that.oVehicleDetailsFragment);
					oPage.addContent(that.oVehicleDetailsFragment);
				}

				selectedIconTab = "VehicleDetails";
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				// that.privateFunction();
			}
		},

		getButtonCounts: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "buttonsCountsModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/CountSet(Input='')", {
				success: oSuccess,
				error: oError
			});
		},

		getAssignedCalendarTabData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/calendarVehModel", oData.results);
				// var oModel = new JSONModel(oData.results);
				// that.getView().setModel(oModel, "AssignedVehiclesCalendarModel");
			};
			var oError = function(err) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Service_DB_HeaderSet", {
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "Servicehdrtoitm"
				}
			});
		},

		onLiveChangeCurrentOdometer: function(oEvent) {
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			val = val.replace(/[^\d]/g, '');
			_oInput.setValue(val);
		},

		getAssignedCalendarData: function() {
			var that = this;
			oBusyDialog.open();
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var today = new Date();
				today.setHours(8, 0, 0, 0);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/startdatePC", today);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/calendarModel", oData.results);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				// that._ReadCalendermodel();
			};

			var oError = function(err) {
				oBusyDialog.close();
				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/SA_HdrSet", {
				urlParameters: {
					"$expand": "SA_CAL"
				},
				success: oSuccess,
				error: oError
			});
		},

		_ReadCalendermodel: function() {
			var that = this;
			oBusyDialog.open();
			var oSuccessCalend = function(oData) {
				oBusyDialog.close();
				var today = new Date();
				today.setHours(8, 0, 0, 0);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/startdatePC", today);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/calendarModel", oData.results);
			};
			var oErrorCalend = function(err) {
				oBusyDialog.close();
				sap.m.MessageBox.show(JSON.parse(err.responseText), sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/SA_HdrSet", {
				urlParameters: {
					"$expand": "SA_CAL"
				},
				success: oSuccessCalend,
				error: oErrorCalend
			});
		},

		getAssignedVehicles: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "asignedVehiclesListModel");
				 that.timercolor();
				// }
				var oPage = that.byId("page");

				// if (!that.oJobCardFragment) {
				// 	that.oJobCardFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobCard", that);
				// 	that.getView().addDependent(that.oJobCardFragment);
				// }
				// oPage.addContent(that.oJobCardFragment);

			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Ass_Veh_ListSet", {
				success: oSuccess,
				error: oError
			});
		},

		getServiceType: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [],sFilters1 =[];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "SERVICE_TYPE"));
			sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "BODY_BUILD_NAME"));

			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "serviceTypeModel");
			};

			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "bodyBuildingSelectModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess1,
				error: oError,
				filters: sFilters1
			});
		},

		onChangeServiceType: function(oEvt) {
			var that = this;
			that.selectedServiceType = oEvt.getSource().getSelectedKey();
			that.getServiceSubType(that.selectedServiceType);
			that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode = "";
			that.getView().getModel("localJCDeatils").updateBindings(true);
		},

		onChangeSubServiceType: function(oEvt) {
			var that = this;
			var val = oEvt.getSource().getSelectedKey();
			that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode = val;
			// if(val === "903"){
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubServiceTypeValue", val);
			// }
			that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
			that.getView().getModel("localJCDeatils").updateBindings(true);
		},

		onChangeLocationType: function(oEvt) {
			var that = this;
			var val = oEvt.getSource().getSelectedKey();
			if (val === "Workshop") {
				sap.ui.getCore().byId("locId").setEnabled(false);
				that.getlocation();
			} else if (val === "Onsite") {
				sap.ui.getCore().byId("locId").setEnabled(true);
				sap.ui.getCore().byId("locId").setValue("");
			}
		},

		getlocation: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, sFilters = [];
			sFilters.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "LOCATION"));
			sFilters.push(new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, "Workshop"));
			oSuccess = function(oData) {
				oBusyDialog.close();
				sap.ui.getCore().byId("locId").setValue(oData.results[0].Value);
			};
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getServiceSubType: function(val) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Service_Type", sap.ui.model.FilterOperator.EQ, val));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (that.getView().getModel("localJCDeatils").getData().Flag === "C") {
				// 	that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode = oData.results[0].Value;
				// 	// that.getView().getModel("localJCDeatils").getData().ServiceTypeCode = sap.ui.getCore("serviceTypeId").getSelectedKey();
				// 	that.getView().getModel("localJCDeatils").updateBindings(true);
				// } else
				if (that.getView().getModel("localJCDeatils").getData().Flag === "ED") {
					oData.results[0].Value = that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode;
					oData.results[0].Description = that.getView().getModel("localJCDeatils").getData().SubServiceType;
					that.getView().getModel("localJCDeatils").updateBindings(true);
				}
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "serviceSubTypeModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Sub_Srv_SHSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getSoldTo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "SOLD_TO"),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "soldToModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getBillTo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			var sFilters1 = [];
			var sFilters2 = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "BILL_TO"),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));

			sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "LOCATION"));

			sFilters2.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "LOC_TYPE"));

			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "billToModel");
			};
			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "locationModel");
			};
			var oSuccess2 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "locationTypeModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess1,
				error: oError,
				filters: sFilters1
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess2,
				error: oError,
				filters: sFilters2
			});
		},

		getshipTo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "SHIP_TO"),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "shipToModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getCustomerInformation: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "customerInfoModel");
				CustID = oData.Cust_ID;
				that.getInsuranceDetails(CustID);
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Cust_InfoSet(VIN='" + VinNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getVehicleInformation: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "vehicleInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Veh_InfoSet(VIN='" + VinNo + "',RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getJobCardInformation: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				that.getView().getModel("oLocalJsonModel").setProperty("/DBStatusFlag", oData.Sflag);
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "jobCardInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Job_Card_InfoSet(JC_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getOtherInformation: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "otherInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Other_InfoSet(VIN='" + VinNo + "',RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getWarrantySettingsInfo: function(selcarr) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo),
				new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "POPUP"));
				if(selcarr){
					sFilters = sFilters.concat(selcarr);
				}
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "warrantySettingInfoModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Warranty_InfoSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getWarrantyInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "warrantyInfoModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Warranty_InfoSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getMeasuresRecalls: function() {
			oBusyDialog.open();
			var oModel = new JSONModel([]);
			this.getView().setModel(oModel, "measuresRecallsInfoModel");
			if(sap.ui.getCore().byId("idSrvMeasure")){
			sap.ui.getCore().byId("idSrvMeasure").clearSelection();
			}
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				aSelectedSrvMeasures = [];
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "measuresRecallsInfoModel");
					if(that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/saveFlagEnabled") === true ){
						if(oData.results.length>0){
						var MaxLength = parseInt(oData.results.length)-parseInt(1);
						sap.ui.getCore().byId("idSrvMeasure").setSelectionInterval(0,MaxLength);
						aSelectedSrvMeasures = $.extend([],oData.results);
						}
						//oData.results.forEach(function(item,index){
						//	sap.ui.getCore().byId("idSrvMeasure").setSelectedIndex(index);
						//});
					
					}

				
					
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Recalls_Srv_MeasureSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getInsuranceDetails: function(custId) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo),
				new sap.ui.model.Filter("Customer_No", sap.ui.model.FilterOperator.EQ, custId));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "oInsuranceModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Insurance_DetailsSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getRejectedJobs: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "rejectedJobsModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Rejected_JobSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getServiceHistory: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo),
				new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "NON_PDF"));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "serviceHistoryModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Service_HistorySet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},


		getBodyBuildingInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "bodyBuildingModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Body_buildingSet(Vhvin='" + VinNo + "')", {
				success: oSuccess,
				error: oError
			});
		},


		getServiceCampaign: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "serviceCampaignModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Service_CampaignSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getDiagnostics: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "diagnosticsModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DiagnosticSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getQuotations: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "QuotationModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/QuotationSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		ongetCheckListAggregates: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'CHECKLIST_HDR'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "checkListAggregatesModel");
				sap.ui.getCore().byId("InspChecklistSegButtonsId").setSelectedKey(oData.results[0].Value);
				that.ongetInspParameters(oData.results[0].Value);
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		ongetInspParameters: function(oEvt) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
				new sap.ui.model.Filter("Application", sap.ui.model.FilterOperator.EQ, oEvt));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var data = JSON.parse(JSON.stringify(oData.results));
				that.InspCheckListGlobalData = data.slice(0);
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "InspParametersModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ChecklistSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getSubletData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			if(that.getView().getModel("subletModel")){
				that.getView().getModel("subletModel").setData([]);
				that.getView().getModel("subletModel").updateBindings(true);
			}
			that.subletData = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();

				if (oData.results[0].Flag !== "F") {
					for (var i = 0; i < oData.results.length; i++) {
						// if (oData.results[i].updated !== 'Yes') {
						// 	oData.results[i].tripNo = i + 1;
						// 	oData.results[i].Flag = 'X';
						// 	oData.results[i].updated = "Yes";
						that.subletData.push({
							"Action_Performed": oData.results[i].Action_Performed,
							"Aggregate": oData.results[i].Aggregate,
							"Bill_To": oData.results[i].Bill_To,
							"Concern": oData.results[i].Concern,
							"Db_Flg": oData.results[i].Db_Flg,
							"FRM_Code": oData.results[i].FRM_Code,
							"Flag": oData.results[i].Flag,
							"Invoice_Amount": oData.results[i].Invoice_Amount,
							"Invoice_Date": oData.results[i].Invoice_Date,
							"Invoice_No": oData.results[i].Invoice_No,
							"Job": oData.results[i].Job,
							"RO_No": oData.results[i].RO_No,
							"Remarks": oData.results[i].Remarks,
							"Sublet_Duration": oData.results[i].Sublet_Duration,
							"Sublet_End_DT": oData.results[i].Sublet_End_DT,
							"Sublet_Kms": oData.results[i].Sublet_Kms,
							"Sublet_No": oData.results[i].Sublet_No,
							"Sublet_Start_DT": oData.results[i].Sublet_Start_DT,
							"Vendor_Name": oData.results[i].Vendor_Name,
							"Vendor_Name_Desc": oData.results[i].Vendor_Name
						});
						// }
					}
					var oModel = new JSONModel(that.subletData);
					that.getView().setModel(oModel, "subletModel");
				} else {
					var oModel = new JSONModel(null);
					that.getView().setModel(oModel, "subletModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/SubletSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		ongetSubletDropdownsData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.sFilters = [];
			that.sFilters1 = [];
			that.sFilters2 = [];
			that.sFilters3 = [];
			that.sFilters4 = [];

			that.sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'CONCERN'),
				new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, RepairOrderNo));

			that.sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'FRM_CODE'),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));

			that.sFilters2.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'AGGREGATE'),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));

			that.sFilters3.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'BILL_TO'));
			that.sFilters4.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'SUBLET_VEND'));

			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "concernModel");
				// }
			};
			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "FRMCodeSub");
				// }
			};
			var oSuccess2 = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "AggregateModel");
				// }
			};
			var oSuccess3 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "SubletBillModel");
			};

			var oSuccess4 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "SubletVendorNameModel");
			};

			var oError = function(error) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				success: oSuccess,
				error: oError,
				filters: that.sFilters
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess1,
				error: oError,
				filters: that.sFilters1
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess2,
				error: oError,
				filters: that.sFilters2
			});
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				success: oSuccess3,
				error: oError,
				filters: that.sFilters3
			});

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess4,
				error: oError,
				filters: that.sFilters4
			});
		},
		
		getInspectionTableInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			that.VehInspImagesArray = [];
			that.cordinates = [];
			sFilters.push(new sap.ui.model.Filter("JC_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
				new sap.ui.model.Filter("Part_Coordinate", sap.ui.model.FilterOperator.EQ, ""));
			that.Inspectedres = [];
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var markS, cotype, textM;
				that.inspImgdisable = oData.results[0].Insp_disable_flag;
				that.getView().getModel("oLocalJsonModel").setProperty("/VehImgDisable", that.inspImgdisable);
				if (oData.results[0].Flag !== "F") {
					for (var i = 0; i < oData.results.length; i++) {

						var cotype = "blue";
						var textM = "D";
						var markS = 0;
						if (oData.results[i].Intensity === "Moderate") {
							markS = 4;
						} else if (oData.results[i].Intensity === "Severe") {
							markS = 6;
						} else {
							markS = 0;
						}
						if (oData.results[i].Intensity === "Dent") {
							cotype = "#0070c0";
							textM = "D";
						} else if (oData.results[i].Problem_Type === "Scratch") {
							// cotype = "#333FFF";
							textM = "S";
						} else if (oData.results[i].Problem_Type === "Crack") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Crack") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Leak") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Damage") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Deformed") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Rust") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Discolored") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Missing") {
							// cotype = "#4FFF33";
							textM = "B";
						} else if (oData.results[i].Problem_Type === "Not working") {
							// cotype = "#4FFF33";
							textM = "B";
						}

						that.VehInspImagesArray.push({
							"Additional_Job": oData.results[i].Additional_Job,
							"Concern": oData.results[i].Concern,
							"Intensity": oData.results[i].Intensity,
							"Flag": oData.results[i].Flag,
							"JC_No": oData.results[i].JC_No,
							"Part_Coordinate": oData.results[i].Part_Coordinate,
							"partName": oData.results[i].Part_Name,
							"Problem": oData.results[i].Problem_Type,
							"Remarks": oData.results[i].Remarks,
							"Symptom_Code": oData.results[i].Symptom_Code,
							"View": oData.results[i].View,
							"Insp_disable_flag": oData.results[i].Insp_disable_flag,
							"Img_X_coordinate": parseFloat(oData.results[i].Img_X_coordinate),
							"Img_Y_coordinate": parseFloat(oData.results[i].Img_Y_coordinate)
						});
						that.cordinates.push({
							"X": parseFloat(oData.results[i].Img_X_coordinate),
							"Y": parseFloat(oData.results[i].Img_Y_coordinate),
							"markType": cotype,
							"textM": textM,
							"markS": markS,
							"partName": oData.results[i].Part_Name,
							"Symptom_Code": oData.results[i].Symptom_Code,
							"Problem": oData.results[i].Problem_Type,
							"Intensity": oData.results[i].Intensity,
							"View": oData.results[i].View
						});
					}
					var oModel = new JSONModel(that.VehInspImagesArray);
					that.getView().setModel(oModel, "InspectionResults");
				}
				else {
					var oModel = new JSONModel(null);
					that.getView().setModel(oModel, "InspectionResults");
				}
					if (that.inspImgdisable === true) {
						sap.ui.getCore().byId("inspectionRemarksTableId").setMode("None");
						that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
					} else {
						sap.ui.getCore().byId("inspectionRemarksTableId").setMode("MultiSelect");
						that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
					}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Insp_Img_ResSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},


		getJobDetailsData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
					if(that.getView().getModel("jobDetailsModel")){
						that.getView().getModel("jobDetailsModel").setData([]);
						that.getView().getModel("jobDetailsModel").updateBindings(true);
					}
				
			that.jobDetailsData = [];
			var tabNameSelected;
			if(selectedIconTab === "JobDetails"){
				tabNameSelected = "";
			}
			else{
				tabNameSelected = "X";
			}
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
					new sap.ui.model.Filter("Tab_Name", sap.ui.model.FilterOperator.EQ, tabNameSelected));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var DBStatus = that.getView().getModel("oLocalJsonModel").getProperty("/DBStatusFlag");
				if (oData.results[0].Flag !== 'F') {
					for (var i = 0; i < oData.results.length; i++) {
						// if (oData.results[i].Item_Flag === "") {
						// 	oData.results[i].Stock = "";
						// }
						// if (oData.results[i].Item_Flag === "X") {
						// 	oData.results[i].Stock = oData.results[i].Stock;
						// }
						if(oData.results[i].Status === ""){
							oData.results[i].Status = DBStatus;
						}
						that.jobDetailsData.push({
							"Approval": oData.results[i].Approval,
							"Concern": oData.results[i].Concern,
							"Db_Flg": oData.results[i].Db_Flg,
							"Description": oData.results[i].Description,
							"FaultCat": oData.results[i].FaultCat,
							"Flag": oData.results[i].Flag,
							"Input": oData.results[i].Input,
							"Job": oData.results[i].Job,
							"JobSource": oData.results[i].JobSource,
							"Msg": oData.results[i].Msg,
							"NtAttendRsn": oData.results[i].NtAttendRsn,
							"Observation": oData.results[i].Observation,
							"Package": oData.results[i].Package,
							"QI_Rework": oData.results[i].QI_Rework,
							"RO_No": oData.results[i].RO_No,
							"Remarks": oData.results[i].Remarks,
							"Repeat": oData.results[i].Repeat,
							"RptRsn": oData.results[i].RptRsn,
							"Status": oData.results[i].Status,
							"Status_Text":oData.results[i].Status_Text,//for deferred frag
							"Stock": oData.results[i].Stock,
							"Item_Flag": oData.results[i].Item_Flag,
							"Job_Type": oData.results[i].Job_Type,
							"Job_concer_code": oData.results[i].Job_concer_code,
							"Job_Status": oData.results[i].Job_Status
						});
					}
				}
				var oModel = new JSONModel(that.jobDetailsData);
				that.getView().setModel(oModel, "jobDetailsModel");
			};
			
			var oError = function(error) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
				// errmessage = error.responseText;
				// errmessage = JSON.parse(errmessage);
				// errmessage = errmessage.error.message.value;
				// sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/CustVoiceDtlsSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onGetJobItemDetailsDropdowns: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.sFilters = [];
			that.sFilters1 = [];
			that.sFilters2 = [];
			that.sFilters3 = [];

			that.sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'ITEM_TYPE'));
			// that.sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'ITEM_BILL_TO'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "jobItemTypeModel");
				}
			};
			// var oSuccess1 = function(oData) {
			// 	oBusyDialog.close();
			// 	if (oData.results[0].Flag !== "F") {
			// 		var oModel = new JSONModel(oData.results);
			// 		that.getView().setModel(oModel, "jobItemBillToModel");
			// 	}
			// };
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: that.sFilters
			});
			// that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
			// 	success: oSuccess1,
			// 	error: oError,
			// 	filters: that.sFilters1
			// });
		},

		onGetDefferredJobs: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "DefferredJobsModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Cust_Vdet_ChlistSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getJobLogInfo: function() {
			oBusyDialog.open();
			var that = this,
				OrderNo = OrderNo,
				oSuccess, oError;
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "jobLogInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Job_LogSet('" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "JOB_LOG_TAB"
				}
			});
		},

		getInvoiceTabInfo: function() {
			oBusyDialog.open();
			var that = this,
				OrderNo = OrderNo,
				oSuccess, oError;
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceInfoModel", {});
			oSuccess = function(oData) {
				oBusyDialog.close();
				// var oModel = new JSONModel(oData);
				// that.getView().setModel(oModel, "InvoiceInfoModel");
				oData.UTR_Date=that.stringtodateconversion(oData.UTR_Date);
				oData.UTR_Date=that.stringtodateconversion(oData.DD_Check_Date);
				// oData.Invoice_Date=that.stringtodateconversion(oData.Invoice_Date);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceInfoModel", oData);
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Invoice_TabSet('" + SelectedInvoiceVal + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getInvoiceList: function() {
			oBusyDialog.open();
			var that = this,
				OrderNo = OrderNo,
				oSuccess, oError;
			var sFilters = [];
			if(that.getView().getModel("InvoiceListInfoModel")){
				that.getView().getModel("InvoiceListInfoModel").setData([]);
				that.getView().getModel("InvoiceListInfoModel").updateBindings(true);
			}

			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "InvoiceListInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Invoice_ListSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		ongetCheckInInfo: function() {
			oBusyDialog.open();
			var that = this,
				OrderNo = OrderNo,
				oSuccess, oError;
				if(that.getView().getModel("checkInInfoModel")){
                    that.getView().getModel("checkInInfoModel").setData({});
                    that.getView().getModel("checkInInfoModel").updateBindings(true);
                }
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "checkInInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Checkin_HdrSet(RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "CHECKIN_TAB"
				}
			});
		},

		onGetAssignmentTechnicianInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Technicianheaderlevel" ,{});
				that.getView().getModel("oLocalJsonModel").updateBindings(true);

			that.AssignmentTechniciansArray = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				for (var i = 0; i < oData.results.length; i++) {
					 var formateddata=[];
					if( oData.results[i].Main!== "" && oData.results[i].Technician !=="" ){
						oData.results[i].Technician = oData.results[i].Technician.slice(0,-1);
					var data=oData.results[i].Technician.split(",");
					for(var j = 0;j < data.length; j++){
							formateddata.push({"Value":data[j].split("-")[0],"Description":data[j].split("-")[1]});
						}
						for(var k = 0;k < oData.results[i].TECH_ASS_TAB.results.length;k++){
							var childdata=[];
							if( oData.results[i].Main!== "" && oData.results[i].Technician !=="" ){
							oData.results[i].TECH_ASS_TAB.results[k].Technician = oData.results[i].TECH_ASS_TAB.results[k].Technician.slice(0,-1);
							
							 var data1=oData.results[i].TECH_ASS_TAB.results[k].Technician.split(",");
							
							// var data1=oData.results[i].TECH_ASS_TAB.results[k].Technician;
									for(var j = 0;j < data1.length; j++){
						 	childdata.push({"Value":data1[j].split("-")[0],"Description":data1[j].split("-")[1]});
							}
							oData.results[i].TECH_ASS_TAB.results[k].Technicain_list=childdata;
							}
						}
						}
						
					that.AssignmentTechniciansArray.push({
						"Act_Compl_Time": oData.results[i].Act_Compl_Time,
						"Availability_Status": oData.results[i].Availability_Status,
						"Concern": oData.results[i].Concern,
						"Cust_Voice": oData.results[i].Cust_Voice,
						"FS_Remarks": oData.results[i].FS_Remarks,
						"Flag": oData.results[i].Flag,
						"Idle_Time": oData.results[i].Idle_Time,
						"Itm_Status": oData.results[i].Itm_Status,
						"Job_No": oData.results[i].Job_No,
						"Job_Source": oData.results[i].Job_Source,
						"Main": oData.results[i].Main,
						"Main_Tech_Flag": oData.results[i].Main_Tech_Flag,
						"Msg": oData.results[i].Msg,
						"QI_Remarks": oData.results[i].QI_Remarks,
						"RO_No": oData.results[i].RO_No,
						"Remarks": oData.results[i].Remarks,
						"SA_Remarks": oData.results[i].SA_Remarks,
						"Status": oData.results[i].Status,
						"Technician": oData.results[i].Technician,
						"Technicain_list":formateddata,
						"Technician_Flag": oData.results[i].Technician_Flag,
						"WIP_Time": oData.results[i].WIP_Time,
						"TECH_ASS_TAB": oData.results[i].TECH_ASS_TAB.results
					});
				}
				// var nonreferencedata=that.AssignmentTechniciansArray;
				var oModel = new JSONModel(that.AssignmentTechniciansArray);
				that.getView().setModel(oModel, "TechnicianInfoModel");
				// var oModel1 = new JSONModel(that.AssignmentTechniciansArray);
				// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/dummydata",that.AssignmentTechniciansArray[0]);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Technicianheaderlevel",jQuery.extend(true,{},that.AssignmentTechniciansArray[0]));
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Tech_Assign_HdrSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "TECH_ASS_TAB"
				}
			});
		},

		onPressAssignmentTechFilters: function(oEvt) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			that.AssignmentTechniciansArray = [];
			var selVal = oEvt.getSource().getText();
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
				new sap.ui.model.Filter("Filter", sap.ui.model.FilterOperator.EQ, selVal.toUpperCase()));
			oSuccess = function(oData) {
				oBusyDialog.close();
				for (var i = 0; i < oData.results.length; i++) {
					that.AssignmentTechniciansArray.push({
						"Act_Compl_Time": oData.results[i].Act_Compl_Time,
						"Availability_Status": oData.results[i].Availability_Status,
						"Concern": oData.results[i].Concern,
						"Cust_Voice": oData.results[i].Cust_Voice,
						"FS_Remarks": oData.results[i].FS_Remarks,
						"Flag": oData.results[i].Flag,
						"Idle_Time": oData.results[i].Idle_Time,
						"Itm_Status": oData.results[i].Itm_Status,
						"Job_No": oData.results[i].Job_No,
						"Job_Source": oData.results[i].Job_Source,
						"Main": oData.results[i].Main,
						"Main_Tech_Flag": oData.results[i].Main_Tech_Flag,
						"Msg": oData.results[i].Msg,
						"QI_Remarks": oData.results[i].QI_Remarks,
						"RO_No": oData.results[i].RO_No,
						"Remarks": oData.results[i].Remarks,
						"SA_Remarks": oData.results[i].SA_Remarks,
						"Status": oData.results[i].Status,
						"Technician": oData.results[i].Technician,
						"Technician_Flag": oData.results[i].Technician_Flag,
						"WIP_Time": oData.results[i].WIP_Time,
						"TECH_ASS_TAB": oData.results[i].TECH_ASS_TAB.results
					});
				}
				var oModel = new JSONModel(that.AssignmentTechniciansArray);
				that.getView().setModel(oModel, "TechnicianInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Tech_Assign_HdrSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "TECH_ASS_TAB"
				}
			});
		},

		onGetAssignmentPartsInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			if(that.getView().getModel("AssignmentPartsModel")){
				that.getView().getModel("AssignmentPartsModel").setData([]);
				that.getView().getModel("AssignmentPartsModel").updateBindings(true);
			}

			that.AssignmentPartsArray = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				for (var i = 0; i < oData.results.length; i++) {
					that.AssignmentPartsArray.push({
						"Concern": oData.results[i].Concern,
						"Cust_Voice": oData.results[i].Cust_Voice,
						"FS_Remarks": oData.results[i].FS_Remarks,
						"First_Fill": oData.results[i].First_Fill,
						"Flag": oData.results[i].Flag,
						"Inventory_Loc": oData.results[i].Inventory_Loc,
						"Invoiced_Qty": oData.results[i].Invoiced_Qty,
						"Itm_Status": oData.results[i].Itm_Status,
						"Job_No": oData.results[i].Job_No,
						"Main": oData.results[i].Main,
						"Msg": oData.results[i].Msg,
						"Not_issued_Qty": oData.results[i].Not_issued_Qty,
						"QI_Remarks": oData.results[i].QI_Remarks,
						"RO_No": oData.results[i].RO_No,
						"Remarks": oData.results[i].Remarks,
						"Rejected_Qty": oData.results[i].Rejected_Qty,
						"Reserved_Qty": oData.results[i].Reserved_Qty,
						"SA_Remarks": oData.results[i].SA_Remarks,
						"Status": oData.results[i].Status,
						"Technician": oData.results[i].Technician,
						"UOM": oData.results[i].UOM,
						"PART_ASS_TAB": oData.results[i].PART_ASS_TAB.results,
					});
				}
				
				// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignPartCheck", false);
				var oModel = new JSONModel(that.AssignmentPartsArray);
				that.getView().setModel(oModel, "AssignmentPartsModel");
				that.getView().getModel("AssignmentPartsModel").updateBindings(true);
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Part_Assign_HdrSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "PART_ASS_TAB"
				}
			});
		},

		getJCLevelTechnicians: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'JC_LEVEL_TECHNICIAN'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "jcLevelTechniciansModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getTechReassignInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "TechReassignInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Tech_Reassign_ItmSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getTechReassignDropdowns: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.sFilters = [];
			that.sFilters1 = [];
			that.sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'JC_LEVEL_TECHNICIAN'));
			that.sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'REASSIGN_RSN'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "AssignTechModel");
				}
			};
			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "ReassignReasonModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: that.sFilters
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess1,
				error: oError,
				filters: that.sFilters1
			});
		},

		getOdometerInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "OdometerInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Odometer_DetSet(RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getRepeatJobDetails: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "RepeatJobDetailsInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Repeat_Job_DetSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getPCRlogInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "PCRInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/PCR_LogSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getTemporaryGatePassLogInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "TempGatePassLogInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Temp_GP_LogSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},


		onPressRejDefInfo:function(oEvt){
			if (!this.rejDefInfoDialog) {
				this.rejDefInfoDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.RejectedDeferedInfo", this);
				this.getView().addDependent(this.rejDefInfoDialog);
			}
			var jcno = oEvt.getSource().getBindingContext("rejectedJobsModel").getObject().Job_Card_No;
			var jobno = oEvt.getSource().getBindingContext("rejectedJobsModel").getObject().Job_No;
			
			this.getRejDefInfoButtonData(jcno,jobno);
			this.rejDefInfoDialog.open();
		},

		onCancelRejDefInfo:function(){
			this.rejDefInfoDialog.close();
		},

		getAcchamnetinfomoreInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Ro_no", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			sFilters.push(new sap.ui.model.Filter("TabName", sap.ui.model.FilterOperator.EQ, "MoreInfo"));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Attachmentmoreinfo", oData.results);
				// var oModel = new JSONModel(oData.results);
				// that.getView().setModel(oModel, "Attachment");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
		//	that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Att_DetSet", {
		
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_PRINT_SRV");
		oDataModel.read("/AttachSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		openmoreinfoattachments:function(oeve){
		//	var name=oeve.getSource().getBinding("items").getObject().Name;
		var name = oeve.getSource().getBindingContext("oLocalJsonModel").getObject().FileName;
			//var name=RepairOrderNo+""+SelectedInvoiceVal;
		
		//	var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/Att_DetSet(Name='" + name + "',RO_No='"+RepairOrderNo+"')/$value";
			var sRead = "/sap/opu/odata/sap/Z_PRINT_SRV/AttachSet(FileName='" + name + "',Ro_no='"+RepairOrderNo+"')/$value";
		sap.m.URLHelper.redirect(sRead, true);
		},
		
		OnAttachfilemoreinfo:function(evt){
			var oFileUpload=evt.getSource();
			var domRef = oFileUpload.getFocusDomRef();
			 var name = domRef.files[0].name.split(".")[0];
			var file=domRef.files[0];
			var that=this;
			if (file === undefined) {} else {
				//this.fileName = file.name;
				var base64_marker = 'data:' + file.type + ';base64,';
				var reader = new FileReader();
				// var that = this;
				//on Load
				reader.onload = (function (theFile) {

					return function (evt) {
						//locate content
						var base64Index = evt.target.result.indexOf(base64_marker) + base64_marker.length;
						//Get content 
						var base64 = evt.target.result.substring(base64Index);
						var service = "/sap/opu/odata/sap/Z_PRINT_SRV/Attachment_PrintSet";
						var token = that.getOwnerComponent().getModel("Z_PRINT_SRV").getSecurityToken();
						$.ajaxSetup({
							cache: false
						});
						jQuery.ajax({
							type: 'POST',
							url: service,
							async: false,
							//	headers: oHeaders,
							cache: false,
							dataType: "json",
							data: base64,
							beforeSend: function (xhr) {
								xhr.setRequestHeader("X-CSRF-Token", token);
								xhr.setRequestHeader("Content-Type", file.type);
								xhr.setRequestHeader("slug", RepairOrderNo+"-"+selectedIconTab+"-"+name);
							},
							success: function (oData) {
								alert("Success");
								oFileUpload.clear();
								that.getAcchamnetinfomoreInfo();
								// that.getimage();
							},
							error: function (odata) {
								alert("error");
							}
						});
					};
				})(file);
				//Read file
				reader.readAsDataURL(file);
			}
		},
		getPolicyType: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'POLICY_TYPE'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "PolicyTypeModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getInsuranceNameList: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'INSURANCE_NAME'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "InsuranceNamesListModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getInstantFeedbackInfo: function(selTab) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
				var sFilters = [];
				if(selTab == "InstantFeedback"){
					sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
					new sap.ui.model.Filter("ZZTIMING", sap.ui.model.FilterOperator.EQ, "00"));
				}
				else if(selTab == "3rdDayPSF"){
					sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
					new sap.ui.model.Filter("ZZTIMING", sap.ui.model.FilterOperator.EQ, "03"));
				}
				else if(selTab == "10thDayPSF"){
					sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
					new sap.ui.model.Filter("ZZTIMING", sap.ui.model.FilterOperator.EQ, "10"));
				}
			
			oSuccess = function(oData) {
				oBusyDialog.close();
				if(selTab == "InstantFeedback"){
					var controlData = sap.ui.getCore().byId("instantFeedbackId").getItems()[0].getAggregation("content")[1].
					getAggregation("items");
					// oData.results[0].Overall_Feedback ="2";

					for(var i=0;i<controlData.length;i++){
						var a = 1;
						if(oData.results[0].Overall_Feedback == i+a){
							controlData[i].setWidth("3rem");
						}else{
							controlData[i].setWidth("1.8rem");
						}
					}

					var oModel = new JSONModel(oData);
					that.getView().setModel(oModel, "InstantFeedbackInfoModel");
					
				}else if(selTab == "3rdDayPSF"){
					var controlData = sap.ui.getCore().byId("thirdDayId").getItems()[0].getAggregation("content")[1].
					getAggregation("items");
					for(var i=0;i<controlData.length;i++){
						var a = 1;
						if(oData.results[0].Overall_Feedback == i+a){
							controlData[i].setWidth("3rem");
						}else{
							controlData[i].setWidth("1.8rem");
						}
					}
					var oModel = new JSONModel(oData);
					that.getView().setModel(oModel, "ThirdDayFeedbackInfoModel");
				}else if(selTab == "10thDayPSF"){
					var controlData = sap.ui.getCore().byId("tenthDayId").getItems()[0].getAggregation("content")[1].
					getAggregation("items");
					for(var i=0;i<controlData.length;i++){
						var a = 1;
						if(oData.results[0].Overall_Feedback == i+a){
							controlData[i].setWidth("3rem");
						}else{
							controlData[i].setWidth("1.8rem");
						}
					}
					var oModel = new JSONModel(oData);
					that.getView().setModel(oModel, "TenthDayFeedbackInfoModel");
				}
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_Fb_TenthdaySet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		// getInstantFeedbackInfo: function() {
		// 	oBusyDialog.open();
		// 	var that = this,
		// 		oSuccess, oError;
		// 	oSuccess = function(oData) {
		// 		oBusyDialog.close();
		// 		var oModel = new JSONModel(oData);
		// 		that.getView().setModel(oModel, "InstantFeedbackInfoModel");
		// 	};
		// 	oError = function(err) {
		// 		oBusyDialog.close();
		// 		var errmessage = err.responseText;
		// 		errmessage = JSON.parse(errmessage);
		// 		errmessage = errmessage.error.message.value;
		// 		sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
		// 	};
		// 	that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_FeedbackSet(RO_No='" + RepairOrderNo + "')", {
		// 		success: oSuccess,
		// 		error: oError,
		// 		urlParameters: {
		// 			"$expand": "FEEDBACK"
		// 		}
		// 	});
		// },

		getThirdDayFeedbackInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "ThirdDayFeedbackInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_Fb_ThirddaySet(RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getThirdDayFeedbackTableInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "ThirdDayFeedbackTableInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_Fb_ThirdQuSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getTenthDayFeedbackInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "TenthDayFeedbackInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_Fb_TenthdaySet(RO_No='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getTenthDayFeedbackTableInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "TenthdDayFeedbackTableInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Inst_Fb_TenthQuSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getRejDefInfoButtonData: function(jcno,jbno) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Jcnum", sap.ui.model.FilterOperator.EQ, jcno),
			new sap.ui.model.Filter("Jbnum", sap.ui.model.FilterOperator.EQ, jbno));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "RejDefInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/McodeSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onGetTyreColor: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "TyreColorModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Tyre_ColorSet", {
				success: oSuccess,
				error: oError
			});
		},

		onGetTyreMake: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'TYRE_MAKE'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "TyreMakeModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onGetInventoryInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			that.inspInventoryData = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo),
				new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var data = [];
				for (var i = 0; i < oData.results.length; i++) {
					// if (oData.results[i].Parameter_Desc === "AD_BLUE" || oData.results[i].Parameter_Desc === "FUEL") {
					// 	that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AdBlueFuelFlag", false);
					// }
					that.inspInventoryData.push({
						"Flag": oData.results[i].Flag,
						"IN_State": oData.results[i].IN_State,
						"In": oData.results[i].In,
						"Indicator": oData.results[i].Indicator,
						"OUT_State": oData.results[i].OUT_State,
						"Out": oData.results[i].Out,
						"Parameter_Desc": oData.results[i].Parameter_Desc,
						"Parameter_ID": oData.results[i].Parameter_ID,
						"RO_No": oData.results[i].RO_No,
						"VIN": oData.results[i].VIN,
						"Inv_indrp": oData.results[i].Inv_indrp.results,
						"Inv_outdrp": oData.results[i].Inv_outdrp.results,
						"out_status": oData.results[i].out_status,
					});
				}

				for (var k = 0; k < that.inspInventoryData.length; k++) {
					if (that.inspInventoryData[k].Parameter_Desc === "AD_BLUE") {
						that.AdBlueValue = that.inspInventoryData[k].In;
						that.inspInventoryData.splice(k, 1);
					}
				}
				for (var j = 0; j < that.inspInventoryData.length; j++) {
					if (that.inspInventoryData[j].Parameter_Desc === "FUEL") {
						that.FuelValue = that.inspInventoryData[j].In;
						that.inspInventoryData.splice(j, 1);
					}
				}

				var oModel1 = new JSONModel(that.inspInventoryData);
				that.getView().setModel(oModel1, "InventoryInfoModel");

				sap.ui.getCore().byId("fuelStatusIndicator").setValue(that.FuelValue);
				sap.ui.getCore().byId("fuelStatusIndicator1").setValue(parseInt(that.FuelValue));
				sap.ui.getCore().byId("AdBlueId").setValue(that.AdBlueValue);
				sap.ui.getCore().byId("AdBlueId1").setValue(parseInt(that.AdBlueValue));
				sap.ui.getCore().byId("inspFuelValueId").setText(that.FuelValue);
				sap.ui.getCore().byId("inspAdBlueValueId").setText(that.AdBlueValue);
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Invent_hdrSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "Inv_indrp,Inv_outdrp"
				}
			});
		},

		onGetTyreTable: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			that.InventoryTyreData = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo),
				new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();

				for (var y = 0; y < oData.results.length; y++) {
					that.InventoryTyreData.push({
						"VIN": oData.results[y].VIN,
						"RO_No": RepairOrderNo,
						"Parameter_Desc": oData.results[y].Parameter_Desc,
						"Tyre_Axle": oData.results[y].Tyre_Axle,
						"Left_Outer_Depth": oData.results[y].Left_Outer_Depth,
						"Left_Outer_Make": oData.results[y].Left_Outer_Make,
						"Left_Inner_Depth": oData.results[y].Left_Inner_Depth,
						"Left_Inner_Make": oData.results[y].Left_Inner_Make,
						"Right_Inner_Depth": oData.results[y].Right_Inner_Depth,
						"Right_Inner_Make": oData.results[y].Right_Inner_Make,
						"Right_Outer_Depth": oData.results[y].Right_Outer_Depth,
						"Right_Outer_Make": oData.results[y].Right_Outer_Make,
						"Left_Outer_Color": oData.results[y].Left_Outer_Color,
						"Left_Inner_Color": oData.results[y].Left_Inner_Color,
						"Right_Inner_Color": oData.results[y].Right_Inner_Color,
						"Right_Outer_Color": oData.results[y].Right_Outer_Color,
						"Depth_Low_Value": parseFloat(oData.results[y].Depth_Low_Value),
						"Depth_High_Value": parseFloat(oData.results[y].Depth_High_Value),
						"Depth_Range": parseFloat(oData.results[y].Depth_Range),
						"Range_Color": oData.results[y].Range_Color.toLowerCase(),
						"Flag": oData.results[y].Flag,
						"Msg": oData.results[y].Msg
					});
				}
				var oModel = new JSONModel(that.InventoryTyreData);
				that.getView().setModel(oModel, "TyreTableItemModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Tyre_ItmSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},
		stringtodateconversion:function(value){
			if(value === "" || value === undefined || value ==="00000000" ){
				return null;
			}
			var	year = value.substring(0, 4);
			var month = value.substring(4, 6);
			var day = value.substring(6, 8);
			return new Date(year,month-1,day);
		},
		
		getAccidentTATInfo: function() {
			oBusyDialog.open();
			var that = this;
			if(that.getView().getModel("accidentTATInfoModel")){
				that.getView().getModel("accidentTATInfoModel").setData([]);
				that.getView().getModel("accidentTATInfoModel").updateBindings(true);
			}
			var oSuccess = function(oData) {
				oBusyDialog.close();
			var TATObject={};	
			TATObject.Parts_Order_Number=oData.Parts_Order_Number;
			TATObject.Nature_of_accident = oData.Nature_of_accident;
			TATObject.Overall_TAT = oData.Overall_TAT;
			TATObject.Vehicle_ready_TAT_date =oData.Vehicle_ready_TAT_date;
			TATObject.VOR_since_incident = oData.VOR_since_incident;
			TATObject.RO_No = oData.RO_No;
			TATObject.Job_Type = oData.Job_Type;
			TATObject.Type_Of_Accident = oData.Type_Of_Accident;
			TATObject.Current_Status = oData.Current_Status;
			TATObject.Insurance_Company = oData.Insurance_Company;
			TATObject.Date_Of_Accident =oData.Date_Of_Accident;
			TATObject.Comments = oData.Comments;
			TATObject.Spot_Survey_Date = oData.Spot_Survey_Date;
			TATObject.Survey_Date = oData.Survey_Date;
			TATObject.Vehicle_Ready_To_Final_Survey = oData.Vehicle_Ready_To_Final_Survey;
			TATObject.Survey_Date_After_Dismantle =  oData.Survey_Date_After_Dismantle;
			TATObject.Final_Survey_Date = oData.Final_Survey_Date;
			TATObject.Final_Survey_To_Delivery = oData.Final_Survey_To_Delivery;
			TATObject.Doc_Submission_Date = oData.Doc_Submission_Date;
			TATObject.Estimate_Submission_Date = oData.Estimate_Submission_Date;
			TATObject.Ins_Partial_Approval_Date =oData.Ins_Partial_Approval_Date;
			TATObject.Ins_Final_Approval_Date =oData.Ins_Final_Approval_Date;
			TATObject.Approval_To_Work_Completion = oData.Approval_To_Work_Completion;
			TATObject.Customer_Final_Approval_Date =oData.Customer_Final_Approval_Date;
			TATObject.Gate_In_Date_Time =oData.Gate_In_Date_Time;
			TATObject.Work_Start_Date = oData.Work_Start_Date;
			TATObject.Expected_Date_of_Readiness =oData.Expected_Date_of_Readiness;
			TATObject.Dismantling_Start_Date =oData.Dismantling_Start_Date;
			TATObject.Dismantling_End_Date =oData.Dismantling_End_Date;
			TATObject.Vehicle_Ready_Date =oData.Vehicle_Ready_Date;
			TATObject.Parts_Order_No_Date =oData.Parts_Order_No_Date;
			TATObject.Last_Parts_Received_Date =oData.Last_Parts_Received_Date;
			TATObject.Delivery_Date = oData.Delivery_Date;
			TATObject.Ins_Payment_Settlement_Date = oData.Ins_Payment_Settlement_Date;
			TATObject.Advance_Payment_Date1 = oData.Advance_Payment_Date1;
			TATObject.Advance_Payment_Date2 = oData.Advance_Payment_Date2;
			TATObject.Customer_Payment_Date = oData.Customer_Payment_Date;
			TATObject.Advance_Payment_Amt1 = oData.Advance_Payment_Amt1;
			TATObject.Advance_Payment_Amt2 = oData.Advance_Payment_Amt2;
			TATObject.Reason_For_Delay=oData.Reason_For_Delay;
			var oModel = new JSONModel(TATObject);	
			that.getView().setModel(oModel, "accidentTATInfoModel");
			};
			var oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Accidental_TATSet('" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getInitialApprovalInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("ro_num", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "InitialApprovalInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Initial_approvalSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getAdditionalApprovalInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("ro_num", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "AdditionalApprovalInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Additional_approvalSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getCAJobsItemsInfo: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			that.ApprovalogJobsItems = [];
			sFilters.push(new sap.ui.model.Filter("ro_num", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				for (var i = 0; i < oData.results.length; i++) {
					that.ApprovalogJobsItems.push({
						"SA_remark": oData.results[i].SA_remark,
						"aditinl_amt": oData.results[i].aditinl_amt,
						"customr_remark": oData.results[i].customr_remark,
						"dealer_remark": oData.results[i].dealer_remark,
						"flag": oData.results[i].flag,
						"job_detail": oData.results[i].job_detail,
						"job_num": oData.results[i].job_num,
						"job_sourc": oData.results[i].job_sourc,
						"labor_amt": oData.results[i].labor_amt,
						"part_amt": oData.results[i].part_amt,
						"ro_num": oData.results[i].ro_num,
						"status_des": oData.results[i].status_des,
						"status_tog": oData.results[i].status_tog,
						"main":oData.results[i].main,
						"HeaderToItem": oData.results[i].HeaderToItem.results
					});
				}
				var oModel = new JSONModel(that.ApprovalogJobsItems);
				that.getView().setModel(oModel, "CAJobsItemsInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Item_Det_HdrSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "HeaderToItem"
				}
			});
		},

		// onpressexpcoll: function(evt) {
		// 	this.flagcount = this.flagcount + 1;
		// 	var oTree = sap.ui.getCore().byId("approvalLogTreeTableID").collapseAll();
		// 	// if (this.flagcount % 2 === 0) {
		// 	// 	oTree.collapseAll();
		// 	// 	sap.ui.getCore().byId("iconexpaQI").setSrc("sap-icon://expand");
		// 	// } else {
		// 	// 	oTree.expandToLevel(1);
		// 	// 	sap.ui.getCore().byId("iconexpaQI").setSrc("sap-icon://collapse");
		// 	// }
		// },

		getRoadTestDropdowns: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.sFilters = [];
			that.sFilters1 = [];

			that.sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'PURPOSE'));
			that.sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'FOREMAN'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "PurposeModel");
			};
			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "ForemanModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").read("/DropdownSet", {
				success: oSuccess,
				error: oError,
				filters: that.sFilters
			});
			that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").read("/DropdownSet", {
				success: oSuccess1,
				error: oError,
				filters: that.sFilters1
			});
		},

		getRoadTestTableData: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			var sFilters = [];
			// if(that.getView().getModel("RoadTestInfoModel")){
			// 	that.getView().getModel("RoadTestInfoModel").setData([]);
			// 	that.getView().getModel("RoadTestInfoModel").updateBindings(true);
			// }

			sFilters.push(new sap.ui.model.Filter("Zinput", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				for (var i = 0; i < oData.results.length; i++) {
					// var total=oData.results[i].GateInKms-oData.results[i].GateOutKms;
					// if(total < 0)
					// {
					// 	total =0;
					// }
					that.roadTestTableData.push({
						"GateInDtTm": oData.results[i].GateInDtTm,
						"GateOutTm": oData.results[i].GateOutTm,
						"GateOutKms": oData.results[i].GateOutKms,
						"Type": oData.results[i].Type,
						"Zinput": oData.results[i].Zinput,
						"Purpose": oData.results[i].Purpose,
						"VinNo": oData.results[i].VinNo,
						"RegNo": oData.results[i].RegNo,
						"Model": oData.results[i].Model,
						"GateInKms": oData.results[i].GateInKms,
						"TotalKms": oData.results[i].TotalKms,
						// "TotalKms": total,
						"Duration": oData.results[i].Duration,
						"Instruction": oData.results[i].Instruction,
						"Observations": oData.results[i].Observations,
						"DriverForeman": oData.results[i].DriverForeman,
						"VehStatus": oData.results[i].VehStatus
					});
				}
				var oModel = new JSONModel(that.roadTestTableData);
				that.getView().setModel(oModel, "RoadTestInfoModel");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").read("/RT_JobSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "RT_TAB"
				}
			});
		},
		
		_ReadRoadtest:function(){
			var that=this;
			oBusyDialog.open();
			if(that.getView().getModel("RoadTestInfoModel")){
				that.getView().getModel("RoadTestInfoModel").setData([]);
				that.getView().getModel("RoadTestInfoModel").updateBindings(true);
			}

				var oSuccessRT = function(oData) {
					oBusyDialog.close();
					var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "RoadTestInfoModel");
					// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestInfoModel", oData.results);
				};
				var oErrorRT = function(err) {
					oBusyDialog.close();
	
					sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
				};
					var sFilters = [];
				sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
				that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").read("/Road_TestSet", {
						filters: sFilters,
					success: oSuccessRT,
					error: oErrorRT
				});	
		},
		handleSelectionForemanDPJC:function(oeve){
			
				this.FMNameJC=oeve.getParameters().value;
			},
		getRoadTestPopUpInfo: function() {
			oBusyDialog.open();
			var that = this;
			if(that.getView().getModel("RoadTestPopUpInfoModel")){
				that.getView().getModel("RoadTestPopUpInfoModel").setData([]);
				that.getView().getModel("RoadTestPopUpInfoModel").updateBindings(true);
			}

			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "RoadTestPopUpInfoModel");
			};
			var oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").read("/RT_PopupSet(Input='" + RepairOrderNo + "')", {
				success: oSuccess,
				error: oError
			});
		},

		getUpcomingDelivery: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.sFilters = [];
			that.sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.results[0].Flag !== "F") {
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "UpcomingDeliveryModel");
				// }
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Upcoming_DelvSet", {
				success: oSuccess,
				error: oError,
				filters: that.sFilters
			});
		},

		getDICVApproval: function() {
			oBusyDialog.open();
			var that = this;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_no", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "DICVApprovalModel");
			};
			var oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DICV_ApprovalSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getAssignedVehicleFilteredList: function(Val) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, Val));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "asignedVehiclesListModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Ass_Veh_ListSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getAssignedVehicleFilteredColorList: function(Val) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, Val));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "TableIconColorModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Color_CodeSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onGetPackagesIDs: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "PackagesListModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ ", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getEstimationInfo: function(Val) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			if(that.getView().getModel("EstimationTableInfoModel")){
				that.getView().getModel("EstimationTableInfoModel").setData([]);
				that.getView().getModel("EstimationTableInfoModel").updateBindings(true);
			}

			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "EstimationTableInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/EstimationDtlsSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getCheckInInvoiceInfo: function(Val) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			if(that.getView().getModel("CheckInInvoiceInfoModel")){
				that.getView().getModel("CheckInInvoiceInfoModel").setData([]);
				that.getView().getModel("CheckInInvoiceInfoModel").updateBindings(true);
			}

			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "CheckInInvoiceInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Checkin_InvoiceSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getCheckListVehicleSubParamsInfo: function(tabBtn, SegBtn,RepairOrderNo) {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Package_id", sap.ui.model.FilterOperator.EQ, tabBtn),
				new sap.ui.model.Filter("Group_name", sap.ui.model.FilterOperator.EQ, SegBtn),
				new sap.ui.model.Filter("Ro_no", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "CheckListVehicleParamsInfo");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Vehicle_det_chlSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "ParamDet"
				}
			});
		},
		formatLineItems: function(lineItemsString) {
			// Split the comma-separated string into an array
			var lineItemsArray = lineItemsString.split(',');
			var x=[];
			// Create an array of items suitable for the ComboBox
			var comboBoxItems = lineItemsArray.map(function(item) {
				return { text: item };
			});
		
			return comboBoxItems;
		},
		formatSegmentedbtns: function(from,to) {
			// Split the comma-separated string into an array
			var fromval=Number(from);
			var toval=Number(to);
		var	inc=0;
		if(fromval === Math.round(fromval)){
			inc=1;
		}else{
			var split = from.toString().split(".");
			var abc = 1;
			for(var i=0;i<split[1].length;i++){
				abc = abc + "0";
			   inc = 1/abc;
			}
		}
		var array=[];
	
		for(var i=fromval;i<=toval;i=parseFloat(i)+parseFloat(inc)){
		array.push({"text":i})	;
		}
		
			return array;
		},
		getCheckListTabInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckListTabInfo",[]);
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ,RepairOrderNo ));
			sFilters.push(new sap.ui.model.Filter("Order_reason", sap.ui.model.FilterOperator.EQ,SubSrvTypeCode ));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// var oModel = new JSONModel(oData.results);
				// that.getView().setModel(oModel, "CheckListTabInfo");
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckListTabInfo",[]);
				if(oData.results[0].Flag === ""){
				that.CheckPcakageid=oData.results[0].Package_id;
				for(var k=0;k<oData.results.length;k++){
				for (var i=0;i<oData.results[k].ParamDet.results.length;i++){
					if(oData.results[k].ParamDet.results[i].Type_pf ==="D"){
					var formatteddpdata=that.formatLineItems(oData.results[k].ParamDet.results[i].List_value);
					oData.results[k].ParamDet.results[i].ListAray=formatteddpdata;
					}else if(oData.results[k].ParamDet.results[i].Type_pf ==="R"){
						var formatteddpdata=that.formatSegmentedbtns(oData.results[k].ParamDet.results[i].From_value,oData.results[k].ParamDet.results[i].To_value);
					oData.results[k].ParamDet.results[i].ListAray=formatteddpdata;
					}
				}
				}
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckListVehicleParamsInfo", oData.results[0].ParamDet.results);
				// that.getView().setModel(oModel, "CheckListVehicleParamsInfo");
				// that.getCheckListVehicleSubParamsInfo(oData.results[0].Package_id,oData.results[0].Group_name,RepairOrderNo);
				sap.ui.getCore().byId("CheckListTabSegParamsButtonId").setSelectedKey(oData.results[0].Param)
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckListTabInfo", oData.results);
				}else{
					MessageBox.information(oData.results[0].Msg);
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			//  that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Vehicle_Param_DetSet", {
			// 	success: oSuccess,
			// 	error: oError,
			// 	filters: sFilters
			// });
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Vehicle_det_chlSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "ParamDet"
				}
			});
},
		onCheckListParamsSegButtons: function(oEvt) {
			var that=this;
			CheckListTabSegParamsButton = oEvt.getSource().getSelectedKey();
				var data=	that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListTabInfo");
			CheckListTabSegParamspath=data.findIndex(item => item.Param === CheckListTabSegParamsButton);
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckListVehicleParamsInfo",data[CheckListTabSegParamspath].ParamDet.results);
		},
		Checklistcheckboxchange:function(oEvt){
					if(oEvt.getParameters().getSelected === true){
					var selected="X";
				}else{
						var selected="";
				}
				oEvt.getSource().getBindingContext("oLocalJsonModel").getObject().Param_value=selected;
		},
		Checklistswitchtoggle:function(oEvt){
				if(oEvt.getParameters().state === true){
					var selected="X";
				}else{
						var selected="";
				}
				oEvt.getSource().getBindingContext("oLocalJsonModel").getObject().Param_value=selected;
		},
		/*onCheckListTabSegButtons: function(oEvt) {
			// var path=oEvt.getParameter("item").getBindingContext("oLocalJsonModel").sPath.split("/")[2]
			// CheckListTabSegButton = oEvt.getSource().getSelectedKey();
			// 	that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListVehicleParamsInfo")[path].Para
			
		},*/
		onCloseCustVoice: function() {
			this.oCustVoicePopover.close();
		},

		onPressEstimate: function() {
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/EstimationPdfSet(RO_No='" + RepairOrderNo + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},

		onPressJobCard: function() {
			var sRead = cc
			sap.m.URLHelper.redirect(sRead, true);
		},

		onPressGatePass: function() {
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/GatePassPdfSet(RO_No='" + RepairOrderNo + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},

		onPressTempGatePassPDF: function() {
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/TempPassPdfSet(RO_No='" + RepairOrderNo + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},

		onPressProforma: function() {
			// var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/ProFormaPdfSet(RO_No='" + RepairOrderNo + "')/$value";
			// sap.m.URLHelper.redirect(sRead, true);
			oBusyDialog.open();
			var that = this;
				// 
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MainTechnicianSetmodel", oData.results);
				if(oData.results[0].Message ==="T"){
					MessageBox.success(oData.results[0].Flag);
				}else if(oData.results[0].Message ==="F"){
					// MessageBox.error(oData.results[0].Flag);
					var aMessageStrips = [];
					oData.results.forEach(function (message) {
					var oMessageStrip = new sap.m.MessageStrip({
						type: sap.ui.core.MessageType.Error,
						text: message.Flag,
						showIcon: true
					});
					aMessageStrips.push(oMessageStrip);
				});
				var oDialog = new sap.m.Dialog({
					title: "Errors",
					content: aMessageStrips,
					beginButton: new sap.m.Button({
						text: "Close",
						press: function () {
							oDialog.close();
						}
					})
				});
					oBusyDialog.open();
				}
				
				// that._oValueHelpDialog.setModel(oModel, "createJobCardModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				// errmessage = error.responseText;
				// errmessage = JSON.parse(errmessage);
				// errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(error.message, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Proforma_buttonSet", {
				filters: sFilters,
				success: oSuccess,
				error: oError
			});
		},
		oninvoiceprintprofroma:function(){
			var name=RepairOrderNo+""+SelectedInvoiceVal+""+SelectedBillto;
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/printProformaSet(FileName='" + name + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},
		oninvoiceprintinvoice:function(){
			var name=SelectedInvoiceVal+""+RepairOrderNo+""+SelectedBillto;
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/printInvoiceSet(FileName='" + name + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},
		oninvoiceprintcreditnote:function(){
			var name=SelectedInvoiceVal+""+RepairOrderNo+""+SelectedBillto;
			var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/printCreditNoteSet(FileName='" + name + "')/$value";
			sap.m.URLHelper.redirect(sRead, true);
		},

		onPressTempPass: function() {
			if (!this._oTempPassDialog) {
				this._oTempPassDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.TempPass", this);
				this.getView().addDependent(this._oTempPassDialog);
			}
			this.getTempPass();
			this._oTempPassDialog.open();
		},

		onCancelTempPass: function() {
			this._oTempPassDialog.close();
		},

		getTempPass: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var obj = {};
				obj.Contact = oData.results[0].Contact;
				obj.Name = oData.results[0].Name;
				obj.RO_No = oData.results[0].RO_No;
				obj.Reason = oData.results[0].Reason;
				obj.Role = oData.results[0].Role;
				obj.Type = oData.results[0].Type;

				var oModel = new JSONModel(obj);
				that.getView().setModel(oModel, "TempPassInfoModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/TempPassSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onSaveTempPass: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			that.TempPassData = that.getView().getModel("TempPassInfoModel").getData();

			var ObjectData = {};
			ObjectData.RO_No = RepairOrderNo;
			ObjectData.Reason = this.TempPassData.Reason;
			ObjectData.Type = this.TempPassData.Type;
			ObjectData.Name = this.TempPassData.Name;
			ObjectData.Contact = this.TempPassData.Contact;
			ObjectData.Role = this.TempPassData.Role;

			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/TempPassSet", ObjectData, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					MessageBox.success("Data Saved Successfully", {
						title: "success",
						styleClass: "messageBox",
						icon: MessageBox.Icon.SUCCESS,
						actions: [MessageBox.Action.OK],
						onClose: function(oAction) {
							if (oAction === "OK") {
								that._oTempPassDialog.close();
								that.ongetCheckInInfo();
							}
						}
					});
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onPressPointofContact: function() {
			var that = this;
			if (!this._oPointofContactDialog) {
				this._oPointofContactDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.PointofContact", this);
				this.getView().addDependent(this._oPointofContactDialog);
			}
			var data = that.getView().getModel("checkInInfoModel").getData();
			if (data) {
				var obj = {};
				obj.Contact_No = data.Contact_No;
				obj.Person_Name = data.Person_Name;
				obj.Role = data.Contact_Person_Role;
			} else {
				var obj = {};
				obj.Contact_No = "";
				obj.Person_Name = "";
				obj.Role = "";
			}

			var oModel = new JSONModel(obj);
			that.getView().setModel(oModel, "PointofContactModel");
			this._oPointofContactDialog.open();
		},

		onSavePointofContact: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var pocData = that.getView().getModel("PointofContactModel").getData();

			var ObjectData = {};
			ObjectData.RO_No = RepairOrderNo;
			ObjectData.Name = pocData.Person_Name;
			ObjectData.ContactNo = pocData.Contact_No;
			ObjectData.Role = pocData.Role;
			ObjectData.TGP_No = "";
			ObjectData.TGRsn = "";
			ObjectData.TGPDatTm = "";
			ObjectData.InsBillTo = "";
			ObjectData.PolicyDeduct = "";
			ObjectData.PolicyAmt = "";

			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/ContactDtlsSet", ObjectData, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					MessageBox.success("Data Saved Successfully", {
						title: "success",
						styleClass: "messageBox",
						icon: MessageBox.Icon.SUCCESS,
						actions: [MessageBox.Action.OK],
						onClose: function(oAction) {
							if (oAction === "OK") {
								that._oPointofContactDialog.close();
							}
						}
					});
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onCancelPointofContact: function() {
			this._oPointofContactDialog.close();
		},

		onPressCheckInApproval: function() {
			var that = this,
				errmessage;
			var ObjectData = {};
			ObjectData.RO_No = RepairOrderNo;
			ObjectData.Msg = "";
			ObjectData.Flag = "";
			oBusyDialog.open();
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/ApprovalSet", ObjectData, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					MessageBox.success("Data Saved Successfully");
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(err.message, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		_ReadDPCheckinreject:function(){
			oBusyDialog.open();
			var that=this;
			var oSuccess, oError, aJobFilter = [];
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "REJECT"));
				// new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:"",Prom_rsn:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Checkinrejectmodel", oData.results);
				// var oJobJSONModel = new JSONModel(oData.results);
				// this.getView().setModel(oJobJSONModel, "JobDetailStatus");
				that._oRejectcheckindialog.open();
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},
		onPressCheckInReject:function(){
			if (!this._oRejectcheckindialog) {
				this._oRejectcheckindialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Rejectcheckin", this);
				this.getView().addDependent(this._oRejectcheckindialog);
			}
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Checkinrejectdata","");
			
			this._ReadDPCheckinreject();

		},
		oncheckinRejctcancel:function(){
			this._oRejectcheckindialog.close();
		},
		oncheckinRejctcancelconfirm:function(){
			this._postRejectcheckinevent();
			
		},
		_postRejectcheckinevent:function(){
			var that = this,
				errmessage;
			var ObjectData = {};
			ObjectData.RO_No = RepairOrderNo;
			ObjectData.Value = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Checkinrejectdata");
			
			oBusyDialog.open();
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Drop_DownSet", ObjectData, {
				async: true,
				success: function(oData) {
					oBusyDialog.close();
					// if(oData.Flag ===)
					that._oRejectcheckindialog.close();
					MessageBox.success(oData.Msg);
					
				},
				error: function(err) {
					oBusyDialog.close();
					
					sap.m.MessageBox.show(err.message, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressCreateInvoice: function() {
			if (!this._oCreateInvoicedialog) {
				this._oCreateInvoicedialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.CreateInvoice", this);
				this.getView().addDependent(this._oCreateInvoicedialog);
			}
			var obj = {
				"TwentyFourDelayReason": false,
				"PromisedDelayReason": false
			};
			var oModel = new JSONModel(obj);
			this.getView().setModel(oModel, "ReasonVisibleModel");
			oBusyDialog.open();
			this.getInvoice24ReasonDropdown();
			this.getPromisedDelayReasonDropdown();
			// this._oCreateInvoicedialog.open();
		},

		getInvoice24ReasonDropdown: function() {
			// oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'CREATE_BILLING'),
				new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				// visible24DelayReason = oData.results[0].Flag;
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "24hrsDelayReasonModel");

				if (oData.results[0].Flag === "F") {
					that.getView().getModel("ReasonVisibleModel").setProperty("/TwentyFourDelayReason", false);
					// that.getView().getModel("ReasonVisibleModel").getData().TwentyFourDelayReason = false;
					that.getView().getModel("ReasonVisibleModel").updateBindings(true);
				}else if (oData.results[0].Flag === "T") {
					that.getView().getModel("ReasonVisibleModel").setProperty("/TwentyFourDelayReason", true);
					that.getView().getModel("ReasonVisibleModel").updateBindings(true);
				}

			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getPromisedDelayReasonDropdown: function() {
			// oBusyDialog.open();
			var that = this,
				errmessage;
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/selectedPromisedDelayReason", "");
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/selectedTwentyFourDelayReason", "");
				var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'PROM_REASON'),
				new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "PromisedDelayReasonModel");
				// visiblePromisedDelayReason = oData.results[0].Flag;
				if (oData.results[0].Flag === "F") {
					
					that.getView().getModel("ReasonVisibleModel").setProperty("/PromisedDelayReason", false);
				}
				else if (oData.results[0].Flag === "T") {
					that.getView().getModel("ReasonVisibleModel").setProperty("/PromisedDelayReason", true);
				}

				var test = that.getView().getModel("ReasonVisibleModel").getData().TwentyFourDelayReason;
				var test1 = that.getView().getModel("ReasonVisibleModel").getData().PromisedDelayReason;
				if (test !== false || test1 !== false) {
					that._oCreateInvoicedialog.open();
				} else {
					// MessageBox.error(oData.results[0].Msg);
					oBusyDialog.close();
					
					that.onSaveCreateInvoice();
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		onCancelCreateInvoice: function() {
			this._oCreateInvoicedialog.close();
		},

		onSaveCreateInvoice: function() {
			var that = this,
				errmessage;
			var ObjectData = {};
			ObjectData.RO_No = RepairOrderNo;
			ObjectData.Reason_1 = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/selectedTwentyFourDelayReason");
			ObjectData.Reason_2 = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/selectedPromisedDelayReason");
			oBusyDialog.open();
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Create_billingSet", ObjectData, {
				async: true,
				success: function(oData) {
					oBusyDialog.close();
					// if(oData.Flag ===)
					that._oCreateInvoicedialog.close();
					if(oData.Flag === "F"){
						MessageBox.error(oData.Msg);
					}else if(oData.Flag === "T"){
						MessageBox.success(oData.Msg);
					}
					
					// // MessageBox.success("Data Saved Successfully");
					// MessageBox.success("Data Saved Successfully", {
					// 	title: "success",
					// 	styleClass: "messageBox",
					// 	icon: MessageBox.Icon.SUCCESS,
					// 	actions: [MessageBox.Action.OK],
					// 	onClose: function(oAction) {
					// 		if (oAction === "OK") {
					// 			that._oCreateInvoicedialog.close();
					// 		}
					// 	}
					// });
				},
				error: function(err) {
					oBusyDialog.close();
					// errmessage = error.responseText;
					// errmessage = JSON.parse(errmessage);
					// errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(err.message, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		// getPackageItems: function() {
		// 	oBusyDialog.open();
		// 	var that = this,
		// 		errmessage;
		// 	var sFilters = [];
		// 	sFilters.push(new sap.ui.model.Filter("Package_ID", sap.ui.model.FilterOperator.EQ, 'PMS_100K'));
		// 	var oSuccess = function(oData) {
		// 		oBusyDialog.close();
		// 		var oModel = new JSONModel(oData.results);
		// 		that.getView().setModel(oModel, "PackagesItemsModel");
		// 	};
		// 	var oError = function(error) {
		// 		oBusyDialog.close();
		// 		errmessage = error.responseText;
		// 		errmessage = JSON.parse(errmessage);
		// 		errmessage = errmessage.error.message.value;
		// 		sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
		// 	};
		// 	that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Package_ItemSet", {
		// 		success: oSuccess,
		// 		error: oError,
		// 		filters: sFilters
		// 	});
		// },

		getJobDetailsDropdowns: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [],
				sFilters1 = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'NOT_ATTENDING_RSNS'));
			sFilters1.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'REPEAT_REASON'));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "MotAttendingReasonsModel");
			};
			var oSuccess1 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "RepeatReasonsModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess1,
				error: oError,
				filters: sFilters1
			});
		},

		onPackage: function(oEvent) {
			var that = this,
				oSuccess, oError;
			var val = oEvent.getSource().getValue();
			var sFilters = [];
			that.GetPackages = [];
			sFilters.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oJSONModel = new JSONModel(oData.results);
				that.getView().setModel(oJSONModel, "PackageModel");
				sap.ui.getCore().byId("idList").setVisible(true);
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/PackageShSet", {
				filters: sFilters,
				success: oSuccess,
				error: oError
			});
		},


		onPressJobDetailsDelete: function(oEvt) {
			var that = this;
			var Obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Description;
			var path = oEvt.getSource().getBindingContext("jobDetailsModel").getPath().split("/")[1];

			for (var i = 0; i < that.jobDetailsData.length; i++) {
				if (that.jobDetailsData[i].Description === Obj) {
					that.jobDetailsData.splice(path, 1);
				}
			}
			var oJSONModel = new JSONModel(that.jobDetailsData);
			that.getView().setModel(oJSONModel, "jobDetailsModel");
		},

		onPressJobItemsDelete: function(oEvt) {
			var that = this;
			var Code = oEvt.getSource().getBindingContext("jobItemDetailsModel").getObject().Code;
			var path = oEvt.getSource().getBindingContext("jobItemDetailsModel").getPath().split("/")[2];
			var Data = that.getView().getModel("jobItemDetailsModel").getData().Data;

			// for (var i = 0; i < Data.length; i++) {
			// if (Data[i].Code === Obj) {
			Data.splice(path, 1);
			// }
			// }
			that.getView().getModel("jobItemDetailsModel").updateBindings(true);
		},

		selectedPackages: [],
		onLoadSelectedPakages: function() {
			var aPackItmFilter = [],
				that = this,
				oSuccess, oError;
			sap.ui.getCore().byId("CustVoiceId").setShowValueHelp(false);
			aPackItmFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, aSelectedItmFilters));
			for (var e = 0; e < that.jobDetailsData.length; e++) {
				if (that.jobDetailsData[e].Job === undefined) {
					that.jobDetailsData[e].Job = "00000" + (e + 1);
				}
			}
			oSuccess = function(odata) {
				oBusyDialog.close();
				that.selectedPackages = that.jobDetailsData;
				that.selectedPackages.editable = "false";
				var oJSONModel = new JSONModel(that.jobDetailsData);
				that.getView().setModel(oJSONModel, "jobDetailsModel");
				that.getPackageItems();// To get selected package Items
				this.getView().getModel("PackageModel").setData(null);
				sap.ui.getCore().byId("idList").setVisible(false);
				sap.ui.getCore().byId("packageListId").setValue("");
			}.bind(this);
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/PackageItmSet", {
				filters: aPackItmFilter,
				success: oSuccess,
				error: oError
			});
		},

		getPackageItems:function(oEvent){
		oBusyDialog.open();
			var that = this,oSuccess,oError;
			for(var i=0;i<this.jobDetailsData.length;i++){
				if(this.jobDetailsData[i].Db_Flg !== 'X' && (this.jobDetailsData[i].Job_Type === "PCK" || that.jobDetailsData[i].Job_Type === "07")){
				var opckJbItem = this.jobDetailsData[i];
				var sFilter = [];
				if (this.jobDetailsData[i].Guid) {
					sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
					sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, this.jobDetailsData[i].Job));
					sFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, this.jobDetailsData[i].Guid));
				} else {
					sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
					sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, this.jobDetailsData[i].Job));
				}
				oSuccess = function(oData) {
				for(var k=0;k<oData.results.length;k++){
					var obj={};
					obj.Bill_To= oData.results[k].Bill_To;
					obj.Job = opckJbItem.Job;
					obj.Package = opckJbItem.Package;
					obj.Job_Type = opckJbItem.Job_Type;
					aPackageItems.push(obj);
				}
				
				if(i === that.jobDetailsData.length){
					oBusyDialog.close();
				}
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
	
				that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ItemDtlsSet", {
					filters: sFilter,
					success: oSuccess,
					error: oError,
					urlParameters: {
						"$expand": "JobItmDtls"
					}
				});
			}
			}
		},

		onGetPackageHistory: function(oEvent) {
			var that = this,
				oSuccess, oError,
				sQuery;
			sQuery = oEvent.getSource().getValue();
			var sFilter = [];
			sFilter.push(new sap.ui.model.Filter('VIN', sap.ui.model.FilterOperator.EQ, sQuery),
				new sap.ui.model.Filter('Package_Name', sap.ui.model.FilterOperator.EQ, 'Unassigned Items'));
			oSuccess = function(odata) {
				oBusyDialog.close();
				if (odata.results[0].Flag !== 'F') {
					var oJSONModel = new JSONModel(odata.results);
					that.getView().setModel(oJSONModel, "PackageHistoryModel");
					that.getView().byId("IdPackHistory").setVisible(true);
				} else {
					MessageBox.show("No Data Found");
				}
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Package_HistorySet", {
				filters: sFilter,
				success: oSuccess,
				error: oError
			});
		},

		onCheckSelect: function(oEvent) {
			var oSelectedItem, oContextName, oSelected;
			oSelectedItem = oEvent.getParameter("listItem");
			oContextName = oSelectedItem.getTitle();
			oSelected = oEvent.getParameters().selected;
			var oPackageModel = this.getView().getModel("PackageModel").getData();
			var dbJBStatus = this.getView().getModel("oLocalJsonModel").getProperty("/DBStatusFlag");
			for (var i = 0; i < oPackageModel.length; i++) {
				if (oSelected) {
					if (oPackageModel[i].Package === oContextName) {
						if (aPackageObj.length === 0) {
							aPackageObj.push(oPackageModel[i]);
							aPackageObj[0].Status = dbJBStatus;
							this.jobDetailsData.push(aPackageObj[0]);
							aSelectedItmFilters.push(oPackageModel[i].Guid);
						} else {
							var oObjResult = this.searchFunction(oContextName, aPackageObj);
							if (oObjResult === false) {
								aPackageObj.push(oPackageModel[i]);
							//	aPackageObj[i].Status = dbJBStatus;
						      oPackageModel[i].Status = dbJBStatus;
							  this.jobDetailsData.push(oPackageModel[i]);
								//this.jobDetailsData.push(aPackageObj[i]);
								aSelectedItmFilters.push(oPackageModel[i].Guid);
							}
						}
					}
				} else {
					if (oPackageModel[i].Package === oContextName) {
						for (var v = 0; v < aPackageObj.length; v++) {
							if (aPackageObj[v].Package === oContextName) {
								aSelectedItmFilters.splice(v, 1);
								aPackageObj.splice(v, 1);
							}
						}
						for (var i = 0; i < this.jobDetailsData.length; i++) {
							if (this.jobDetailsData[i].Package === oContextName) {
								this.jobDetailsData.splice(i, 1);
							}
						}
					}
				}
			}
		},

		searchFunction: function(nameKey, myArray) {
			for (var i = 0; i < myArray.length; i++) {
				if (myArray[i].Package === nameKey) {
					return true;
				} else {
					return false;
				}
			}
		},

		getDeputationInfo: function() {
			oBusyDialog.open();
			var that = this,
				errmessage, sFilters = [];
				if(that.getView().getModel("DeputationInfoModel")){
                    that.getView().getModel("DeputationInfoModel").setData([]);
                    that.getView().getModel("DeputationInfoModel").updateBindings(true);
                }

			that.DeputationData = [];
			sFilters.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.results[0].Flag !== "F") {
					for (var i = 0; i < oData.results.length; i++) {
						if (oData.results[i].updated !== 'Yes') {
							oData.results[i].Trip_No = i + 1;
							// oData.results[i].updated = 'Yes';
							// oData.results[i].edit = "";
							that.DeputationData.push({
								"Bill_To": oData.results[i].Bill_To,
								"Concern": oData.results[i].Concern,
								"Deputation_Type": oData.results[i].Deputation_Type,
								"Duration": oData.results[i].Duration,
								"End_Date": oData.results[i].End_Date,
								"End_Km": oData.results[i].End_Km,
								"FRM_Desc": oData.results[i].FRM_Code,
								"FRM_Code": oData.results[i].FRM_Code,
								"Flag": oData.results[i].Flag,
								"Hilly_Terrain_Kms": oData.results[i].Hilly_Terrain_Kms,
								"Kms": oData.results[i].Kms,
								"Msg": oData.results[i].Msg,
								"Odometer": oData.results[i].Odometer,
								"Plain_Amount": oData.results[i].Plain_Amount,
								"Plain_Terrain_Kms": oData.results[i].Plain_Terrain_Kms,
								"RO_No": oData.results[i].RO_No,
								"Re_Date": oData.results[i].Re_Date,
								"Reach_Km": oData.results[i].Reach_Km,
								"Rec_Date": oData.results[i].Rec_Date,
								"Recovery_Km": oData.results[i].Recovery_Km,
								"Reg_No": oData.results[i].Reg_No,
								"Remarks": oData.results[i].Remarks,
								"Route": oData.results[i].Route,
								"Route_from": oData.results[i].Route_from,
								"Route_to": oData.results[i].Route_to,
								"St_Date": oData.results[i].St_Date,
								"Start_Km": oData.results[i].Start_Km,
								"Status": oData.results[i].Status,
								"Technician_Name_Code": oData.results[i].Technician_Name,
								"Technician_Name": oData.results[i].Technician_Name,
								"Terrain_Amount": oData.results[i].Terrain_Amount,
								"Total_Amount": oData.results[i].Total_Amount,
								"Total_Kms": oData.results[i].Total_Kms,
								"Trip_No": oData.results[i].Trip_No,
								"Vehicle_Type": oData.results[i].Vehicle_Type,
								"Db_flg": oData.results[i].Db_flg,
								"Job": oData.results[i].Job,
								"edit": "",
								"Deputation_Nav": oData.results[i].Deputation_Nav
							});
						}
					}
					var oModel = new JSONModel(that.DeputationData);
					that.getView().setModel(oModel, "DeputationInfoModel");
				} else {
					var oModel = new JSONModel(null);
					that.getView().setModel(oModel, "DeputationInfoModel");
				}
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DeputationSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters,
				urlParameters: {
					"$expand": "Deputation_Nav"
				}
			});
		},

		onCustomerVoice: function(oEvt) {

			this.oCVInpButton = oEvt.getSource();
			sInpVal = oEvt.getParameters().value;
			this.onInputCustomerVoiceSearch();

			// if (oEvt.getParameters().value.length > 3) {
			// custVoiceVal = oEvt.getParameters().value;
			// this.onGetCustomerVoice(oEvt.getParameters().value);
			// path = oEvt.getSource().getBindingContext("jobDetailsModel").getPath().split("/")[1];
			// selectedJobj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
			// } else {
			// 	// sap.m.MessageToast("Please enter atlest 3 characters");
			// }
		},

		// onGetCustomerVoice: function(Val) {
		// 	oBusyDialog.open();
		// 	var that = this,
		// 		errmessage;
		// 	var sFilters = [];
		// 	sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, Val));
		// 	var oSuccess = function(oData) {
		// 		oBusyDialog.close();
		// 		var oModel = new JSONModel(oData.results);
		// 		that.getView().setModel(oModel, "CustomerVoiceModel");
		// 		if (!that._oCustomerVoiceDialog) {
		// 			that._oCustomerVoiceDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.CustomerVoice", that);
		// 			that.getView().addDependent(that._oCustomerVoiceDialog);
		// 		}
		// 		that._oCustomerVoiceDialog.open();
		// 		AllCustomerVoice = [];
		// 	};
		// 	var oError = function(error) {
		// 		oBusyDialog.close();
		// 		errmessage = error.responseText;
		// 		errmessage = JSON.parse(errmessage);
		// 		errmessage = errmessage.error.message.value;
		// 		sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
		// 	};
		// 	that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Cust_Voice_SHSet", {
		// 		success: oSuccess,
		// 		error: oError,
		// 		filters: sFilters
		// 	});
		// },

		onInputCustomerVoiceSearch: function() {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, aSeachItem = [];
			aSeachItem.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, sInpVal));
			oSuccess = function(oData) {
				oBusyDialog.close();
				if (!this.oCustVoicePopover) {
					this.oCustVoicePopover = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.CustomerVoice", this);
					this.getView().addDependent(this.oCustVoicePopover);
				}
				// this.oCustVoicePopover.openBy(this.oCVInpButton);
				this.oCustVoicePopover.open();
				var oTemplate = sap.ui.getCore().byId("listItem");
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "CustomerVoiceModel");
				// this.getView().setModel(oJSONModel, "CustomerVoiceModel");
				// this.getView().getModel("CustomerVoiceModel").setData(odata.results);
				// sap.ui.getCore().byId("idCustVoiceDetailTable").bindItems("CustomerVoiceModel>/", oTemplate);
			}.bind(this);
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");

			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Cust_Voice_SHSet", {
				filters: aSeachItem,
				success: oSuccess,
				error: oError
			});
		},

		test: function(obj) {
			var that = this;
			var newObject = {
				"Action_Taken_Obs": "",
				"Approval": "",
				"Concern_Code": "",
				"Concern_Desc": "",
				"Customer_Voice": "",
				"Fault_Cat": "",
				"Flag": "",
				"Job_Source": "",
				"Msg": "",
				"Not_Attending_Rsn": "",
				"Package": obj.Aggregate,
				"QI_Rework": "",
				"RO_No": "",
				"Remarks": "",
				"Repeat": "",
				"Repeat_Rsn": "",
				"Status_Code": "",
				"Status_Desc": "",
				"Stock": false,
				"editable": "true",
				"Description": obj.Concern_Desc
			};
			that.jobDetailsData.push(newObject);
			var oModel = new JSONModel(that.jobDetailsData);
			that.getView().setModel(oModel, "jobDetailsModel");
		},

		onSelChangeCusVoice: function(oEvt) {
			var obj = oEvt.getParameter('listItem').getBindingContext("CustomerVoiceModel").getObject();

			if (oEvt.getParameters().selected === true) {
				AllCustomerVoice.push(obj);
				AllConcernCode.push(obj.Concern_Code);
			} else if (oEvt.getParameters().selected === false) {
				for (var i = 0; i < AllCustomerVoice.length; i++) {
					if (AllCustomerVoice[i].Concern_Code === obj.Concern_Code) {
						AllCustomerVoice.splice(i, 1);
						AllConcernCode.splice(i, 1);
					}
				}
			}
		},

		handleslectConcerncode: function(oEvt) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, aFilterVoiceSearch = [];
			aFilterVoiceSearch.push(new sap.ui.model.Filter('Concern', sap.ui.model.FilterOperator.EQ, AllConcernCode));
			aFilterVoiceSearch.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			aFilterVoiceSearch.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, sInpVal));

			oSuccess = function(odata) {
				oBusyDialog.close();
				AllCustomerVoice = [];
				AllConcernCode = [];
				var results = odata.results;
                var DBStatus = that.getView().getModel("oLocalJsonModel").getProperty("/DBStatusFlag");
				results.sort(function(a, b) {
					return (a.Job < b.Job) ? 1 : ((b.Job < a.Job) ? -1 : 0);
				});

				that.jobDetailsData.find(function(sPack, index) {
					if (sPack) {
						if (sPack.Package === sInpVal) {
							that.jobDetailsData.splice(index, 1);
						}
					}
				});

				for (var n = 0; n < results.length; n++) {
					if (results[n].Db_Flg !== "X") {
						results[n].editable = "true";
						if (results[n].Job === "") {
							results[n].Job = "00000" + (n + 1);
						}
						if(results[n].Status === ""){
							results[n].Status = DBStatus;
						}
						AllCustomerVoice.push(results[n]);
						that.jobDetailsData.push(results[n]);
					}
				}
				// that.jobDetailsData.push(newObject);
				// var oModel = new JSONModel(that.jobDetailsData);
				that.getView().getModel("jobDetailsModel").updateBindings(true);
				sap.ui.getCore().byId("custVoiceTableId").getModel("CustomerVoiceModel").setProperty("/SelectedConcernItem",
					odata.results[0]);
				that.oCustVoicePopover.close();
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");

			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/CustVoiceDtlsSet", {
				filters: aFilterVoiceSearch,
				success: oSuccess,
				error: oError
			});
		},

		onChangetItemType: function(oEvent) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, aFilter = [];
			that.sTerm = oEvent.getParameters().value;
			if (that.sTerm === "P") {
				aFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'PART'),
					new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, VinNo));
			} else {
				aFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'LABOR'));
				aFilter.push(new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, VinNo));
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (that.sTerm === "P") {
					var oModel = new JSONModel(oData.results);
					that.getView().setModel(oModel, "DescriptionPartsModel");
					that.getView().getModel("DescriptionPartsModel").setSizeLimit(oData.results.length);
					that.getView().getModel("jobItemDetailsModel").updateBindings(true);
				} else {
					var oModel1 = new JSONModel(oData.results);
					that.getView().setModel(oModel1, "DescriptionLabourModel");
					that.getView().getModel("DescriptionLabourModel").setSizeLimit(oData.results.length);
					that.getView().getModel("jobItemDetailsModel").updateBindings(true);
				}
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilter,
				success: oSuccess,
				error: oError
			});
		},

		onSaveJobDetails: function() {
			oBusyDialog.open();
			var that = this;
			var oSuccess, oError, jobDetails = [];

			var reqFlag = "";
			var RejReasonFlag = "";
			for (var j = 0; j < that.jobDetailsData.length; j++) {
				if (!that.jobDetailsData[j].Status) {
					reqFlag = true;
					break;
				}
				if(that.jobDetailsData[j].Status === "91" && that.jobDetailsData[j].NtAttendRsn === ""){
					RejReasonFlag = true;
					break;
				}
			}

			if (RejReasonFlag === true) {
				oBusyDialog.close();
				MessageBox.error("Please fill Not Attending Reason for Rejected Jobs");
				return;
			}

			if (reqFlag === true) {
				oBusyDialog.close();
				MessageBox.error("Please fill the Status");
				return;
			}
              
			var oObject = {
				"RO_No": RepairOrderNo,
				"JobUpd": {
					"results": jobDetails
				}
			};
			var PckBilltoflag = "";
			for(var i=0;i<that.jobDetailsData.length; i++){
				if(that.jobDetailsData[i].Db_Flg !== 'X' && (that.jobDetailsData[i].Job_Type === "PCK" || that.jobDetailsData[i].Job_Type === "07")){
             for(var j=0;j<aPackageItems.length;j++){
				if(aPackageItems[j].Package === that.jobDetailsData[i].Package){
                   if(aPackageItems[j].Bill_To === ""){
					PckBilltoflag = 'X';
				   }
				}
			 }
			 }
			}
			debugger;
			if(PckBilltoflag === 'X'){
				oBusyDialog.close();
				MessageBox.error("Please select bill to for package items");
				return;
			}
			for (var q = 0; q < that.jobDetailsData.length; q++) {
				if (that.jobDetailsData[q].Stock === "G") {
					that.jobDetailsData[q].Stock = false;
				}
				jobDetails.push({
					"Concern": that.jobDetailsData[q].Package,
					"RO_No": RepairOrderNo,
					"Input": "",
					"Job": that.jobDetailsData[q].Job,
					"Description": that.jobDetailsData[q].Description,
					"JobSource": that.jobDetailsData[q].JobSource,
					"Status": that.jobDetailsData[q].Status,
					"Approval": that.jobDetailsData[q].Approval,
					"Observation": that.jobDetailsData[q].Observation,
					"NtAttendRsn": that.jobDetailsData[q].NtAttendRsn,
					"Repeat": that.jobDetailsData[q].Repeat,
					"RptRsn": that.jobDetailsData[q].RptRsn,
					"FaultCat": that.jobDetailsData[q].FaultCat,
					"QI_Rework": that.jobDetailsData[q].QI_Rework,
					"Stock": that.jobDetailsData[q].Stock,
					"Remarks": that.jobDetailsData[q].Remarks,
					"Package": that.jobDetailsData[q].Package,
					"Db_Flg": that.jobDetailsData[q].Db_Flg,
					"Job_Type": that.jobDetailsData[q].Job_Type,
					"Job_concer_code": that.jobDetailsData[q].Job_concer_code,
					"Job_Status": that.jobDetailsData[q].Job_Status
				});
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flg === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.Flg === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
				that.jobDetailsData = [];
				that.getJobDetailsData();
				// that.onSaveJobItemDetails();
			}.bind(that);

			oError = function(e) {
				oBusyDialog.close();
				try{
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
				}catch{
					MessageBox.error(e.responseText);
				}
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/CustVoiceHdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onTableLegendpress: function(oEvt) {
			var that = this,
				Val;
			var text = oEvt.getSource().getText();
			if (text === 'To Be Attended') {
				Val = "TBA";
			} else if (text === "Hold") {
				Val = "HLD";
			} else if (text === "Delivered") {
				Val = "DELVRD";
			} else if (text === "Invoiced") {
				Val = "DELVY";
			} else if (text === "WIP") {
				Val = "WIP";
			}
			this.getAssignedVehicleFilteredList(Val);
			this.getAssignedVehicleFilteredColorList(Val);
		},

		onCancelCustVoice: function() {
			this.oCustVoicePopover.close();
		},

		onPressUpcomingDelivery: function() {
			if (!this._oUpcomingDeliveryDialog) {
				this._oUpcomingDeliveryDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.UpcomingDelivery", this);
				this.getView().addDependent(this._oUpcomingDeliveryDialog);
			}
			this.getUpcomingDelivery();
			this._oUpcomingDeliveryDialog.open();
		},

		onCancelUpcomingDelivery: function() {
			this._oUpcomingDeliveryDialog.close();
			this.getView().getModel("UpcomingDeliveryModel").setData(null);
		},

		onPandLValueChange: function(oEVt) {
			var Path = oEVt.getSource().getBindingContext("jobItemDetailsModel").getPath().split("/")[1];
			var value = oEVt.getSource().getSelectedKey();
			var contx = this.getView().getModel("jobItemDetailsModel").getData()[Path];
			contx.Item_Type = value;
			// if (oEVt.getSource().getSelectedKey() === "L") {
			// 	contx.P_Ledit = false;
			// 	contx.Qty = 1;
			// } else {
			// 	contx.P_Ledit = true;
			// }
			this.getView().getModel("jobItemDetailsModel").refresh(true);
			this.getView().getModel("jobItemDetailsModel").updateBindings(true);
		},

		onPressNavBackJobDetails: function() {
			var that = this;
			that.oJobDetailsFragment.getAggregation("items")[1].setVisible(true);
			that.oJobDetailsFragment.getAggregation("items")[2].setVisible(false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
			that.getView().getModel("oLocalJsonModel").setProperty("/jobTypeEnable", true);
			
			var data = that.getView().getModel("jobItemDetailsModel").getData().Data;
			var popup = false;
			//Db_Flg
			if (data.length !== 0) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].Db_Flg !== "X") {
						popup = true;
						break;
					}
				}
			}
			if (popup === true) {
				MessageBox.error("Please either save or delete the Job Items");
				that.oJobDetailsFragment.getAggregation("items")[1].setVisible(false);
				that.oJobDetailsFragment.getAggregation("items")[2].setVisible(true);
			}
			aSelectedJobItems = [];
			this.getJobStatus();
			aPackageItems=[];
			this.getPackageItems();
		},

		onPressPlusIcon: function() {
			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.createJobCardPlus", this);
				this.getView().addDependent(this._oValueHelpDialog);
			}
			sap.ui.getCore().byId("regVinId").setValue("");
			sap.ui.getCore().byId("customerID").setText("");
			sap.ui.getCore().byId("regNoID").setText("");
			sap.ui.getCore().byId("VinId").setText("");
			this._oValueHelpDialog.open();
			sap.ui.getCore().byId("regVinId").setValueState("None");
		},

		handleSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, sTerm));
			}
			oEvent.getSource().setFilterSuggests(false);
			oEvent.getSource().getBinding("suggestionItems").filter(new sap.ui.model.Filter({
				filters: aFilters,
				and: false
			}));
		},

		packageHandleSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, sTerm));
			}
			oEvent.getSource().setFilterSuggests(false);
			oEvent.getSource().getBinding("suggestionItems").filter(new sap.ui.model.Filter({
				filters: aFilters,
				and: false
			}));
		},

		suggestionItemSelected: function(oEvent) {
			var oItem = oEvent.getParameter('selectedItem');
			if (oItem === null) {
				this.clearRegVinValues();
			} else {
				sap.ui.getCore().byId("regVinId").setValue(oItem.getText());
				// this._oValueHelpDialog.getAggregation("content")[0].getAggregation("items")[0].getAggregation("formContainers")[0].getAggregation(
				// 	"formElements")[0].getFields()[1].setValue(oItem.getText());
				// var VIN = oItem.getText();
				this.onCreateJobCardPopup(oItem.getText());
			}
		},

		onCreateJobCardPopup: function(oEvt) {
			oBusyDialog.open();
			var that = this,
				errmessage, regVinData = [];
			var oSuccess = function(oData) {
				oBusyDialog.close();
				regVinData.Cust_Name = oData.Cust_Name;
				regVinData.Reg_No = oData.Reg_No;
				regVinData.VIN = oData.VIN;
				var oModel = new JSONModel(regVinData);
				var object = {
					"Flag": "C",
					"RepairOrderNo": "",
					"VinNo": regVinData.VIN,
					"RegNo": regVinData.Reg_No,
					"Srv_Type_Code": "",
					"ServiceType": ServiceType,
					"ServiceTypeCode": "",
					"SubSrvTypeCode": "",
					"OverViewHeadrerDate": "",
					"Status": Status,
					"OnSite": "",
					"createDrpAll": true,
					"createInputAll": false,
					"saveFlagEnabled": true
				};
				VinNo = object.VinNo;
				RegNo = object.RegNo;
				var oModel1 = new JSONModel(object);
				that.getView().setModel(oModel1, "localJCDeatils");

				that._oValueHelpDialog.setModel(oModel, "createJobCardModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/JC_Create_PopupSet(VIN='" + oEvt + "')", {
				success: oSuccess,
				error: oError
			});
		},

		onSuggest: function (oEvent) {
			var sValue = oEvent.getParameter("suggestValue");
			var oInput = oEvent.getSource();

			var oSuggestionBinding = oInput.getBinding("suggestionItems");

			if (oSuggestionBinding) {
				var aSuggestionItems = oSuggestionBinding.getModel().getProperty(oSuggestionBinding.getPath());

				if (aSuggestionItems && sValue) {
					var aFilteredSuggestions = aSuggestionItems.filter(function (item) {
						return item.Description.toLowerCase().indexOf(sValue.toLowerCase()) !== -1 ||
							item.Value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
					});

					oInput.destroySuggestionItems();

					aFilteredSuggestions.forEach(function (filteredItem) {
						oInput.addSuggestionItem(new sap.ui.core.ListItem({
							text: filteredItem.Description,
							additionalText: filteredItem.Value,
							key: filteredItem.Value
						}));
					});
				} else {
					oInput.destroySuggestionItems();
				}
			}
		},

		onSuggestedItemSelected: function(oEvent) {
			var oSrcItm = oEvent.getParameters().selectedItem;
			if (oSrcItm) {
				var oItem = oEvent.getParameter('selectedItem').getKey();
				var oItmObj = oEvent.getSource().getBindingContext("jobItemDetailsModel").getObject();
				oItmObj.Code = oItem;
				oItmObj.Description = oEvent.getParameter('selectedItem').getText();
			}
		},

		handleLiveChangeItem: function(oEvt) {
			var Val = oEvt.getSource().getValue();
			if (!Val) {
				this.clearRegVinValues();
				sap.ui.getCore().byId("regVinId").setValueState("Error");
			} else {
				sap.ui.getCore().byId("regVinId").setValueState("None");
			}
		},

		clearRegVinValues: function(oEvt) {
			// this._oValueHelpDialog.getAggregation("content")[0].getAggregation("items")[0].getAggregation("formContainers")[0].getAggregation(
			// 	"formElements")[0].getFields()[1].setValue("");
			sap.ui.getCore().byId("regVinId").setValue("");
			sap.ui.getCore().byId("customerID").setText("");
			sap.ui.getCore().byId("regNoID").setText("");
			sap.ui.getCore().byId("VinId").setText("");
			// var obj1 = {
			// 	"Flag": "C",
			// 	"VIN": "",
			// 	"Reg_No": "",
			// 	"Cust_Name": ""
			// };
			// var oModel2 = new JSONModel(obj1);
			// this._oValueHelpDialog.setModel(oModel2, "createJobCardModel");
		},

		onCancelJobcardCreation: function() {
			this._oValueHelpDialog.close();
		},

		onChangeJobStatus: function(oEvt) {
			var val = oEvt.getSource().getValue();
			
			this.getView().getModel("localJCDeatils").setProperty("/JobStatusDesc", val);
			// var path = oEvt.getSource().getBindingContext("jobDetailsModel").getPath().split("/")[1];
			//  this.getView().getModel("jobDetailsModel").getData()[path].
			// that.getView().getBindingContext("jobDetailsModel").getObject().Description;
			// that.getView().getModel("oLocalJsonModel").getProperty("/SelectedPackGuid/PACKAGE_GUID");
		},

		onAddJobItems: function(oEvt) {
			if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
				this.onAddJobDetails();
			} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
				this.onAddJobItemsDetails();
			}
		},

		onAddDeputation: function() {
			var that = this;
			var newObject = {
				"Bill_To": "",
				"Concern": "",
				"Deputation_Type": "",
				"Duration": "",
				"End_Date": "",
				"End_Km": "",
				"FRM_Code": "",
				"Flag": "",
				"Hilly_Terrain_Kms": "",
				"Kms": "",
				"Msg": "",
				"Odometer": "",
				"Plain_Amount": "",
				"Plain_Terrain_Kms": "",
				"RO_No": "",
				"Re_Date": "",
				"Reach_Km": "",
				"Rec_Date": "",
				"Recovery_Km": "",
				"Reg_No": "",
				"Remarks": "",
				"Route": "",
				"Route_from": "",
				"Route_to": "",
				"St_Date": "",
				"Start_Km": "",
				"Status": "",
				"Technician_Name_Code":"",
				"Technician_Name": "",
				"Terrain_Amount": "",
				"Total_Amount": "",
				"Total_Kms": "",
				"Trip_No": "",
				"Vehicle_Type": "",
				"Dedit": false,
				"Oedit": false,
				"edit": "",
				"Db_flg":"",
				"Deputation_Nav": {
					"results": [{
						"END": "",
						"NAME": "Date & Time",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}, {
						"END": "",
						"NAME": "Duration",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}, {
						"END": "",
						"NAME": "Odometer",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}, {
						"END": "",
						"NAME": "kms",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}, {
						"END": "",
						"NAME": "Lat_long",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}, {
						"END": "",
						"NAME": "Location",
						"REACH": "",
						"RECOVERY": "",
						"RO_NO": RepairOrderNo,
						"START": ""
					}]
				}
			};
			newObject.Trip_No = that.DeputationData.length + 1;
			that.DeputationData.push(newObject);
			var oModel = new sap.ui.model.json.JSONModel(that.DeputationData);
			that.getView().setModel(oModel, "DeputationInfoModel");
		},

		onPressDeputationDelete: function(oEvent) {
			var Obj = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Trip_No;
			var path = oEvent.getSource().getBindingContext("DeputationInfoModel").getPath().split("/")[1];
			var aModelData = this.getView().getModel("DeputationInfoModel").getData();
			for (var i = 0; i < aModelData.length; i++) {
				if (aModelData[i].Trip_No === Obj) {
					if (aModelData[i].Db_Flg !== 'X') {
						aModelData.splice(path, 1);
					}
				}
			}
			var oJSONModel = new JSONModel(aModelData);
			this.getView().setModel(oJSONModel, "DeputationInfoModel");
		},

		onAddJobItemsDetails: function() {
			var SelJBStatus = this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").Job_Status;
			var that = this;
			var checkflag = this.checkCSLSelection();
			var CQLEnableflag = false;
             if(checkflag >0){
				CQLEnableflag = true;
                 }
			var newObject = {
				"Item_Type": "",
				"Sublet_ID": "",
				"Code": "",
				"Description": "",
				"Bill_To": "",
				"Split": "",
				"Casual_Part": "",
				"Damage_Code": "",
				"UOM": "",
				"Ordered_Qty": "",
				"Stock": "",
				"Status": SelJBStatus,
				"Reserved_Qty": "",
				"Unit_Price": "",
				"Total_Price": "",
				"CGST_Percent": "",
				"CGST_INR": "",
				"SGST_percent": "",
				"SGST_INR": "",
				"IGST_Percent": "",
				"IGST_INR": "",
				"Tax_Total": "",
				"Total_Amount": "",
				"Discount_Percent": "",
				"Discount_INR": "",
				"First_Fill": false,
				"Remarks": "",
				"Rework": false,
				"Flag": "X",
				"Jb_Flg": DBFLAG,
				"Db_Flg": "",
				"enableCQL": CQLEnableflag,
				"WtyTyp":""
			};

			var oModel = that.getView().getModel("jobItemDetailsModel");
			oModel.getData().Data.push(newObject);
			that.getView().getModel("jobItemDetailsModel").updateBindings(true);
			// that.jobItemDetailsData.push(newObject);
			// var oModel = new sap.ui.model.json.JSONModel(that.jobItemDetailsData);
			// that.getView().setModel(oModel, "jobItemDetailsModel");
		},

		onAddJobDetails: function() {
			var that = this;
			var DBStatus = that.getView().getModel("oLocalJsonModel").getProperty("/DBStatusFlag");
			var newObject = {
				"Approval": "",
				"Concern": "",
				"Db_Flg": "",
				"Description": "",
				"Fault_Cat": "",
				"Flag": "",
				"Input": "",
				"Job": "",
				"JobSource": "",
				"Msg": "",
				"NtAttendRsn": "",
				"Observation": "",
				"Package": "",
				"QI_Rework": false,
				"RO_No": "",
				"Remarks": "",
				"Repeat": false,
				"RptRsn": "",
				"Status_Code": "",
				"Stock": "G",
				"editable": "true",
				"jobPckCustVoice": "concerns",
				"Status": DBStatus,
			};
			newObject.Job = "00000" + (that.jobDetailsData.length + 1);
			that.jobDetailsData.push(newObject);
			var oModel = new sap.ui.model.json.JSONModel(that.jobDetailsData);
			that.getView().setModel(oModel, "jobDetailsModel");
		},

		// onAddJobItemsDetails:function

		onCreateJobCard: function(oEvt) {
			var that = this;
			if (that._oValueHelpDialog.getModel("createJobCardModel") &&
				that._oValueHelpDialog.getModel("createJobCardModel").getData().VIN) {
				that._oValueHelpDialog.close();
				that.getView().byId("iconTabHeader").setSelectedKey("VehicleDetails");
				that.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
				that.getView().byId("toolheaderButtonsId").setVisible(false);
				that.getView().byId("toolheaderButtonsId1").setVisible(false);
				that.getView().byId("toolheaderButtonsId2").setVisible(false);
				that.getView().byId("toolheaderTextId").setVisible(false);
				that.getView().byId("toolheaderTextId1").setVisible(false);

			that.getView().byId("iconTabHeader").getItems()[1].setVisible(false);
			that.getView().byId("iconTabHeader").getItems()[2].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[3].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[4].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[5].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[6].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[7].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[8].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[9].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[10].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[11].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[12].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[13].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[14].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[15].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[16].setVisible(true);
			that.getView().byId("iconTabHeader").getItems()[17].setVisible(true);

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				var oPage = this.byId("page");
				if (that.getView().byId("iconTabHeader").getSelectedKey() === "VehicleDetails") {
					that.getCustomerInformation();
					that.ReadComplaintdata();
					that.getVehicleInformation();
					that.getJobCardInformation();
					that.getOtherInformation();
					that.getWarrantyInfo();
					that.getMeasuresRecalls();
					that.getRejectedJobs();
					that.getServiceCampaign();
					that.getDiagnostics();
					that.getQuotations();
					that.getServiceHistory();
					that.getSoldTo();
					that.getBillTo();
					that.getshipTo();
					that.getServiceType();
					// that.getServiceSubType();
					if (!that.oVehicleDetailsFragment) {
						that.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", that);
						that.getView().addDependent(that.oVehicleDetailsFragment);
						oPage.addContent(that.oVehicleDetailsFragment);
					}
				
					selectedIconTab = "VehicleDetails";
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
					if (that.getView().getModel("localJCDeatils").getData().Flag === "C") {
						that.getView().getModel("localJCDeatils").setProperty("/serviceTypeVisible", true);
						that.getView().getModel("localJCDeatils").setProperty("/serviceSubTypeVisible", true);
						that.getView().getModel("localJCDeatils").setProperty("/OnSite", "X");
						that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
						that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
						sap.ui.getCore().byId("locTypeId").setSelectedKey("");
						sap.ui.getCore().byId("locId").setValue("");
						sap.ui.getCore().byId("BilltoOverveiwId").setSelectedKey("");
						that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubServiceTypeValue", "");
						that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
					}
				}
			} else {
				MessageBox.error("Please enter required fields");
				sap.ui.getCore().byId("regVinId").setValueState("Error");
				return;
			}
		},

		onChangeRegVIN: function(oEvt) {
			var that = this;
			if (oEvt.getSource().getValue) {
				that.getView().byId("jcCreateVisibleId").setVisible(true);
			}
		},

		
		onSelectTab: function(oeve) {
			var that = this;
			var oPage = that.byId("page");
			selectedIconTab = oeve.getParameters().selectedKey;
			//Pooja
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RejButtonFlag", false);
			//that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/rejectcancelBtnText", 'Cancel');
			if(oeve.getParameters().selectedKey === "Checklist"){
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/printchecklist", true);
			}else{
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/printchecklist", false);
			}
			if (oeve.getParameters().selectedKey === "JobCard") {
				if (!that.oJobCardFragment) {
					that.oJobCardFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobCard", that);
					that.getView().addDependent(that.oJobCardF);
					// if (!that.oJobCardF) {
					// 	sap.ui.xmlfragment.load({
					// 		name: "ndbs.Z_JobCard.fragments.JobCard",
					// 		controller: this
					// 	}).then(function(oDialog) {
					// 		that.oJobCardF = oDialog;
					// 		this.getView().addDependent(oDialog);
					// 		this._oDialog.open();
					// 	}.bind(this));
					// }else {
					// 	this._oDialog.open();
					// }
					oPage.addContent(that.oJobCardFragment);
				}
				// sap.ui.getCore().byId("Idappt").addEventDelegate({
				// 	onmouseover: this._showPopover,
				// 	onmouseout: this._clearPopover
				// }, this);
			
				// if (urlParams === "Y") {
				that.getButtonCounts();
				that.getAssignedCalendarData();
				that.getAssignedVehicles();
				// }
				
				RepairOrderNo = "";
				that.getView().byId("iconTabHeader").getItems()[1].setVisible(true);
				that.getView().byId("iconTabHeader").getItems()[2].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[3].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[4].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[5].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[6].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[7].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[8].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[9].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[10].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[11].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[11].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[12].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[13].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[14].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[15].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[16].setVisible(false);
				that.getView().byId("iconTabHeader").getItems()[17].setVisible(false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
		
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().byId("toolheaderButtonsId").setVisible(true);
				that.getView().byId("toolheaderButtonsId1").setVisible(true);
				that.getView().byId("toolheaderButtonsId2").setVisible(true);
				that.getView().byId("toolheaderTextId").setVisible(true);
				that.getView().byId("toolheaderTextId1").setVisible(true);
				// that.getView().byId("iconTabHeader").getItems()[1].setVisible(true);
				// that.getView().byId("iconTabHeader").getItems()[2].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[3].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[4].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[5].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[6].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[7].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[8].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[9].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[10].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[11].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[11].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[12].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[13].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[14].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[15].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[16].setVisible(false);
				// that.getView().byId("iconTabHeader").getItems()[17].setVisible(false);
			} else if (oeve.getParameters().selectedKey === "VehicleDetails") {
				// this._showFormFragment("VehicleDetails");
				if (!that.oVehicleDetailsFragment) {
					that.oVehicleDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VehicleDetails", that);
					that.getView().addDependent(that.oVehicleDetailsFragment);
					oPage.addContent(that.oVehicleDetailsFragment);
				}
				this.ReadComplaintdata();
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
		
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				
				if (that.saveVehicle === true) {	
					that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
				} else {
					that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				}
			} else if (oeve.getParameters().selectedKey === "Estimation") {
				this._showFormFragment("Estimation");
			
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Deputation") {
				if (!that.oDeputationFragment) {
					that.oDeputationFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Deputation", this);
					this.getView().addDependent(that.oDeputationFragment);
					oPage.addContent(that.oDeputationFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",true);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);

				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);

				that.ongetSubletDropdownsData();
				that.getDeputationInfo();
				that.onGetJobItemDetailsDropdowns();
				that.getDeputationDropdownData(VinNo);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Inspection") {
				// this._showFormFragment("Inspection");
				if (!that.oInspectionFragment) {
					that.oInspectionFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Inspection", that);
					that.getView().addDependent(that.oInspectionFragment);
					oPage.addContent(that.oInspectionFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				InspSelectedSegButton = "CheckList";
				that.oInspectionFragment.getAggregation("items")[2].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[3].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[4].setVisible(true);
				that.ongetInspParameters(InspSelectedSegButton);
				sap.ui.getCore().byId("sideNavigation").setVisible(false);
				sap.ui.getCore().byId("InspSegButtonId").setSelectedKey(InspSelectedSegButton);
				that.ongetCheckListAggregates();
				that.onGetTyreColor();
				that.onGetTyreMake();
				that.onGetInventoryInfo();
				that.onGetTyreTable();
				that.getImageCoordinatesrange();
				that.getSegmentInfo();
				that._custStepInputFocusOut(that);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				if (that.inspImgdisable === true) {
					that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
				} else {
					that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				}
			
			} else if (oeve.getParameters().selectedKey === "Sublet") {
				// this._showFormFragment("Sublet");
				if (!that.oSubletFragment) {
					that.oSubletFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Sublet", this);
					this.getView().addDependent(that.oSubletFragment);
					oPage.addContent(that.oSubletFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getSubletData();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				that.ongetSubletDropdownsData();
			} else if (oeve.getParameters().selectedKey === "CheckIn") {
				if (!that.oCheckInFragment) {
					that.oCheckInFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.CheckIn", this);
					this.getView().addDependent(that.oCheckInFragment);
					oPage.addContent(that.oCheckInFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.ongetCheckInInfo();
				that.getEstimationInfo();
				that.getCheckInInvoiceInfo();
				that.getCheckInPolicyAmtBillTo();
				
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
					//Pooja
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RejButtonFlag", true);
					//that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/rejectcancelBtnText", 'Reject');
				// sap.ui.getCore().byId("html").setContent("<canvas id='signature-pad' width='400' height='200' class='signature-pad'></canvas>");
			} else if (oeve.getParameters().selectedKey === "JobDetails") {
				if (!that.oJobDetailsFragment) {
					that.oJobDetailsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JobDetails", that);
					that.getView().addDependent(that.oJobDetailsFragment);
					oPage.addContent(that.oJobDetailsFragment);
				}
				
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				selectedTable = "JobDetails";
				that.oJobDetailsFragment.getAggregation("items")[1].setVisible(true);
				that.oJobDetailsFragment.getAggregation("items")[2].setVisible(false);
				that.getJobDetailsData();
				that.onGetJobItemDetailsDropdowns();
				that.getJobDetailsDropdowns();
				that.getJobStatus();
				that.BillTo();
				that.warrentyItemsLoad();
				that.getpackagehistoryDP();
				that.jobDetailsData = [];
				sap.ui.getCore().byId("idList").setVisible(false);
				sap.ui.getCore().byId("packageListId").setValue("");
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/jobTypeEnable", true);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				// package loading issue YR
				aPackageObj=[];
				aPackageItems =[];
				this.oComboBox = sap.ui.getCore().byId("idJCDStatus");
				if(this.oComboBox !== undefined){
					this.oComboBox.attachBrowserEvent("click", function (e) {
						that.statusCreation(e);
					}.bind(this));
				}
			} else if (oeve.getParameters().selectedKey === "RoadTest") {
				if (!that.oRoadTestFragment) {
					that.oRoadTestFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.RoadTest", this);
					this.getView().addDependent(that.oRoadTestFragment);
					oPage.addContent(that.oRoadTestFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getRoadTestDropdowns();
				// that.getRoadTestTableData();
				that._ReadRoadtest();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Assignment") {
				if (!that.oAssignmenttFragment) {
					that.oAssignmenttFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Assignment", this);
					this.getView().addDependent(that.oAssignmenttFragment);
					oPage.addContent(that.oAssignmenttFragment);
				}
			
				sap.ui.getCore().byId("assignmentSegButtonId").setSelectedKey("Technician");
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.onGetAssignmentTechnicianInfo();
				that.getJCLevelTechnicians();
				AssignmentSegButton = "Technician";
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "ApprovalLog") {
				if (!that.oApprovalLogFragment) {
					that.oApprovalLogFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.ApprovalLog", that);
					that.getView().addDependent(that.oApprovalLogFragment);
					oPage.addContent(that.oApprovalLogFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getInitialApprovalInfo();
				that.getAdditionalApprovalInfo();
				that.getCAJobsItemsInfo();
				that.rejectApproveAllVal = "";
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				var imgUrl = jQuery.sap.getResourcePath("ndbs.Z_JobCard", "/Images/");
				sap.ui.getCore().byId("IdDotted").setSrc(imgUrl + "DottedLine.png");
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "AccidentTAT") {
				if (!that.oAccidentTATFragment) {
					that.oAccidentTATFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.AccidentTAT", this);
					this.getView().addDependent(that.oAccidentTATFragment);
					oPage.addContent(that.oAccidentTATFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getAccidentTATInfo();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Invoice") {
				if (!that.oInvoiceFragment) {
					that.oInvoiceFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Invoice", that);
					that.getView().addDependent(that.oInvoiceFragment);
					oPage.addContent(that.oInvoiceFragment);
				}
				
			that.oInvoiceFragment.getAggregation("items")[3].setVisible(false);
			that.oInvoiceFragment.getAggregation("items")[4].setVisible(false);
			that.oInvoiceFragment.getAggregation("items")[5].setVisible(false);
			that.oInvoiceFragment.getAggregation("items")[6].setVisible(false);
			that.oInvoiceFragment.getAggregation("items")[6].setVisible(false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
		
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
	
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",true);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				// that.getInvoiceTabInfo();
				that.getInvoiceList();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprintoroframa", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprint", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/incrdvoiceprint", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Joblog") {
				if (!that.oJoblogFragment) {
					that.oJoblogFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Joblog", that);
					that.getView().addDependent(that.oJoblogFragment);
					oPage.addContent(that.oJoblogFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getJobLogInfo();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "MoreInfo") {
				if (!that.oMoreInfoFragment) {
					that.oMoreInfoFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.MoreInfo", that);
					that.getView().addDependent(that.oMoreInfoFragment);
					oPage.addContent(that.oMoreInfoFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
		
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getOdometerInfo();
				that.getRepeatJobDetails();
				that.getPCRlogInfo();
				that.getTemporaryGatePassLogInfo();
				that.getAcchamnetinfomoreInfo();
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Feedback") {
				if (!that.oFeedbackFragment) {
					that.oFeedbackFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Feedback", that);
					that.getView().addDependent(that.oFeedbackFragment);
					oPage.addContent(that.oFeedbackFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				that.getInstantFeedbackInfo("InstantFeedback");

				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			} else if (oeve.getParameters().selectedKey === "Checklist") {
				if (!that.oChecklistFragment) {
					that.oChecklistFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Checklist", that);
					that.getView().addDependent(that.oChecklistFragment);
					oPage.addContent(that.oChecklistFragment);
				}
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
			
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag", true);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
				that.getCheckListTabInfo();
				
			} else if (oeve.getParameters().selectedKey === "DefferredJobs") {
				if (!that.oDefferredJobsFragment) {
					that.oDefferredJobsFragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.DefferredJobs", that);
					that.getView().addDependent(that.oDefferredJobsFragment);
					oPage.addContent(that.oDefferredJobsFragment);
				}
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/EstimationTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/VehicleDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DeputationTabFlag",false);
			
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SubletTabFlag",false);
				
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RoadTestTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ApprovalLogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AssignmentTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccidentTATTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InvoiceTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/InspectionTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoblogTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobDetailsTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/MoreInfoTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/FeedbackTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ChecklistTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/DefferredJobsTabFlag",true);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JoBCardTabFlag",false);
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/saveCancelButtonFlag",false);
				// that.onGetDefferredJobs();
				that.getJobDetailsData();
				that.jobDetailsData = [];
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AttachFilesButtonFlag", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/CheckInButtonsVisible", false);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", false);
				that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", true);
			}
		},

		onHideShowSubItemPress: function() {
			var oNavList = this.byId("subItems3");
			oNavList.setVisible(!oNavList.getVisible());
		},

		onPressInspExpandIcon: function(evt) {
			if (sap.ui.getCore().byId("sideNavigation").getExpanded() === false) {
				sap.ui.getCore().byId("sideNavigation").setExpanded(true);
				sap.ui.getCore().byId("sideNavigation").updateBindings(true);
			} else if (sap.ui.getCore().byId("sideNavigation").getExpanded() === true) {
				sap.ui.getCore().byId("sideNavigation").setExpanded(false);
				sap.ui.getCore().byId("sideNavigation").updateBindings(true);
			}
		},

		onApprovalLogSegButtons: function(oEvt) {
			var that = this;
			this.SelectedView = oEvt.getSource().getSelectedKey();
			if (this.SelectedView === "CustomerApproval") {
				that.oApprovalLogFragment.getAggregation("items")[2].setVisible(true);
				that.oApprovalLogFragment.getAggregation("items")[3].setVisible(false);
				that.oApprovalLogFragment.getAggregation("items")[4].setVisible(false);
			} else if (this.SelectedView === "DICVApproval") {
				that.oApprovalLogFragment.getAggregation("items")[2].setVisible(false);
				that.oApprovalLogFragment.getAggregation("items")[3].setVisible(true);
				that.oApprovalLogFragment.getAggregation("items")[4].setVisible(false);
				that.getDICVApproval();
			} else if (this.SelectedView === "Dealer") {
				that.oApprovalLogFragment.getAggregation("items")[2].setVisible(false);
				that.oApprovalLogFragment.getAggregation("items")[3].setVisible(false);
				that.oApprovalLogFragment.getAggregation("items")[4].setVisible(true);
			}
		},

		onPressRoadTestAdd: function(oEvt) {
			if (!this._oRoadTestDialog) {
				this._oRoadTestDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.RoadTestCreatePopup", this);
				this.getView().addDependent(this._oRoadTestDialog);
			}
			this.getRoadTestPopUpInfo();
			// var obj = {};
			// obj.JC_No = "";
			// obj.Reg_No = "";
			// obj.Purpose = "";
			// obj.Gate_Out_Kms = "";
			// obj.Driver_Foreman = "";
			// obj.Instruction = "";
			// var insuranceFormJSON = new JSONModel(obj);
			// this.getView().setModel(insuranceFormJSON, "RoadTestDetailModel");

			this._oRoadTestDialog.open();
		},

		onCancelRoadTest: function() {
			this._oRoadTestDialog.close();
		},

		onPressAssignmentAdd: function() {
			var selVal = sap.ui.getCore().byId("assignmentSegButtonId").getSelectedKey();
			if (selVal === "Technician") {
				if (!this._oAssignmentDialog) {
					this._oAssignmentDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.AssignmentDialogCreatePopup", this);
					this.getView().addDependent(this._oAssignmentDialog);
				}
				this.getTechReassignInfo();
				this.getTechReassignDropdowns();
				this._oAssignmentDialog.open();
			}
		},

		onPressActionTakenObs: function(oEvt) {
			if (!this._oActionTakenObsDialog) {
				this._oActionTakenObsDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.ActionTakenandObs", this);
				this.getView().addDependent(this._oActionTakenObsDialog);
			}
			this._oActionTakenObsDialog.open();

			var val = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Observation;
			this._oActionTakenObsDialog.getContent()[0].setValue(val);
			this.actiontakenObsEvt = oEvt.getSource();
		},

		onSaveActionTakenObs: function(oEvent) {
			var obsVal = oEvent.getSource().getParent().getContent()[0].getValue();
			this.actiontakenObsEvt.getBindingContext("jobDetailsModel").getObject().Observation = obsVal;
			this._oActionTakenObsDialog.close();
			this._oActionTakenObsDialog = null;
		},

		onCreateAssignment: function() {
			this._oAssignmentDialog.close();
		},

		onCancelAssignment: function() {
			this._oAssignmentDialog.close();
		},

		onCancelTakenObs: function() {
			this._oActionTakenObsDialog.close();
		},

		onFuelValueChange: function(oEvent) {
			var iValue = oEvent.getParameter("value"),
				fuelStatusIndicator = sap.ui.getCore().byId("fuelStatusIndicator");
			fuelStatusIndicator.setValue(iValue);
			sap.ui.getCore().byId("inspFuelValueId").setText(iValue);
		},

		onAdBlueChange: function(oEvent) {
			var iValue = oEvent.getParameter("value"),
				fuelStatusIndicator = sap.ui.getCore().byId("AdBlueId");
			fuelStatusIndicator.setValue(iValue);
			sap.ui.getCore().byId("inspAdBlueValueId").setText(iValue);
		},

		onFeedbackSegButtons: function(oEvt) {
			var that = this;
			var selectedSegButton = oEvt.getSource().getSelectedKey();
			if (selectedSegButton === "InstantFeedback") {
				that.oFeedbackFragment.getAggregation("items")[2].setVisible(true);
				that.oFeedbackFragment.getAggregation("items")[3].setVisible(false);
				that.oFeedbackFragment.getAggregation("items")[4].setVisible(false);
				that.getInstantFeedbackInfo("InstantFeedback");
			} else if (selectedSegButton === "3rdDayPSF") {
				that.oFeedbackFragment.getAggregation("items")[2].setVisible(false);
				that.oFeedbackFragment.getAggregation("items")[3].setVisible(true);
				that.oFeedbackFragment.getAggregation("items")[4].setVisible(false);
				that.getInstantFeedbackInfo("3rdDayPSF");
				// that.getThirdDayFeedbackInfo();
				// that.getThirdDayFeedbackTableInfo();
			} else if (selectedSegButton === "10thDayPSF") {
				that.oFeedbackFragment.getAggregation("items")[2].setVisible(false);
				that.oFeedbackFragment.getAggregation("items")[3].setVisible(false);
				that.oFeedbackFragment.getAggregation("items")[4].setVisible(true);
				that.getInstantFeedbackInfo("10thDayPSF");
				// that.getTenthDayFeedbackInfo();
				// that.getTenthDayFeedbackTableInfo();
			}
		},

		onAssignmentsSegButtons: function(oEvt) {
			var that = this;
			AssignmentSegButton = oEvt.getSource().getSelectedKey();
			if (AssignmentSegButton === "Technician") {
				that.oAssignmenttFragment.getAggregation("items")[2].setVisible(true);
				that.oAssignmenttFragment.getAggregation("items")[3].setVisible(false);
				that.onGetAssignmentTechnicianInfo();
			} else if (AssignmentSegButton === "Parts") {
				that.oAssignmenttFragment.getAggregation("items")[2].setVisible(false);
				that.oAssignmenttFragment.getAggregation("items")[3].setVisible(true);
				that.onGetAssignmentPartsInfo();
			}
		},

		onNavToJobItemDetails: function(oEvt) {
			var that = this;
			var aPackageItem = [];
			this.getJobStatus();
			that.oJobDetailsFragment.getAggregation("items")[1].setVisible(false);
			that.oJobDetailsFragment.getAggregation("items")[2].setVisible(true);
			var BillTooComboBox = sap.ui.getCore().byId("idBillTo");
			BillTooComboBox.attachBrowserEvent("click", function (e) {
				that.BillToCreation(e);
			}.bind(that));

			var oComboBox = sap.ui.getCore().byId("idWarrentyType");
			oComboBox.attachBrowserEvent("click", function (e) {
				that.warrentyCreation(e);
			}.bind(that));	
			this.oComboBox = sap.ui.getCore().byId("ComboJobItmStatus");
			if(this.oComboBox !== undefined){
				this.oComboBox.attachBrowserEvent("click", function (e) {
					that.statusCreation(e);
				}.bind(this));
			}
			var obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
			JobNo = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job;
			var oSelectedItm = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Guid;
			var desc = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Description;
			var selectedDbFlg = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Db_Flg;
      
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedJobItem", obj);
			that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);

			aPackageItem.PACKAGE_GUID = oSelectedItm;
			aPackageItem.PACKAGE_DESC = desc;
			aPackageItem.DBFLG = selectedDbFlg;
			aPackageItem.Job_Type = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job_Type;
			aPackageItem.Job_concer_code = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job_concer_code;
			aPackageItem.Job_Status = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Status;

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedJob", aPackageItem);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", true);
			that.getJobItemsDetails(JobNo);
		},

		warrentyItemsLoad: function () {
			var that = this;
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: [new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "WTY_TYPE")],
				success: function (oData, oResponse) {
					var WTYJSONModel = new JSONModel();
					that.getView().setModel(WTYJSONModel, "warrentyModel");
					that.getView().getModel("warrentyModel").setProperty("/LocalWarrenty", oData.results);
				},
				error: function (oError) {
					MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				}
			});
		},

		BillTo: function () {
			var that = this,
				oSuccess, oError, aBillToFilter = [];
			aBillToFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "BILL_TO"));

			oSuccess = function (oData) {
				oBusyDialog.close();
				var BillToJSONModel = new JSONModel(oData.results);
				that.getView().setModel(BillToJSONModel, "jobItemBillToModel");
			};
			oError = function (e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aBillToFilter,
				success: oSuccess,
				error: oError
			});

		},

		BillToCreation: function (e) {
			var that = this;
			var oComboBox = sap.ui.getCore().byId("idBillTo");
			var path = e.delegateTarget.getElementsByTagName("div")[0].id.split("-content")[0];
			var code = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().Code;
			var oFilters = [
				new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "BILL_TO"),
				new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.EQ, code)
			];
			oComboBox.setBusy(true);
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: oFilters,
				success: function (oData, oResponse) {
					var BillToJSONModel = new JSONModel(oData.results);
					that.getView().setModel(BillToJSONModel, "jobItemBillToModel");
					oComboBox.setBusy(false);
				},
				error: function (oError) {
					oComboBox.setBusy(false);
					MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				}
			});
		},

		warrentyCreation: function (e,flag) {
			var that = this;
			var oComboBox = sap.ui.getCore().byId("idWarrentyType");
			if(flag){
            var path = flag;
			}else{
			var path = e.delegateTarget.getElementsByTagName("div")[0].id.split("-content")[0];
			}
			var billTo = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().Bill_To;
			var data = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject();
			if (billTo === "WTY") {
				var Code = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().Code;
				var ItemNr = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().ItemNr;
				var dmCode = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().Damage_Code;
				var DamageCode = sap.ui.getCore().byId(path).getBindingContext("jobItemDetailsModel").getObject().Damage_Code;
				// var quotation = Quotation;
				// var code = Code;
				// var job = Job;
				// var vinNo = VinNo;
				if (DamageCode) {
					 DamageCode = DamageCode.substring(0, 2);
				}
				// var sPath = "/WarrantyTypeSet";
				var oFilters = [
					new sap.ui.model.Filter("Quotation", sap.ui.model.FilterOperator.EQ, RepairOrderNo),
					new sap.ui.model.Filter("VinNo", sap.ui.model.FilterOperator.EQ, VinNo),
					new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.EQ, Code),
					new sap.ui.model.Filter("Job", sap.ui.model.FilterOperator.EQ, JobNo),
					new sap.ui.model.Filter("Aggregate", sap.ui.model.FilterOperator.EQ, DamageCode),
					new sap.ui.model.Filter("Item", sap.ui.model.FilterOperator.EQ, ItemNr),
					new sap.ui.model.Filter("DamageCode", sap.ui.model.FilterOperator.EQ, dmCode)
				];
				// var oModel = this.getView().getModel("quotationODataModel");
				oComboBox.setBusy(true);
				that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/WarrantyTypeSet", {
					filters: oFilters,
					success: function (oData, oResponse) {
						if (oData.results && oData.results.length > 0) {
							var WTYJSONModel = new JSONModel();
							that.getView().setModel(WTYJSONModel, "warrentyModel");
							that.getView().getModel("warrentyModel").setProperty("/LocalWarrenty", oData.results);
							if(oData.results.length === 1){
								data.WtyTyp = oData.results[0].WtyTyp;
								that.getView().getModel("jobItemDetailsModel").updateBindings(true);
							}
						}
						oComboBox.setBusy(false);
					},
					error: function (oError) {
						oComboBox.setBusy(false);
						MessageBox.error(JSON.parse(oError.responseText).error.message.value);
					}
				});
			} else {
				var WTYJSONModel = new JSONModel();
				that.getView().setModel(WTYJSONModel, "warrentyModel");
			}
		},

		onCasualChange: function (oEvent) {
			var bCasualState = oEvent.getSource().getSelectedKey();
			 var oModel = this.getView().getModel("jobItemDetailsModel");
			var data = this.getView().getModel("jobItemDetailsModel").getData().Data;
			var path = oEvent.getSource().getBindingContext("jobItemDetailsModel").getPath().split("/")[2];
			oEvent.getSource().getBindingContext("jobItemDetailsModel").getObject().Casual_Part = bCasualState;
			//if (CSLFlag === true) {
			var checkflag = this.checkCSLSelection();
			if(checkflag === 1){
				for (var i = 0; i < data.length; i++) {
					if (data[i].Db_Flg === "") {
						data[i].enableCQL = true;
					}
				}
			}else if(checkflag >1){
				data[JSON.parse(path)].Casual_Part = "O";
				sap.m.MessageToast.show("Only one CSL value is allowed");
			}else if(checkflag <1){
				for (var i = 0; i < data.length; i++) {
					data[i].enableCQL = false;
					}
			}

			if(bCasualState === 'Y'){
				var selobj =oEvent.getSource().getBindingContext("jobItemDetailsModel").getObject();
				var checkArr = [];
				checkArr = data.filter(function(val, idx) {
					return (val.Item_Type === selobj.Item_Type && val.Casual_Part === 'X');
				});
				if(checkArr.length >0){
					selobj.Damage_Code = checkArr[0].Damage_Code;
					selobj.Bill_To = checkArr[0].Bill_To;
				}

			}
			oModel.refresh(true);
		},

		checkCSLSelection: function () {
			var data = this.getView().getModel("jobItemDetailsModel").getData().Data;
			var clflag = 0;
			for (var i = 0; i < data.length; i++) {
				var csl = data[i].Casual_Part;
				if (csl === "X") {
					clflag = parseInt(clflag)+parseInt(1);
				}
			}
			return clflag;
		},


		getJobItemsDetails: function(Job) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, sFilter = [];
				if(that.getView().getModel("jobItemDetailsModel")){
                    that.getView().getModel("jobItemDetailsModel").setData([]);
                    that.getView().getModel("jobItemDetailsModel").updateBindings(true);
                }

			DBFLAG = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").DBFLG;
			var sPackageGuid = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").PACKAGE_GUID;

			if (sPackageGuid) {
				sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
				sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, Job));
				sFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, sPackageGuid));
			} else {
				sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
				sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, Job));
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				var data = [];
				var sGUID = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/PACKAGE_GUID");
				var sPackDesc = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/PACKAGE_DESC");
				var jobType = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/Job_Type");
				var SelJBStatus = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").Job_Status;
				var jobTypeEnable = true;
				var jobDeleteEnable=true;
				if (jobType === "PCK" || jobType === "SM" || jobType === "09" || jobType === "10" || jobType === "07" || jobType === "RC") {
					jobDeleteEnable = false;
				 }
				for (var i = 0; i < oData.results.length; i++) {
					if (jobType === "PCK" || jobType === "SM" || jobType === "09" || jobType === "10" || jobType === "07") {
						jobTypeEnable = false;
						oData.results[i].Db_Flg = "X";
					} else {
						jobTypeEnable = true;
						oData.results[i].Db_Flg = oData.results[i].Db_Flg;
					}
					if(oData.results[i].Status === ""){
						oData.results[i].Status = SelJBStatus;
					}
					data.push({
						"Item_Type": oData.results[i].Item_Type,
						"Sublet_ID": oData.results[i].Sublet_ID,
						"Code": oData.results[i].Code,
						"Description": oData.results[i].Description,
						"Bill_To": oData.results[i].Bill_To,
						"Split": oData.results[i].Split,
						"Casual_Part": oData.results[i].Casual_Part,
						"Damage_Code": oData.results[i].Damage_Code,
						"UOM": oData.results[i].UOM,
						"Ordered_Qty": oData.results[i].Ordered_Qty,
						"Stock": oData.results[i].Stock,
						"Status": oData.results[i].Status,
						"Reserved_Qty": oData.results[i].Reserved_Qty,
						"Unit_Price": oData.results[i].Unit_Price,
						"Total_Price": oData.results[i].Total_Price,
						"CGST_Percent": oData.results[i].CGST_Percent,
						"CGST_INR": oData.results[i].CGST_INR,
						"SGST_percent": oData.results[i].SGST_percent,
						"SGST_INR": oData.results[i].SGST_INR,
						"IGST_Percent": oData.results[i].IGST_Percent,
						"IGST_INR": oData.results[i].IGST_INR,
						"Tax_Total": oData.results[i].Tax_Total,
						"Total_Amount": oData.results[i].Total_Amount,
						"Discount_Percent": oData.results[i].Discount_Percent,
						"Discount_INR": oData.results[i].Discount_INR,
						"First_Fill": oData.results[i].First_Fill,
						"Remarks": oData.results[i].Remarks,
						"Flag": oData.results[i].Flag,
						"JobItmDtls": oData.results[i].JobItmDtls.results,
						"ItemNr": oData.results[i].ItemNr,
						"Input": sGUID,
						"Descr1": sPackDesc,
						"Jb_Flg": oData.results[i].Db_Flg,
						"Db_Flg": oData.results[i].Db_Flg,
						"WtyTyp": oData.results[i].WtyTyp,
						"enableCQL": false,
						"Damagecd_Mandatory_Flag":oData.results[i].Damagecd_Mandatory_Flag,
						"__metadata": oData.results[i].__metadata
					});
				}
				that.getView().getModel("oLocalJsonModel").setProperty("/jobTypeEnable", jobTypeEnable);
				that.getView().getModel("oLocalJsonModel").setProperty("/jobDeleteEnable", jobDeleteEnable);
				var oModel = new JSONModel([]);
				that.getView().setModel(oModel, "jobItemDetailsModel");
				that.getView().getModel("jobItemDetailsModel").setProperty("/Data", data);
			};
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ItemDtlsSet", {
				filters: sFilter,
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "JobItmDtls"
				}
			});
		},

		onSelectionValueChange: function(oEvent) {
			// oEvent.getSource().setBusy(true);
			oBusyDialog.open();
			var sOrderedQty = oEvent.getSource().getBindingContext("jobItemDetailsModel").getProperty("Ordered_Qty");
			var sItmType = oEvent.getSource().getBindingContext("jobItemDetailsModel").getProperty("Item_Type");
			if (sItmType === "P") {
				if (!sOrderedQty) {
					oEvent.getSource().setSelectedKey("");
					MessageBox.error("Please Enter Quantity");
					oBusyDialog.close();
					oEvent.getSource().setBusy(false);
					return;
				}
			}
			oEvent.getSource().setBusy(false);
		},

		onChangeBillTo: function(oEv) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError;
			that.oListItem = oEv.getSource().getBindingContext("jobItemDetailsModel").getObject();
			var sCustomer = CustID;
			//var sJobNo 
			var sItmType = oEv.getSource().getBindingContext("jobItemDetailsModel").getProperty("Item_Type");
			var sCode = oEv.getSource().getBindingContext("jobItemDetailsModel").getProperty("Code");
			var sBillTo = oEv.getSource().getBindingContext("jobItemDetailsModel").getProperty("Bill_To");
			var sOrderedQty = oEv.getSource().getBindingContext("jobItemDetailsModel").getProperty("Ordered_Qty");
			var DBStatus = that.getView().getModel("oLocalJsonModel").getProperty("/DBStatusFlag");
			if (sItmType === 'P') {
				if (!sBillTo || !sOrderedQty) {
					oEv.getSource().setSelectedKey("");
					oBusyDialog.close();
					return;
				}
			}

			var aSelectedItemsFilter = [];
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Item_Type', sap.ui.model.FilterOperator.EQ, sItmType));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Code', sap.ui.model.FilterOperator.EQ, sCode));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Bill_To', sap.ui.model.FilterOperator.EQ, sBillTo));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Ordered_Qty', sap.ui.model.FilterOperator.EQ, sOrderedQty));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Customer', sap.ui.model.FilterOperator.EQ, sCustomer));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('RONUMB', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			aSelectedItemsFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, JobNo));
			
			oSuccess = function(oData) {
				oBusyDialog.close();
				var sGUID = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedPackGuid/PACKAGE_GUID");
				var sPackDesc = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedPackGuid/PACKAGE_DESC");
				for (var i = 0; i < oData.results.length; i++) {
					for (var z = 0; z < oData.results[i].JobItmDtls.results.length; z++) {
						oData.results[i].JobItmDtls.results[z].Input = sGUID;
						oData.results[i].JobItmDtls.results[z].Descr1 = sPackDesc;
					}
					if(oData.results[i].Status === ""){
						oData.results[i].Status = DBStatus;
					}
					that.oListItem.Ordered_Qty = oData.results[i].Ordered_Qty,
						that.oListItem.Split = oData.results[i].Split,
						that.oListItem.Stock = oData.results[i].Stock,
						that.oListItem.Status = oData.results[i].Status,
						that.oListItem.Reserved_Qty = oData.results[i].Reserved_Qty,
						that.oListItem.Unit_Price = oData.results[i].Unit_Price,
						that.oListItem.Total_Price = oData.results[i].Total_Price,
						that.oListItem.CGST_Percent = oData.results[i].CGST_Percent,
						that.oListItem.CGST_INR = oData.results[i].CGST_INR,
						that.oListItem.SGST_percent = oData.results[i].SGST_percent,
						that.oListItem.SGST_INR = oData.results[i].SGST_INR,
						that.oListItem.IGST_Percent = oData.results[i].IGST_Percent,
						that.oListItem.IGST_INR = oData.results[i].IGST_INR,
						that.oListItem.Tax_Total = oData.results[i].Tax_Total,
						that.oListItem.Total_Amount = oData.results[i].Total_Amount,
						that.oListItem.Discount_Percent = oData.results[i].Discount_Percent,
						that.oListItem.Discount_INR = oData.results[i].Discount_INR,
						that.oListItem.Input = sGUID,
						that.oListItem.Descr1 = sPackDesc,
						that.oListItem.UOM = oData.results[i].UOM,
						that.oListItem.Jb_Flg = oData.results[i].Jb_Flg,
						that.oListItem.Damagecd_Mandatory_Flag = oData.results[i].Damagecd_Mandatory_Flag,
						that.oListItem.JobItmDtls = oData.results[i].JobItmDtls.results
				}
				that.getView().getModel("jobItemDetailsModel").updateBindings(true);
			};
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ItemDtlsSet", {
				filters: aSelectedItemsFilter,
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "JobItmDtls"
				}
			});
		},

		onSplitValue: function(oEvent) {
			oBusyDialog.open();
			var aItems = [],
				oSuccess, oError;
			var that = this;
			that.oItmDetlSet = oEvent.getSource().getBindingContext("jobItemDetailsModel").getObject();
			var sItemPath = oEvent.getSource().getBindingContext("jobItemDetailsModel").getPath().split("/")[2];
			var sSplitVal = oEvent.getSource().getValue();
			if (!sSplitVal) {
				this.splitCalculate(sItemPath, sSplitVal);
			}
			var sJobSplitValue = that.getView().getModel("jobItemDetailsModel").getProperty("/Data/" + sItemPath).Split;
			that.UpdatedValue = (sJobSplitValue) - (sSplitVal);
			if (that.UpdatedValue < 0) {
				MessageBox.information("Value is exceeding");
				oBusyDialog.close();
				return;
			}
			that.getView().getModel("jobItemDetailsModel").getProperty("/Data/" + sItemPath).Split = that.UpdatedValue;

			var oValue = oEvent.getSource().getValue();
			var oHeader = Number(oEvent.getSource().getBindingContext("jobItemDetailsModel").getPath().split('/')[2]);
			var oHeaderItem = oEvent.getSource().getBindingContext("jobItemDetailsModel").getObject("/Data/" + oHeader);
			var oHeaderTotalPrice = oHeaderItem.Total_Price;
			var oHeaderCGSTPer = oHeaderItem.CGST_Percent;
			var oHeaderSGSTPer = oHeaderItem.SGST_percent;
			var oHeaderIGSTPer = oHeaderItem.IGST_Percent;
			aItems.push(new sap.ui.model.Filter('Split', sap.ui.model.FilterOperator.EQ, oValue));
			aItems.push(new sap.ui.model.Filter('Total_Price', sap.ui.model.FilterOperator.EQ, oHeaderTotalPrice));
			aItems.push(new sap.ui.model.Filter('CGST_Percent', sap.ui.model.FilterOperator.EQ, oHeaderCGSTPer));
			aItems.push(new sap.ui.model.Filter('SGST_percent', sap.ui.model.FilterOperator.EQ, oHeaderSGSTPer));
			aItems.push(new sap.ui.model.Filter('IGST_Percent', sap.ui.model.FilterOperator.EQ, oHeaderIGSTPer));

			oSuccess = function(oData) {
				oBusyDialog.close();
				that.oItmDetlSet.CGST_Percent = oData.results[0].JobItmDtls.results[0].CGST_Percent;
				that.oItmDetlSet.CGST_INR = oData.results[0].JobItmDtls.results[0].CGST_INR;
				that.oItmDetlSet.Total_Price = oData.results[0].JobItmDtls.results[0].Total_Price;
				that.oItmDetlSet.Total_Amount = oData.results[0].JobItmDtls.results[0].Total_Amount;
				that.oItmDetlSet.Tax_Total = oData.results[0].JobItmDtls.results[0].Tax_Total;
				that.oItmDetlSet.SGST_percent = oData.results[0].JobItmDtls.results[0].SGST_percent;
				that.oItmDetlSet.SGST_INR = oData.results[0].JobItmDtls.results[0].SGST_INR;
				that.getView().getModel("jobItemDetailsModel").updateBindings(true);
			}.bind(that);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ItemDtlsSet", {
				filters: aItems,
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "JobItmDtls"
				}
			});
		},

		splitCalculate: function (iMainJobPath, sinpVal) {
			var aCalculatedSplit = [];
			var oObj = this.getView().getModel("jobItemDetailsModel").getData().Data[iMainJobPath];
			var sJobSplitValue = this.getView().getModel("jobItemDetailsModel").getProperty("/Data/" + iMainJobPath).Split;
			var aSplits = oObj.JobItmDtls;
			if (sinpVal) {
				this.UpdatedValue = (sJobSplitValue) - (sinpVal);
				if (this.UpdatedValue < 0) {
					MessageBox.show("Value is exceeding");
					this.oItmDetlSet.Split = "";
					oBusyDialog.close();
					return;
				}
			} else {
				for (var item = 0; item < aSplits.length; item++) {
					var iParseValue = parseInt(aSplits[item].Split);
					if (!isNaN(iParseValue)) {
						aCalculatedSplit.push(iParseValue);
					}
				}
				if (aCalculatedSplit.length > 0) {
					var iSplitFinalValue = aCalculatedSplit.reduce(function (resultSum, a) {
						return resultSum + a;
					});
					this.getView().getModel("jobItemDetailsModel").getData().Data[iMainJobPath].Split = 100 - (iSplitFinalValue);
				} else {
					this.getView().getModel("jobItemDetailsModel").getData().Data[iMainJobPath].Split = 100;
				}
			}
			this.getView().getModel("jobItemDetailsModel").updateBindings(true);
		},


		onNavtoDeferredJobItems: function(oEvt) {
			var that = this;
			var defPackageItem = [];

			that.oDefferredJobsFragment.getAggregation("items")[2].setVisible(false);
			that.oDefferredJobsFragment.getAggregation("items")[3].setVisible(true);
			var obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
			DefJobNo = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job

		/*	DefJobNo = oEvt.getSource().getBindingContext("DefferredJobsModel").getObject().Job;
			var oSelectedDefItm = oEvt.getSource().getBindingContext("DefferredJobsModel").getObject().Guid;
			var defDesc = oEvt.getSource().getBindingContext("DefferredJobsModel").getObject().Description;

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedDefJobItem", obj);
			that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);

			defPackageItem.PACKAGE_GUID = oSelectedDefItm;
			defPackageItem.PACKAGE_DESC = defDesc;

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedDefJob", defPackageItem);*/
			//that.getDefJobItemsDetails(DefJobNo);
			var aPackageItem = [];
			var obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
			JobNo = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job;
			var oSelectedItm = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Guid;
			var desc = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Description;
			var selectedDbFlg = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Db_Flg;

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedJobItem", obj);
			that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);

			aPackageItem.PACKAGE_GUID = oSelectedItm;
			aPackageItem.PACKAGE_DESC = desc;
			aPackageItem.DBFLG = selectedDbFlg;
			aPackageItem.Job_Type = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job_Type;
			aPackageItem.Job_concer_code = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job_concer_code;
			aPackageItem.Job_Status = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Status;

			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SelectedJob", aPackageItem);
			//that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/SplitButton", true);
			that.getDeffJobItemsDetails(DefJobNo);
		},

		getDefJobItemsDetails: function(defJob) {
			oBusyDialog.open();
			var that = this,
				oSuccess, oError, sFilter = [];
			// DBFLAG = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedDefJob").DBFLG;
			var sPackageGuid = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedDefJob").PACKAGE_GUID;
			// sPackageGuid = 'eNwuHANL7jsca{rciQ503G';

			if (sPackageGuid) {
				sFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, sPackageGuid));
			} else {
				sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
				sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, defJob));
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				var data = [];
				var sGUID = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedDefJob/PACKAGE_GUID");
				var sPackDesc = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedDefJob/PACKAGE_DESC");
				for (var i = 0; i < oData.results.length; i++) {
					data.push({
						"RO_No": RepairOrderNo,
						"Customer": oData.results[i].Customer,
						"Item_Type": oData.results[i].Item_Type,
						"Sublet_ID": oData.results[i].Sublet_ID,
						"Code": oData.results[i].Code,
						"Description": oData.results[i].Description,
						"Bill_To": oData.results[i].Bill_To,
						"Split": oData.results[i].Split,
						"Casual_Part": oData.results[i].Casual_Part,
						"Damage_Code": oData.results[i].Damage_Code,
						"UOM": oData.results[i].UOM,
						"Ordered_Qty": oData.results[i].Ordered_Qty,
						"Stock": oData.results[i].Stock,
						"Status": oData.results[i].Status,
						"Reserved_Qty": oData.results[i].Reserved_Qty,
						"Unit_Price": oData.results[i].Unit_Price,
						"Total_Price": oData.results[i].Total_Price,
						"CGST_Percent": oData.results[i].CGST_Percent,
						"CGST_INR": oData.results[i].CGST_INR,
						"SGST_percent": oData.results[i].SGST_percent,
						"SGST_INR": oData.results[i].SGST_INR,
						"IGST_Percent": oData.results[i].IGST_Percent,
						"IGST_INR": oData.results[i].IGST_INR,
						"Tax_Total": oData.results[i].Tax_Total,
						"Total_Amount": oData.results[i].Total_Amount,
						"Discount_Percent": oData.results[i].Discount_Percent,
						"Discount_INR": oData.results[i].Discount_INR,
						"First_Fill": oData.results[i].First_Fill,
						"Remarks": oData.results[i].Remarks,
						"Flag": oData.results[i].Flag,
						"JobItmDtls": oData.results[i].JobItmDtls.results,
						"Input": sGUID,
						"Descr1": sPackDesc,
						"Jb_Flg": DBFLAG,
						"Db_Flg": oData.results[i].Db_Flg,
						"__metadata": oData.results[i].__metadata
					});
				}
				var oModel = new JSONModel([]);
				that.getView().setModel(oModel, "DeferredJobItemsModel");
				that.getView().getModel("jobItemDetailsModel").setProperty("/Data", data);
			};
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Def_item_detailsSet", {
				filters: sFilter,
				success: oSuccess,
				error: oError,
				urlParameters: {
					"$expand": "DefJobItem"
				}
			});
		},

		onCheckListSegButtons: function(evt) {
			this.selectedKey = evt.getSource().getSelectedKey();
			// InspParametersModel
			// that.getView().setModel(oModel, "InspParametersModel");
			if (!DIfinaldatamain.some(e1 => e1.check_item === this.getView().getModel("InspParametersModel").getData()[0].check_item)) {
				DIfinaldatamain = DIfinaldatamain.concat(this.getView().getModel("InspParametersModel").getData());
			}
			var that = this;
			var selecteddatanewDI = DIfinaldatamain.filter(function(el) {
				return el.check_item === that.selectedKey;
			});
			if (selecteddatanewDI.length === 0) {
				that.ongetInspParameters(that.selectedKey);
			} else {
				this.getView().getModel("InspParametersModel").setData(selecteddatanewDI);
			}
		},
		
		onPressActionPerformed:function(evt){
			var sRMKVal1;
			if (!this._oPopoverAP) {
				this._oPopoverAP = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.ActionPerformed", this);
				this.getView().addDependent(this._oPopoverAP);
			}
			this._oPopoverAP.open();
			oRmk = evt.getSource();
			sRMKVal1 = evt.getSource().getBindingContext("subletModel").getObject().Action_Performed;
			this._oPopoverAP.getContent()[0].setValue(sRMKVal1);
		},

		onActionPerformedSave:function(oEvent){
			var ActionPerformed = oEvent.getSource().getParent().getContent()[0].getValue();
			oRmk.getBindingContext("subletModel").getObject().Action_Performed = ActionPerformed;
			this._oPopoverAP.close();
			this._oPopoverAP = null;
		},

		onActionPerformedCancel: function() {
			this._oPopoverAP.close();
		},
		
		onEdit: function(evt) {
			var sRMKVal;
			oAssignmentRemarks  = "";
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Remark", this);
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.open();
			oRmk = evt.getSource();
			if (selectedIconTab === "JobDetails") {
				if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
					sRMKVal = evt.getSource().getBindingContext("jobDetailsModel").getObject().Remarks;
				} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
					sRMKVal = evt.getSource().getBindingContext("jobItemDetailsModel").getObject().Remarks;
				}
			} else if (selectedIconTab === "Deputation") {
				sRMKVal = evt.getSource().getBindingContext("DeputationInfoModel").getObject().Remarks;
			} else if (selectedIconTab === "Sublet") {
				sRMKVal = evt.getSource().getBindingContext("subletModel").getObject().Remarks;
			} else if (selectedIconTab === "Inspection") {
				sRMKVal = evt.getSource().getBindingContext("InspectionResults").getObject().Remarks;
			}
			else if (selectedIconTab === "Assignment") {
				if(evt.getSource().getProperty("alt") === "SARemarks"){
					oAssignmentRemarks = "SARemarks";
					sRMKVal = evt.getSource().getBindingContext("TechnicianInfoModel").getObject().SA_Remarks;
				}
				else if(evt.getSource().getProperty("alt") === "FSRemarks"){
					oAssignmentRemarks = "FSRemarks";
					sRMKVal = evt.getSource().getBindingContext("TechnicianInfoModel").getObject().FS_Remarks;
				}
				else if(evt.getSource().getProperty("alt") === "QIRemarks"){
					oAssignmentRemarks = "QIRemarks";
					sRMKVal = evt.getSource().getBindingContext("TechnicianInfoModel").getObject().QI_Remarks;
				}	
			}
			this._oPopover.getContent()[0].setValue(sRMKVal);
		},

		onRemarkSave: function(oEvent) {
			var remarks = oEvent.getSource().getParent().getContent()[0].getValue();
			if (selectedIconTab === "JobDetails") {
				if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
					oRmk.getBindingContext("jobDetailsModel").getObject().Remarks = remarks;
				} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
					oRmk.getBindingContext("jobItemDetailsModel").getObject().Remarks = remarks;
				}
			} else if (selectedIconTab === "Deputation") {
				oRmk.getBindingContext("DeputationInfoModel").getObject().Remarks = remarks;
			} else if (selectedIconTab === "Sublet") {
				oRmk.getBindingContext("subletModel").getObject().Remarks = remarks;
			} else if (selectedIconTab === "Inspection") {
				oRmk.getBindingContext("InspectionResults").getObject().Remarks = remarks;
			}else if (selectedIconTab === "Assignment") {
				if(oAssignmentRemarks === "FSRemarks"){
					oRmk.getBindingContext("TechnicianInfoModel").getObject().FS_Remarks = remarks;
				}
				else if(oAssignmentRemarks === "SARemarks"){
					oRmk.getBindingContext("TechnicianInfoModel").getObject().SA_Remarks = remarks;
				}
				else if(oAssignmentRemarks === "QIRemarks"){
					oRmk.getBindingContext("TechnicianInfoModel").getObject().QI_Remarks = remarks;
				}
			}
			this._oPopover.close();
			this._oPopover = null;
		},
		
		onRemarksCancel: function() {
			this._oPopover.close();
		},

		onSelectInvoice: function(oEvt) {
			var that = this;
			// var selJobNo = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job;
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprint", false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/incrdvoiceprint", false);
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprintoroframa", false);
			// SelectedBillto="";
			// if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Bill_To === "Customer"){
			// 	SelectedBillto="1";
			// }else if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Bill_To === "Insurance"){
			// 	SelectedBillto="2";
			// }else if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Bill_To === "Dealer"){
			// 	SelectedBillto="3";
			// }
			SelectedBillto=oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Bill_To;
			SelectedInvoiceVal = oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Invoice_No;
			// SelectedInvoiceVal = oEvt.getSource().getBindingContext("InvoiceListInfoModel").getObject().Invoice_No;
			if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Type ==="Invoice"){
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprint", true);
				if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Status ==="Inactive"){
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",false);
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceactiveflag", false);
				}else{
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",true);
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceactiveflag", true);
				}
			}else if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Type ==="Credit note"){
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/incrdvoiceprint", true);
			}else if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Type ==="Proforma"){
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoiceprintoroframa", true);
			}
			
			
			// if(oEvt.getSource().getSelected() === true){
			that.getInvoiceTabInfo();
			that.oInvoiceFragment.getAggregation("items")[3].setVisible(true);
			that.oInvoiceFragment.getAggregation("items")[4].setVisible(true);
			that.oInvoiceFragment.getAggregation("items")[5].setVisible(true);
			that.oInvoiceFragment.getAggregation("items")[6].setVisible(true);
			if(oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Status ==="Inactive" && oEvt.getParameter("listItem").getBindingContext("InvoiceListInfoModel").getObject().Type === "Invoice" ){
			that.oInvoiceFragment.getAggregation("items")[7].setVisible(true);
			// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",false);
			}else{
				that.oInvoiceFragment.getAggregation("items")[7].setVisible(false);
				// that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",true);
			}
		// }
			// else{
			// 	that.oInvoiceFragment.getAggregation("items")[3].setVisible(false);
			// 	that.oInvoiceFragment.getAggregation("items")[4].setVisible(false);
			// 	that.oInvoiceFragment.getAggregation("items")[5].setVisible(false);
			// 	that.oInvoiceFragment.getAggregation("items")[6].setVisible(false);	
			// 	that.oInvoiceFragment.getAggregation("items")[7].setVisible(false);
			// 	that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Clickancelflag",false);
			// }
		},
		
		onPressVinNumber:function(){
			if (!this._VINValueHelpDialog1) {
				// this._VINValueHelpDialog1.destroy();
				this._VINValueHelpDialog1 = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.VINDetails", this);
				this.getView().addDependent(this._VINValueHelpDialog1);
			}
			if(this.getOwnerComponent().getModel("oLocalJsonModel").getData().SubServiceTypeValue === "903" ||
			this.getOwnerComponent().getModel("oLocalJsonModel").getData().SubServiceTypeValue === "PDI-2 Service"){
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/bodyBuldingEnable", true);
			}else{
				this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/bodyBuldingEnable", false);
			}
			this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
			this.getBodyBuildingInfo();
			this._VINValueHelpDialog1.open();
		},

		onCancelBodyBLD:function(){
			this._VINValueHelpDialog1.close();
		},

		onChangeJCLevelTechnician: function(oEvt) {
			var that=this;
			that.itemorJOB="";
			that.AssignedJobNos="";
			that.AssignedItemNos="";
			if (!that._jcTechsValueHelpDialog) {
				that._jcTechsValueHelpDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JCTechniciansList", that);
				that.getView().addDependent(that._jcTechsValueHelpDialog);
			}
			var data=that.getView().getModel("jcLevelTechniciansModel").getData();
			data.forEach(function(record){
				if(that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Technicianheaderlevel").Technician.indexOf(record.Value)>= 0){
					record.selected=true;
				}else{
					record.selected=false;	
				}
			})
			that.getView().getModel("jcLevelTechniciansModel").updateBindings(true);
			that._jcTechsValueHelpDialog.open();
			that._jcTechsValueHelpDialog.setConfirmButtonText("Select");
		},
		
		onChangeAssTechJob:function(oeve){
			this.itemorJOB= oeve.getSource().getBindingContext("TechnicianInfoModel").getPath();
			this.AssignedJobNos = oeve.getSource().getBindingContext("TechnicianInfoModel").getObject().Job_No;
			this.AssignedItemNos = oeve.getSource().getBindingContext("TechnicianInfoModel").getObject().Item_No;
			
			if (!this._jcTechsValueHelpDialog) {
				this._jcTechsValueHelpDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.JCTechniciansList", this);
				this.getView().addDependent(this._jcTechsValueHelpDialog);
			}
			// this._jcTechsValueHelpDialog.clearSelection();
			var data=this.getView().getModel("jcLevelTechniciansModel").getData();
			data.forEach(function(record){
				if(oeve.getSource().getBindingContext("TechnicianInfoModel").getObject().Technician.indexOf(record.Value)>= 0){
					record.selected=true;
				}else{
					record.selected=false;	
				}
			})
			this.getView().getModel("jcLevelTechniciansModel").updateBindings(true);
			this._jcTechsValueHelpDialog.open();
			this._jcTechsValueHelpDialog.setConfirmButtonText("Assign");

		},

		// onJCTableSelectCancel:function(){
		// 	this._jcTechsValueHelpDialog1.close();
		// },

		onJCTechTableSelectOK:function(oeve){
			var selecteditems=sap.ui.getCore().byId("table").getSelectedItems();
		var selecteddata=[];
		selecteditems.forEach(function(item){
		 selecteddata.push(item.getBindingContext("jcLevelTechniciansModel").getObject());
		})
		this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobCardjoblevetech", selecteddata);		
		this.getView().getModel("TechnicianInfoModel").getData();
		this._jcTechsValueHelpDialog1.close();
		this.onAssignmenttabAssignTechnician();
		},

		onPressWarrantySettings: function() {
			oBusyDialog.open();
			if (!this._oWarrantySettingDialog) {
				this._oWarrantySettingDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.WarrantySettings", this);
				this.getView().addDependent(this._oWarrantySettingDialog);
			}
			var selectedItems = sap.ui.getCore().byId("warrantyTableId").getSelectedIndices();
				var aFilters = [];
					if(selectedItems.length>0){
						var aWarrantyData = this.getView().getModel("warrantyInfoModel").getData();
						for(var i=0;i<selectedItems.length;i++){
						  var idx = selectedItems[i];
						  var oSelectedCat = aWarrantyData[idx].wty_cat;
						 // var oFilter = new Filter('wty_cat', "Eq", oSelectedCat);
						  aFilters.push(new sap.ui.model.Filter('wty_cat', sap.ui.model.FilterOperator.EQ, oSelectedCat));
					}
				}
			this.getWarrantySettingsInfo(aFilters);
			this._oWarrantySettingDialog.open();
		},

		onPressCNIRNs: function() {
			if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
				var hash = (oCrossAppNavigator.hrefForExternal({
					target: {
						semanticObject: "ZCNIRN",
						action: "display"
					}
				})) || "";

				var url = window.location.href.split('#')[0] + hash;
				sap.m.URLHelper.redirect(url, true);
			}
		},
		
		_ReadItemInfoTable:function(jobnrval,JC_No,type,PCRBilltoVal){
		var that=this;
		oBusyDialog.open();
		var oSuccessItemInfoTable = function(oData) {
			// oBusyDialog.close();
			var data=oData.results;
		var formateddata=[]
			for(var i=0;i<data.length;i++){
				formateddata.push({
					"PCR":data[i].PCR,
					"Clmno":data[i].Clmno,
					"Creadat":data[i].Creadat,
					"JCNo":data[i].JCNo,
					// "Part_code":data[i].Part_code,
					 "Jobnr":data[i].Jobnr,
					"AstateDes":data[i].AstateDes,
					"Astate":data[i].Astate,
					"OrderNo":data[i].OrderNo,
					"Item":data[i].Item,
					"PartNo":data[i].PartNo,
					"Description":data[i].Description,
					"Qty":data[i].Qty,
					"Stock":data[i].Stock,
					"UnitMeasure":data[i].UnitMeasure,
					"UnitPrice":data[i].UnitPrice,
					"BillTo":data[i].BillTo,
					"TotalAmount":data[i].TotalAmount,
					"Split_per":data[i].Split_per,
					"SplitAmount":data[i].SplitAmount,
					"SplitTax":data[i].SplitTax,
					"App_per":data[i].App_per,
					"AppAmount":data[i].AppAmount,
					"AppTax":data[i].AppTax,
					"ApproverRemark":data[i].ApproverRemark,
					"Status":data[i].Status,
					"JCremark":data[i].JCremark,
					"Splnr":data[i].Splnr,
					// "ItemRejection":data[i].ItemRejection,
					"Days":data[i].Days,
					"Kms":data[i].Kms,
					"Hrs":data[i].Hrs,
					"PartsRequest":data[i].PartsRequest,
					"RejectReasons":data[i].RejectReasons,
					"Approverrequest":data[i].Approverrequest,
					"DispatchedStatus":data[i].DispatchedStatus,
					"BilltoName":data[i].BilltoName,
					"MSG":data[i].MSG,
					"Action":"CREATE",
					"FieldName":data[i].FieldName
			});
				for(var j=0;j<data[i].HDRTOITEMNAV.length;j++){
					formateddata.push(data[i].HDRTOITEMNAV[j]);
				}
			}

			if(type === "BillTo"){
			that.dispPCRBillto(formateddata);
			}else{
		var finaldata={
			OrderNo:JC_No,
			Jobnr:jobnrval,
			Action:"CREATE",
			BillTo:PCRBilltoVal,
			Clmno:"",
			Creadat:"",
			Astate:"",
			HDRTOITEMNAV:formateddata
		};

		that.getOwnerComponent().getModel("ZSVC_ODATA_PCR_APPROVAL_SRV").create("/ZPCR_HeaderListEntitySet",finaldata , {
				success: function (oEvent) {
					oBusyDialog.close();
					if(oEvent.Flag === "E"){
						sap.m.MessageBox.error(oEvent.MSG);
					}else{
					sap.m.MessageBox.success(oEvent.MSG);
					if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
						var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
						var hash = (oCrossAppNavigator.hrefForExternal({
							target: {
								semanticObject: "ZPCRAPP",
								action: "display"
							}
							
						})) || "";

						var url = window.location.href.split('#')[0] + hash;
						sap.m.URLHelper.redirect(url, true);
					}
				}
				},
					error: function (err) {
						oBusyDialog.close();
						sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
					}
				});


			}
			
		};
		var oErrorItemInfoTable = function(err) {
			oBusyDialog.close();

			sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
		};
			 var sFilters = [];
			
			
			 sFilters.push(new sap.ui.model.Filter("JCNo", sap.ui.model.FilterOperator.EQ,JC_No));
			  sFilters.push(new sap.ui.model.Filter("Clmno", sap.ui.model.FilterOperator.EQ, ""));
			   sFilters.push(new sap.ui.model.Filter("Creadat", sap.ui.model.FilterOperator.EQ, ""));
			    sFilters.push(new sap.ui.model.Filter("Astate", sap.ui.model.FilterOperator.EQ, ""));
				sFilters.push(new sap.ui.model.Filter("Jobnr", sap.ui.model.FilterOperator.EQ, jobnrval));
				sFilters.push(new sap.ui.model.Filter("BillTo", sap.ui.model.FilterOperator.EQ, selectedBillToForClaim));
				sFilters.push(new sap.ui.model.Filter("Splnr", sap.ui.model.FilterOperator.EQ, SplitNumber));
				that.getOwnerComponent().getModel("ZSVC_ODATA_PCR_APPROVAL_SRV").read("/ZPCR_HeaderListEntitySet", {
				filters: sFilters,
				urlParameters: {
					"$expand": "HDRTOITEMNAV"
				},
			success: oSuccessItemInfoTable,
			error: oErrorItemInfoTable
		});	
},


		onPressPCR: function(oEvt) {
			this.PCRselJobNo = oEvt.getSource().getBindingContext("jobDetailsModel").getObject().Job;
			

			this._ReadItemInfoTable(this.PCRselJobNo,RepairOrderNo,"BillTo");
			// if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
			// 	var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			// 	var hash = (oCrossAppNavigator.hrefForExternal({
			// 		target: {
			// 			semanticObject: "ZPCRAPP",
			// 			action: "display"
			// 		}
			// 		// PCR Creation
			// 		// ,params: {
			// 		// 	action: "ZJOB_CARD",
			// 		// 	Job_No: selJobNo,
			// 		// 	JC_No: RepairOrderNo
			// 		// }
			// 		// PCR Creation
			// 	})) || "";

			// 	var url = window.location.href.split('#')[0] + hash;
			// 	sap.m.URLHelper.redirect(url, true);
			// }
		},

		dispPCRBillto:function(data){
		if (!this._BilltoPCRDialog) {
			this._BilltoPCRDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.BillTo", this);
			this.getView().addDependent(this._BilltoPCRDialog);
		}
		this.getBilltoPopupdata();
		//removing duplicate Bill to from array
		//var data1 =  data.filter((v,i,a)=>a.findIndex(v2=>(v.BilltoName === v2.BilltoName))===i);		
	},
	getBilltoPopupdata:function(){
			var sFilters = [],
				that = this,
				 oSuccess2, oError;
			sFilters.push(new sap.ui.model.Filter('VBELN', sap.ui.model.FilterOperator.EQ,RepairOrderNo ));
			sFilters.push(new sap.ui.model.Filter('JOBNR', sap.ui.model.FilterOperator.EQ, this.PCRselJobNo));
			oSuccess2 = function(oData) {
				var oJSONModel = new JSONModel(oData.results);
				that.getView().setModel(oJSONModel, "PCRBillToModel");
				that._BilltoPCRDialog.open();
				oBusyDialog.close();
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZSVC_ODATA_PCR_APPROVAL_SRV").read("/Bill_ToSet", {
				filters: sFilters,
				success: oSuccess2,
				error: oError
			});
	},
	onBillToChange: function(oEvent) {
		var oComboBox = sap.ui.getCore().byId("PCRBillto");
		selectedBillToForClaim = oComboBox.getSelectedKey();		
		var oSelectedItem = oComboBox.getSelectedItem();
        var oModel = this.getView().getModel("PCRBillToModel");
        var aData = oModel.getProperty("/");
        if (oSelectedItem && aData) {
            var selectedIndex = aData.findIndex(function(item) {
            return item.BILL_TO === oSelectedItem.getKey();
            });
            if (selectedIndex !== -1) {
                SplitNumber = aData[selectedIndex].SPLIT;
            }
        }
	},	
	onBilltoSelect:function(oEvent){
		var PCRBilltoKey = sap.ui.getCore().byId("PCRBillto").getSelectedKey();
		if(PCRBilltoKey !== ""){
			this.onBilltoClose();
		this._ReadItemInfoTable(this.PCRselJobNo,RepairOrderNo,"Create",PCRBilltoKey);
		}else{
			MessageBox.error("Please select Bill To");
		}
	},

	onBilltoClose:function(oEvent){
		this._BilltoPCRDialog.close();
		this._BilltoPCRDialog.destroy();
		this._BilltoPCRDialog = null;
	},
		
		onCloseWarrantySettings: function() {
			this._oWarrantySettingDialog.close();
			this.getView().getModel("warrantySettingInfoModel").setData(null);
		},

		onAddSubletRow: function(oEvt) {
			var that = this;
			var newObject = {
				"Action_Performed": "",
				"Aggregate": "",
				"Bill_To": "",
				"Db_Flg": "",
				"Flag": "",
				"Concern": "",
				"FRM_Code": "",
				"Invoice_Amount": "",
				"Invoice_Date": "",
				"Invoice_No": "",
				"Remarks": "",
				"Job": "",
				"Sublet_Duration": "",
				"Sublet_End_DT": "",
				"Sublet_Kms": "",
				"Sublet_No": "",
				"Sublet_Start_DT": "",
				"Vendor_Name": ""
			};

			newObject.Sublet_No = that.subletData.length + 1;
			that.subletData.push(newObject);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(that.subletData);
			that.getView().setModel(oModel, "subletModel");
		},

		onSave: function() {
			if (selectedIconTab === "VehicleDetails") {
				this.OnSaveVehicleOverViewDetails();
			}
			if (selectedIconTab === "Inspection" && this.SelectedView === "Exterior") {
				this.onSaveExteriorData();
				this.onSaveImgIsnp();
			}
			if (selectedIconTab === "Sublet") {
				this.onSaveSubletData();
			}
			if (selectedIconTab === "Invoice") {
				this.onSaveInvoiceData();
			}
			if (selectedIconTab === "AccidentTAT") {
				this.onSaveAccidentTAT();
			}

			if (selectedIconTab === "Assignment") {
				if (AssignmentSegButton === "Technician") {
					this.onSaveAssignmentTechnician();
				}
				if (AssignmentSegButton === "Parts") {
					this.onSaveAssignmentParts();
				}
			}

			if (selectedIconTab === "Inspection" && InspSelectedSegButton === "Inventory") {
				this.onSaveInventoryData();
				this.onSaveInventoryTyreTable();
			}
			if (selectedIconTab === "Inspection" && InspSelectedSegButton === "CheckList") {
				this.onSaveCheckListData();
			}
			if (selectedIconTab === "ApprovalLog") {
				this.onSaveApprovalLog();
			}
			if (selectedIconTab === "Deputation") {
				this.onSaveDeputationData();
			}
			if (selectedIconTab === "CheckIn") {
				this.onSaveCheckInData();
			}
			if (selectedIconTab === "RoadTest") {
				this.onCreateRoadTest();
			}
			if (selectedIconTab === "Checklist") {
				this.onSaveCheckListTab();
			}
			if (selectedIconTab === "JobDetails") {
				if (sap.ui.getCore().byId("jobDetailsID")) {
					if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
						this.onSaveJobDetails();
					} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
						this.onSaveJobItemDetails();
					}
				}
			}
		},

		onSaveSubletData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			var oObject = {
				"RO_No": RepairOrderNo,
				"SUBLET_TAB": []
			};

			var reqFlag = "";
			for (var j = 0; j < that.subletData.length; j++) {
				if (!that.subletData[j].Concern || !that.subletData[j].FRM_Code || !that.subletData[j].Sublet_Start_DT ||
					!that.subletData[j].Aggregate || !that.subletData[j].Bill_To || !that.subletData[j].Vendor_Name||
					!that.subletData[j].Invoice_Amount) {
					reqFlag = true;
					break;
				}
			}

			if (reqFlag === true) {
				oBusyDialog.close();
				MessageBox.error("Please fill required fields");
				return;
			}

			for (var y = 0; y < that.subletData.length; y++) {
				oObject.SUBLET_TAB.push({
					"RO_No": RepairOrderNo,
					"Action_Performed": that.subletData[y].Action_Performed,
					"Aggregate": that.subletData[y].Aggregate,
					"Bill_To": that.subletData[y].Bill_To,
					"Concern": that.subletData[y].Concern,
					"FRM_Code": that.subletData[y].FRM_Code,
					"Invoice_Amount": that.subletData[y].Invoice_Amount,
					"Invoice_Date": that.subletData[y].Invoice_Date,
					"Invoice_No": that.subletData[y].Invoice_No,
					"Remarks": that.subletData[y].Remarks,
					"Sublet_Duration": that.subletData[y].Sublet_Duration.toString(),
					"Sublet_End_DT": that.subletData[y].Sublet_End_DT,
					"Sublet_Kms": that.subletData[y].Sublet_Kms,
					"Sublet_No": that.subletData[y].Sublet_No.toString(),
					"Sublet_Start_DT": that.subletData[y].Sublet_Start_DT,
					"Vendor_Name": that.subletData[y].Vendor_Name,
					"Job": that.subletData[y].Jobnr,
					"Db_Flg": that.subletData[y].Db_Flg
				});
			}

			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Sublet_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getSubletData();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onPressAddInsurance: function() {
			if (!this._AddInsuranceDialog) {
				this._AddInsuranceDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.InsuranceDetails", this);
				this.getView().addDependent(this._AddInsuranceDialog);
			}
			this.getPolicyType();
			var obj = {};
			obj.Insurance_Name = "";
			obj.Policy_No = "";
			obj.Policy_Type = "";
			obj.Valid_From = "";
			obj.Valid_To = "";
			obj.MaxMinDate = new Date();

			var insuranceFormJSON = new JSONModel(obj);
			this.getView().setModel(insuranceFormJSON, "InsuranceDetailModel");
			this._AddInsuranceDialog.open();

		},

		onConfirmInsName: function(oEvent) {
			var oObject = oEvent.getParameter("selectedItem").getBindingContext("InsuranceNamesListModel").getObject();
			this._AddInsuranceDialog.getModel("InsuranceDetailModel").getData().Insurance_Name = oObject.Description;
			this._AddInsuranceDialog.getModel("InsuranceDetailModel").setProperty("/Ins_Code", oObject.Value);
			this._AddInsuranceDialog.getModel("InsuranceDetailModel").updateBindings(true);
			this._AddInsuranceDialog.getModel("InsuranceDetailModel").refresh(true);
		},

		onCancelInsuranceAdd: function() {
			this._AddInsuranceDialog.close();
		},

		onInsNameValueHelp: function() {
			if (!this._AddInsuranceNameDialog) {
				this._AddInsuranceNameDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.InsuranceNamesList", this);
				this.getView().addDependent(this._AddInsuranceNameDialog);
			}
			this.getInsuranceNameList();
			this._AddInsuranceNameDialog.open();
		},

		onCreateInsuranceAdd: function() {
			// oBusyDialog.open();
			var that = this;
			var errmessage;
			that.InsuranceDetailsData = this._AddInsuranceDialog.getModel("InsuranceDetailModel").getData();
			var InsuranceDetailsArray = [];
			InsuranceDetailsArray.push(that.InsuranceDetailsData);
			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"INSURANCE": []
			};
			if (InsuranceDetailsArray) {
				for (var y = 0; y < InsuranceDetailsArray.length; y++) {
					oObject.INSURANCE.push({
						"VIN": VinNo,
						"Customer_No": CustID,
						"Insurance_Name": InsuranceDetailsArray[y].Insurance_Name,
						"Policy_No": InsuranceDetailsArray[y].Policy_No,
						"Policy_Type": InsuranceDetailsArray[y].Policy_Type,
						"Valid_From": InsuranceDetailsArray[y].Valid_From,
						"Valid_To": InsuranceDetailsArray[y].Valid_To,
						"GSTN_No": InsuranceDetailsArray[y].Bill_To,
						"Remaining_Days": InsuranceDetailsArray[y].Concern,
						"Status": InsuranceDetailsArray[y].FRM_Code,
						"Ins_Code": InsuranceDetailsArray[y].Ins_Code
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Insurance_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "T") {
						MessageBox.success(oData.Msg);
					}
					that._AddInsuranceDialog.close();
					that.getInsuranceDetails(oData.INSURANCE.results[0].Customer_No);
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onSaveRejectedJobs: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"REJECTED_JOBS": []
			};
			if (aSelectedRejJobItems) {
				for (var y = 0; y < aSelectedRejJobItems.length; y++) {
					oObject.REJECTED_JOBS.push({
						"VIN": VinNo,
						"Rejected_Code": aSelectedRejJobItems[y].Rejected_Code,
						"Job_Source": aSelectedRejJobItems[y].Job_Source,
						"Job_No": aSelectedRejJobItems[y].Job_No,
						"Reason": aSelectedRejJobItems[y].Reason,
						"Voice": aSelectedRejJobItems[y].Voice,
						"Job_Card_No": aSelectedRejJobItems[y].Job_Card_No,
						"Job_Card_Dt_Tm": aSelectedRejJobItems[y].Job_Card_Dt_Tm,
						"Dealer_Name_Loc": aSelectedRejJobItems[y].Dealer_Name_Loc,
						"NA_Reason": aSelectedRejJobItems[y].NA_Reason,
						"Stock": aSelectedRejJobItems[y].Stock
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Rejected_Jobs_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					// aSelectedRejJobItems = [];
					if (oData.Flag === "T") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onSaveRecalls: function(flag) {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			var oObject = {
				"RO_No": RepairOrderNo,
				"RECALL": []
			};
			if (aSelectedSrvMeasures) {
				for (var y = 0; y < aSelectedSrvMeasures.length; y++) {
					oObject.RECALL.push({
						"VIN": VinNo,
						"Type": aSelectedSrvMeasures[y].Type,
						"Campaign_No": aSelectedSrvMeasures[y].Campaign_No,
						"Campaign_Name": aSelectedSrvMeasures[y].Campaign_Name,
						"Valid_To": aSelectedSrvMeasures[y].Valid_To,
						"Fault_Type": aSelectedSrvMeasures[y].Fault_Type,
						"Remaining_Days": aSelectedSrvMeasures[y].Remaining_Days,
						"Stock": aSelectedSrvMeasures[y].Stock,
						"Remarks": aSelectedSrvMeasures[y].Remarks,
						"Info": aSelectedSrvMeasures[y].Info,
						"Flag": aSelectedSrvMeasures[y].Flag,
						"Msg": aSelectedSrvMeasures[y].Msg
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Recall_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
				
					if (oData.Flag === "S") {
						if(!flag){
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
						}
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}else{
						if(!flag){
						MessageBox.show("Loaded Sucessfully", sap.m.MessageBox.Icon.SUCCESS, "Success");
						}
					}
					that.getMeasuresRecalls();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		OnSaveVehicleOverViewDetails: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			this.CustData = that.getView().getModel("customerInfoModel").getData();
			this.VehicleData = that.getView().getModel("vehicleInfoModel").getData();
			this.JCData = that.getView().getModel("jobCardInfoModel").getData();
			this.OtherInfoData = that.getView().getModel("otherInfoModel").getData();
            var ServiceTableIndices = sap.ui.getCore().byId("idSrvMeasure").getSelectedIndices();
			var ServiceTableModel = this.getView().getModel("measuresRecallsInfoModel").getData();
			if(ServiceTableModel.length === 0){
				ServiceTableIndices = [];
			}
			var ObjectData = {};
			ObjectData.Service_Type = that.getView().getModel("localJCDeatils").getData().ServiceTypeCode,
				ObjectData.Serv_Sub_Type = that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode,
				ObjectData.Onsite_Flag = that.getView().getModel("localJCDeatils").getData().OnSite,
				ObjectData.Cust_ID = this.CustData.Cust_ID;
			ObjectData.KAM = this.CustData.KAM_Toggle;
			ObjectData.Rakshana = this.CustData.Rakshana;
			ObjectData.SEZ = this.CustData.SEZ_Toggle;
			ObjectData.Reg_No = this.VehicleData.Reg_No;
			ObjectData.VIN = this.CustData.VIN;
			ObjectData.Odometer_Replaced_Kms_Hrs = this.CustData.Cust_ID;
			ObjectData.Prev_Odometer_Kms = this.VehicleData.Prev_Kms;
			ObjectData.Prev_Odometer_Hrs = this.VehicleData.Prev_Hrs;
			// ObjectData.Prev_Odometer_Hrs = 1000;
			ObjectData.Curr_Odometer_Kms = this.VehicleData.Curr_Kms;
			ObjectData.Curr_Odometer_Hrs = this.VehicleData.Curr_Hrs;
			ObjectData.TC_Odometer_Kms = this.VehicleData.TC_Kms;
			ObjectData.TC_Odometer_Hrs = this.VehicleData.TC_Hrs;
			ObjectData.Chassis = this.VehicleData.Chassis;
			ObjectData.PDI1 = this.VehicleData.PDI1;
			ObjectData.PDI2 = this.VehicleData.PDI2;
			ObjectData.JC_No = this.JCData.JC_No;
			ObjectData.Rework = this.JCData.Rework;
			ObjectData.Add_Job = this.JCData.Add_Job;
			ObjectData.Physical_Status = this.JCData.Physical_Status;
			ObjectData.Express_Service = this.OtherInfoData.Express_Service;
			ObjectData.Appointment_Flag = this.OtherInfoData.Appointment_Flag;
			ObjectData.Connectivity = this.OtherInfoData.Connectivity;
			ObjectData.Revisit = this.OtherInfoData.Revisit;
			ObjectData.Repeat = this.OtherInfoData.Repeat;
			ObjectData.Reopen = this.OtherInfoData.Reopen;
			ObjectData.Instant_Feedback = this.OtherInfoData.Instant_Feedback;
			ObjectData.Third_Day_PSF = this.OtherInfoData.Third_Day_PSF;
			ObjectData.Tenth_Day_PSF = this.OtherInfoData.Tenth_Day_PSF;
			ObjectData.LocTyp = sap.ui.getCore().byId("locTypeId").getSelectedKey(),
				ObjectData.Location = sap.ui.getCore().byId("locId").getValue(),
				ObjectData.Bill_To = sap.ui.getCore().byId("BilltoOverveiwId").getSelectedKey()
           var fl = "";
			var POSTflag = "T";
			if (!ObjectData.Service_Type || !ObjectData.Serv_Sub_Type) {
				oBusyDialog.close();
				POSTflag = "N";
				MessageBox.error("Please select Service Type and Sub service type to create service order");
				return;
			} else if (!ObjectData.Curr_Odometer_Kms || !ObjectData.Curr_Odometer_Hrs) {
				oBusyDialog.close();
				POSTflag = "N";
				MessageBox.error("Please enter Current Odometer details to create service order");
				return;
			}else if(ServiceTableModel.length !== ServiceTableIndices.length ){
				oBusyDialog.close();
				POSTflag = "N";
				MessageBox.error("Load all the SM/Recall Campaigns and Proceed further");
				return;
		 } else if (ObjectData.Curr_Odometer_Kms) {
				if (parseInt(ObjectData.Curr_Odometer_Kms) < parseInt(ObjectData.Prev_Odometer_Kms) ||
					parseInt(ObjectData.Curr_Odometer_Hrs) < parseInt(ObjectData.Prev_Odometer_Hrs)) {
					oBusyDialog.close();
					POSTflag = "N";
					MessageBox.warning("Current Odometer details should not be less than Previous Odomter details", {
						title: "Warning",
						actions: [MessageBox.Action.CLOSE, MessageBox.Action.OK],
						onClose: function(sAction) {
							if (sAction === "OK") {
								POSTflag = "T";
								that.onSaveVehicleDetails(ObjectData, POSTflag);
							}
						}
					});
				} else if (POSTflag === "T") {
					that.onSaveVehicleDetails(ObjectData, POSTflag);
				}
			}
		},

		onSaveVehicleDetails(ObjectData, POSTflag) {
			oBusyDialog.open();
			// return;
			var that = this;
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			
			
			
			if (POSTflag === "T") {
				Model.create("/Ovrvw_Scr_DetSet", ObjectData, {
					async: true,
					success: function(oData, oResponse) {
						oBusyDialog.close();
						if (oData.Flag === "F") {
							MessageBox.error(oData.Msg);
						}
						if (oData.Flag === "E") {
							MessageBox.error(oData.Msg);
						}
						if (oData.Flag === "W") {
							MessageBox.warning(oData.Msg);
						//	that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
						}
						if (oData.Flag === "T") {
							MessageBox.success(oData.Msg);
							RepairOrderNo = oData.JC_No;
							that.onSaveRecalls("X");
							that.getView().getModel("localJCDeatils").setProperty("/RepairOrderNo", oData.JC_No);
							that.getView().getModel("localJCDeatils").setProperty("/SubServiceType", oData.Srv_Subtype_Des);
							that.getView().getModel("localJCDeatils").setProperty("/ServiceType", oData.Service_Type);
							that.getView().getModel("localJCDeatils").setProperty("/Status", "New");
							that.getView().getModel("localJCDeatils").setProperty("/OverViewHeadrerDate", oData.Creation_Dt);
							that.getView().getModel("localJCDeatils").setProperty("/createDrpAll", false);
							that.getView().getModel("localJCDeatils").setProperty("/createInputAll", true);
							that.getView().getModel("oLocalJsonModel").setProperty("/saveFlagEnabled", false);
							that.saveVehicle = true;
							that.getView().getModel("localJCDeatils").setProperty("/saveFlagDisable", false);
							that.getView().getModel("localJCDeatils").updateBindings(true);
							that.getVehicleInformation();
							that.getJobCardInformation();
						}
						//that.onSaveRecalls();
					},
					error: function(err) {
						oBusyDialog.close();
						errmessage = error.responseText;
						errmessage = JSON.parse(errmessage);
						errmessage = errmessage.error.message.value;
						sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
					}
				});
			}
		},

		onSaveInvoiceData: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;
			// that.InvoiceData = that.getView().getModel("InvoiceInfoModel").getData();
			that.InvoiceData=that.getOwnerComponent().getModel("oLocalJsonModel").getData()["InvoiceInfoModel"];
			var InvObject = {};
			
			InvObject.Invoice_No = that.InvoiceData.Invoice_No;
			InvObject.GST_Invoice1 = that.InvoiceData.GST_Invoice1;
			InvObject.Invoice_Date = that.InvoiceData.Invoice_Date;
			InvObject.Invoice_Type = that.InvoiceData.Invoice_Type;
			InvObject.Status = that.InvoiceData.Status;
			InvObject.Invoice_Amount = that.InvoiceData.Invoice_Amount;
			InvObject.Remarks = that.InvoiceData.Remarks;
			InvObject.IRN_Requested_Date = that.InvoiceData.IRN_Requested_Date;
			InvObject.IRN_Number = that.InvoiceData.IRN_Number;
			InvObject.IRN_Received_Date = that.InvoiceData.IRN_Received_Date;
			InvObject.IRN_Error_Msg = that.InvoiceData.IRN_Error_Msg;
			InvObject.Payment_Mode = that.InvoiceData.Payment_Mode;
			InvObject.Bank_Name = that.InvoiceData.Bank_Name;
			InvObject.DD_Check = that.InvoiceData.DD_Check;
			InvObject.UTR = that.InvoiceData.UTR;
			InvObject.UTR_Date = that._dateconversion(that.InvoiceData.UTR_Date);
			InvObject.DD_Check_Date = that._dateconversion(that.InvoiceData.DD_Check_Date);
			InvObject.Biil_To_Account = that.InvoiceData.Biil_To_Account;
			InvObject.Customer_GSTIN = that.InvoiceData.Customer_GSTIN;
			InvObject.SEZ_Flag = that.InvoiceData.SEZ_Flag;
			InvObject.Customer_Total_Amt = that.InvoiceData.Customer_Total_Amt;
			InvObject.Customer_Amount = that.InvoiceData.Customer_Amount;
			InvObject.Parts_TCS_Tax_Amount = that.InvoiceData.Parts_TCS_Tax_Amount;
			InvObject.Agreement_Name = that.InvoiceData.Agreement_Name;
			InvObject.Loyalty_Points_Redeemed = that.InvoiceData.Loyalty_Points_Redeemed;
			InvObject.KAM_Discount = that.InvoiceData.KAM_Discount;
			InvObject.Insurer_Name = that.InvoiceData.Insurer_Name;
			InvObject.Insurer_GSTIN = that.InvoiceData.Insurer_GSTIN;
			InvObject.Insurance_Policy_Deductible = that.InvoiceData.Insurance_Policy_Deductible;
			InvObject.Insurer_Total = that.InvoiceData.Insurer_Total;
			InvObject.Cancelled_Invoice_No = that.InvoiceData.Cancelled_Invoice_No;
			InvObject.Cancelled_Date = that.InvoiceData.Cancelled_Date;
			InvObject.Credit_Note_No = that.InvoiceData.Credit_Note_No;
			InvObject.CN_IRN_Requested_Date = that.InvoiceData.CN_IRN_Requested_Date;
			InvObject.CN_IRN_No = that.InvoiceData.CN_IRN_No;
			InvObject.CN_IRN_Received_Date = that.InvoiceData.CN_IRN_Received_Date;
			InvObject.CN_IRN_Error_Msg = that.InvoiceData.CN_IRN_Error_Msg;
			InvObject.Sales_Order = that.InvoiceData.Sales_Order;

			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Invoice_TabSet", that.InvoiceData, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getInvoiceTabInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		_dateconversion:function(value){
			if(value ==="" || value ===null || value==="00000000"){
				return "";
			}
		return	value.getFullYear()+""+String(value.getMonth() + 1).padStart(2, "0")+""+String(value.getDate()).padStart(2, "0");
		// return	String(value.getDate()).padStart(2, "0")+"."+String(value.getMonth() + 1).padStart(2, "0")+"."+value.getFullYear()+", "+value.getHours()+":"+value.getMinutes()+":"+value.getSeconds();
	},
		_datetimeconversion:function(value){
			if(value ==="" || value ===null || value==="00000000"){
				return "";
			}
		//  return	value.getFullYear()+""+String(value.getMonth() + 1).padStart(2, "0")+""+String(value.getDate()).padStart(2, "0");
		return	String(value.getDate()).padStart(2, "0")+"."+String(value.getMonth() + 1).padStart(2, "0")+"."+value.getFullYear()+", "+value.getHours()+":"+value.getMinutes()+":"+value.getSeconds();
	},
		onSaveAccidentTAT: function() {
			oBusyDialog.open();
			var that = this,
				errmessage;

			that.AccidentTATData = that.getView().getModel("accidentTATInfoModel").getData();
			// || that.AccidentTATData.Delivery_Date === ""  
			if(that.AccidentTATData.Job_Type ===""|| that.AccidentTATData.Insurance_Company==="" || that.AccidentTATData.Date_Of_Accident ==="" || that.AccidentTATData.Customer_Final_Approval_Date=== "" || that.AccidentTATData.Vehicle_Ready_Date=== "" ||that.AccidentTATData.Final_Survey_Date === "" ){
				MessageBox.error("Please fill all the mandatory fields");
				oBusyDialog.close();
				return;
			}
			var vorval=(new Date().getTime()- that.stringtodatetimeconversion(that.AccidentTATData.Gate_In_Date_Time).getTime())/(1000 * 3600 * 24);
			var appwork=(that.stringtodatetimeconversion(that.AccidentTATData.Vehicle_Ready_Date).getTime() - that.stringtodatetimeconversion(that.AccidentTATData.Customer_Final_Approval_Date).getTime())/(1000 * 3600 * 24);
			var comfinsur=(that.stringtodatetimeconversion(that.AccidentTATData.Final_Survey_Date).getTime() - that.stringtodatetimeconversion(that.AccidentTATData.Vehicle_Ready_Date).getTime())/(1000 * 3600 * 24);
			var finsurdeliv=(that.stringtodatetimeconversion(that.AccidentTATData.Delivery_Date).getTime() - that.stringtodatetimeconversion(that.AccidentTATData.Final_Survey_Date).getTime())/(1000 * 3600 * 24);
			var tat=(that.stringtodatetimeconversion(that.AccidentTATData.Vehicle_Ready_Date).getTime() - that.stringtodatetimeconversion(that.AccidentTATData.Gate_In_Date_Time).getTime())/(1000 * 3600 * 24);
			var overaltat=(that.stringtodatetimeconversion(that.AccidentTATData.Vehicle_Ready_Date).getTime() - that.stringtodatetimeconversion(that.AccidentTATData.Gate_In_Date_Time).getTime())/(1000 * 3600 * 24);
			
			// var appwork=(that.AccidentTATData.Vehicle_Ready_Date - that.AccidentTATData.Customer_Final_Approval_Date)/(1000 * 3600 * 24);
			// var comfinsur=(that.AccidentTATData.Final_Survey_Date - that.AccidentTATData.Vehicle_Ready_Date)/(1000 * 3600 * 24);
			// var finsurdeliv=(that.AccidentTATData.Delivery_Date - that.AccidentTATData.Final_Survey_Date)/(1000 * 3600 * 24);
			// var tat=(that.AccidentTATData.Vehicle_Ready_Date - that.AccidentTATData.Gate_In_Date_Time)/(1000 * 3600 * 24);
			// var overaltat=(that.AccidentTATData.Vehicle_Ready_Date - that.AccidentTATData.Gate_In_Date_Time)/(1000 * 3600 * 24);
			
			var TATObject = {};
			TATObject.Parts_Order_Number=that.AccidentTATData.Parts_Order_Number;
			TATObject.Nature_of_accident =that.AccidentTATData.Nature_of_accident;
			// TATObject.Overall_TAT = that._dateconversion(that.AccidentTATData.Overall_TAT);
			TATObject.Overall_TAT =overaltat.toFixed(1);
			TATObject.Vehicle_ready_TAT_date = tat.toFixed(1);
			// TATObject.Vehicle_ready_TAT_date = that._dateconversion(that.AccidentTATData.Vehicle_ready_TAT_date);
			TATObject.VOR_since_incident =vorval.toFixed(1);
			// TATObject.VOR_since_incident = that._dateconversion(that.AccidentTATData.VOR_since_incident);
			TATObject.RO_No = that.AccidentTATData.RO_No;
			TATObject.Job_Type = that.AccidentTATData.Job_Type;
			TATObject.Type_Of_Accident = that.AccidentTATData.Type_Of_Accident;
			TATObject.Current_Status = that.AccidentTATData.Current_Status;
			TATObject.Insurance_Company = that.AccidentTATData.Insurance_Company;
			TATObject.Date_Of_Accident = that.AccidentTATData.Date_Of_Accident;
			TATObject.Comments = that.AccidentTATData.Comments;
			TATObject.Spot_Survey_Date =  that.AccidentTATData.Spot_Survey_Date;
			TATObject.Survey_Date =  that.AccidentTATData.Survey_Date;
			TATObject.Vehicle_Ready_To_Final_Survey = that.AccidentTATData.Vehicle_Ready_To_Final_Survey;
			TATObject.Survey_Date_After_Dismantle =  that.AccidentTATData.Survey_Date_After_Dismantle;
			TATObject.Final_Survey_Date = that.AccidentTATData.Final_Survey_Date;
			TATObject.Final_Survey_To_Delivery =finsurdeliv.toFixed(1);
			// TATObject.Final_Survey_To_Delivery = that.AccidentTATData.Final_Survey_To_Delivery;
			TATObject.Doc_Submission_Date =  that.AccidentTATData.Doc_Submission_Date;
			TATObject.Estimate_Submission_Date = that.AccidentTATData.Estimate_Submission_Date;
			TATObject.Ins_Partial_Approval_Date = that.AccidentTATData.Ins_Partial_Approval_Date;
			TATObject.Ins_Final_Approval_Date =that.AccidentTATData.Ins_Final_Approval_Date;
			// TATObject.Approval_To_Work_Completion = that.AccidentTATData.Approval_To_Work_Completion;
			TATObject.Approval_To_Work_Completion = appwork.toFixed(1);
			TATObject.Customer_Final_Approval_Date = that.AccidentTATData.Customer_Final_Approval_Date;
			TATObject.Gate_In_Date_Time =that.AccidentTATData.Gate_In_Date_Time;
			TATObject.Work_Start_Date =  that.AccidentTATData.Work_Start_Date;
			TATObject.Expected_Date_of_Readiness =  that.AccidentTATData.Expected_Date_of_Readiness;
			TATObject.Dismantling_Start_Date = that.AccidentTATData.Dismantling_Start_Date;
			TATObject.Dismantling_End_Date =  that.AccidentTATData.Dismantling_End_Date;
			TATObject.Vehicle_Ready_Date = that.AccidentTATData.Vehicle_Ready_Date;
			TATObject.Parts_Order_No_Date =  that.AccidentTATData.Parts_Order_No_Date;
			TATObject.Last_Parts_Received_Date =  that.AccidentTATData.Last_Parts_Received_Date;
			TATObject.Delivery_Date = that.AccidentTATData.Delivery_Date;
			TATObject.Ins_Payment_Settlement_Date = that.AccidentTATData.Ins_Payment_Settlement_Date;
			TATObject.Advance_Payment_Date1 = that.AccidentTATData.Advance_Payment_Date1;
			TATObject.Advance_Payment_Date2 =that.AccidentTATData.Advance_Payment_Date2;
			TATObject.Customer_Payment_Date =that.AccidentTATData.Customer_Payment_Date;
			TATObject.Advance_Payment_Amt1 = that.AccidentTATData.Advance_Payment_Amt1;
			TATObject.Advance_Payment_Amt2 = that.AccidentTATData.Advance_Payment_Amt2;
			TATObject.Reason_For_Delay=that.AccidentTATData.Reason_For_Delay;
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Accidental_TATSet", TATObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getAccidentTATInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onChangeIntialInsp: function(oEvt) {
			var val = oEvt.getSource().getBindingContext("InspParametersModel").getObject();
			for (var i = 0; i < this.InspCheckListGlobalData.length; i++) {
				if (this.InspCheckListGlobalData[i].Parameter_ID === val.Parameter_ID) {
					if (this.InspCheckListGlobalData[i].Initial_Insp !== oEvt.getSource().getState()) {
						this.InspCheckListGlobalData[i].Application = "SA";
					} else if (this.InspCheckListGlobalData[i].Initial_Insp === oEvt.getSource().getState()) {
						this.InspCheckListGlobalData[i].Application = "";
					}
				}
			}
			this.getView().getModel("InspParametersModel").updateBindings(true);
		},

		onChangeIntialRemarks: function(oEvt) {
			var val = oEvt.getSource().getBindingContext("InspParametersModel").getObject();
			for (var i = 0; i < this.InspCheckListGlobalData.length; i++) {
				if (this.InspCheckListGlobalData[i].Parameter_ID === val.Parameter_ID) {
					if (this.InspCheckListGlobalData[i].Initial_Remarks !== val.Initial_Remarks) {
						val.Application = "SA";
					} else if (this.InspCheckListGlobalData[i].Initial_Remarks === val.Initial_Remarks) {
						val.Application = "";
					}
				}
			}
			this.getView().getModel("InspParametersModel").updateBindings(true);
		},

		onChangeFinalInsp: function(oEvt) {
			var val = oEvt.getSource().getBindingContext("InspParametersModel").getObject();
			if (oEvt.getSource().getState() === true) {
				val.Application = "FI";
			}
			this.getView().getModel("InspParametersModel").updateBindings(true);
		},

		onSaveCheckListData: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;

			if (!DIfinaldatamain.some(e1 => e1.check_item === that.getView().getModel("InspParametersModel").getData()[0].check_item)) {
				DIfinaldatamain = DIfinaldatamain.concat(that.getView().getModel("InspParametersModel").getData());
			}

			that.CheckListData = DIfinaldatamain;
			var oObject = {
				"Flag": "",
				"Msg": "",
				"CHECKLIST": []
			};
			if (that.CheckListData) {
				for (var y = 0; y < that.CheckListData.length; y++) {
					oObject.CHECKLIST.push({
						"RO_No": RepairOrderNo,
						"Parameter_ID": that.CheckListData[y].Parameter_ID,
						"Parameter_Desc": that.CheckListData[y].Parameter_Desc,
						"Initial_Insp": that.CheckListData[y].Initial_Insp,
						"Initial_Remarks": that.CheckListData[y].Initial_Remarks,
						"Init_Appr_St": that.CheckListData[y].Init_Appr_St,
						"Final_Insp": that.CheckListData[y].Final_Insp,
						"Final_Remarks": that.CheckListData[y].Final_Remarks,
						"Final_Appr_St": that.CheckListData[y].Final_Appr_St,
						"Additional_Jobs": that.CheckListData[y].Additional_Jobs,
						"Application": that.CheckListData[y].Application,
						"Status": that.CheckListData[y].Status,
						"check_item": that.CheckListData[y].check_item
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Job_CardSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "T") {
						MessageBox.success(oData.Msg);
					}
					that.ongetInspParameters(sap.ui.getCore().byId("InspChecklistSegButtonsId").getSelectedKey());
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onSaveInventoryData: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			that.InventoryData = that.getView().getModel("InventoryInfoModel").getData();
			var newObject = {
				"Flag": "",
				"IN_State": false,
				"In": sap.ui.getCore().byId("inspAdBlueValueId").getText(),
				"Indicator": "",
				"OUT_State": false,
				"Out": "",
				"Parameter_Desc": "AD_BLUE",
				"Parameter_ID": "AD_BLUE",
				"RO_No": RepairOrderNo,
				"VIN": VinNo,
				"Inv_indrp": [],
				"Inv_outdrp": []
			};
			that.InventoryData.push(newObject);
			var oModel = new sap.ui.model.json.JSONModel(that.InventoryData);
			that.getView().setModel(oModel, "InventoryInfoModel");

			var newObject1 = {
				"Flag": "",
				"IN_State": false,
				"In": sap.ui.getCore().byId("inspFuelValueId").getText(),
				"Indicator": "",
				"OUT_State": false,
				"Out": "",
				"Parameter_Desc": "FUEL",
				"Parameter_ID": "FUEL",
				"RO_No": RepairOrderNo,
				"VIN": VinNo,
				"Inv_indrp": [],
				"Inv_outdrp": []
			};
			that.InventoryData.push(newObject1);
			var oModel = new sap.ui.model.json.JSONModel(that.InventoryData);
			that.getView().setModel(oModel, "InventoryInfoModel");

			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"INVENTORY": []
			};
			if (that.InventoryData) {
				for (var y = 0; y < that.InventoryData.length; y++) {
					if (that.InventoryData[y].IN_State === true && that.InventoryData[y].Indicator === "TG") {
						that.InventoryData[y].In = "Y";
					} else if (that.InventoryData[y].IN_State === false && that.InventoryData[y].Indicator === "TG") {
						that.InventoryData[y].In = "N";
					}
					if (that.InventoryData[y].OUT_State === true && that.InventoryData[y].Indicator === "TG") {
						that.InventoryData[y].Out = "Y";
					} else if (that.InventoryData[y].OUT_State === false && that.InventoryData[y].Indicator === "TG") {
						that.InventoryData[y].Out = "N";
					}
					oObject.INVENTORY.push({
						"VIN": VinNo,
						"Parameter_ID": that.InventoryData[y].Parameter_ID,
						"Parameter_Desc": that.InventoryData[y].Parameter_Desc,
						"RO_No": RepairOrderNo,
						"In": that.InventoryData[y].In,
						"Out": that.InventoryData[y].Out,
						"Indicator": that.InventoryData[y].Indicator,
						"IN_State": that.InventoryData[y].IN_State,
						"OUT_State": that.InventoryData[y].OUT_State
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Inventory_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "T") {
						MessageBox.success(oData.Msg);
					}
					that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AdBlueFuelFlag", false);
					that.onGetInventoryInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onSaveInventoryTyreTable: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			that.InventoryTyreTableData = that.getView().getModel("TyreTableItemModel").getData();
			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"TYRE": []
			};
			if (that.InventoryTyreTableData) {
				for (var y = 0; y < that.InventoryTyreTableData.length; y++) {
					oObject.TYRE.push({
						"VIN": that.InventoryTyreTableData[y].VIN,
						"RO_No": RepairOrderNo,
						"Parameter_Desc": that.InventoryTyreTableData[y].Parameter_Desc,
						"Tyre_Axle": that.InventoryTyreTableData[y].Tyre_Axle,
						"Left_Outer_Depth": that.InventoryTyreTableData[y].Left_Outer_Depth.toString(),
						"Left_Outer_Make": that.InventoryTyreTableData[y].Left_Outer_Make,
						"Left_Inner_Depth": that.InventoryTyreTableData[y].Left_Inner_Depth.toString(),
						"Left_Inner_Make": that.InventoryTyreTableData[y].Left_Inner_Make,
						"Right_Inner_Depth": that.InventoryTyreTableData[y].Right_Inner_Depth.toString(),
						"Right_Inner_Make": that.InventoryTyreTableData[y].Right_Inner_Make,
						"Right_Outer_Depth": that.InventoryTyreTableData[y].Right_Outer_Depth.toString(),
						"Right_Outer_Make": that.InventoryTyreTableData[y].Right_Outer_Make,
						"Depth_Low_Value": that.InventoryTyreTableData[y].Depth_Low_Value.toString(),
						"Depth_High_Value": that.InventoryTyreTableData[y].Depth_High_Value.toString(),
						"Depth_Range": that.InventoryTyreTableData[y].Depth_Range.toString(),
						"Range_Color": that.InventoryTyreTableData[y].Range_Color
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Tyre_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.onGetTyreTable();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onCreateRoadTestPopupInfo:function(oEve){
			var data=this.getView().getModel("RoadTestPopUpInfoModel").getData();
		
			var formateddata=[];
			
				formateddata.push({
			
								Type: "",
								Zinput: data.Input,
								Purpose: data.Purpose,
								VinNo: "",
								RegNo: RegNo,
								Model: "",
								GateInKms: "",
								GateOutKms: data.Gate_Out_Kms,
								TotalKms: "",
								GateInDtTm: "",
								GateOutTm: "",
								Duration: "",
								Instruction: data.Instruction,
								Observations: "",
								DriverForeman: this.FMNameJC,
								VehStatus: ""
							});
	
		var finaldata={
			Zinput :RepairOrderNo,
			Flag:true,
			RT_TAB:formateddata
		};
				var that=this;
				oBusyDialog.open();
				that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").create("/RT_JobSet",	finaldata , {
						success: function (oEvent) {
							oBusyDialog.close();
								that._ReadRoadtest();
								
								that._oRoadTestDialog.close();
				sap.m.MessageBox.success(oEvent.Msg);
						},
							error: function (err) {
								oBusyDialog.close();
					sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
							}
						});
		},
		// onCreateRoadTestPopupInfo: function(oEvt) {
		// 	var that = this;
		// 	var data = that.getView().getModel("RoadTestPopUpInfoModel");
		// 	var newobj = {
		// 		"GateInDtTm": "",
		// 		"GateOutTm": "",
		// 		"GateOutKms": data.getData().Gate_Out_Kms,
		// 		"Type": "",
		// 		"Zinput": data.getData().Input,
		// 		"Purpose": data.getData().Purpose,
		// 		"VinNo": VinNo,
		// 		"RegNo": data.getData().Reg_No,
		// 		"Model": "",
		// 		"GateInKms": "",
		// 		"TotalKms": "",
		// 		"Duration": "",
		// 		"Instruction": data.getData().Instruction,
		// 		"Observations": "",
		// 		"DriverForeman": data.getData().Driver_Foreman,
		// 		"VehStatus": ""
		// 	};
		// 	that.roadTestTableData.push(newobj);
		// 	var oModel = new JSONModel(that.roadTestTableData);
		// 	that.getView().setModel(oModel, "RoadTestInfoModel");
		// 	that._oRoadTestDialog.close();
		// },

		onCreateRoadTest: function() {
			// oBusyDialog.open();
			// var that = this;
			// var errmessage;
			// that.RoadTestData = that.getView().getModel("RoadTestPopUpInfoModel").getData();
			// var oObject = {
			// 	"Zinput": RepairOrderNo,
			// 	"RT_TAB": []
			// };
			// if (that.RoadTestData) {

				
			// 	oObject.RT_TAB.push({
			// 		"Type": "",
			// 		"Zinput": RepairOrderNo,
			// 		"Purpose": that.RoadTestData.Purpose,
			// 		"VinNo": VinNo,
			// 		"RegNo": that.RoadTestData.Reg_No,
			// 		"Model": "",
			// 		"GateInKms": "",
			// 		"GateOutKms": that.RoadTestData.Gate_Out_Kms,
			// 		"TotalKms": "",
			// 		"GateInDtTm": "",
			// 		"GateOutTm": "",
			// 		"Duration": "",
			// 		"Instruction": that.RoadTestData.Instruction,
			// 		"Observations": "",
			// 		"DriverForeman": that.RoadTestData.Driver_Foreman,
			// 		"VehStatus": ""
			// 	});
			// }
			// var service = "/sap/opu/odata/sap/ZINIT_FIN_INSP_ROAD_TEST_SRV";
			// var Model = new sap.ui.model.odata.ODataModel(service, true);

			// Model.create("/RT_JobSet", oObject, {
			// 	async: true,
			// 	success: function(oData, oResponse) {
			// 		oBusyDialog.close();
			// 		if (oData.Flag === "S") {
			// 			MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
			// 		} else if (oData.Flag === "E") {
			// 			MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
			// 		}
			// 		// that.getRoadTestTableData();
			// 		that._ReadRoadtest();
			// 	},
			// 	error: function(err) {
			// 		oBusyDialog.close();
			// 		errmessage = error.responseText;
			// 		errmessage = JSON.parse(errmessage);
			// 		errmessage = errmessage.error.message.value;
			// 		sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			// 	}
			// });
			oBusyDialog.open();
			var data=this.getView().getModel("RoadTestInfoModel").getData();
			var formateddata=[];

				for(var i=0;i<data.length;i++){
					if(data[i].Gate_In_Kms  !==""){
					if(data[i].Gate_In_Kms < data[i].Gate_Out_Kms){
						MessageBox.error("Gate IN KMS should be greater that GATE OUT KMS");
						return;
					}}
					formateddata.push({
					"Type":data[i].Type,
					"Zinput":data[i].Input,
					"Purpose":data[i].Purpose,
					"VinNo":data[i].Vin_No,
					"RegNo":data[i].Reg_No,
					"Model":data[i].Model,
					"GateInKms":data[i].Gate_In_Kms,
					"GateOutKms":data[i].Gate_Out_Kms,
					"TotalKms":data[i].Total_Kms,
					"GateInDtTm":"",
					"GateOutTm":"",
					// "GateInDtTm":data[i].Gate_In_Dt_Tm,
					// "GateOutTm":data[i].Gate_Out_Tm,
					"Duration":data[i].Duration,
					"Instruction":data[i].Instruction,
					"Observations":data[i].Observations,
					"DriverForeman":data[i].Driver_Foreman,
					"VehStatus":data[i].Veh_Status
					
				});
			}
			var finaldata={
				Zinput :RepairOrderNo,
				Flag:false,
				RT_TAB:formateddata
			};
			var that=this;
			
			that.getOwnerComponent().getModel("ZINIT_FIN_INSP_ROAD_TEST_SRV").create("/RT_JobSet",	finaldata , {
					success: function (oEvent) {
						oBusyDialog.close();
							that._ReadRoadtest();
							that.Roadtestchange=false;
							//that._createro.close();
							sap.m.MessageBox.success(oEvent.Msg);
						},
						error: function (err) {
							oBusyDialog.close();
							sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
						}
					});
		}	,

		onChangeDeputationSubs: function(oEvt) {
			var path = oEvt.getSource().getBindingContext("DeputationInfoModel").getPath().split("/")[1];
			var selObj = oEvt.getSource().getBindingContext("DeputationInfoModel").getObject();
			
			if (parseInt(selObj.REACH) > 0 && parseInt(selObj.START)> 0) {
				this.DeputationData[path].Deputation_Nav.results[3].REACH = (parseInt(selObj.REACH) - parseInt(selObj.START)).toString();
			}
			if (parseInt(selObj.REACH) > 0 && parseInt(selObj.RECOVERY) > 0) {
				this.DeputationData[path].Deputation_Nav.results[3].RECOVERY = (parseInt(selObj.RECOVERY) - parseInt(selObj.REACH)).toString();
			}
			if (parseInt(selObj.RECOVERY) > 0 && parseInt(selObj.END) > 0) {
				this.DeputationData[path].Deputation_Nav.results[3].END = (parseInt(selObj.END) - parseInt(selObj.RECOVERY)).toString();
			}
		
			this.getView().getModel("DeputationInfoModel").updateBindings(true);
		},

		onSaveDeputationData: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			var oObject = {
				"RO_No": RepairOrderNo,
				"DEPUTATION_TAB": []
			};
			if (that.DeputationData) {
				for (var y = 0; y < that.DeputationData.length; y++) {
					if (that.DeputationData[y].Deputation_Type === "Dealer") {
						if (!that.DeputationData[y].Vehicle_Type || !that.DeputationData[y].Reg_No) {
							oBusyDialog.close();
							MessageBox.error("Vehicle type and Registration fields are mandatory for" + " " + that.DeputationData[y].Concern);
							return;
						}
					}
					oObject.DEPUTATION_TAB.push({
						"RO_No": RepairOrderNo,
						"Trip_No": that.DeputationData[y].Trip_No.toString(),
						"Concern": that.DeputationData[y].Concern,
						"FRM_Code": that.DeputationData[y].FRM_Code,
						"FRM_Code_Desc": that.DeputationData[y].FRM_Desc,
						"Bill_To": that.DeputationData[y].Bill_To,
						"Deputation_Type": that.DeputationData[y].Deputation_Type,
						"Vehicle_Type": that.DeputationData[y].Vehicle_Type,
						"Reg_No": that.DeputationData[y].Reg_No,
						"Status": that.DeputationData[y].Status,
						"Plain_Terrain_Kms": that.DeputationData[y].Plain_Terrain_Kms,
						"Hilly_Terrain_Kms": that.DeputationData[y].Hilly_Terrain_Kms,
						"Total_Kms": that.DeputationData[y].Total_Kms,
						"Plain_Amount": that.DeputationData[y].Plain_Amount,
						"Terrain_Amount": that.DeputationData[y].Terrain_Amount,
						"Total_Amount": that.DeputationData[y].Total_Amount,
						"Technician_Name": that.DeputationData[y].Technician_Name_Code,
						"Remarks": that.DeputationData[y].Remarks,
						"Route": that.DeputationData[y].Route,
						"St_Date": that.DeputationData[y].St_Date,
						"Re_Date": that.DeputationData[y].Re_Date,
						"Rec_Date": that.DeputationData[y].Rec_Date,
						"End_Date": that.DeputationData[y].End_Date,
						"Duration": that.DeputationData[y].Duration,
						"Start_Km": that.DeputationData[y].Start_Km,
						"Reach_Km": that.DeputationData[y].Reach_Km,
						"Recovery_Km": that.DeputationData[y].Recovery_Km,
						"End_Km": that.DeputationData[y].End_Km,
						"Kms": that.DeputationData[y].Kms,
						"Odometer": that.DeputationData[y].Odometer,
						"Route_from": that.DeputationData[y].Route_from,
						"Route_to": that.DeputationData[y].Route_to,
						"Job": that.DeputationData[y].Job,
						"Db_flg": that.DeputationData[y].Db_flg,
						"Deputation_Nav": that.DeputationData[y].Deputation_Nav
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Deputation_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
						that.getDeputationInfo();
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressDeputationButtons: function(oEvt) {
			oBusyDialog.open();
			var that = this;
			var BtnVal = oEvt.getSource().getText();
			BtnVal = BtnVal.toUpperCase();
			var errmessage;
			var oObject = {
				"RO_No": RepairOrderNo,
				"Input": BtnVal,
				"DEPUTATION_TAB": []
			};
			if (that.DeputationData) {
				for (var y = 0; y < that.DeputationData.length; y++) {
					oObject.DEPUTATION_TAB.push({
						"RO_No": RepairOrderNo,
						"Trip_No": that.DeputationData[y].Trip_No.toString(),
						"Concern": that.DeputationData[y].Concern,
						"FRM_Code": that.DeputationData[y].FRM_Code,
						"Bill_To": that.DeputationData[y].Bill_To,
						"Deputation_Type": that.DeputationData[y].Deputation_Type,
						"Vehicle_Type": that.DeputationData[y].Vehicle_Type,
						"Reg_No": that.DeputationData[y].Reg_No,
						"Status": that.DeputationData[y].Status,
						"Plain_Terrain_Kms": that.DeputationData[y].Plain_Terrain_Kms,
						"Hilly_Terrain_Kms": that.DeputationData[y].Hilly_Terrain_Kms,
						"Total_Kms": that.DeputationData[y].Total_Kms,
						"Plain_Amount": that.DeputationData[y].Plain_Amount,
						"Terrain_Amount": that.DeputationData[y].Terrain_Amount,
						"Total_Amount": that.DeputationData[y].Total_Amount,
						"Technician_Name": that.DeputationData[y].Technician_Name,
						"Remarks": that.DeputationData[y].Remarks,
						"Route": that.DeputationData[y].Route,
						"St_Date": that.DeputationData[y].St_Date,
						"Re_Date": that.DeputationData[y].Re_Date,
						"Rec_Date": that.DeputationData[y].Rec_Date,
						"End_Date": that.DeputationData[y].End_Date,
						"Duration": that.DeputationData[y].Duration,
						"Start_Km": that.DeputationData[y].Start_Km,
						"Reach_Km": that.DeputationData[y].Reach_Km,
						"Recovery_Km": that.DeputationData[y].Recovery_Km,
						"End_Km": that.DeputationData[y].End_Km,
						"Kms": that.DeputationData[y].Kms,
						"Odometer": that.DeputationData[y].Odometer,
						"Route_from": that.DeputationData[y].Route_from,
						"Route_to": that.DeputationData[y].Route_to,
						"Job": that.DeputationData[y].Jobnr,
						"Db_flg": that.DeputationData[y].Db_Flg
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Deputation_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getDeputationInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onSelectAssignmentCheck:function(oeve){
			if(oeve.getParameters().selected){
		sleectedassignitems.push(oeve.getSource().getBindingContext("AssignmentPartsModel").getObject());
			}else{
				var CustVoice = oeve.getSource().getBindingContext("AssignmentPartsModel").getObject().Cust_Voice;
				var index = "";
				for(var i=0;i<sleectedassignitems.length;i++){
					if(CustVoice === sleectedassignitems[i].CustVoice){
                       index = i;
					}
				}
				if(index !== ""){
				sleectedassignitems.splice(index,1);
				}
			}
		},
		
		onPresAssignmentRequest: function(oeve) {
			oBusyDialog.open();
			var that = this;
			var errmessage;
			that.AssignmentRequestData = that.getView().getModel("AssignmentPartsModel").getData();
			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"Remarks":"REQUEST",
				"PART_ASS_TAB": sleectedassignitems
			};
			// if (that.AssignmentRequestData) {
			// 	for (var y = 0; y < that.AssignmentRequestData.length; y++) {
			// 		oObject.PRT_RQST_BTN.push({
			// 			"RO_No": RepairOrderNo,
			// 			"Job_Source": that.AssignmentRequestData[y].Job_Source,
			// 			"Cust_Voice": that.AssignmentRequestData[y].Cust_Voice,
			// 			"Concern": that.AssignmentRequestData[y].Concern,
			// 			"Job_No": that.AssignmentRequestData[y].Job_No,
			// 			"Item_No": that.AssignmentRequestData[y].Item_No,
			// 			"Itm_Status": that.AssignmentRequestData[y].Itm_Status,
			// 			"Technician": that.AssignmentRequestData[y].Technician,
			// 			"UOM": that.AssignmentRequestData[y].UOM,
			// 			"Reserved_Qty": that.AssignmentRequestData[y].Reserved_Qty,
			// 			"Status": that.AssignmentRequestData[y].Status,
			// 			"SA_Remarks": that.AssignmentRequestData[y].SA_Remarks,
			// 			"FS_Remarks": that.AssignmentRequestData[y].FS_Remarks,
			// 			"Qi_Remarks": that.AssignmentRequestData[y].Qi_Remarks,
			// 			"Rejected_Qty": that.AssignmentRequestData[y].Rejected_Qty,
			// 			"Invoiced_Qty": that.AssignmentRequestData[y].Invoiced_Qty,
			// 			"Not_issued_Qty": that.AssignmentRequestData[y].Not_issued_Qty,
			// 			"Inventory_Loc": that.AssignmentRequestData[y].Inventory_Loc,
			// 			"First_Fill": that.AssignmentRequestData[y].First_Fill,
			// 			"Remarks": that.AssignmentRequestData[y].Remarks,
			// 			"Main": that.AssignmentRequestData[y].Main
			// 		});
			// 	}
			// }
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			// Prt_Req_HdrSet 
			Model.create("/Part_Assign_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					sleectedassignitems=[];
					that.onGetAssignmentPartsInfo();
					
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onChangeSEZValue:function(oEvt){
			var val = oEvt.getParameters().state;
			if(val ===  true){
				this.getView().getModel("checkInInfoModel").getData().Sez_Value = "Y"
			}else if(val ===  false){
				this.getView().getModel("checkInInfoModel").getData().Sez_Value = "N"
			}
			this.getView().getModel("checkInInfoModel").updateBindings(true);
		},

		onSaveCheckInData: function() {
			oBusyDialog.open();
			var that = this,errmessage;
			that.checkInData = that.getView().getModel("checkInInfoModel").getData();
		
			var oObject = {
				"RO_No": RepairOrderNo,
				"Promised_Delv_Date_Int": that.checkInData.Promised_Delv_Date_Int,
				"Total_FRM_Hours_Int": that.checkInData.Total_FRM_Hours_Int,
				"Estimate_Freeze_Date_Int": that.checkInData.Estimate_Freeze_Date_Int,
				"Approved_By_Int": that.checkInData.Approved_By_Int,
				"Approved_Date_Int": that.checkInData.Approved_Date_Int,
				"No_Revision_Rev": that.checkInData.No_Revision_Rev,
				"Salvage_Value_Int": that.checkInData.Salvage_Value_Int,
				"Scrap_Value_Int": that.checkInData.Scrap_Value_Int,
				"Promised_Delv_Date_Rev": that.checkInData.Promised_Delv_Date_Rev,
				"Total_FRM_Hours_Rev": that.checkInData.Total_FRM_Hours_Rev,
				"Estimate_Freeze_Date_Rev": that.checkInData.Estimate_Freeze_Date_Rev,
				"Approved_By_Rev": that.checkInData.Approved_By_Rev,
				"Approved_Date_Rev": that.checkInData.Approved_Date_Rev,
				"Salvage_Value_Rev": that.checkInData.Salvage_Value_Rev,
				"Scrap_Value_Rev": that.checkInData.Scrap_Value_Rev,
				"Person_Name": that.checkInData.Person_Name,
				"Contact_No": that.checkInData.Contact_No,
				"Contact_Person_Role": that.checkInData.Contact_Person_Role,
				"Points_Available": that.checkInData.Points_Available,
				"Points_Applied": that.checkInData.Points_Applied,
				"Points_Balance": that.checkInData.Points_Balance,
				"Redeemed_Date": that.checkInData.Redeemed_Date,
				"Reason": that.checkInData.Reason,
				"GP_Name": that.checkInData.GP_Name,
				"GP_Contact_Number": that.checkInData.GP_Contact_Number,
				"Temp_GP_No": that.checkInData.Temp_GP_No,
				"GP_Date_Time": that.checkInData.GP_Date_Time,
				"Temp_GP_Role": that.checkInData.Temp_GP_Role,
				"Temp_GP_Type": that.checkInData.Temp_GP_Type,
				"Labor_Disc_Amt": that.checkInData.Labor_Disc_Amt,
				"Labor_Disc_Per": that.checkInData.Labor_Disc_Per,
				"Part_Disc_Amt": that.checkInData.Part_Disc_Amt,
				"Part_Disc_Per": that.checkInData.Part_Disc_Per,
				"Fixed_Price_Amt": that.checkInData.Fixed_Price_Amt,
				"Invoice_No": that.checkInData.Invoice_No,
				"Invoice_Status": that.checkInData.Invoice_Status,
				"Invoice_DT": that.checkInData.Invoice_DT,
				"Agreement_Name": that.checkInData.Agreement_Name,
				"Insurer_Bill_To": that.checkInData.Insurer_Bill_To,
				"Policy_Deductible": that.checkInData.Policy_Deductible,
				"Policy_Amt_Bill_To": that.checkInData.Policy_Amt_Bill_To,
				"Sez_Value":that.checkInData.Sez_Value,
				"CHECKIN_EST": [],
				"CHECKIN_TAB": [],
				"Dterm":that.checkInData.Dterm
			};
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Checkin_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getEstimationInfo();
					that.getCheckInInvoiceInfo();
					that.ongetCheckInInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onPressBillToChange:function(){
			oBusyDialog.open();
			var that = this,errmessage,billToVal;
		
			var oObject = {
				"RO_No":RepairOrderNo,
				"Bill_to": sap.ui.getCore().byId("BilltoOverveiwId").getSelectedKey(),
			};
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Bill_to_changeSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getBodyBuildingInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onUpdateBodyBLD:function(){
			oBusyDialog.open();
			var that = this,errmessage;
			that.bodybuildingData = that.getView().getModel("bodyBuildingModel").getData();
		
			if(!that.bodybuildingData.Name){
				oBusyDialog.close();
				MessageBox.error("Please fill the required fields");
				return;
			}
			var oObject = {
				"Vhvin":VinNo,
				"Vehicle_Done_By": that.bodybuildingData.Vehicle_Done_By,
				"Name": that.bodybuildingData.Name,
				"Location": that.bodybuildingData.Location,
				"Check_Date": that.bodybuildingData.Check_Date,
			};
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);

			Model.create("/Body_buildingSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.getBodyBuildingInfo();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		/*onPressRestore: function() {
			oBusyDialog.open();
			var that = this;
			var errmessage;

			var oObject = {
				"RO_No": RepairOrderNo,
				"Flag": "",
				"Msg": "",
				"DefJobItem": []
			};
			if (that.DeferredJobItems) {
				for (var y = 0; y < that.DeferredJobItems.length; y++) {
					oObject.DEFFERRED_JOB.push({
						"RO_No": RepairOrderNo,
						// "Input_Type": that.DeferredJobs[y].Customer_Voice,
						"Item_Type": that.DeferredJobs[y].Concern_Code,
						"Sublet_ID": that.DeferredJobs[y].Concern_Desc,
						// "Job_No": that.DeferredJobs[y].Job_Source,
						"Code": that.DeferredJobs[y].Status_Code,
						"Description": that.DeferredJobs[y].Status_Desc,
						"Bill_To": that.DeferredJobs[y].Approval,
						"Split": that.DeferredJobs[y].Action_Taken_Obs,
						"Casual_Part": that.DeferredJobs[y].Not_Attending_Rsn,
						"Damage_Code": that.DeferredJobs[y].Repeat,
						"UOM": that.DeferredJobs[y].Repeat_Rsn,
						"Ordered_Qty": that.DeferredJobs[y].Fault_Cat,
						"Stock": that.DeferredJobs[y].Stock,
						"Status": that.DeferredJobs[y].Status,
						// "Status_Code": that.DeferredJobs[y].Remarks,
						// "Status_Desc": that.DeferredJobs[y].Approval,
						"Reserved_Qty": that.DeferredJobs[y].Action_Taken_Obs,
						"Higher_Assembly_Flag": that.DeferredJobs[y].Not_Attending_Rsn,
						"Child_Part_Code": that.DeferredJobs[y].Repeat,
						"Child_Part_Qty": that.DeferredJobs[y].Repeat_Rsn,
						"Unit_Price": that.DeferredJobs[y].Fault_Cat,
						"Total_Price": that.DeferredJobs[y].Stock,
						"CGST_Percent": that.DeferredJobs[y].Remarks,
						"CGST_INR": that.DeferredJobs[y].Approval,
						"SGST_percent": that.DeferredJobs[y].Action_Taken_Obs,
						"SGST_INR": that.DeferredJobs[y].Not_Attending_Rsn,
						"IGST_Percent": that.DeferredJobs[y].Repeat,
						"IGST_INR": that.DeferredJobs[y].Repeat_Rsn,
						"Tax_Total": that.DeferredJobs[y].Fault_Cat,
						"Total_Amount": that.DeferredJobs[y].Stock,
						"Discount_Percent": that.DeferredJobs[y].Remarks,
						"Discount_INR": that.DeferredJobs[y].Repeat_Rsn,
						"First_Fill": that.DeferredJobs[y].Fault_Cat,
						"Remarks": that.DeferredJobs[y].Stock,
						"Flag": that.DeferredJobs[y].Flag,
						"Msg": "I",
						"Db_Flg": "",
						"Jb_Flg": ""
					});
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Def_item_detailsSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}
					that.onGetDefferredJobs();
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},*/

		onSaveJobItemDetails: function(oEvent) {
			oBusyDialog.open();
			var that = this,errmessage;
			var aTreeData = that.getView().getModel("jobItemDetailsModel").getData().Data;
			var sPackage = that.getView().getModel("oLocalJsonModel").getProperty("/SelectedJobItem").Package;
			var sPackDesc = that.getOwnerComponent().getModel("oLocalJsonModel").getData().SelectedJob.PACKAGE_DESC;
			var serviceSubType = that.getView().getModel("localJCDeatils").getData().SubSrvTypeCode;
			var PackageType = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/Job_Type");
			var aFormattedData = [],
				oSuccess, oError;

			var oObject = {
				"RO_No": RepairOrderNo,
				"Job_concer_code": that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/Job_concer_code"),
				"Job_Status": that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/Job_Status"),
				"TotJobDtls": {
					"results": aFormattedData
				}
			};

			for (var d = 0; d < aTreeData.length; d++) {
				var flag = "";
				
				if(serviceSubType !== "900" && serviceSubType !== "901" && serviceSubType !== "902" && serviceSubType !== "903"){
					if(aTreeData[d].WtyTyp === "" && aTreeData[d].Bill_To === "WTY"){
						oBusyDialog.close();
						MessageBox.error("Please Provide Warranty Type for WTY Bill to Item or Change the Bill to");
						flag = 'x';
						return;
					}
				}
			if(PackageType !== "PCK"){
				if(serviceSubType === "900" || serviceSubType === "901" || serviceSubType === "902" || serviceSubType === "903"){
					if(aTreeData[d].Damage_Code === "" && aTreeData[d].Bill_To === "WTY"){
						oBusyDialog.close();
						MessageBox.error("Please Provide Damage code");
						flag = 'x';
						return;
					}
				}
			}
			/*if(PackageType === "PCK"){
				if(serviceSubType !== "900" && serviceSubType !== "901" && serviceSubType !== "902" && serviceSubType !== "903"){
					if(aTreeData[d].Damage_Code === "" && aTreeData[d].Bill_To === "WTY"){
						oBusyDialog.close();
						MessageBox.error("Please Provide Damage code");
						flag = 'x';
						return;
					}
				}
			}*/
				if(flag == ""){
				aTreeData[d].Split = aTreeData[d].Split.toString();
				aFormattedData.push({
					"RO_No": RepairOrderNo,
					"Input": "",
					"Descr1": sPackDesc,
					"Item_Type": aTreeData[d].Item_Type,
					"ItemNr": aTreeData[d].ItemNr,
					"Sublet_ID": aTreeData[d].Sublet_ID,
					"Code": aTreeData[d].Code,
					"Customer": "",
					"Description": aTreeData[d].Description,
					"Bill_To": aTreeData[d].Bill_To,
					"Split": aTreeData[d].Split.split(" ")[0],
					"Casual_Part": aTreeData[d].Casual_Part,
					"Damage_Code": aTreeData[d].Damage_Code,
					"UOM": aTreeData[d].UOM,
					"Child_Part_Code": aTreeData[d].Child_Part_Code,
					"Child_Part_Qty": aTreeData[d].Child_Part_Qty,
					"Higher_Assembly_Flag": aTreeData[d].Higher_Assembly_Flag,
					"Ordered_Qty": aTreeData[d].Ordered_Qty.split(" ")[0],
					"Stock": aTreeData[d].Stock,
					"Status": aTreeData[d].Status,
					"Reserved_Qty": aTreeData[d].Reserved_Qty,
					"Unit_Price": aTreeData[d].Unit_Price.split(" ")[0],
					"Total_Price": aTreeData[d].Total_Price.split(" ")[0],
					"CGST_Percent": aTreeData[d].CGST_Percent.split(" ")[0],
					"CGST_INR": aTreeData[d].CGST_INR.split(" ")[0],
					"SGST_percent": aTreeData[d].SGST_percent.split(" ")[0],
					"SGST_INR": aTreeData[d].SGST_INR.split(" ")[0],
					"IGST_Percent": aTreeData[d].IGST_Percent.split(" ")[0],
					"IGST_INR": aTreeData[d].IGST_INR.split(" ")[0],
					"Tax_Total": aTreeData[d].Tax_Total.split(" ")[0],
					"Total_Amount": aTreeData[d].Total_Amount.split(" ")[0],
					"Discount_Percent": aTreeData[d].Discount_Percent.split(" ")[0],
					"Discount_INR": aTreeData[d].Discount_INR.split(" ")[0],
					"First_Fill": aTreeData[d].First_Fill,
					"Remarks": aTreeData[d].Remarks,
					"Package": sPackage,
					"Flag": aTreeData[d].Flag,
					"Job": JobNo,
					"Jb_Flg": aTreeData[d].Jb_Flg,
					"WtyTyp": aTreeData[d].WtyTyp,
					"Job_Type": that.getOwnerComponent().getModel("oLocalJsonModel").getProperty(
						"/SelectedJob/Job_Type"),
				});
			
				if (aTreeData[d].JobItmDtls) {
					for (var s = 0; s < aTreeData[d].JobItmDtls.length; s++) {
						aTreeData[d].JobItmDtls[s].RO_No = RepairOrderNo;
						aTreeData[d].JobItmDtls[s].Job = "";
						aTreeData[d].JobItmDtls[s].Input = "";
						aFormattedData.push(aTreeData[d].JobItmDtls[s]);
						if(aTreeData[d].JobItmDtls[s].Split !== "" && aTreeData[d].JobItmDtls[s].Bill_To === "WTY"){
							if(serviceSubType !== "900" && serviceSubType !== "901" && serviceSubType !== "902" && serviceSubType !== "903"){
									if(aTreeData[d].WtyTyp === ""){
									oBusyDialog.close();
									MessageBox.error("Please Provide Warranty Type for WTY Bill to Item or Change the Bill to");
									return;	
								}
							}
							
						}
					}
				}
			}
			}

			var reqFlag = "";
			for (var j = 0; j < aTreeData.length; j++) {
				if (!aTreeData[j].Bill_To|| !aTreeData[j].Status) {
					reqFlag = true;
					break;
				}
				if (aTreeData[j].Damagecd_Mandatory_Flag === "X") {
					if(aTreeData[j].Damage_Code === ""){
						reqFlag = true;
						break;
					}
				}
			}

			// for (var i = 0; i < aTreeData[0].JobItmDtls.length; i++) {
			// 	if (aTreeData[0].JobItmDtls[i].Bill_To === "" || aTreeData[0].JobItmDtls[i].Damage_Code === "" ||
			// 		aTreeData[0].JobItmDtls[i].Item_Type === "") {
			// 		reqFlag = true;
			// 		break;
			// 	}
			// }

			if (reqFlag === true) {
				oBusyDialog.close();
				MessageBox.error("Please fill the required fields");
				return;
			}
			// return;
			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					that.getView().getModel("oLocalJsonModel").setProperty("/UpdateSplit", true);
					that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").PACKAGE_GUID = "";
					that.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
					that.getJobItemsDetails(JobNo);
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					that.getView().getModel("oLocalJsonModel").setProperty("/UpdateSplit", false);
					// that.getJobItemsDetails(JobNo);
				}
			};

			oError = function(error) {
				oBusyDialog.close();
				//MessageBox.error(JSON.parse(error.responseText).error.message.value);
				MessageBox.error(error.responseText);
				// oBusyDialog.close();
				// errmessage = error.responseText;
				// errmessage = JSON.parse(errmessage);
				// errmessage = errmessage.error.message.value;
				// sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/JobHdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onAssignmenttabAssignTechnician:function(){
			oBusyDialog.open();
			var that = this;
			// var TechAssignJobleveldata = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/JobCardleveltech");
			var oSuccess, oError;
			var oObject = {
				"RO_NO":RepairOrderNo,
				"TECHNICIAN":headerTechnicianformateddata,
				"JOB_NO":that.AssignedJobNos,
				"ITEM_NO":that.AssignedItemNos
			};

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.FLAG === "T") {
					MessageBox.show(oData.MSG, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.FLAG === "E") {
					MessageBox.error(oData.MSG, sap.m.MessageBox.Icon.ERROR, "Error");
				}
				that.onGetAssignmentTechnicianInfo();
				that.AssignedJobNos = "";
				that.AssignedItemNos = "";
			};

			oError = function(e) {
				that.AssignedJobNos = "";
				that.AssignedItemNos = "";
				oBusyDialog.close();
				// MessageBox.error(JSON.parse(e.responseText).error.message.value);
				MessageBox.error(e.message);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Technician_AssignSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onSaveAssignmentTechnician: function() {
			oBusyDialog.open();
			var that = this;
			var TechAssignTableData = that.getView().getModel("TechnicianInfoModel").getData();
			var oSuccess, oError;

			var oObject = {
				
				"TECH_ASS_TAB": []
			};

			for (var d = 0; d < TechAssignTableData.length; d++) {
				oObject.TECH_ASS_TAB.push({
					"RO_No": RepairOrderNo,
					"Job_Source": TechAssignTableData[d].Job_Source,
					"Job_No": TechAssignTableData[d].Job_No,
					"Cust_Voice": TechAssignTableData[d].Cust_Voice,
					"Concern": TechAssignTableData[d].Concern,
					"Itm_Status": TechAssignTableData[d].Itm_Status,
					"Technician": TechAssignTableData[d].Technician,
					"Availability_Status": TechAssignTableData[d].Availability_Status,
					"Main_Tech_Flag": TechAssignTableData[d].Main_Tech_Flag,
					"Status": TechAssignTableData[d].Status,
					"SA_Remarks": TechAssignTableData[d].SA_Remarks,
					"FS_Remarks": TechAssignTableData[d].FS_Remarks,
					"QI_Remarks": TechAssignTableData[d].QI_Remarks,
					"WIP_Time": TechAssignTableData[d].WIP_Time,
					"Idle_Time": TechAssignTableData[d].Idle_Time,
					"Act_Compl_Time": TechAssignTableData[d].Act_Compl_Time,
					"Technician_Flag": TechAssignTableData[d].Technician_Flag,
					"Remarks": TechAssignTableData[d].Remarks,
					"Main": TechAssignTableData[d].Main
						// "TECH_ASS_TAB": TechAssignTableData[d].TECH_ASS_TAB
				});
				for(var j=0;j<TechAssignTableData[d].TECH_ASS_TAB.length;j++){
				delete	TechAssignTableData[d].TECH_ASS_TAB[j].Technicain_list;
					oObject.TECH_ASS_TAB.push(TechAssignTableData[d].TECH_ASS_TAB[j]);	
				}
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}else{
				MessageBox.success("Saved Successfully");
				}
				that.onGetAssignmentTechnicianInfo();
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Tech_Assign_HdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onSaveAssignmentParts: function() {
			oBusyDialog.open();
			var that = this;
			var partsAssignTableData = that.getView().getModel("AssignmentPartsModel").getData();
			var oSuccess, oError;

			var oObject = {
				"PART_ASS_TAB": []
			};
			for (var d = 0; d < partsAssignTableData.length; d++) {
				oObject.PART_ASS_TAB.push({
					"RO_No": RepairOrderNo,
					"Job_Source": partsAssignTableData[d].Job_Source,
					"Cust_Voice": partsAssignTableData[d].Cust_Voice,
					"Concern": partsAssignTableData[d].Concern,
					"Job_No": partsAssignTableData[d].Job_No,
					"Item_No": partsAssignTableData[d].Item_No,
					"Itm_Status": partsAssignTableData[d].Itm_Status,
					"Technician": partsAssignTableData[d].Technician,
					"UOM": partsAssignTableData[d].UOM,
					"Reserved_Qty": partsAssignTableData[d].Reserved_Qty,
					"Status": partsAssignTableData[d].Status,
					"SA_Remarks": partsAssignTableData[d].SA_Remarks,
					"FS_Remarks": partsAssignTableData[d].FS_Remarks,
					"Qi_Remarks": partsAssignTableData[d].Qi_Remarks,
					"Rejected_Qty": partsAssignTableData[d].Rejected_Qty,
					"Invoiced_Qty": partsAssignTableData[d].Invoiced_Qty,
					"Not_issued_Qty": partsAssignTableData[d].Not_issued_Qty,
					"Inventory_Loc": partsAssignTableData[d].Inventory_Loc,
					"First_Fill": partsAssignTableData[d].First_Fill,
					"Remarks": partsAssignTableData[d].Remarks,
					"Main": partsAssignTableData[d].Main
						// "Input": partsAssignTableData[d].Input
						// "PART_ASS_TAB": partsAssignTableData[d].PART_ASS_TAB
				});
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}else{
					MessageBox.success("Saved Successfully");
				}
				that.onGetAssignmentPartsInfo();
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Part_Assign_HdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onPressReturnAssignment: function() {
			oBusyDialog.open();
			var that = this;
			var partsAssignTableData = that.getView().getModel("AssignmentPartsModel").getData();
			var oSuccess, oError;

			var oObject = {
				"RO_No": RepairOrderNo,
				"Remarks":"RETURN",
				"PART_ASS_TAB": sleectedassignitems
			};

			for(var i=0;i<sleectedassignitems.length;i++){
				if(sleectedassignitems[i].Itm_Status !== "Completely processed"){
					oBusyDialog.close();
					MessageBox.error("Return is possible only for Goods Issued Items", sap.m.MessageBox.Icon.ERROR, "Error");
				return;
				}
			}

			// for (var d = 0; d < partsAssignTableData.length; d++) {
			// 	oObject.PART_ASS_TAB.push({
			// 		"RO_No": RepairOrderNo,
			// 		"Job_Source": partsAssignTableData[d].Job_Source,
			// 		"Cust_Voice": partsAssignTableData[d].Cust_Voice,
			// 		"Concern": partsAssignTableData[d].Concern,
			// 		"Job_No": partsAssignTableData[d].Job_No,
			// 		"Item_No": partsAssignTableData[d].Item_No,
			// 		"Itm_Status": partsAssignTableData[d].Itm_Status,
			// 		"Technician": partsAssignTableData[d].Technician,
			// 		"UOM": partsAssignTableData[d].UOM,
			// 		"Reserved_Qty": partsAssignTableData[d].Reserved_Qty,
			// 		"Status": partsAssignTableData[d].Status,
			// 		"SA_Remarks": partsAssignTableData[d].SA_Remarks,
			// 		"FS_Remarks": partsAssignTableData[d].FS_Remarks,
			// 		"Qi_Remarks": partsAssignTableData[d].Qi_Remarks,
			// 		"Rejected_Qty": partsAssignTableData[d].Rejected_Qty,
			// 		"Invoiced_Qty": partsAssignTableData[d].Invoiced_Qty,
			// 		"Not_issued_Qty": partsAssignTableData[d].Not_issued_Qty,
			// 		"Inventory_Loc": partsAssignTableData[d].Inventory_Loc,
			// 		"First_Fill": partsAssignTableData[d].First_Fill,
			// 		"Remarks": partsAssignTableData[d].Remarks,
			// 		"Main": partsAssignTableData[d].Main,
			// 		"Input": "Return"
			// 			// "PART_ASS_TAB": partsAssignTableData[d].PART_ASS_TAB
			// 	});
			// }

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
				that.onGetAssignmentPartsInfo();
			};
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Part_Assign_HdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onPressRejectAssignment: function() {
			oBusyDialog.open();
			var that = this;
			var partsAssignTableData = that.getView().getModel("AssignmentPartsModel").getData();
			var oSuccess, oError;

			var oObject = {
				"RO_No": RepairOrderNo,
				"Remarks":"REJECT",
				"PART_ASS_TAB":sleectedassignitems 
			};

			// for (var d = 0; d < partsAssignTableData.length; d++) {
			// 	oObject.PART_ASS_TAB.push({
			// 		"RO_No": RepairOrderNo,
			// 		"Job_Source": partsAssignTableData[d].Job_Source,
			// 		"Cust_Voice": partsAssignTableData[d].Cust_Voice,
			// 		"Concern": partsAssignTableData[d].Concern,
			// 		"Job_No": partsAssignTableData[d].Job_No,
			// 		"Item_No": partsAssignTableData[d].Item_No,
			// 		"Itm_Status": partsAssignTableData[d].Itm_Status,
			// 		"Technician": partsAssignTableData[d].Technician,
			// 		"UOM": partsAssignTableData[d].UOM,
			// 		"Reserved_Qty": partsAssignTableData[d].Reserved_Qty,
			// 		"Status": partsAssignTableData[d].Status,
			// 		"SA_Remarks": partsAssignTableData[d].SA_Remarks,
			// 		"FS_Remarks": partsAssignTableData[d].FS_Remarks,
			// 		"Qi_Remarks": partsAssignTableData[d].Qi_Remarks,
			// 		"Rejected_Qty": partsAssignTableData[d].Rejected_Qty,
			// 		"Invoiced_Qty": partsAssignTableData[d].Invoiced_Qty,
			// 		"Not_issued_Qty": partsAssignTableData[d].Not_issued_Qty,
			// 		"Inventory_Loc": partsAssignTableData[d].Inventory_Loc,
			// 		"First_Fill": partsAssignTableData[d].First_Fill,
			// 		"Remarks": partsAssignTableData[d].Remarks,
			// 		"Main": partsAssignTableData[d].Main,
			// 		"Input": "Reject"
			// 			// "PART_ASS_TAB": partsAssignTableData[d].PART_ASS_TAB
			// 	});
			// }

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
				that.onGetAssignmentPartsInfo();
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Part_Assign_HdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onSaveExteriorData: function() {
			oBusyDialog.open();
			var that = this;
			var exteriorTabData = that.getView().getModel("InspectionResults").getData();
			var oSuccess, oError;

			var oObject = {
				"JC_No": RepairOrderNo,
				"INSP_IMG_RES": []
			};

			for (var d = 0; d < exteriorTabData.length; d++) {
				oObject.INSP_IMG_RES.push({
					"JC_No": RepairOrderNo,
					"Symptom_Code": exteriorTabData[d].Symptom_Code,
					"Part_Name": exteriorTabData[d].partName,
					"Part_Coordinate": exteriorTabData[d].Part_Coordinate,
					"Problem_Type": exteriorTabData[d].Problem,
					"Intensity": exteriorTabData[d].Intensity,
					"View": exteriorTabData[d].View,
					"Concern": exteriorTabData[d].Concern,
					"Additional_Job": exteriorTabData[d].Additional_Job,
					"Remarks": exteriorTabData[d].Remarks,
					"Img_X_coordinate": exteriorTabData[d].Img_X_coordinate.toString(),
					"Img_Y_coordinate": exteriorTabData[d].Img_Y_coordinate.toString()
				});
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "T") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					that.getInspectionTableInfo();
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Job_CardSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onSaveImgIsnp: function() {
			oBusyDialog.open();
			var that = this;
			var Images = [];
			// var segmentType = that.images[0].Body_Type;
			if (that.ImagesPlaned.RIGHT.includes("jpeg")) {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "RIGHT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.RIGHT.split("data:image/jpeg;base64,")[1]
				});
			} else {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "RIGHT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.RIGHT.split("data:image/png;base64,")[1]
				});
			}
			if (that.ImagesPlaned.LEFT.includes("jpeg")) {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "LEFT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.LEFT.split("data:image/jpeg;base64,")[1]
				});
			} else {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "LEFT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.LEFT.split("data:image/png;base64,")[1]
				});
			}
			if (that.ImagesPlaned.FRONT.includes("jpeg")) {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "FRONT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.FRONT.split("data:image/jpeg;base64,")[1]
				});
			} else {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "FRONT" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.FRONT.split("data:image/png;base64,")[1]
				});
			}
			if (that.ImagesPlaned.REAR.includes("jpeg")) {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "REAR" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.REAR.split("data:image/jpeg;base64,")[1]
				});
			} else {
				Images.push({
					"Img_ID": RepairOrderNo + "-" + "REAR" + "-" + "89504E470D0A1A0A0000000D4",
					"Image_Xstring": that.ImagesPlaned.REAR.split("data:image/png;base64,")[1]
				});
			}
			for (var a = 0; a < Images.length; a++) {
				var oHeaders = {
					"x-csrf-token": that.getOwnerComponent().getModel("ZJOB_CARD_SRV").getSecurityToken(),
					"slug": Images[a].Img_ID
				};
				sap.ui.core.BusyIndicator.show();
				jQuery.ajax({
					type: "POST",
					headers: oHeaders,
					contentType: "image/png",
					url: "/sap/opu/odata/sap/ZJOB_CARD_SRV/Insp_ImageSet",
					data: JSON.stringify(Images[a].Image_Xstring)
				}).done(function(o) {
					oBusyDialog.close();
					sap.ui.core.BusyIndicator.hide();
				}).error(function(o) {
					oBusyDialog.close();
					sap.ui.core.BusyIndicator.hide();
				});
			}
		},

		onSaveTechReAssign: function() {
			var that = this;
			var TechReassignTableData = that.getView().getModel("TechReassignInfoModel").getData();
			var oSuccess, oError;

			var oObject = {
				"RO_No": RepairOrderNo,
				"REASSIGN_TAB": []
			};

			for (var d = 0; d < TechReassignTableData.length; d++) {
				oObject.REASSIGN_TAB.push({
					"RO_No": RepairOrderNo,
					"Vehicle": RegNo,
					"Start_Date_Time": TechReassignTableData[d].Start_Date_Time,
					"End_Date_Time": TechReassignTableData[d].End_Date_Time,
					"Concern": TechReassignTableData[d].Concern,
					"FRM_Code": TechReassignTableData[d].FRM_Code,
					"FRM_Desc": TechReassignTableData[d].FRM_Desc,
					"Current_Tech": TechReassignTableData[d].Current_Tech,
					"Assign_Tech": TechReassignTableData[d].Assign_Tech,
					"Availability_Status": TechReassignTableData[d].Availability_Status,
					"Item_no": TechReassignTableData[d].Item_no,
					"Reason": TechReassignTableData[d].Reason
				});
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Tech_Reassign_HdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		// onSaveCheckListTab: function() {
		// 	var that = this;
		// 	// var CheckListData =that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListVehicleParamsInfo");
		// 	var checkListheaderdata=that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListTabInfo");
		// 	var oSuccess, oError;

		// 	var oObject = {
		// 		"RO_No": RepairOrderNo,
		// 		"Package_id": checkListheaderdata[0].Package_id,
		// 		"Inspected_by": checkListheaderdata[0].Inspected_by,
		// 		"Inspected_dt": checkListheaderdata[0].Inspected_dt,
		// 		"All_parameters": checkListheaderdata[0].All_parameters,
		// 		"Param": checkListheaderdata[0].Param,
		// 		"Remarks": checkListheaderdata[0].Remarks,
		// 		"ParamDet": []
		// 	};

		// 	for (var d = 0; d < checkListheaderdata.length; d++) {
		// 		oObject.ParamDet.push({
		// 			"RO_No": RepairOrderNo,
		// 			"Parameter_id": checkListheaderdata[d].ParamDet.results.Parameter_id,
		// 			"Param": checkListheaderdata[d].ParamDet.results.Param,
		// 			"Space": checkListheaderdata[d].ParamDet.results.Space,
		// 			"Obsorvations": checkListheaderdata[d].ParamDet.results.Obsorvations,
		// 			"Remarks": checkListheaderdata[d].ParamDet.results.Remarks,
		// 			"Aditional_jobs": checkListheaderdata[d].ParamDet.results.Aditional_jobs,
		// 			"Param_value": checkListheaderdata[d].ParamDet.results.Param_value,
		// 			"Created_By": checkListheaderdata[d].ParamDet.results.Created_By,
		// 			"Changed_by": checkListheaderdata[d].ParamDet.results.Changed_by,
		// 			"Changed_DT": checkListheaderdata[d].ParamDet.results.Changed_DT,
		// 			"Created_Dt": checkListheaderdata[d].ParamDet.results.Created_Dt
		// 		});
		// 	}

		// 	oSuccess = function(oData) {
		// 		oBusyDialog.close();
		// 		if (oData.Flag === "S") {
		// 			MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
		// 		} else if (oData.Flag === "E") {
		// 			MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
		// 		}
		// 	};

		// 	oError = function(e) {
		// 		oBusyDialog.close();
		// 		MessageBox.error(JSON.parse(e.responseText).error.message.value);
		// 	};

		// 	that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Vehicle_det_chlSet", oObject, {
		// 		success: oSuccess,
		// 		error: oError
		// 	});
		// },
		onSaveCheckListTab: function() {
			var that = this;
			var CheckListData = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListTabInfo");
			var oSuccess, oError;
			oBusyDialog.open();
			var oObject = {
				"RO_No": RepairOrderNo,
				"Package_id": CheckListData[0].Package_id,
				// "Inspected_by": CheckListData[0].Inspected_by,
				// "Inspected_dt": CheckListData[0].Inspected_dt,
				// "All_parameters": CheckListData[0].All_parameters,
				// "Param": CheckListData[0].Param,
				// "Remarks": CheckListData[0].Remarks,
				"ParamDet": []
			};

			for (var d = 0; d < CheckListData.length; d++) {
				for(var k=0;k<CheckListData[d].ParamDet.results.length;k++){
				oObject.ParamDet.push({
					// "RO_No": RepairOrderNo,
					"GroupName":CheckListData[d].ParamDet.results[k].GroupName,
					// "Param_value":CheckListData[d].ParamDet.results
					"Parameter_id": CheckListData[d].ParamDet.results[k].Parameter_id,
					"Param": CheckListData[d].ParamDet.results[k].Param,
					"Space": CheckListData[d].ParamDet.results[k].Space,
					"Obsorvations": CheckListData[d].ParamDet.results[k].Obsorvations,
					"Remarks": CheckListData[d].ParamDet.results[k].Remarks,
					"Aditional_jobs": CheckListData[d].ParamDet.results[k].Aditional_jobs,
					"Param_value": CheckListData[d].ParamDet.results[k].Param_value,
					"Created_By": CheckListData[d].ParamDet.results[k].Created_By,
					"Changed_by": CheckListData[d].ParamDet.results[k].Changed_by,
					"Changed_DT": CheckListData[d].ParamDet.results[k].Changed_DT,
					"Created_Dt": CheckListData[d].ParamDet.results[k].Created_Dt
				});
				}
			}

			oSuccess = function(oData) {
				oBusyDialog.close();
				// if (oData.Flag === "S") {
					MessageBox.show("Data Updated Sucessfully", sap.m.MessageBox.Icon.SUCCESS, "Success");
				// } else if (oData.Flag === "E") {
				// 	MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				// }
				that.getCheckListTabInfo();
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/Vehicle_det_chlSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onDamageCodeValueHelp: function(oEvent) {
			this.oEvtCaptured = oEvent.getSource();
			var aFaultCodeFilter = [],
				aFaultLocationFilter = [],
				sFilters = [],
				that = this,
				oSuccess1, oSuccess2, oSuccess3, oError;

			if (!this.oDamageCodefragment) {
				this.oDamageCodefragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.DamageCode", this);
				this.getView().addDependent(this.oDamageCodefragment);
			}
			sFilters.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'REPAIR_CODE'));
			oSuccess2 = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "damageRepairOrderModel");
			};

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DamageCode_ShSet", {
				filters: sFilters,
				success: oSuccess2,
				error: oError
			});
			this.oDamageCodefragment.open();
		},

		onSelectionFaultCode: function(oEvent) {
			var sFaultKey, aFaultLocationFilter = [],
				oSuccess, oError;
			oEvent.getParameters().selectedItem.getAdditionalText();
			sFaultKey = oEvent.getParameters().selectedItem.getKey();
			aFaultLocationFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'FAULT_LOCATION'));
			aFaultLocationFilter.push(new sap.ui.model.Filter('FaultCode', sap.ui.model.FilterOperator.EQ, sFaultKey));

			oSuccess = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel(odata.results);
				this.getView().setModel(oModel, "faultLocationModel");

			}.bind(this);

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DamageCode_ShSet", {
				filters: aFaultLocationFilter,
				success: oSuccess,
				error: oError
			});
		},

		handleSuggestFaultLocation: function(oEvent) {
			var sInputKey, aInputFaultLocation = [],
				oSuccess, oError;
			sInputKey = oEvent.getSource().getValue();
			aInputFaultLocation.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'FAULT_LOCATION'));
			aInputFaultLocation.push(new sap.ui.model.Filter('Text', sap.ui.model.FilterOperator.EQ, sInputKey));

			oSuccess = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel(odata.results);
				this.getView().setModel(oModel, "faultLocationModel");
			}.bind(this);

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DamageCode_ShSet", {
				filters: aInputFaultLocation,
				success: oSuccess,
				error: oError
			});
		},

		onFLSuggestionItemSelected: function(oEvent) {
			var aFaultCodeFilter = [],
				oError, oSuccess1;
			var FLselectedItem = oEvent.getParameters().selectedItem.getText();
			var aFaultLocData = this.getView().getModel("faultLocationModel").getData();
			for (var fl = 0; fl < aFaultLocData.length; fl++) {
				if (aFaultLocData[fl].FaultLoc === FLselectedItem) {
					var getselectedobject = aFaultLocData[fl].FaultCode;
				}
			}
			aFaultCodeFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'FAULT_CODE'));
			aFaultCodeFilter.push(new sap.ui.model.Filter('FaultCode', sap.ui.model.FilterOperator.EQ, getselectedobject));

			oSuccess1 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel(odata.results);
				this.getView().setModel(oModel, "faultCodeModel");
			}.bind(this);

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DamageCode_ShSet", {
				filters: aFaultCodeFilter,
				success: oSuccess1,
				error: oError
			});
		},

		onOkDamageCode: function(oEvent) {
			oBusyDialog.open();
			var ItemCode;
			var CheckBill = this.oEvtCaptured.getBindingContext("jobItemDetailsModel").getObject().Bill_To;
			var faultCodeKey = sap.ui.getCore().byId("idfaultcode").getSelectedKey();
			var faultLocKey = sap.ui.getCore().byId("idfaultlocation").getValue();
			var repairKey = sap.ui.getCore().byId("idrepaircode").getSelectedKey();

			if (CheckBill === "WTY") {
				ItemCode = this.oEvtCaptured.getBindingContext("jobItemDetailsModel").getObject().Code;
			} else {
				ItemCode = "";
			}

			var aDamageCodeFilter = [],
				oSuccess, oError;

			aDamageCodeFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'DAMAGE_CODE'));
			aDamageCodeFilter.push(new sap.ui.model.Filter('FaultCode', sap.ui.model.FilterOperator.EQ, faultCodeKey));
			aDamageCodeFilter.push(new sap.ui.model.Filter('FaultLoc', sap.ui.model.FilterOperator.EQ, faultLocKey));
			aDamageCodeFilter.push(new sap.ui.model.Filter('RepairCode', sap.ui.model.FilterOperator.EQ, repairKey));
			aDamageCodeFilter.push(new sap.ui.model.Filter('Parts', sap.ui.model.FilterOperator.EQ, ItemCode));

			oSuccess = function(odata) {
				oBusyDialog.close();
				this.oEvtCaptured.getBindingContext("jobItemDetailsModel").getObject().Damage_Code = odata.results[0].DamageCode;
				this.warrentyCreation("",this.oEvtCaptured.sId);
				this.getView().getModel("jobItemDetailsModel").updateBindings(true);
				this.oDamageCodefragment.close();
			}.bind(this);

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			}.bind(this);

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DamageCode_ShSet", {
				filters: aDamageCodeFilter,
				success: oSuccess,
				error: oError
			});
		},

		onCancelDamageCode: function() {
			this.oDamageCodefragment.close();
			this.oDamageCodefragment.destroy();
			this.oDamageCodefragment=null;
			
		},

		onUpdateSplit: function() {
			oBusyDialog.open();
			var oSuccess, oError;
			var oRequest = {
				"RO_No": RepairOrderNo,
				"Jobnr": JobNo,
				"Flag": " ",
				"SplitFlg": " ",
				"Msg": " "
			};

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					this.getView().getModel("oLocalJsonModel").setProperty("/UpdateSplit", false);
					this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
				} else if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					this.getView().getModel("oLocalJsonModel").setProperty("/UpdateSplit", false);
					this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
				}
			}.bind(this);

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/SplitSet", oRequest, {
				success: oSuccess,
				error: oError
			});
		},

		onRowSelected: function(oEvent) {
			var iRowIndex = oEvent.getParameters().rowIndex;
			var oContext = oEvent.getParameters().rowContext;
			if (oContext) {
				var oItemObject = oEvent.getParameters().rowContext.getObject();
			}
			if (oEvent.getSource().isIndexSelected(iRowIndex) === true) {
				if (aSelectedJobItems.length > 0) {
					var bCheck = this.searchItem(oItemObject);
					if (bCheck === false) {
						aSelectedJobItems.push(oItemObject);
					}
				} else {
					aSelectedJobItems.push(oItemObject);
				}
			} else {
				if (oItemObject) {
					for (var f = 0; f < aSelectedJobItems.length; f++) {
						if (aSelectedJobItems[f].Code === oItemObject.Code) {
							aSelectedJobItems.splice(f, 1);
						}
					}
				}
			}
		},

		searchItem: function(oItem) {
			var aJobItems = aSelectedJobItems;
			for (var i = 0; i < aJobItems.length; i++) {
				if (aJobItems[i].ItemNr === oItem.ItemNr) {
					return true;
				} else {
					return false;
				}
			}
		},

		onPressSwap: function(oEvent) {
			for (var y = 0; y < aSelectedJobItems.length; y++) {
				if (aSelectedJobItems[y].Db_Flg !== 'X') {
					var getItemTable = this.getView().byId("TreeTableitem");
					getItemTable.clearSelection();
					aSelectedJobItems = [];
					MessageBox.error("Few Items are not Save.Please Save the Items for Swap.", sap.m.MessageBox.Icon.ERROR, "Error");
					return;
				}
			}
			if (!this.oSwapfragment) {
				this.oSwapfragment = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Swap", this);
				this.getView().addDependent(this.oSwapfragment);
			}
			this.oSwapfragment.open();
			var OSwapModel = new JSONModel(aSelectedJobItems);
			this.getView().setModel(OSwapModel, "SwapDisplayModel");
		},

		onInputSwappingJob: function(oEvent) {
			var oSuccess, oError, aSwapJobFilter = [];
			var sInputValue = oEvent.getSource().getValue();
			// var sQuotation_No = this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/QuotSelectedData").Quotation;
			var JobNr = this.getView().getModel("oLocalJsonModel").getData().SelectedJobItem.Job;
			// var JobName = this.getView().getModel("jobItemDetailsModel").getData().SelectedJobItem.Description;
			aSwapJobFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			aSwapJobFilter.push(new sap.ui.model.Filter('Jobnr', sap.ui.model.FilterOperator.EQ, JobNr));
			aSwapJobFilter.push(new sap.ui.model.Filter('JobName', sap.ui.model.FilterOperator.EQ, sInputValue));

			oSuccess = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				this.getView().setModel(oModel, "SwapInputModel");
				this.getView().getModel("SwapInputModel").setProperty("/SwapJobs", odata.results);
			}.bind(this);

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/SwapHdrSet", {
				filters: aSwapJobFilter,
				success: oSuccess,
				error: oError
			});
		},

		onSelectSuggestedItem: function(oEv) {
			SelectedJobNr = oEv.getParameters().selectedItem.getAdditionalText();
			SelectedJobName = oEv.getParameters().selectedItem.getText();
		},

		onSwapDiagCancel: function() {
			this.oSwapfragment.destroy();
			this.oSwapfragment = null;
		},

		onSelectSwapJobs: function(oEvent) {
			var that = this;
			oBusyDialog.open();
			var oError, oSuccess;
			var JobNr = this.getView().getModel("oLocalJsonModel").getData().SelectedJobItem.Job;
			var aSwapFInalData = [];
			for (var x = 0; x < aSelectedJobItems.length; x++) {
				aSwapFInalData.push({
					"RO_No": RepairOrderNo,
					"Code": aSelectedJobItems[x].Code,
					"ItemType": aSelectedJobItems[x].Item_Type,
					"ItemNr": aSelectedJobItems[x].ItemNr,
					"Description": aSelectedJobItems[x].Description,
					"Jobnr": JobNr,
					"JobName": aSelectedJobItems[x].Descr1
				});
			}
			var oObject = {
				"RO_No": RepairOrderNo,
				"Jobnr": SelectedJobNr,
				"JobName": SelectedJobName,
				"Msg": "",
				"Flag": "",
				"SwapItems": {
					"results": aSwapFInalData
				}
			};
			oSuccess = function(odata) {
				oBusyDialog.close();
				if (odata.Flag === "S") {
					MessageBox.show(odata.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				} else if (odata.Flag === "E") {
					MessageBox.error(odata.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
				var treeTable = sap.ui.getCore().byId("TreeTableitem");
				treeTable.clearSelection();
				// that.getJobItemsDetails(JobNo);
				aSelectedJobItems = [];
				that.oSwapfragment.close();
			}.bind(that);

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/SwapHdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
		},

		onpressRegroup: function() {
			oBusyDialog.open();
			var that = this;
			var oError, oSuccess;
			var finalRegData = [];
			var aRegTreeData = sap.ui.getCore().byId("TreeTableitem").getModel("jobItemDetailsModel").getData().Data;
			var JobNr = that.getView().getModel("oLocalJsonModel").getData().SelectedJobItem.Job;
			var PackName = that.getView().getModel("oLocalJsonModel").getProperty("/SelectedJobItem").Package;
			for (var b = 0; b < aRegTreeData.length; b++) {
				if (aRegTreeData[b].Db_Flg !== 'X') {
					MessageBox.error("Few Items are not Save.Please Save the Items for Regroup.", sap.m.MessageBox.Icon.ERROR, "Error");
					return;
				} else {
					finalRegData.push({
						"RO_No": RepairOrderNo,
						"ItemNr": aRegTreeData[b].ItemNr,
						"Code": aRegTreeData[b].Code,
						"ItemType": aRegTreeData[b].Item_Type,
						"Description": aRegTreeData[b].Descr1,
						"Jobnr": JobNr,
						"DamgCode": aRegTreeData[b].Damage_Code,
						"Package": PackName
					});
				}
			}

			var RegObject = {
				"RO_No": RepairOrderNo,
				"Msg": "",
				"Flag": "",
				"RegrpItems": {
					"results": finalRegData
				}
			};

			oSuccess = function(oData) {
				oBusyDialog.close();
				if (oData.Flag === "S") {
					MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					that.getJobDetailsData();
					that.getJobItemsDetails(JobNo);
					that.onUpdateSplit();
				} else if (oData.Flag === "E") {
					MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}	
			};

			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/RegrpHdrSet", RegObject, {
				success: oSuccess,
				error: oError
			});
		},

		getDeputationDropdownData: function(_Vin) {
			var that = this,
				sRegFilters = [],
				aFRMDepuFilter = [],
				aBillToFilter = [],
				aConcernFilter = [],
				aDeputationType = [],
				aVehicleType = [],
				aTechnician = [],
				oSuccess, oSuccess1, oSuccess2, oSuccess3, oSuccess4, oSuccess5, oSuccess6, oError, sQuot;

			// sQuot = this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/QuotSelectedData").Quotation;

			aVehicleType.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'VEHICLE_TYP'));

			aFRMDepuFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'DP_FRM_CODE'));
			aFRMDepuFilter.push(new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, _Vin));

			aBillToFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "DPSUB_BILLTO"));

			aConcernFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, 'CONCERN'));
			aConcernFilter.push(new sap.ui.model.Filter('Value', sap.ui.model.FilterOperator.EQ, RepairOrderNo));

			aDeputationType.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'DEPU_TYPE'));

			aTechnician.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'DEPU_TECHNICIAN'));

			oSuccess1 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				that.getView().setModel(oModel, "FRMCodeDepu");
				that.getView().getModel("FRMCodeDepu").setData(odata.results);
			};

			oSuccess2 = function(oData) {
				oBusyDialog.close();
				var oBillToJSONModel = new JSONModel();
				that.getView().setModel(oBillToJSONModel, "DepuBillMod");
				that.getView().getModel("DepuBillMod").setProperty("/DepuBillSet", oData.results);
			};

			oSuccess3 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				that.getView().setModel(oModel, "depuConcernModel");
				that.getView().getModel("depuConcernModel").setData(odata.results);
			};

			oSuccess4 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				that.getView().setModel(oModel, "depuTypeModel");
				that.getView().getModel("depuTypeModel").setData(odata.results);
			};

			oSuccess5 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				that.getView().setModel(oModel, "VehTypeModel");
				that.getView().getModel("VehTypeModel").setData(odata.results);
			};

			oSuccess6 = function(odata) {
				oBusyDialog.close();
				var oModel = new JSONModel();
				that.getView().setModel(oModel, "VehTechnicainModel");
				that.getView().getModel("VehTechnicainModel").setData(odata.results);
			};

			oError = function(error) {
				oBusyDialog.close();
				var errmessage = JSON.parse(error.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aFRMDepuFilter,
				success: oSuccess1,
				error: oError
			});

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aBillToFilter,
				success: oSuccess2,
				error: oError
			});

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aConcernFilter,
				success: oSuccess3,
				error: oError
			});

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aDeputationType,
				success: oSuccess4,
				error: oError
			});

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				filters: aVehicleType,
				success: oSuccess5,
				error: oError
			});

			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aTechnician,
				success: oSuccess6,
				error: oError
			});
		},

		onSelectVehicleType: function(oEvent) {
			oBusyDialog.open();
			var sRegFilters = [],
				oSuccess, oError;
			var vehTypeItemSelected = oEvent.getSource().getSelectedKey();
			var sDepuVehTypeSelected = oEvent.getSource().getSelectedKey();
			oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Vehicle_Type = sDepuVehTypeSelected;

			sRegFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, 'DEPUTATION'));
			sRegFilters.push(new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, vehTypeItemSelected));

			oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				this.getView().setModel(oModel, "regNoModel");
				this.getView().getModel("regNoModel").setData(oData.results);
			}.bind(this);

			oError = function(error) {
				oBusyDialog.close();
				var errmessage = JSON.parse(error.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			}.bind(this);

			this.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/DropDownSet", {
				success: oSuccess,
				error: oError,
				filters: sRegFilters
			});
		},

		onSelectDeputationConcern: function(oEvent) {
			var sAdditionalText = oEvent.getSource().getSelectedItem().getAdditionalText();
			oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Job = sAdditionalText;
		},

		onValueHelpFRM: function(oEvent) {
			this.Unique = oEvent.getSource().getBindingContext("DeputationInfoModel").getPath();
			if (!this.FRMCodeDialog) {
				this.FRMCodeDialog = new sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.DeputationFRMCode", this);
				this.getView().addDependent(this.FRMCodeDialog);
			}
			this.FRMCodeDialog.open();
		},

		onValueHelpTechnicianName: function(oEvt) {
			this.techUnique = oEvt.getSource().getBindingContext("DeputationInfoModel").getPath();
			if (!this.TechicianDialog) {
				this.TechicianDialog = new sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.DeputationTechnician", this);
				this.getView().addDependent(this.TechicianDialog);
			}
			this.TechicianDialog.open();
		},

		onConfirmFRMCode: function(oEvent) {
			var oObject = oEvent.getParameter("selectedItem").getBindingContext("FRMCodeDepu").getObject();
			this.getView().getModel("DeputationInfoModel").getObject(this.Unique).FRM_Desc = oObject.Description;
			this.getView().getModel("DeputationInfoModel").getObject(this.Unique).FRM_Code = oObject.Value;
			this.getView().getModel("DeputationInfoModel").updateBindings(true);
		},

		onConfirmFRMCodeTechnicians: function(oEvent) {
			var oObject = oEvent.getParameter("selectedItem").getBindingContext("VehTechnicainModel").getObject();
			this.getView().getModel("DeputationInfoModel").getObject(this.techUnique).Technician_Name = oObject.Description;
			this.getView().getModel("DeputationInfoModel").getObject(this.techUnique).Technician_Name_Code = oObject.Value;
			this.getView().getModel("DeputationInfoModel").updateBindings(true);
		},

		onDepuBillSelection: function(oEvent) {
			var sDepuBillSelected = oEvent.getSource().getSelectedKey();
			oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Bill_To = sDepuBillSelected;
		},

		onDepuRegNoSelection: function(oEvent) {
			var sDepuRegNoSelected = oEvent.getSource().getSelectedKey();
			var oObj = oEvent.getParameter('selectedItem').getBindingContext("regNoModel").getObject();
			oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Reg_No = sDepuRegNoSelected;
			oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Vehicle_Type = oObj.Description;
			this.getView().getModel("DeputationInfoModel").updateBindings(true);
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

		onChangeSubletEndDate: function(oEvt) {
			var obj = oEvt.getSource().getBindingContext("subletModel").getObject();
			var val = this.stringtodatetimeconversion(obj.Sublet_End_DT).getTime() - this.stringtodatetimeconversion(obj.Sublet_Start_DT).getTime();
			// val =Math.floor( val );
			// var days = Math.floor(val/(3600*24))
			// var hours = Math.floor((val%(3600*24))/3600);
			var hours = Math.floor(val/(1000*3600));
			var minutes = val-(hours*3600000);
			minutes = Math.floor(minutes/60000);
			// var durationVal = days + "Days " + hours + "hours";
			var durationVal = hours + "." + minutes;
			oEvt.getSource().getBindingContext("subletModel").getObject().Sublet_Duration = durationVal;
			this.getView().getModel("subletModel").updateBindings(true);
		},

		checkValue: function(oEvent) {
			var CheckPlainKmValue = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Plain_Terrain_Kms;
			if (CheckPlainKmValue < 0) {
				MessageBox.information("Invalid Value entered");
				oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Plain_Terrain_Kms = "";
				return;
			}
		},

		onDeputationType: function(oEvent) {
			var selectedrow = oEvent.getSource().getBindingContext("DeputationInfoModel").sPath.split("/")[1];
			var contx = oEvent.getSource().getModel("DeputationInfoModel").getData()[selectedrow];
			var sSelectedKey = oEvent.getParameter('selectedItem').getKey();
			if (sSelectedKey === "Other") {
				contx.Dedit = true;
				contx.Oedit = true;
				contx.edit = 'O';
			} else {
				contx.Dedit = true;
				contx.Oedit = false;
				contx.edit = 'D';
			}
			oEvent.getSource().getModel("DeputationInfoModel").updateBindings(true);
		},

		onCalculateTotalKMs: function(oEvent) {
			this.oKmEvent = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject();
			var checkPlainKm = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Plain_Terrain_Kms;
			var checkTotalKm = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Total_Kms;
			if (!checkPlainKm || !checkTotalKm) {
				MessageBox.information("Please Enter Plain Terrain Km");
				oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Plain_Terrain_Kms = "";
				oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Total_Kms = "";
				return;
			} else {
				if (Number(checkPlainKm) > Number(checkTotalKm)) {
					MessageBox.information("Invalid Value entered in Plain Terrain Km");
					oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Total_Kms = "";
					oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Hilly_Terrain_Kms = "";
					return;
				} else {
					var finalValue = checkTotalKm - checkPlainKm;
					finalValue.toString();
					oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().Hilly_Terrain_Kms = finalValue.toString();
					var getFRMCode = oEvent.getSource().getBindingContext("DeputationInfoModel").getObject().FRM_Code;
					this.CalculateAmount(checkPlainKm, finalValue, getFRMCode);
				}
			}
		},

		CalculateAmount: function(PlainKm, HilTrnKm, FRMCode) {
			oBusyDialog.open();
			var afilterKm = [],
				oSuccess, oError;
			afilterKm.push(new sap.ui.model.Filter('Quotation', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			afilterKm.push(new sap.ui.model.Filter('FRMCode', sap.ui.model.FilterOperator.EQ, FRMCode));
			afilterKm.push(new sap.ui.model.Filter('PlnTrn_Kms', sap.ui.model.FilterOperator.EQ, PlainKm));
			afilterKm.push(new sap.ui.model.Filter('HilTrn_Kms', sap.ui.model.FilterOperator.EQ, HilTrnKm));
			oSuccess = function(oData) {
				oBusyDialog.close();
				this.oKmEvent.TotAmt = oData.TotAmt;
				this.oKmEvent.PlnAmt = oData.PlnAmt;
				this.getView().getModel("DeputationInfoModel").updateBindings(true);
			}.bind(this);

			oError = function(err) {
				oBusyDialog.close();
				var errmessage = JSON.parse(err.responseText).error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			}.bind(this);

			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/DeputationSet(RO_No='" + RepairOrderNo + "',FRM_Code='" + FRMCode +
				"',Plain_Terrain_Kms='" + PlainKm +
				"',Hilly_Terrain_Kms='" + HilTrnKm + "')", {
					// filters: afilterKm,
					success: oSuccess,
					error: oError
				});
		},

		onValueHelpSubletFRM: function(oEvent) {
			this.SubletUnique = oEvent.getSource().getBindingContext("subletModel").getPath();
			if (!this.FRMSubletCodeDialog) {
				this.FRMSubletCodeDialog = new sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.SubletFRMCode", this);
				this.getView().addDependent(this.FRMSubletCodeDialog);
			}
			this.FRMSubletCodeDialog.open();
		},

		onConfirmSubletFRMCode: function(oEvent) {
			var oObject = oEvent.getParameter("selectedItem").getBindingContext("FRMCodeSub").getObject();
			this.getView().getModel("subletModel").getObject(this.SubletUnique).FRM_Code = oObject.Value;
			this.getView().getModel("subletModel").updateBindings(true);
		},

		onValueHelpSubletVendorName: function(oEvent) {
			this.SubletUniqueVN = oEvent.getSource().getBindingContext("subletModel").getPath();
			if (!this.SubletVNDialog) {
				this.SubletVNDialog = new sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.SubletVendorName", this);
				this.getView().addDependent(this.SubletVNDialog);
			}
			this.SubletVNDialog.open();
		},

		onConfirmSubletVendorName: function(oEvent) {
			var oObject = oEvent.getParameter("selectedItem").getBindingContext("SubletVendorNameModel").getObject();
			this.getView().getModel("subletModel").getObject(this.SubletUniqueVN).Vendor_Name = oObject.Value;
			this.getView().getModel("subletModel").getObject(this.SubletUniqueVN).Vendor_Name_Desc = oObject.Description;
			this.getView().getModel("subletModel").updateBindings(true);
		},

		onSelectSubletConcern: function(oEvent) {
			var sSubletAdditionalText = oEvent.getSource().getSelectedItem().getAdditionalText();
			oEvent.getSource().getBindingContext("subletModel").getObject().Jobnr = sSubletAdditionalText;
		},

		onBillSelection: function(oEvent) {
			var sBillSelected = oEvent.getSource().getSelectedKey();
			oEvent.getSource().getBindingContext("subletModel").getObject().Bill_To = sBillSelected;
		},

		onPressSubletDelete: function(oEvent) {
			var obj = oEvent.getSource().getBindingContext("subletModel").getObject().Sublet_No;
			var path = oEvent.getSource().getBindingContext("subletModel").getPath().split("/")[1];
			var aModelData = this.getView().getModel("subletModel").getData();
			for (var i = 0; i < aModelData.length; i++) {
				if (aModelData[i].Sublet_No === obj) {
					if (aModelData[i].Db_Flg !== 'X') {
						aModelData.splice(path, 1);
					}
				}
			}
			var oJSONModel = new JSONModel(aModelData);
			this.getView().setModel(oJSONModel, "subletModel");
		},

		onPressAssignmentTechDelete: function(oEvent) {
			var obj = oEvent.getSource().getBindingContext("TechnicianInfoModel").getObject().Job_No;
			var path = oEvent.getSource().getBindingContext("TechnicianInfoModel").getPath().split("/")[1];
			var aModelData = this.getView().getModel("TechnicianInfoModel").getData();
			for (var i = 0; i < aModelData.length; i++) {
				if (aModelData[i].Job_No === obj) {
					aModelData.splice(path, 1);
				}
			}
			var oJSONModel = new JSONModel(aModelData);
			this.getView().setModel(oJSONModel, "TechnicianInfoModel");
		},

		onFileUploadBtn: function(oEvent) {
			var oPopover = new sap.m.Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content: [
					new sap.m.Button({
						text: 'Download Template',
						icon: 'sap-icon://download',
						press: function() {
							this.onDownloadTemplate();
						}.bind(this),
						type: sap.m.ButtonType.Transparent
					}),
					new sap.m.Button({
						text: 'Upload Job Items',
						icon: 'sap-icon://upload',
						press: function() {
							this.onUploadExcelItems();
						}.bind(this),
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			oPopover.openBy(oEvent.getSource());
		},

		onDownloadTemplate: function() {
			var myData = {
				results: [{
					"Part or Labour (P or L)": "",
					"Part or Labour Code": "",
					"Quantity": "",
					"Bill To": ""
				}]
			};

			var myDataModel = myData.results;
			var workSheet = XLSX.utils.json_to_sheet(myDataModel);

			var workbook = XLSX.utils.book_new();

			var wscols = [{
				wch: 30
			}, {
				wch: 30
			}, {
				wch: 30
			}, {
				wch: 30
			}];
			workSheet['!cols'] = wscols;

			XLSX.utils.book_append_sheet(workbook, workSheet, "My Data Export");
			var sFileName = "JobItemsData.xlsx";
			XLSX.writeFile(workbook, sFileName);
		},

		onUploadExcelItems: function(oEvent) {
			var oView = this.getView();
			sap.ui.core.Fragment.load({
				name: "ndbs.Z_JobCard.fragments.FileUploader",
				id: oView.getId(),
				controller: this
			}).
			then(function(oFragment) {
				this._onUploadDialog = oFragment;
				this.getView().addDependent(this._onUploadDialog);
				this._onUploadDialog.open();
			}.bind(this));
		},

		handleUploadComplete: function(oEvent) {
			var file = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
			var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function(e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function(sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Setting the data to the local model 
					that.excelData = excelData;
				};
				reader.onerror = function(ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

		onUploadItems: function(oEvent) {
			// oBusyDialog.open();
			var that = this;
			var uploadedData = that.excelData;

			var formatUploadedData = [];
			uploadedData.forEach((element) => {
				if (element["Part or Labour (P or L)"]) {
					element["Part or Labour (P or L)"] = element["Part or Labour (P or L)"].toUpperCase();
				}
				var qty;
				// if (element["Quantity"]) {
				qty = String(element["Quantity"]);
				// } 
				// else {
				// 	qty = element["Quantity"];
				// }
				var entry = {
					"Quotation": RepairOrderNo,
					"ItemType": element["Part or Labour (P or L)"],
					"Code": element["Part or Labour Code"] + "",
					"Qty": qty.toString(),
					"BillTo": element["Bill To"],
					"Msg": "",
					"Flag": ""
				};
				formatUploadedData.push(entry);
			});

			var oObject = {
				"Quotation": RepairOrderNo,
				"Msg": "",
				"Flg": "",
				"UploadItems": {
					"results": formatUploadedData
				}
			};

			var oSuccess = function(oDataResponse) {
				oBusyDialog.close();
				console.log(oDataResponse);
				that.handleUploadResponse(oDataResponse);
			}.bind(that);

			var oError = function(oErrorResponse) {
				oBusyDialog.close();
				console.log(oErrorResponse);
			};

			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").create("/UploadHdrSet", oObject, {
				success: oSuccess,
				error: oError
			});
			that._onUploadDialog.destroy();
		},

		onCancelUpload: function() {
			this._onUploadDialog.destroy();
		},

		handleUploadResponse: function(oDataResponse) {
			var that = this;
			var oMessageTemplate = new MessageItem({
				type: '{Flag}',
				title: '{Code}',
				description: '{Msg}'
			});
			that.oMessagePopover = new MessagePopover({
				items: {
					path: '/',
					template: oMessageTemplate
				}
			});
			var formatMessages = [];
			var oJobItemsOdata = oDataResponse.UploadItems.results;
			oJobItemsOdata = [...new Set(oJobItemsOdata)];

			oJobItemsOdata.forEach((element) => {
				if (element.Flag === "Error") {
					var entry = {
						"ItemType": element.ItemType,
						"Msg": element.Msg,
						"Code": element.Code,
						"Flag": element.Flag
					};
					formatMessages.push(entry);
				}
				if (element.Flag === "Success") {
					var entry = {
						"ItemType": element.ItemType,
						"Msg": element.Msg,
						"Code": element.Code,
						"Flag": element.Flag
					};
					formatMessages.push(entry);

					var newExcelJobItemObject = {
						
						"Item_Type": element.ItemType,
						"Sublet_ID": "",
						"Code": element.Code,
						"Description": element.Description,
						"Bill_To": element.BillTo,
						"Split": "100",
						"Casual_Part": "",
						"Damage_Code": "",
						"UOM": element.UOM,
						"Ordered_Qty": element.Qty,
						"Stock": element.Stock,
						"Status": "",
						"Reserved_Qty": "",
						"Unit_Price": element.Unit_Price,
						"Total_Price": element.Total_Price,
						"CGST_Percent": element.CGST_Percent,
						"CGST_INR": element.CGST_INR,
						"SGST_percent": element.SGST_percent,
						"SGST_INR": element.SGST_INR,
						"IGST_Percent": element.IGST_Percent,
						"IGST_INR": element.IGST_INR,
						"Tax_Total": element.Tax_Total,
						"Total_Amount": element.Total_Amount,
						"Discount_Percent": "",
						"Discount_INR": "",
						"First_Fill": false,
						"Remarks": "",
						"Flag": "X",
						"Jb_Flg": DBFLAG,
						"Db_Flg": ""
					};
				}

				var oModel = that.getView().getModel("jobItemDetailsModel");
				// that.getView().getModel("jobItemDetailsModel").getData().Data;

				if (newExcelJobItemObject) {
					sap.ui.getCore().byId("TreeTableitem").getModel("jobItemDetailsModel").getData().Data.push(newExcelJobItemObject);
					oModel.updateBindings(true);
				}
				that.getView().getModel("jobItemDetailsModel").updateBindings(true);
			});

			var oResponseModel = new JSONModel();
			oResponseModel.setData(formatMessages);
			that.oMessagePopover.setModel(oResponseModel);
			that.getView().byId("messagePopoverBtn").setModel(oResponseModel);
			if (oResponseModel.getData().length > 0) {
				that.getView().byId("messagePopoverBtn").setVisible(true);
				that.getView().byId("messagePopoverBtn").addDependent(that.oMessagePopover);
			} else {
				that.getView().byId("messagePopoverBtn").setVisible(false);
			}
		},

		onMessagePopoverPress: function(oEvent) {
			this.oMessagePopover.toggle(oEvent.getSource());
		},

		onCameraImg: function() {
			this.aImagesArray = [];
			var that = this;
			var captureSuccess = function(imageData) {
				that.aImagesArray.push({
					src: "data:image/jpeg;base64," + imageData,
					selected: false
				});
				that.ImgCall();
			};
			var capturerror = function(fail) {
				MessageBox.show(fail);
			};
			navigator.camera.getPicture(captureSuccess, capturerror, {
				quality: 100,
				destinationType: Camera.DestinationType.DATA_URL,
				targetWidth: 1970,
				targetHeight: 1970,
				encodingType: Camera.EncodingType.JPEG
			});
		},

		ImgCall: function() {
			if (!this.confirmDiag) {
				this.confirmDiag = new sap.ui.xmlfragment(sap.ui.getCore().getId("fragConfirm"), "ndbs.Z_JobCard.fragments.ConfirmationDialog",
					this);
				this.getView().addDependent(this.confirmDiag);
			}
			this.confirmDiag.open();
		},

		onConfimImageDialog: function(oEvent) {
			sImageCaptureContext = sap.ui.getCore().byId("idcaptureImage").getSelectedButton().getText();
			alert(sImageCaptureContext);
			this.SendData();
			this.confirmDiag.close();
			this.confirmDiag.destroy();
			this.confirmDiag = null;
		},

		SendData: function() {
			oBusyDialog.open();
			var that = this,
				VehicleNo = "YUBARRI",
				HDR_CAMCOM = [],
				oEntry = {},
				oSuccess, oError;

			var seletectNo = that.getView().getBindingContext("jobDetailsModel").getObject().Description;
			oSuccess = function(oData) {
				oBusyDialog.close();
				MessageBox.show("Success");
			};
			oError = function(err) {
				oBusyDialog.close();
				var errmessage = err.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				MessageBox.error(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};

			for (var b = 0; b < that.aImagesArray.length; b++) {
				var Content, filename;
				Content = that.aImagesArray[b].src.split("data:image/jpeg;base64,")[1];
				// if (selectedTable) {
				filename = RepairOrderNo + "-" + selectedIconTab + "-" + "JobDetailsTable" + "-" + sImageCaptureContext + "-" + seletectNo;
				MessageBox.show(filename);
				// } else {
				// filename = OrderNo + "-" + " " + "-" + selectedIconTab + "Tab" + "-" + sImageCaptureContext;
				// }
			}
			var oHeaders = {
				"X-Requested-With": "XMLHttpRequest",
				"slug": filename,
				"Content-Type": "image/jpeg",
				"X-CSRF-Token": this.getOwnerComponent().getModel("ZJOB_CARD_SRV").getSecurityToken()
			};

			var oHeaders1 = {
				"slug": filename,
				"Content-Type": "image/jpeg"
			};

			var oDataModel = this.getOwnerComponent().getModel("ZJOB_CARD_SRV");
			oDataModel.setHeaders({
				"X-CSRF-Token": "Fetch"
			});

			var token = that.getOwnerComponent().getModel("ZJOB_CARD_SRV").getSecurityToken();

			// https://D365DMDCIDI.in365.corpintra.net:44300/sap/opu/odata/sap/ZJOB_CARD_SRV/More_AttachSet
			jQuery.ajax({
				url: "/sap/opu/odata/sap/ZJOB_CARD_SRV/More_AttachSet",
				type: "POST",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", token);
					xhr.setRequestHeader("Content-Type", "image/jpeg");
					xhr.setRequestHeader("slug", filename);
				},
				data: Content,
				success: function(oResult) {
					MessageBox.show("Image Captured Successfully");
				},
				error: function(request, errorText, errorCode) {
					if (request.responseText) {
						MessageBox.error(errorCode, sap.m.MessageBox.Icon.ERROR, "Error");

					}
				}
			});
		},

				
		onPressOEMVendorService:function(oEvt){
			if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
				var hash = (oCrossAppNavigator.hrefForExternal({
					target: {
						semanticObject: "ZOEMVSRV",
						action: "display"
					},
					params: {
						P1_JOBNR: JobNo,
						P_VBELN: RepairOrderNo
					}
				})) || "";

				var url = window.location.href.split('#')[0] + hash;
				sap.m.URLHelper.redirect(url, true);
			}
		},

		JCCapturecamera:function(oEvt){
			var that = this;
			var fileName;
			if (selectedIconTab === "JobDetails") {
				if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
					var obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
					fileName = RepairOrderNo + "-" + "JOBDETAILS" + "-" + obj.Job;
				} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
					MessageBox.success("Items");
					var obj = oEvt.getSource().getBindingContext("jobItemDetailsModel").getObject();
					fileName = RepairOrderNo + "-" + "JOBITEMDETAILS" + "-" + obj.ItemNr;
				}
				}else if (selectedIconTab === "Deputation") {
					var obj = oEvt.getSource().getBindingContext("DeputationInfoModel").getObject();
					fileName = RepairOrderNo + "-" + selectedIconTab + "-" + obj.Job;
				}else if (selectedIconTab === "Sublet") {
					var obj = oEvt.getSource().getBindingContext("subletModel").getObject();
					fileName = RepairOrderNo + "-" + selectedIconTab + "-" + obj.Job;
				}
				else if (selectedIconTab === "Checklist") {
					fileName = RepairOrderNo + "-" + selectedIconTab;
				}

			var cameraSuccess = function(imgur){
				var service="/sap/opu/odata/sap/ZJOB_CARD_SRV/Checklist_attachmentSet";
				var modelpath = that.getOwnerComponent().getModel("ZJOB_CARD_SRV");
				// MessageBox.information(fileName);

				modelpath.setHeaders({
                            "X-CSRF-Token": "Fetch"
                        });
				var token=that.getOwnerComponent().getModel("ZJOB_CARD_SRV").getSecurityToken();
				
				jQuery.ajax({
					type: 'POST',
					url: service,
					data: imgur,
					beforeSend: function (xhr) {
						xhr.setRequestHeader("X-CSRF-Token", token);
						xhr.setRequestHeader("Content-Type", "image/jpeg");
						xhr.setRequestHeader("slug", fileName);
					},
					success: function (oData) {
						// MessageBox.success("saved");
					},
					error: function (odata) {
						// MessageBox.error("data not saved");
					}
				});
			};
			var  cameraError=function(fail){
				sap.m.MessageBox.show(fail.respon);
			};
		
			 navigator.camera.getPicture(cameraSuccess, cameraError,{
				quality: 100,
				destinationType: Camera.DestinationType.DATA_URL,
				targetWidth: 1970,
				targetHeight: 1970,
				encodingType:Camera.EncodingType.JPEG
			});
		},

		JCDisplayimages:function(oEvt){
			
			if (selectedIconTab === "JobDetails") {
				if (sap.ui.getCore().byId("jobDetailsID").getVisible() === true) {
					var obj = oEvt.getSource().getBindingContext("jobDetailsModel").getObject();
					// selectedIconTab = "JOBDETAILS";
				} else if (sap.ui.getCore().byId("jobItemDetailsID").getVisible() === true) {
					var obj = oEvt.getSource().getBindingContext("jobItemDetailsModel").getObject();
					selectedIconTab = "JOBITEMDETAILS";
				}
			}
			
			else if (selectedIconTab === "Deputation") {
				var obj = oEvt.getSource().getBindingContext("DeputationInfoModel").getObject();
			}

			else if (selectedIconTab === "Sublet") {
				var obj = oEvt.getSource().getBindingContext("subletModel").getObject();
			}

			else if (selectedIconTab === "Checklist") {
				var obj = oEvt.getSource().getBindingContext("CheckListTabInfo").getObject();
			}

			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("TabName", sap.ui.model.FilterOperator.EQ, selectedIconTab.toUpperCase()));
			aFilters.push(new sap.ui.model.Filter("Ro_no", sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			aFilters.push(new sap.ui.model.Filter("JobNo", sap.ui.model.FilterOperator.EQ, obj.Job));
			if (selectedIconTab === "JOBDETAILS") {
				aFilters.push(new sap.ui.model.Filter("JobDesc", sap.ui.model.FilterOperator.EQ,""));
			}else{
				aFilters.push(new sap.ui.model.Filter("JobDesc", sap.ui.model.FilterOperator.EQ, ""));
			}	

			// MessageBox.information(selectedIconTab +"-"+RepairOrderNo +"-"+obj.Job +"-"+obj.Description);
			var that = this;
			// that.oBusyDialog.open();
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Checklist_attachmentSet", {
				filters: aFilters,
				success: function (oData) {
					 var nameslist = oData.results;
						if (!that.oCapturedImgDialogJC) {
							that.oCapturedImgDialogJC = new sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.Carousel", this);
							that.getView().addDependent(that.oCapturedImgDialogJC);
						}
						var sServiceURL = [];
						for(var img = 0; img< nameslist.length; img++){	
							sServiceURL.push({ url : "/sap/opu/odata/sap/ZJOB_CARD_SRV/Checklist_fileSet(FileName='" + nameslist[img].FileName +"')/$value"});	
						}
						that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/ImgModel",sServiceURL);
						that.oCapturedImgDialogJC.open();
					// }
				}.bind(that),
				error: function (err) {
					// sap.m.MessageBox.error("Failed!!");
				}
			});
		},

		viewerclose:function(oeve){
			this.oCapturedImgDialogJC.close();
		},

		onPressApproveAll: function(oEvent) {
			oBusyDialog.open();
			var that = this;
			var formattedData = [];
			that.ApprovalJobItemData = that.getView().getModel("CAJobsItemsInfoModel").getData();
			var oObject = {
				"ro_num": RepairOrderNo,
				// "flag": URLFlag,
				// "customr_remark": this.CustomerRmk,
				HeaderToItem: formattedData
			};
			for (var x = 0; x < that.ApprovalJobItemData.length; x++) {
				if (that.ApprovalJobItemData[x].status_des !== "Approved") {
					formattedData.push({
						"main": that.ApprovalJobItemData[x].main,
						"ro_num": that.ApprovalJobItemData[x].ro_num,
						"job_num": that.ApprovalJobItemData[x].job_num,
						"job_sourc": that.ApprovalJobItemData[x].job_sourc,
						"job_detail": that.ApprovalJobItemData[x].job_detail,
						"dealer_remark": that.ApprovalJobItemData[x].dealer_remark,
						"labor_amt": that.ApprovalJobItemData[x].labor_amt,
						"part_amt": that.ApprovalJobItemData[x].part_amt,
						"aditinl_amt": that.ApprovalJobItemData[x].aditinl_amt,
						"status_tog": that.ApprovalJobItemData[x].status_tog,
						"status_des": that.ApprovalJobItemData[x].status_des,
						"customr_remark": that.ApprovalJobItemData[x].customr_remark,
						"approve_all": "X",
						"reject_all": ""
					});
				}
			}
			if (formattedData.length !== 0) {
				var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
				var Model = new sap.ui.model.odata.ODataModel(service, true);
				Model.create("/Item_Det_HdrSet", oObject, {
					success: function(oData) {
						oBusyDialog.close();
						MessageBox.success("All Jobs Approved Successfully");
						that.getCAJobsItemsInfo();
					}.bind(that),
					error: function(e) {
						oBusyDialog.close();
						MessageBox.error(JSON.parse(e.responseText).error.message.value);
					}
				});
			} else {
				oBusyDialog.close();
				MessageBox.information("All Jobs are already Approved");
				that.getCAJobsItemsInfo();
			}
		},

		onPressRejectAll: function(oEvent) {
			// oBusyDialog.open();
			var that = this;
			var formattedData = [];
			that.ApprovalJobItemData = that.getView().getModel("CAJobsItemsInfoModel").getData();
			var oObject = {
				"ro_num": RepairOrderNo,
				// "flag": URLFlag,
				// "customr_remark": this.CustomerRmk,
				"HeaderToItem": formattedData
			};
			for (var x = 0; x < that.ApprovalJobItemData.length; x++) {
				if (that.ApprovalJobItemData[x].status_des !== "Approved") {
					formattedData.push({
						"main": that.ApprovalJobItemData[x].main,
						"ro_num": that.ApprovalJobItemData[x].ro_num,
						"job_num": that.ApprovalJobItemData[x].job_num,
						"job_sourc": that.ApprovalJobItemData[x].job_sourc,
						"job_detail": that.ApprovalJobItemData[x].job_detail,
						"dealer_remark": that.ApprovalJobItemData[x].dealer_remark,
						"labor_amt": that.ApprovalJobItemData[x].labor_amt,
						"part_amt": that.ApprovalJobItemData[x].part_amt,
						"aditinl_amt": that.ApprovalJobItemData[x].aditinl_amt,
						"status_tog": that.ApprovalJobItemData[x].status_tog,
						"status_des": that.ApprovalJobItemData[x].status_des,
						"customr_remark": that.ApprovalJobItemData[x].customr_remark,
						"approve_all": "",
						"reject_all": "X"
					});
				}
			}
			if (formattedData.length !== 0) {
				var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
				var Model = new sap.ui.model.odata.ODataModel(service, true);
				Model.create("/Item_Det_HdrSet", oObject, {
					success: function(oData) {
						oBusyDialog.close();
						MessageBox.success("All Jobs Rejected Successfully");
						that.getCAJobsItemsInfo();
					}.bind(that),
					error: function(e) {
						oBusyDialog.close();
						MessageBox.error(JSON.parse(e.responseText).error.message.value);
					}
				});
			} else {
				oBusyDialog.close();
				that.getCAJobsItemsInfo();
				MessageBox.information("All Jobs are already Approved");
			}
		},

		onSaveApprovalLog: function() {
			oBusyDialog.open();
			var that = this;
			var aFormattedData = [];
			var errmessage;
			that.ApprovalJobItemData = that.getView().getModel("CAJobsItemsInfoModel").getData();

			var oObject = {
				"ro_num": RepairOrderNo,
				"HeaderToItem": {
					"results": aFormattedData
				}
			};

			if (that.ApprovalJobItemData) {
				for (var y = 0; y < that.ApprovalJobItemData.length; y++) {
					aFormattedData.push({
						"ro_num": RepairOrderNo,
						"job_sourc": that.ApprovalJobItemData[y].job_sourc,
						"item_num": that.ApprovalJobItemData[y].item_num,
						"job_num": that.ApprovalJobItemData[y].job_num,
						"job_detail": that.ApprovalJobItemData[y].job_detail,
						"dealer_remark": that.ApprovalJobItemData[y].dealer_remark,
						"quntity_uom": that.ApprovalJobItemData[y].quntity_uom,
						"labor_amt": that.ApprovalJobItemData[y].labor_amt,
						"part_amt": that.ApprovalJobItemData[y].part_amt,
						"aditinl_amt": that.ApprovalJobItemData[y].aditinl_amt,
						"status_tog": that.ApprovalJobItemData[y].status_tog,
						"status_des": that.ApprovalJobItemData[y].status_des,
						"SA_remark": that.ApprovalJobItemData[y].SA_remark,
						"customr_remark": that.ApprovalJobItemData[y].customr_remark,
						"main": that.ApprovalJobItemData[y].main
					});
					if (that.ApprovalJobItemData[y].HeaderToItem) {
						for (var s = 0; s < that.ApprovalJobItemData[y].HeaderToItem.length; s++) {
							aFormattedData.push(that.ApprovalJobItemData[y].HeaderToItem[s]);	
						}
					}
				}
			}
			var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
			var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Item_Det_HdrSet", oObject, {
				async: true,
				success: function(oData, oResponse) {
					oBusyDialog.close();
					that.getCAJobsItemsInfo();
					if (oData.Flag === "S") {
						MessageBox.show(oData.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
					} else if (oData.Flag === "E") {
						MessageBox.error(oData.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
					}

				},
				error: function(err) {
					oBusyDialog.close();
					// errmessage = err.;
					// errmessage = JSON.parse(errmessage);
					// errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(JSON.parse(err.response.body).error.message.value, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		aRejData: [],
		aAcceptData: [],
		onSwitchChange: function(oEvent) {
			// var aFinalData = [];
			var that = this;
			var oItem = oEvent.getSource().getBindingContext("CAJobsItemsInfoModel").getObject();
			var aTreeTableDataModel = this.getView().getModel("CAJobsItemsInfoModel").getData();
			var bState = oEvent.getParameters().state;
			// var sState = bState.toString();

			oItem.status_tog = bState;
			// oItem.isChanged = "Y";
			if (!oItem.item_num) {
				oItem.item_num = "";
			}
			if (oItem.main === "Job" && oItem.status_tog === true) {
				for (var r = 0; r < aTreeTableDataModel.length; r++) {
					if (aTreeTableDataModel[r].job_num === oItem.job_num) {
						this.aAcceptData.push({
							"main": aTreeTableDataModel[r].main,
							"ro_num": RepairOrderNo,
							"job_num": aTreeTableDataModel[r].job_num,
							"job_sourc": aTreeTableDataModel[r].job_sourc,
							"job_detail": aTreeTableDataModel[r].job_detail,
							"dealer_remark": aTreeTableDataModel[r].dealer_remark,
							"labor_amt": aTreeTableDataModel[r].labor_amt,
							"part_amt": aTreeTableDataModel[r].part_amt,
							"aditinl_amt": aTreeTableDataModel[r].aditinl_amt,
							"status_tog": bState,
							"status_des": aTreeTableDataModel[r].status_des,
							"customr_remark": aTreeTableDataModel[r].customr_remark,
							"flag": "",
							"approve_all": "",
							"reject_all": "",
							"item_num": aTreeTableDataModel[r].item_num
						});

						for (var l = 0; l < aTreeTableDataModel[r].HeaderToItem.length; l++) {
							if (aTreeTableDataModel[r].HeaderToItem[l].main === "Item") {
								aTreeTableDataModel[r].HeaderToItem[l].status_tog = true;
								// aTreeTableDataModel[r].HeaderToItem[l].isChanged = "Y";
								this.aAcceptData.push(aTreeTableDataModel[r].HeaderToItem[l]);
							}
						}
					}
				}
			} else if (oItem.main === "Job" && oItem.status_tog === false) {
				for (var k = 0; k < aTreeTableDataModel.length; k++) {
					if (aTreeTableDataModel[k].job_num === oItem.job_num) {
						this.aRejData.push({
							"main": aTreeTableDataModel[k].main,
							"ro_num": aTreeTableDataModel[k].ro_num,
							"job_num": aTreeTableDataModel[k].job_num,
							"job_sourc": aTreeTableDataModel[k].job_sourc,
							"job_detail": aTreeTableDataModel[k].job_detail,
							"dealer_remark": aTreeTableDataModel[k].dealer_remark,
							"labor_amt": aTreeTableDataModel[k].labor_amt,
							"part_amt": aTreeTableDataModel[k].part_amt,
							"aditinl_amt": aTreeTableDataModel[k].aditinl_amt,
							"status_tog": bState,
							"status_des": aTreeTableDataModel[k].status_des,
							"customr_remark": aTreeTableDataModel[k].customr_remark,
							"flag": "",
							"approve_all": "",
							"reject_all": "",
							"item_num": aTreeTableDataModel[k].item_num
						});

						for (var m = 0; m < aTreeTableDataModel[k].HeaderToItem.length; m++) {
							if (aTreeTableDataModel[k].HeaderToItem[m].main === "Item") {
								aTreeTableDataModel[k].HeaderToItem[m].status_tog = false;
							}
						}
					}
				}
			}
			this.getView().getModel("CAJobsItemsInfoModel").updateBindings(true);
		},

		printjobHistory: function() {
			var data = this.getView().getModel("serviceHistoryModel").getData();
			if (!data) {
				sap.m.MessageBox.show("No Data", sap.m.MessageBox.Icon.ERROR, "Error");
			} else {
				// var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/Srv_His_PDFSet('" + VinNo + "')/$value";
				var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/Srv_His_PDFSet(VIN='" + VinNo + "',Ro_no='"+RepairOrderNo+"')/$value";
				sap.m.URLHelper.redirect(sRead, true);
			}
		},
		onPressprintchecklist: function() {
			// var Des=this.getView().getModel("vehicleInfoModel").getData().Variant;
			var Des=this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListTabInfo")[0].Package_id;
				var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/Checklist_pdfSet(Ro_no='"+RepairOrderNo+"',Job_description='"+Des +"')/$value";
				sap.m.URLHelper.redirect(sRead, true);
		},

		onSrvMeasureRowSelection: function(oEvent) {
			var iRowIndex = oEvent.getParameters().rowIndex;
			var oContext = oEvent.getParameters().rowContext;
			if (oContext) {
				var oItemObject = oEvent.getParameters().rowContext.getObject();
			}

			if (oEvent.getSource().isIndexSelected(iRowIndex) === true) {
				if (aSelectedSrvMeasures.length > 0) {
					var bCheck = this.searchSrvMeasureJobItem(oItemObject);
					if (bCheck === false) {
						aSelectedSrvMeasures.push(oItemObject);
					}
				} else {
					aSelectedSrvMeasures.push(oItemObject);
				}
			} else {
				if (oItemObject) {
					for (var f = 0; f < aSelectedSrvMeasures.length; f++) {
						if (aSelectedSrvMeasures[f].Campaign_No === oItemObject.Campaign_No) {
							aSelectedSrvMeasures.splice(f, 1);
						}
					}
				}
			}
		},

		searchSrvMeasureJobItem: function(oItem) {
			var aSrvRecalls = aSelectedSrvMeasures;
			for (var iRecall = 0; iRecall < aSrvRecalls.length; iRecall++) {
				if (aSrvRecalls[iRecall].Campaign_No === oItem.Campaign_No) {
					return true;
				} else {
					return false;
				}
			}
		},

		onRejDefRowSelection: function(oEvent) {
			var iRowIndex = oEvent.getParameters().rowIndex;
			var oContext = oEvent.getParameters().rowContext;
			if (oContext) {
				var oItemObject = oEvent.getParameters().rowContext.getObject();
			}

			if (oEvent.getSource().isIndexSelected(iRowIndex) === true) {
				if (aSelectedRejJobItems.length > 0) {
					var bCheck = this.searchRejJobItem(oItemObject);
					if (bCheck === false) {
						aSelectedRejJobItems.push(oItemObject);
					}
				} else {
					aSelectedRejJobItems.push(oItemObject);
				}
			} else {
				if (oItemObject) {
					for (var f = 0; f < aSelectedRejJobItems.length; f++) {
						if (aSelectedRejJobItems[f].Job_Card_No === oItemObject.Job_Card_No) {
							aSelectedRejJobItems.splice(f, 1);
						}
					}
				}
			}
		},

		searchRejJobItem: function(oItem) {
			var aJobItems = aSelectedRejJobItems;
			for (var i = 0; i < aJobItems.length; i++) {
				if (aJobItems[i].Job_Card_No === oItem.Job_Card_No) {
					return true;
				} else {
					return false;
				}
			}
		},

		onInsurancNameSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			this._oAllFilter = null;

			if (sValue) {
				this._oAllFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue),
				], false);
			}
			this._filter();
		},

		_filter: function() {
			var oFilter = null;
			var oList = sap.ui.getCore().byId("insnameId");
			var oBinding = oList.getBinding("items");

			if (this._oAllFilter) {
				oFilter = this._oAllFilter;
			}
			oBinding.filter(oFilter);
		},

		
		subletFRMCodeSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			this.SubFilterFRM = null;

			if (sValue) {
				this.SubFilterFRM = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue),
					new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue)
				], false);
			}
			this._Subfilter();
		},

		_Subfilter: function() {
			var oFilter = null;
			var oList = sap.ui.getCore().byId("SubletFRMCodeListId");
			var oBinding = oList.getBinding("items");
			if (this.SubFilterFRM) {
				oFilter = this.SubFilterFRM;
			}
			oBinding.filter(oFilter);
		},

		subletVendorNameSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			this.SubFilterVNAll = null;
			if (sValue) {
				this.SubFilterVNAll = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue),
					new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue)
				], false);
			}
			this._SubfilterVN();
		},

		_SubfilterVN: function() {
			var oFilter = null;
			var oList = sap.ui.getCore().byId("SubletVendorNameListId");
			var oBinding = oList.getBinding("items");
			if (this.SubFilterVNAll) {
				oFilter = this.SubFilterVNAll;
			}
			oBinding.filter(oFilter);
		},

		subletDepUFRMSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			this.DepuFilterFRM = null;
			if (sValue) {
				this.DepuFilterFRM = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue),
					new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sValue)
				], false);
			}
			this._depufilterFRM();
		},

		_depufilterFRM: function() {
			var oFilter = null;
			var oList = sap.ui.getCore().byId("depuFRMListId");
			var oBinding = oList.getBinding("items");
			if (this.DepuFilterFRM) {
				oFilter = this.DepuFilterFRM;
			}
			oBinding.filter(oFilter);
		},

		handleliveCustSearch:function(oEvent){
			var sValue = oEvent.getParameters().newValue;
			this.CustVoiceFilter = null;
			if (sValue) {
				this.CustVoiceFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("Aggregate", sap.ui.model.FilterOperator.Contains, sValue)
				], false);
			}
			var oList = sap.ui.getCore().byId("custVoiceTableId");
			var oBinding = oList.getBinding("items");
			oBinding.filter(this.CustVoiceFilter);
		},

		// _custVoicefilter:function(){
		// 	var oFilter = null;
		// 	var oList = sap.ui.getCore().byId("custVoiceTableId");
		// 	var oBinding = oList.getBinding("items");
		// 	if (this.CustVoiceFilter) {
		// 		oFilter = this.CustVoiceFilter;
		// 	}
		// 	oBinding.filter(oFilter);
		// },

		// firstVisibleRowChanged: function(oeve) {
		// 	for (var i = 0; i < +oeve.getSource().getRows().length; i++) {

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[8].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Two_Four_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[9].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Re_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[10].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Cr_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[11].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Ap_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[12].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].As_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[13].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Pe_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[14].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].In_Time;

		// 		$("#" + oeve.getSource().getRows()[i].getCells()[15].sId + " svg text")[0].innerHTML = oeve.getSource().getModel(
		// 			"asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow() + i].Iv_Time;

		// 	}
		// },

		OnSASearchcal: function(oeve) {
			var x = oeve.getParameters().query;
			var filter1 = new sap.ui.model.Filter(cloumname, sap.ui.model.FilterOperator.Contains, x);
			var filter2 = new sap.ui.model.Filter(columno, sap.ui.model.FilterOperator.Contains, x);

			// Applying OR filter to filter objects
			var orFilter = new sap.ui.model.Filter([filter1, filter2], false);
			var oVBox = this.getView().byId(id).getBinding("rows");
			oVBox.filter(orFilter);
			this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
			this.getOwnerComponent().getModel("oLocalJsonModel").refresh(true);
		},

		onPressRecallsInfo: function(oEvent) {
			var that = this;
			oBusyDialog.open();
			var oError, oSuccess, aCampNoFilter = [],
				CampNumber;
			CampNumber = oEvent.getSource().getBindingContext("measuresRecallsInfoModel").getObject().Campaign_No;
			if (!that._CampaignInfo) {
				that._CampaignInfo = new sap.ui.xmlfragment(that.getView().getId(),
					"ndbs.Z_JobCard.fragments.CampaignInfo", that);
				that.getView().addDependent(that._CampaignInfo);
			}
			aCampNoFilter.push(new sap.ui.model.Filter('Campaign_No', sap.ui.model.FilterOperator.EQ, CampNumber));
			oSuccess = function(odata) {
				oBusyDialog.close();
				that.getView().getModel("measuresRecallsInfoModel").setProperty("/CampaignInfoInput", odata.results[0].Campaign_Name);
				that.getView().getModel("measuresRecallsInfoModel").setProperty("/CampaignInfo", odata.results);
				that._CampaignInfo.open();
				if (odata.Flag === "S") {
					MessageBox.show(odata.Msg, sap.m.MessageBox.Icon.SUCCESS, "Success");
				}
				if (odata.Flag === "E") {
					MessageBox.error(odata.Msg, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};

			// var oDataModel = this.getOwnerComponent().getModel("ZJOB_CARD_SRV");
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Recalls_Srv_MeasureSet", {
				filters: aCampNoFilter,
				success: oSuccess,
				error: oError
			});
		},

		onCloseCampaignInfoDialg: function() {
			this._CampaignInfo.close();
			this._CampaignInfo.destroy();
			this._CampaignInfo = null;
		},

		onPressAssSelectedTechJobItems:function(oeve){

		},

		
		onConfirmJCLevelTech: function(oEvent) {
			// var aSelectedItems = oEvent.getParameter("selectedContexts");
			var aSelectedItems = oEvent.getParameters().selectedItems;
			var data=[];
			headerTechnicianformateddata="";
			 var slectedF4="";
			// if(this.itemorJOB === ""){
			// 	slectedF4="HEADER"
			// }else if(this.itemorJOB < 0){
			// 	slectedF4="JOB"
			// }else if(this.itemorJOB > 0){
			// 	slectedF4="ITEM"
			// }
			// if(slectedF4 === "ITEM"){

			// }else if(slectedF4 === "HEADER" || slectedF4 === "JOB") {
				if(this.itemorJOB !== "" && this.itemorJOB.indexOf("TECH_ASS_TAB") >= 0){
					slectedF4="ITEM"
				}else if(this.itemorJOB !== "" && this.itemorJOB.indexOf("TECH_ASS_TAB") < 0){
					slectedF4="JOB"
				}else if(this.itemorJOB === ""){
					slectedF4="HEADER"
				}
				if(slectedF4 === "HEADER" || slectedF4 === "JOB"){
			if(aSelectedItems.length <= 4){
			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					// data.push(oItem.getObject());
					data.push(oItem.getBindingContext("jcLevelTechniciansModel").getObject());
					headerTechnicianformateddata=headerTechnicianformateddata+oItem.getBindingContext("jcLevelTechniciansModel").getObject().Value+"-"+oItem.getBindingContext("jcLevelTechniciansModel").getObject().Description+","                    
			
				});
			}
			headerTechnicianformateddata=headerTechnicianformateddata.slice(0,-1);
			
			 // this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/JobCardleveltech", data);
			if(this._jcTechsValueHelpDialog.getConfirmButtonText() === "Assign"){
				// this.getView().getModel("TechnicianInfoModel")
				this.getView().getModel("TechnicianInfoModel").getProperty(this.itemorJOB).Technician=headerTechnicianformateddata;
				this.getView().getModel("TechnicianInfoModel").getProperty(this.itemorJOB).Technicain_list=data;
				this.getView().getModel("TechnicianInfoModel").updateBindings(true);
				this.onAssignmenttabAssignTechnician();
				
			}else{

				this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Technicianheaderlevel").Technician=headerTechnicianformateddata;
				this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Technicianheaderlevel").Technicain_list=data;
				this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
			   
			}
		}else{
			MessageBox.error("Maximum 4 Technican can be slected");
			return;
		}
	
	}else if(slectedF4="ITEM"){
		if(aSelectedItems.length <= 4){
		// if(aSelectedItems.length <= 1){
			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					data.push(oItem.getBindingContext("jcLevelTechniciansModel").getObject());
					headerTechnicianformateddata=headerTechnicianformateddata+oItem.getBindingContext("jcLevelTechniciansModel").getObject().Value+"-"+oItem.getBindingContext("jcLevelTechniciansModel").getObject().Description+","                    
			
				});
			}
			headerTechnicianformateddata=headerTechnicianformateddata.slice(0,-1);
			var data1=headerTechnicianformateddata.split(",");
			if(this._jcTechsValueHelpDialog.getConfirmButtonText() === "Assign"){
				var childitems=[];
				for(var j = 0;j < data1.length; j++){
					childitems.push({"Value":data1[j].split("-")[0],"Description":data1[j].split("-")[1]});
				   }
				this.getView().getModel("TechnicianInfoModel").getProperty(this.itemorJOB).Technician=headerTechnicianformateddata;
				this.getView().getModel("TechnicianInfoModel").getProperty(this.itemorJOB).Technicain_list=childitems;
				this.getView().getModel("TechnicianInfoModel").updateBindings(true);
				// for items assign
				this.onAssignmenttabAssignTechnician();
				// MessageBox.information("Please click on save to update the changes");
				
			}
		}else{
			MessageBox.error("Maximum 4 Technican can be slected");
			return;
		}
	}
		},
		
		getJobStatus: function() {
			oBusyDialog.open();
			var oSuccess, oError, aJobFilter = [];
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "JOB_STATUS"),
				new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oJobJSONModel = new JSONModel(oData.results);
				this.getView().setModel(oJobJSONModel, "JobDetailStatus");
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},
		ReadDPCheckinType:function(){
			oBusyDialog.open();
			var that=this;
			var oSuccess, oError, aJobFilter = [];
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "TYPE"));
				// new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Checkintypemodel", oData.results);
				// var oJobJSONModel = new JSONModel(oData.results);
				// this.getView().setModel(oJobJSONModel, "JobDetailStatus");
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},
		ReadDPCheckinReason:function(){
			oBusyDialog.open();
			var that=this;
			var oSuccess, oError, aJobFilter = [];
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "REASON"));
				// new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Checkinreasonmodel", oData.results);
				// var oJobJSONModel = new JSONModel(oData.results);
				// this.getView().setModel(oJobJSONModel, "JobDetailStatus");
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},

		getCheckInPolicyAmtBillTo: function() {
			oBusyDialog.open();
			var oSuccess, oError, aJobFilter = [];
			aJobFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "POLICY_AMT_BILL_TO"),
				new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oJobJSONModel = new JSONModel(oData.results);
				this.getView().setModel(oJobJSONModel, "PolicyAmtBillToModel");
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},

		getSegmentInfo: function() {
			oBusyDialog.open();
			var oSuccess, oError, aJobFilter = [];
			// "00003"
			aJobFilter.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			oSuccess = function(oData) {
				oBusyDialog.close();
				var oJobJSONModel = new JSONModel(oData.results);
				this.getView().setModel(oJobJSONModel, "segmentModel");
			}.bind(this);
			oError = function(e) {
				oBusyDialog.close();
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Image_NameSet", {
				filters: aJobFilter,
				success: oSuccess,
				error: oError
			});
		},

		onSelectionChangeSegButtons: function(event) {
			var that = this;
			this.SelectedView = event.getSource().getSelectedKey();
			InspSelectedSegButton = this.SelectedView;
			if (this.SelectedView === "Inventory") {
				that.oInspectionFragment.getAggregation("items")[2].setVisible(true);
				that.oInspectionFragment.getAggregation("items")[3].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[4].setVisible(false);
				// that.onGetTyreColor();
				// that.onGetTyreMake();
				// that.onGetInventoryInfo();
				// that.onGetTyreTable();
				that._custStepInputFocusOut(that);
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AdBlueFuelFlag", true);
				sap.ui.getCore().byId("sideNavigation").setVisible(false);
			}
			if (this.SelectedView === "CheckList") {
				that.oInspectionFragment.getAggregation("items")[2].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[3].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[4].setVisible(true);
				that.ongetCheckListAggregates();
				// that.ongetInspParameters(InspSelectedSegButton);
				sap.ui.getCore().byId("sideNavigation").setVisible(false);
			}
			if (this.SelectedView === "Exterior") {
				sap.ui.getCore().byId("htmlCanvas").setContent(
					"<canvas id='canvasId' width='690' height='290' class='Image-Control'></canvas>"
				);
				that.ImIns = new Inspection(this);
				that.oInspectionFragment.getAggregation("items")[2].setVisible(false);
				that.oInspectionFragment.getAggregation("items")[3].setVisible(true);
				sap.ui.getCore().byId("sideNavigation").setVisible(true);
				sap.ui.getCore().byId("sideNavigation").setExpanded(false);
				that.oInspectionFragment.getAggregation("items")[4].setVisible(false);
				that.getVehicleImages();
				that.getInspectionTableInfo();

				// sap.ui.getCore().byId("idFront").setVisible(true);
				// var imgUrl = $.sap.getModulePath("ndbs.Z_JobCard", "/Images/");
				// var imgInspLeft = this.getView().byId("idLegend");
				// imgInspLeft.setSrc(imgUrl + "saLegend.jpg");
				// var imgInspFront = sap.ui.getCore().byId("idFront");
				// var imgInspLeft = sap.ui.getCore().byId("idLeft");
				// var imgInspRight = sap.ui.getCore().byId("idRight");
				// var imgInspBack = sap.ui.getCore().byId("IdBack");
				// imgInspFront.setSrc(imgUrl + "Front.png");

				// imgInspLeft.setSrc(imgUrl + "Left.png");
				// imgInspRight.setSrc(imgUrl + "Right.png");
				// imgInspBack.setSrc(imgUrl + "Back.png");
			}
		},

		onselectingcancel: function() {
			this._oValueHelpDialogdent.close();
		},

		onselectingOk: function() {
			this.ImIns.thatMark(event);
		},

		onSelectVehImagesDamages: function(oEvt) {
			this.selVehImagesDamage = oEvt.getSource().getText();
		},

		onAddInspectionResults: function(Details) {
			var that = this;
			that.VehInspImagesArray.push(Details);
			var jsonmodel = new JSONModel(that.VehInspImagesArray);
			that.getView().setModel(jsonmodel, "InspectionResults");
		},

		onPressInspDelete: function(oEvt) {
			var that = this;
			oBusyDialog.open();
			var Obj = oEvt.getSource().getBindingContext("InspectionResults").getObject();
			var path = oEvt.getSource().getBindingContext("InspectionResults").getPath().split("/")[1];
			for (var i = 0; i < that.VehInspImagesArray.length; i++) {
				if (that.VehInspImagesArray[i].partName === Obj.partName) {
					that.VehInspImagesArray.splice(i, 1);
				}
			}

			var oJSONModel = new JSONModel(that.VehInspImagesArray);
			that.getView().setModel(oJSONModel, "InspectionResults");
			that.getView().getModel("InspectionResults").updateBindings(true);

			for (var f = that.VehInspImagesArray.length - 1; f >= 0; f--) {
				if (that.VehInspImagesArray[f].Symptom_Code === Obj.Symptom_Code) {
					that.VehInspImagesArray.splice(f, 1);
				}
			}
			for (var m = that.cordinates.length - 1; m >= 0; m--) {
				if (that.cordinates[m].Symptom_Code === Obj.Symptom_Code) {
					that.cordinates.splice(m, 1);
				}
			}
			that.getView().getModel("InspectionResults").updateBindings(true);
			sap.ui.getCore().byId("inspectionRemarksTableId").getModel("InspectionResults").refresh(true);
			jQuery.sap.delayedCall(1000, that, function() {
				that.loadCanvas();
			});
		},

		loadCanvas: function() {
			oBusyDialog.close();
			this.ImIns.updateCanvas(this);
		},

		onPressVehicleImages: function(oEvt) {
			var selImageSide = oEvt.getSource().getId();
			var imgUrl = $.sap.getModulePath("ndbs.Z_JobCard", "/Images/");
			var that = this;
			if (selImageSide === "idLeft") {
				this.Imagviewselected = "LEFT";
				// var imgInspFront = sap.ui.getCore().byId("idFront");
				// imgInspFront.setSrc(imgUrl + "Left.png");
				// imgInspFront.attachPress(that.handlePress(that));
			}
			if (selImageSide === "idRight") {
				this.Imagviewselected = "RIGHT";
				// var imgInspFront = sap.ui.getCore().byId("idFront");
				// imgInspFront.setSrc(imgUrl + "Right.png");
				// imgInspFront.attachPress(that.handlePress(that));
			}
			if (selImageSide === "idRear") {
				this.Imagviewselected = "REAR";
				// var imgInspFront = sap.ui.getCore().byId("idFront");
				// imgInspFront.setSrc(imgUrl + "Back.png");
				// imgInspFront.attachPress(that.handlePress(that));
			}
			if (selImageSide === "idFront") {
				this.Imagviewselected = "FRONT";
				// var imgInspFront = sap.ui.getCore().byId("idFront");
				// imgInspFront.setSrc(that.ImagesPlaned.FRONT + "Front.png");
				// imgInspFront.attachPress(that.handlePress(that));
			}
			that.ImIns.getImagefun(that);
		},

		getVehicleImages: function() {
			var that = this;
			var ent = "/Veh_ImageSet";
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				sap.ui.core.BusyIndicator.hide();
				that.images = oData.results;
				for (var t = 0; t < oData.results.length; t++) {
					if (oData.results[t].Direction_of_Image === "LEFT") {
						that.ImagesPlaned.LEFT = "data:image/jpeg;base64," + that.images[t].Base64;
					} else if (oData.results[t].Direction_of_Image === "RIGHT") {
						that.ImagesPlaned.RIGHT = "data:image/jpeg;base64," + that.images[t].Base64;
					} else if (oData.results[t].Direction_of_Image === "FRONT") {
						that.ImagesPlaned.FRONT = "data:image/jpeg;base64," + that.images[t].Base64;
					} else if (oData.results[t].Direction_of_Image === "REAR") {
						that.ImagesPlaned.REAR = "data:image/jpeg;base64," + that.images[t].Base64;
					}
				}

				var oJobJSONModel = new JSONModel(that.ImagesPlaned);
				that.getView().setModel(oJobJSONModel, "vehImagesModel");

			};
			var oError = function(error) {
				sap.ui.core.BusyIndicator.hide();
			};
			sap.ui.core.BusyIndicator.show();
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read(ent, {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		getDamagedVehicleImages: function() {
			var that = this;
			var fileName = RepairOrderNo + "-" + that.Imagviewselected + "-" + "VehImageInsp";
			var sURL;
			sURL = "/sap/opu/odata/sap/ZJOB_CARD_SRV/Insp_Image_fileSet(RO_No='" + RepairOrderNo + "',File_Name='" + fileName + "')" +
				"/$value";
			sap.m.URLHelper.redirect(sURL, true);
		},

		getImageCoordinatesrange: function() {
			oBusyDialog.open();
			var that = this;
			var ent = "/Image_CoordinateSet";
			var sFilters = [];
			var LEFT = [],
				RIGHT = [],
				FRONT = [],
				REAR = [],
				TOP = [],
				INTERIOR = [];
			sFilters.push(new sap.ui.model.Filter("VIN", sap.ui.model.FilterOperator.EQ, VinNo));
			var oSuccess = function(oData) {
				oBusyDialog.close();

				for (var t = 0; t < oData.results.length; t++) {
					if (oData.results[t].Direction_of_Image === "LEFT") {
						LEFT.push({
							"Symptom_Code": oData.results[t].Symptom_Code,
							"Image_View": oData.results[t].Direction_of_Image,
							"Part_Name": oData.results[t].Part_Name,
							"Problem": oData.results[t].Problem_Type,
							"Coordinates": oData.results[t].Part_Coordinate,
							"Intensity": oData.results[t].Intensity
						});
					}
					if (oData.results[t].Direction_of_Image === "RIGHT") {
						RIGHT.push({
							"Symptom_Code": oData.results[t].Symptom_Code,
							"Image_View": oData.results[t].Direction_of_Image,
							"Part_Name": oData.results[t].Part_Name,
							"Problem": oData.results[t].Problem_Type,
							"Coordinates": oData.results[t].Part_Coordinate,
							"Intensity": oData.results[t].Intensity
						});
					}

					if (oData.results[t].Direction_of_Image === "FRONT") {
						FRONT.push({
							"Symptom_Code": oData.results[t].Symptom_Code,
							"Image_View": oData.results[t].Direction_of_Image,
							"Part_Name": oData.results[t].Part_Name,
							"Problem": oData.results[t].Problem_Type,
							"Coordinates": oData.results[t].Part_Coordinate,
							"Intensity": oData.results[t].Intensity
						});
					}
					if (oData.results[t].Direction_of_Image === "REAR") {
						REAR.push({
							"Symptom_Code": oData.results[t].Symptom_Code,
							"Image_View": oData.results[t].Direction_of_Image,
							"Part_Name": oData.results[t].Part_Name,
							"Problem": oData.results[t].Problem_Type,
							"Coordinates": oData.results[t].Part_Coordinate,
							"Intensity": oData.results[t].Intensity
						});
					}

				}
				that.ImagesCoordinates.LEFT = LEFT;
				that.ImagesCoordinates.RIGHT = RIGHT;
				that.ImagesCoordinates.REAR = REAR;
				that.ImagesCoordinates.FRONT = FRONT;
			};
			var oError = function(error) {
				oBusyDialog.close();
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read(ent, {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});
		},

		handlePress: function(that) {
			var that = this;
			that.getView().byId("idInvChkBox").setVisible(true);
			var idSelectionPart = that.getView().byId("idSelectionPart");

			// Front Image
			$(".L1").on("click", function(e) {
				that.clearProblemRadioBtn();
				var imgcord = "F1";
				idSelectionPart.setText("FRONT WINDSHIELD GLASS");
				that.problemDescription(imgcord);
				that.getView().byId("idInspBtn").setVisible(true);
			});
		},

		onQuotationRowSelection: function(oEvent) {
			var iRowIndex = oEvent.getParameters().rowIndex;
			var oContext = oEvent.getParameters().rowContext;
			if (oContext) {
				var oItemObject = oEvent.getParameters().rowContext.getObject();
			}

			if (oEvent.getSource().isIndexSelected(iRowIndex) === true) {
				if (aSelectedQuotations.length > 0) {
					var bCheck = this.searchQuotation(oItemObject);
					if (bCheck === false) {
						aSelectedQuotations.push(oItemObject);
					}
				} else {
					aSelectedQuotations.push(oItemObject);
				}
			} else {
				if (oItemObject) {
					for (var f = 0; f < aSelectedQuotations.length; f++) {
						if (aSelectedQuotations[f].Quotation_No === oItemObject.Quotation_No) {
							aSelectedQuotations.splice(f, 1);
						}
					}
				}
			}
		},

		searchQuotation: function(oItem) {
			var aSrvRecalls = aSelectedQuotations;
			for (var iRecall = 0; iRecall < aSrvRecalls.length; iRecall++) {
				if (aSrvRecalls[iRecall].Quotation_No === oItem.Quotation_No) {
					return true;
				} else {
					return false;
				}
			}
		},

		onQuotationNumber: function() {
			var that = this;
		},

		/************Save Signature Pad**************************/

		onSign: function(oEvent) {
			var canvas = document.getElementById("signature-pad");
			var context = canvas.getContext("2d");
			canvas.width = 300;
			canvas.height = 200;
			context.fillStyle = "#F0FFFF";
			context.strokeStyle = "#444";
			context.lineWidth = 1.5;
			context.lineCap = "round";
			context.fillRect(0, 0, canvas.width, canvas.height);
			var disableSave = true;
			var pixels = [];
			var cpixels = [];
			var xyLast = {};
			var xyAddLast = {};
			var calculate = false; { //functions
				function remove_event_listeners() {
					canvas.removeEventListener('mousemove', on_mousemove, false);
					canvas.removeEventListener('mouseup', on_mouseup, false);
					canvas.removeEventListener('touchmove', on_mousemove, false);
					canvas.removeEventListener('touchend', on_mouseup, false);
					document.body.removeEventListener('mouseup', on_mouseup, false);
					document.body.removeEventListener('touchend', on_mouseup, false);
				}

				function get_coords(e) {
					var x, y;
					if (e.changedTouches && e.changedTouches[0]) {
						// var offsety = canvas.offsetTop || 0;
						// var offsetx = canvas.offsetLeft || 0;
						var canvasArea = canvas.getBoundingClientRect();
						var offsety = canvasArea.top || 0;
						var offsetx = canvasArea.left || 0;
						x = e.changedTouches[0].pageX - offsetx;
						y = e.changedTouches[0].pageY - offsety;
					} else if (e.layerX || 0 == e.layerX) {
						x = e.layerX;
						y = e.layerY;
					} else if (e.offsetX || 0 == e.offsetX) {
						x = e.offsetX;
						y = e.offsetY;
					}
					return {
						x: x,
						y: y
					};
				};

				function on_mousedown(e) {
					e.preventDefault();
					e.stopPropagation();
					canvas.addEventListener('mouseup', on_mouseup, false);
					canvas.addEventListener('mousemove', on_mousemove, false);
					canvas.addEventListener('touchend', on_mouseup, false);
					canvas.addEventListener('touchmove', on_mousemove, false);
					document.body.addEventListener('mouseup', on_mouseup, false);
					document.body.addEventListener('touchend', on_mouseup, false);
					var empty = false;
					var xy = get_coords(e);
					context.beginPath();
					pixels.push('moveStart');
					context.moveTo(xy.x, xy.y);
					pixels.push(xy.x, xy.y);
					xyLast = xy;
				};

				function on_mousemove(e, finish) {
					e.preventDefault();
					e.stopPropagation();
					var xy = get_coords(e);
					var xyAdd = {
						x: (xyLast.x + xy.x) / 2,
						y: (xyLast.y + xy.y) / 2
					};
					if (calculate) {
						var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
						var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
						pixels.push(xLast, yLast);
					} else {
						calculate = true;
					}
					context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
					pixels.push(xyAdd.x, xyAdd.y);
					context.stroke();
					context.beginPath();
					context.moveTo(xyAdd.x, xyAdd.y);
					xyAddLast = xyAdd;
					xyLast = xy;
				};

				function on_mouseup(e) {
					remove_event_listeners();
					disableSave = false;
					context.stroke();
					pixels.push('e');
					calculate = false;
				};
				canvas.addEventListener('touchstart', on_mousedown, false);
				canvas.addEventListener('mousedown', on_mousedown, false);
			}
		},
		
		Oncancelinvoice:function(){
			var that=this;
			if (!that._ocaninvPopover) {
				that._ocaninvPopover = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.cancelinvoiceremark", this);
				that.getView().addDependent(that._ocaninvPopover);
			}
			that._ocaninvPopover.open();
			that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Cancleinvoiceremarks", "");
		},
			oninvoicecancleconfirmDial:function(){
				var that=this;
				 if(that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Cancleinvoiceremarks") === ""){
				MessageBox.error("Remarks are mandatory.")
				}else{
					var finaldata={
						roNumber:RepairOrderNo,
						invoiceNumber:SelectedInvoiceVal,
						reasonOFRejection:that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/Cancleinvoiceremarks"),
						Message:""
					};
					oBusyDialog.open();
							
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/BillingCancelSet",	finaldata , {
					success: function (oEvent) {
							oBusyDialog.close();
							that.getInvoiceList();
							if(oEvent.Flag ==="E"){
			sap.m.MessageBox.error(oEvent.Message);
							}else if(oEvent.Flag ==="S"){
			sap.m.MessageBox.success(oEvent.Message);
							}
			that._ocaninvPopover.close();
			
					},
						error: function (err) {
							oBusyDialog.close();
							that._ocaninvPopover.close();
				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
						}
					});
					
				}
		},
		
		oninvoiceCanceldial:function(){
			this._ocaninvPopover.close();
		},
		_Readdpinvoicepaymentmode:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessinvoicepaymentmode = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({RejectionReason:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoicepaymentmodeset", oData.results);
			};
			var oErrorinvoicepaymentmode = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/paymentMethodSet", {

				success: oSuccessinvoicepaymentmode,
				error: oErrorinvoicepaymentmode
			});	
		},
		_Readdpinvoicebanknames:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessinvoicebanknames = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({bankName:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoicebanknamesset", oData.results);
			};
			var oErrorinvoicebanknames = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/BankSet", {

				success: oSuccessinvoicebanknames,
				error: oErrorinvoicebanknames
			});	
		},
		_Readdpinvoicecancelremarks:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessinvoicecancelremarks = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({RejectionReason:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/invoicecancelremarksset", oData.results);
			};
			var oErrorinvoicecancelremarks = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/BillingCancelDescSet", {

				success: oSuccessinvoicecancelremarks,
				error: oErrorinvoicecancelremarks
			});	
		},
		_ReadDPAccCurrentstat:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessAccCurrentstat = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/AccCurrentstatset", oData.results);
			};
			var oErrorAccCurrentstat = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"CURRENT_STATUS" ));
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccessAccCurrentstat,
				error: oErrorAccCurrentstat
			});	
		},
		_ReadDPAcctypeofjob:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessAcctypeofjob = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Acctypeofjobset", oData.results);
			};
			var oErrorAcctypeofjob = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"Job_type" ));
			
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccessAcctypeofjob,
				error: oErrorAcctypeofjob
			});	
		},
		_ReadDPAccTYPEOFACCIDENT:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessAccTYPEOFACCIDENT = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/TYPEOFACCIDENTset", oData.results);
			};
			var oErrorAccTYPEOFACCIDENT= function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"TYPE_OF_ACCIDENT" ));
				
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccessAccTYPEOFACCIDENT,
				error: oErrorAccTYPEOFACCIDENT
			});	
		},
		_ReadDPAccdelayreason:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessAccdelayreason = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/delayreasonset", oData.results);
			};
			var oErrorAccdelayreason = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"DELAY_REASON" ));
				
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccessAccdelayreason,
				error: oErrorAccdelayreason
			});	
		},
		_ReadDPAccinscmpny:function(){
			var that=this;
			oBusyDialog.open();
			var oSuccessinscmpny = function(oData) {
				oBusyDialog.close();
				oData.results.unshift({Value:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/inscmpnyset", oData.results);
			};
			var oErrorinscmpny= function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"INSURANCE_COMPANY" ));
				
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccessinscmpny,
				error: oErrorinscmpny
			});	
		},
		disableAddPointerEvents: function () {
			sap.ui.getCore().byId("roadTestTableId").getDomRef().style["pointer-events"] = "none";
		},
		
		enableAddPointerEvents: function () {
			sap.ui.getCore().byId("roadTestTableId").getDomRef().style["pointer-events"] = "auto";
		},
		onJCRTOBSchange:function(oeve){
			this.getView().getModel('RoadTestInfoModel').getData()[this.pathRTobs].Observations=oeve.getParameters().value;
		oeve.getSource().setHeight(oeve.getSource().getFocusDomRef().scrollHeight + "px");
		oeve.getSource().setWidth(oeve.getSource().getFocusDomRef().scrollWidth + "px");
		
		},
		onJCRTobservations:function(oEvent){

				this.pathRTobs=oEvent.getSource().getBindingContext("RoadTestInfoModel").sPath.split("/")[1];
				var datapop=this.getView().getModel("RoadTestInfoModel").getData()[this.pathRTobs];
				// var popmodel= new JSONModel(datapop);
			// 	sap.ui.getCore().byId("popoverSARemarks").setModel(popmodel,"PopoverModelSARemarks");
			// sap.ui.getCore().byId("popoverSARemarks").openBy(oeve.getSource());
			this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/PopoverModelJCRTOBS",datapop );
			var oButton = oEvent.getSource(),
						oView = this.getView();
						var that=this;
						if (!that._pJCRTOBSPopover) {
							that._pJCRTOBSPopover = Fragment.load({
								id: oView.getId(),
								name: "ndbs.Z_JobCard.fragments.RTObservation",
								controller: that
							}).then(function(oJCRTOBSPopover) {
								oView.addDependent(oJCRTOBSPopover);
								oJCRTOBSPopover.attachAfterOpen(function() {
									that.disableAddPointerEvents();
								}, that);
								oJCRTOBSPopover.attachAfterClose(function() {
									that.enableAddPointerEvents();
								}, that);
								return	oJCRTOBSPopover;
											});
						}
						that._pJCRTOBSPopover.then(function(oJCRTOBSPopover) {
							oJCRTOBSPopover.openBy(oButton);
							oJCRTOBSPopover.getContent()[0].setHeight(oJCRTOBSPopover.getContent()[0]._lastValue.length+ "px");
							oJCRTOBSPopover.getContent()[0].setWidth(oJCRTOBSPopover.getContent()[0]._lastValue.length+ "px");
							
						});	
			
			
		},
		handleSearchassignment: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		onChecklistremarkspress:function(oEvent){	
			this.pathCLremarks=oEvent.getSource().oPropagatedProperties.oBindingContexts.oLocalJsonModel.sPath.split("/")[2];
			var datapop=this.getOwnerComponent().getModel('oLocalJsonModel').getData()['CheckListVehicleParamsInfo'][this.pathCLremarks];
		this.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/PopoverModelCLRemarks",datapop );
		var oButton = oEvent.getSource(),
					oView = this.getView();
					var that=this;
					if (!that._pCLRemarksPopover) {
						that._pCLRemarksPopover = Fragment.load({
							id: oView.getId(),
							name: "ndbs.Z_JobCard.fragments.dialCLRemarks",
							controller: that
						}).then(function(oCLRemarksPopover) {
							oView.addDependent(oCLRemarksPopover);
							oCLRemarksPopover.attachAfterOpen(function() {
								that.disablePointerEventsCLRem();
							}, that);
							oCLRemarksPopover.attachAfterClose(function() {
								that.enablePointerEventsCLRem();
							}, that);
							return	oCLRemarksPopover;
										});
					}
					that._pCLRemarksPopover.then(function(oCLRemarksPopover) {
						oCLRemarksPopover.openBy(oButton);
						if(oCLRemarksPopover.getContent()[0]._lastValue !== ""){
						oCLRemarksPopover.getContent()[0].setHeight(oCLRemarksPopover.getContent()[0]._lastValue.length+ "px");
						oCLRemarksPopover.getContent()[0].setWidth(oCLRemarksPopover.getContent()[0]._lastValue.length+ "px");
						}else{
							oCLRemarksPopover.getContent()[0].setHeight("300px");
							oCLRemarksPopover.getContent()[0].setWidth("500px");
						}
					});	
		
	},
	onCLRemarkschange:function(oeve){
		this.getOwnerComponent().getModel('oLocalJsonModel').getData()['CheckListVehicleParamsInfo'][this.pathCLremarks].Remarks=oeve.getParameters().value;
	oeve.getSource().setHeight(oeve.getSource().getFocusDomRef().scrollHeight + "px");
	oeve.getSource().setWidth(oeve.getSource().getFocusDomRef().scrollWidth + "px");
	// this.AddjobTablechange=true;
	},
	disablePointerEventsCLRem: function () {
		sap.ui.getCore().byId("idCLTree").getDomRef().style["pointer-events"] = "none";
	},
	
	enablePointerEventsCLRem: function () {
		sap.ui.getCore().byId("idCLTree").getDomRef().style["pointer-events"] = "auto";
	},
	Onpressallparameters:function(oeve){
		var data=this.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/CheckListTabInfo");
		
		for(var k=0;k<data.length;k++){
			data[k].All_parameters=true;
			for (var i=0;i<data[k].ParamDet.results.length;i++){
				if(data[k].ParamDet.results[i].Type_pf ==="S"){	
					if(oeve.getParameters().state){
				data[k].ParamDet.results[i].Param_value="X";
					}else{
						data[k].ParamDet.results[i].Param_value="";
					}
				}
			}
			}
			this.getOwnerComponent().getModel("oLocalJsonModel").updateBindings(true);
	},
	onDefBack:function(){
		this.oDefferredJobsFragment.getAggregation("items")[2].setVisible(true);
		this.oDefferredJobsFragment.getAggregation("items")[3].setVisible(false);
	},

	getDeffJobItemsDetails: function(Job) {
		oBusyDialog.open();
		var that = this,
			oSuccess, oError, sFilter = [];
			if(that.getView().getModel("jobDefItemDetailsModel")){
				that.getView().getModel("jobDefItemDetailsModel").setData([]);
				that.getView().getModel("jobDefItemDetailsModel").updateBindings(true);
			}

		//DBFLAG = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").DBFLG;
		var sPackageGuid = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob").PACKAGE_GUID;

		if (sPackageGuid) {
			sFilter.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, sPackageGuid));
		} else {
			sFilter.push(new sap.ui.model.Filter('RO_No', sap.ui.model.FilterOperator.EQ, RepairOrderNo));
			sFilter.push(new sap.ui.model.Filter('Job', sap.ui.model.FilterOperator.EQ, Job));
		}

		oSuccess = function(oData) {
			oBusyDialog.close();
			var data = [];
			var sGUID = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/PACKAGE_GUID");
			var sPackDesc = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/PACKAGE_DESC");
			var jobType = that.getOwnerComponent().getModel("oLocalJsonModel").getProperty("/SelectedJob/Job_Type");
			var jobTypeEnable = true;

			for (var i = 0; i < oData.results.length; i++) {
				if (jobType === "PCK" || jobType === "SM" || jobType === "09" || jobType === "10" || jobType === "07") {
					jobTypeEnable = false;
					oData.results[i].Db_Flg = "X";
				} else {
					jobTypeEnable = true;
					oData.results[i].Db_Flg = oData.results[i].Db_Flg;
				}
				data.push({
					"Item_Type": oData.results[i].Item_Type,
					"Sublet_ID": oData.results[i].Sublet_ID,
					"Code": oData.results[i].Code,
					"Description": oData.results[i].Description,
					"Bill_To": oData.results[i].Bill_To,
					"Split": oData.results[i].Split,
					"Casual_Part": oData.results[i].Casual_Part,
					"Damage_Code": oData.results[i].Damage_Code,
					"UOM": oData.results[i].UOM,
					"Ordered_Qty": oData.results[i].Ordered_Qty,
					"Stock": oData.results[i].Stock,
					"Status": oData.results[i].Status,
					"Reserved_Qty": oData.results[i].Reserved_Qty,
					"Unit_Price": oData.results[i].Unit_Price,
					"Total_Price": oData.results[i].Total_Price,
					"CGST_Percent": oData.results[i].CGST_Percent,
					"CGST_INR": oData.results[i].CGST_INR,
					"SGST_percent": oData.results[i].SGST_percent,
					"SGST_INR": oData.results[i].SGST_INR,
					"IGST_Percent": oData.results[i].IGST_Percent,
					"IGST_INR": oData.results[i].IGST_INR,
					"Tax_Total": oData.results[i].Tax_Total,
					"Total_Amount": oData.results[i].Total_Amount,
					"Discount_Percent": oData.results[i].Discount_Percent,
					"Discount_INR": oData.results[i].Discount_INR,
					"First_Fill": oData.results[i].First_Fill,
					"Remarks": oData.results[i].Remarks,
					"Flag": oData.results[i].Flag,
					"JobItmDtls": oData.results[i].JobItmDtls.results,
					"ItemNr": oData.results[i].ItemNr,
					"Input": sGUID,
					"Descr1": sPackDesc,
					"Jb_Flg": oData.results[i].Db_Flg,
					"Db_Flg": oData.results[i].Db_Flg,
					"WtyTyp": oData.results[i].WtyTyp,
					"enableCQL": false,
					"Damagecd_Mandatory_Flag":oData.results[i].Damagecd_Mandatory_Flag,
					"__metadata": oData.results[i].__metadata
				});
			}
			that.getView().getModel("oLocalJsonModel").setProperty("/jobTypeEnable", jobTypeEnable);
			var oModel = new JSONModel([]);
			that.getView().setModel(oModel, "jobDefItemDetailsModel");
			that.getView().getModel("jobDefItemDetailsModel").setProperty("/Data", data);
		};
		oError = function(e) {
			oBusyDialog.close();
			MessageBox.error(JSON.parse(e.responseText).error.message.value);
		};
		that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ItemDtlsSet", {
			filters: sFilter,
			success: oSuccess,
			urlParameters: {
				"$expand": "JobItmDtls"
			}
		});
	},
	onPressRestore:function(oEvent){
		var that = this;
		var oTable = sap.ui.getCore().byId("TreeTableitem1");
		var selectedIndices = oTable.getSelectedIndices();
		var oModel = this.getView().getModel("jobDefItemDetailsModel");
		var headerData = this.getView().getModel("localJCDeatils").getData();
		var itemArr = [];
		var finalobj ={};
		for(var pp=0;pp<selectedIndices.length;pp++){
			var index = oTable.getSelectedIndices()[pp];
			var context = oTable.getContextByIndex(index);
		   var data = oModel.getProperty(context.getPath());
		   var itemObj = {
			"Input" : data.ItemNr,
			"Job":DefJobNo
		   }
		   itemArr.push(itemObj);
		}
		finalobj.RO_No = headerData.RepairOrderNo;
		finalobj.Job = DefJobNo;
		finalobj.DefJobItem = itemArr;
		var service = "/sap/opu/odata/sap/ZJOB_CARD_SRV";
		var Model = new sap.ui.model.odata.ODataModel(service, true);
			Model.create("/Def_item_detailsSet", finalobj, {
				success: function(oData) {
					MessageBox.success("Data Saved Successfully", {
						title: "success",
						styleClass: "messageBox",
						icon: MessageBox.Icon.SUCCESS,
						actions: [MessageBox.Action.OK],
						onClose: function(oAction) {
							that.onDefBack();
							that.getJobDetailsData();
							/*if (oAction === "OK") {
								that._oTempPassDialog.close();
								that.ongetCheckInInfo();
							}*/
						}
					});
				},
				error: function(err) {
					oBusyDialog.close();
					errmessage = error.responseText;
					errmessage = JSON.parse(errmessage);
					errmessage = errmessage.error.message.value;
					sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
				}
			});
	},

	onAgreementDisp:function(oEvent){
   var agreement = this.getView().getModel("checkInInfoModel").getData().Agreement_Name;
   if(agreement !== ""){
       this.getAgreementData(agreement);
   }else{
	sap.m.MessageBox.show("Please select agreement to view information", sap.m.MessageBox.Icon.ERROR, "Error");
   }
	},

	getAgreementData:function(val){
		oBusyDialog.open();
			var that = this,
				errmessage,aFilter=[];
				aFilter.push(new sap.ui.model.Filter('Agreement', sap.ui.model.FilterOperator.EQ, val));
			var oSuccess = function(oData) {
				oBusyDialog.close();
				if (!that._aggDialog) {
					that._aggDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.AgreementList", that);
					that.getView().addDependent(that._aggDialog);
				}
				
				that._aggDialog.open();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "AgreementPointsModel");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_QUOTATION_SRV").read("/AgreePointSet", {
				filters: aFilter,
				success: oSuccess,
				error: oError
			});
	},
	onAggCancel:function(){
		this._aggDialog.close();
		this._aggDialog.destroy();
		this._aggDialog = null;
	},

	onPressAllParametersInspection:function(oEvent){
		var SelecedSegBtn = sap.ui.getCore().byId("InspSegButtonId").getSelectedKey();
		var state = oEvent.getSource().getState();
		var that = this;
		if(SelecedSegBtn !== 'Inventory'){
		var Data = this.getView().getModel("InspParametersModel").getData();
	/*if (!DIfinaldatamain.some(e1 => e1.check_item === that.getView().getModel("InspParametersModel").getData()[0].check_item)) {
		DIfinaldatamain = DIfinaldatamain.concat(that.getView().getModel("InspParametersModel").getData());
	}
	var Data = DIfinaldatamain;*/
	//var Data = this.InspCheckListGlobalData;
	    for(var i=0;i<Data.length;i++){
			Data[i].Initial_Insp = state;
			Data[i].Application = "SA";
		}
		this.getView().getModel("InspParametersModel").updateBindings(true);
	}else{
		var Data1 = this.getView().getModel("InventoryInfoModel").getData();
		for(var i=0;i<Data1.length;i++){	
			Data1[i].IN_State = state;
		}
		this.getView().getModel("InventoryInfoModel").updateBindings(true);
		//this.getView().getModel("InventoryInfoModel").refresh(true);
	}
	},
	timercolor:function(){


		var that=this;
		setTimeout(() => {
				for(var x=0;x<5;x++){
					// for(var y=8;y<16;y++){
					var value=that.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Per;
					var value1=that.getView().getModel("asignedVehiclesListModel").getData()[x].Re_Per;
						var value2=that.getView().getModel("asignedVehiclesListModel").getData()[x].Cr_Per;
					var value3=that.getView().getModel("asignedVehiclesListModel").getData()[x].Ap_Per;
						var value4=that.getView().getModel("asignedVehiclesListModel").getData()[x].As_Per;
					var value5=that.getView().getModel("asignedVehiclesListModel").getData()[x].Pe_Per;
						var value6=that.getView().getModel("asignedVehiclesListModel").getData()[x].In_Per;
					var value7=that.getView().getModel("asignedVehiclesListModel").getData()[x].Iv_Per;
				
					var offsetFO,offsetFO2;
					if(value1 >=100){
						offsetFO="100%";
						offsetFO2="0%";
					}else{
						offsetFO=value1+"%";
						offsetFO2=(100-value1)+"%";
					}	
					var offset24a,offset24b;
					if(value >=100){
					offset24a="100%";
					offset24b="0%";
					}else{
					offset24a=value+"%";
					offset24b=(100-value)+"%";	
					}
						var offsetcra,offsetcrb;
					if(value1 >=100){
						offsetcra="100%";
						offsetcrb="0%";
					}else{
						offsetcra=value1+"%";
						offsetcrb=(100-value1)+"%";
					}	
					var offsetapa,offsetapb;
					if(value >=100){
					offsetapa="100%";
					offsetapb="0%";
					}else{
					offsetapa=value+"%";
					offsetapb=(100-value)+"%";	
					}
					
						var offsetala,offsetalb;
					if(value1 >=100){
						offsetala="100%";
						offsetalb="0%";
					}else{
						offsetala=value1+"%";
						offsetalb=(100-value1)+"%";
					}	
					var offsetpea,offsetpeb;
					if(value >=100){
					offsetpea="100%";
					offsetpeb="0%";
					}else{
					offsetpea=value+"%";
					offsetpeb=(100-value)+"%";	
					}
					
						var offsetina,offsetinb;
					if(value1 >=100){
						offsetina="100%";
						offsetinb="0%";
					}else{
						offsetina=value1+"%";
						offsetinb=(100-value1)+"%";
					}	
					var offsetiva,offsetivb;
					if(value >=100){
					offsetiva="100%";
					offsetivb="0%";
					}else{
					offsetiva=value+"%";
					offsetivb=(100-value)+"%";	
					}
  $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[8].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offset24a+",#000 "+offset24b+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[9].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetFO+",#000 "+offsetFO2+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[10].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetcra+",#000 "+offsetcrb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[11].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetapa+",#000 "+offsetapb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[12].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetala+",#000 "+offsetalb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[13].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetpea+",#000 "+offsetpeb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[14].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetina+",#000 "+offsetinb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[x].getCells()[15].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[x].Two_Four_Color+" "+offsetiva+",#000 "+offsetivb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
     $(".btnc span").css({
			 		"border-radius": "70%",
    "background": "transparent",
    "border": "0px",
    "background": "#000",
    "display": "block",
	"color": "white",
    "font-size": "0.75rem"});
					}
				// }
}, "1000");	

	


},
firstVisibleRowChanged:function(oeve){
	var that=this;
	var firstrow=oeve.getSource().getFirstVisibleRow();
		setTimeout(() => {
	for(var i=0;i<5;i++){
		var value=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Per;
					var value1=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Re_Per;
						var value2=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Cr_Per;
					var value3=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Ap_Per;
						var value4=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].As_Per;
					var value5=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Pe_Per;
						var value6=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].In_Per;
					var value7=that.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Iv_Per;
				
					var offsetFO,offsetFO2;
					if(value1 >=100){
						offsetFO="100%";
						offsetFO2="0%";
					}else{
						offsetFO=value1+"%";
						offsetFO2=(100-value1)+"%";
					}	
					var offset24a,offset24b;
					if(value >=100){
					offset24a="100%";
					offset24b="0%";
					}else{
					offset24a=value+"%";
					offset24b=(100-value)+"%";	
					}
						var offsetcra,offsetcrb;
					if(value1 >=100){
						offsetcra="100%";
						offsetcrb="0%";
					}else{
						offsetcra=value1+"%";
						offsetcrb=(100-value1)+"%";
					}	
					var offsetapa,offsetapb;
					if(value >=100){
					offsetapa="100%";
					offsetapb="0%";
					}else{
					offsetapa=value+"%";
					offsetapb=(100-value)+"%";	
					}
					
						var offsetala,offsetalb;
					if(value1 >=100){
						offsetala="100%";
						offsetalb="0%";
					}else{
						offsetala=value1+"%";
						offsetalb=(100-value1)+"%";
					}	
					var offsetpea,offsetpeb;
					if(value >=100){
					offsetpea="100%";
					offsetpeb="0%";
					}else{
					offsetpea=value+"%";
					offsetpeb=(100-value)+"%";	
					}
					
						var offsetina,offsetinb;
					if(value1 >=100){
						offsetina="100%";
						offsetinb="0%";
					}else{
						offsetina=value1+"%";
						offsetinb=(100-value1)+"%";
					}	
					var offsetiva,offsetivb;
					if(value >=100){
					offsetiva="100%";
					offsetivb="0%";
					}else{
					offsetiva=value+"%";
					offsetivb=(100-value)+"%";	
					}
					$("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[8].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offset24a+",#000 "+offset24b+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[9].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetFO+",#000 "+offsetFO2+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[10].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetcra+",#000 "+offsetcrb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[11].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetapa+",#000 "+offsetapb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[12].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetala+",#000 "+offsetalb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[13].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetpea+",#000 "+offsetpeb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    
     $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[14].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetina+",#000 "+offsetinb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
    $("#"+sap.ui.getCore().byId("AssignedTableId").getRows()[i].getCells()[15].sId).css({
			 	"background": "linear-gradient(to top,"+this.getView().getModel("asignedVehiclesListModel").getData()[firstrow+i].Two_Four_Color+" "+offsetiva+",#000 "+offsetivb+")",
    "border-radius": "50%",
    "color": "#122dff",
    "display":"inline-block",
    "font-size": "20px",
    "padding": "4px",
    "text-decoration": "none"});
			// var value=that.getView().getModel("asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow()+i ].Two_Four_Per;
			// 		var offset24a,offset24b;
			// 		if(value >=100){
			// 		offset24a="100%";
			// 		offset24b="0%";
			// 		}else{
			// 		offset24a=value+"%";
			// 		offset24b=(100-value)+"%";	
			// 		}
				// oeve.getSource().getRows()[i].getCells()[0].rerender();
				// console.log(oeve.getSource().getModel("asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow()+i].Two_Four_Color);
				// 	$("#"+oeve.getSource().getRows()[i].getCells()[8].sId).css({
			 //	"background": "linear-gradient(to top,"+ oeve.getSource().getModel("asignedVehiclesListModel").getData()[oeve.getSource().getFirstVisibleRow()+i].Two_Four_Color+" "+offset24a+",#000 "+offset24b+")",
    // "border-radius": "50%",
    // "color": "#122dff",
    // "display":"inline-block",
    // "font-size": "20px",
    // "padding": "4px",
    // "text-decoration": "none"});
	$(".btnc span").css({
		"border-radius": "70%",
"background": "transparent",
"border": "0px",
"background": "#000",
"display": "block",
"color": "white",
    "font-size": "0.75rem"});
    
		}	
		}, "10");	

},
getpackagehistoryDP:function(){
	var that=this;
			oBusyDialog.open();
			var oSuccesspackagehistoryDP = function(oData) {
				oBusyDialog.close();
				// oData.results.unshift({Description:""});
				that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/Packagehistorydata", oData.results);
			};
			var oErrorpackagehistoryDP = function(err) {
				oBusyDialog.close();

				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];
			aFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ,"Package_history" ));
			aFilters.push(new sap.ui.model.Filter("RO_No", sap.ui.model.FilterOperator.EQ,RepairOrderNo ));
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				filters: aFilters,
				success: oSuccesspackagehistoryDP,
				error: oErrorpackagehistoryDP
			});	
},
onPressRecallsAtt:function(oEvent){
	var data = oEvent.getSource().getBindingContext("measuresRecallsInfoModel").getObject();
	var that=this;
			oBusyDialog.open();
			var oSuccessRecallAtt = function(oData) {
				oBusyDialog.close();
				if (!that._RecallAttDialog) {
					that._RecallAttDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.RecallAttList", that);
					that.getView().addDependent(that._RecallAttDialog);
				}
				
				that._RecallAttDialog.open();
				var oModel = new JSONModel(oData);
				that.getView().setModel(oModel, "RecallAttachmentsModel");
				//that.getOwnerComponent().getModel("oLocalJsonModel").setProperty("/RecallAttachments", oData.results);
			};
			var oErrorRecallAtt = function(err) {
				oBusyDialog.close();
				sap.m.MessageBox.show(err.responseText, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			var aFilters = [];							
			aFilters.push(new sap.ui.model.Filter("claimNo", sap.ui.model.FilterOperator.EQ,data.Campaign_No));
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/AttachmentListSet", {
				filters: aFilters,
				success: oSuccessRecallAtt,
				error: oErrorRecallAtt
			});
},
onRecallAttCancel:function(){
	this._RecallAttDialog.close();
	this._RecallAttDialog.destroy();
	this._RecallAttDialog = null;
},
onhandleRecallAttPress:function(oEvent){
var Data = oEvent.getSource().getBindingContext("RecallAttachmentsModel").getObject();
var Filename = Data.claimNo+'-'+Data.documents;
var sRead = "/sap/opu/odata/sap/ZJOB_CARD_SRV/AttachmentVOSet(File_Name='"+Filename+"')/$value";
sap.m.URLHelper.redirect(sRead, true);
},
onPressByPass:function(oEvent){
	var that = this;
	var oTable = sap.ui.getCore().byId("TreeTableitem");
	var oModel = this.getView().getModel("jobItemDetailsModel");
	var selectedIndices = oTable.getSelectedIndices();
	this.selectedByPassItem = "";
	if(selectedIndices.length === 0){
		MessageBox.error("Please select at least one line item");
		return;
	}else if(selectedIndices.length > 1){
		MessageBox.error("Please select only one line item");
		return;
	}
	for(var pp=0;pp<selectedIndices.length;pp++){
		var index = oTable.getSelectedIndices()[pp];
		var context = oTable.getContextByIndex(index);
	   var data = oModel.getProperty(context.getPath());
	   this.selectedByPassItem = data.ItemNr;
	}
	if (!that._ReqByPassDialog) {
		that._ReqByPassDialog = sap.ui.xmlfragment("ndbs.Z_JobCard.fragments.ReqByPass", that);
		that.getView().addDependent(that._ReqByPassDialog);
	}
	that._ReqByPassDialog.open();
	this.getClaimTypes();
},

onCancelByPass:function(){
	this._ReqByPassDialog.close();
	
	this._ReqByPassDialog.destroy();
	this._ReqByPassDialog = null;
},

getClaimTypes:function(ClaimTyp){
	var that = this;
			var oSuccess, oError, aJobFilter1 = [];
			if(ClaimTyp){
				aJobFilter1.push(new sap.ui.model.Filter('ClaimTyp', sap.ui.model.FilterOperator.EQ, ClaimTyp));
				aJobFilter1.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "REASON"));	
			}else{
				aJobFilter1.push(new sap.ui.model.Filter('Input', sap.ui.model.FilterOperator.EQ, "CLAIM_TYPE"));
			}
			oSuccess = function(oData) {
				var oJobJSONModel1 = new JSONModel(oData.results);
				if(ClaimTyp){
					this.getView().setModel(oJobJSONModel1, "ReasonByPassModel");
				}else{
				this.getView().setModel(oJobJSONModel1, "claimTypeByPassModel");
				}
			}.bind(this);
			oError = function(e) {
				MessageBox.error(JSON.parse(e.responseText).error.message.value);
			};
			this.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/ByPassSet", {
				filters: aJobFilter1,
				success: oSuccess,
				error: oError
			});
},
onSelectionClaimType:function(oEvent){
	var ClaimTyp = oEvent.getSource().getSelectedItem().getBindingContext("claimTypeByPassModel").getObject().ClaimTyp;
    this.getClaimTypes(ClaimTyp);
},
onOkByPass:function(){
	var that = this;
	var obj = {},oSuccess,oError;
	oBusyDialog.open();
	obj.ClaimTyp = sap.ui.getCore().byId("idClaimTypeByPass").getSelectedKey();
	obj.Reason = sap.ui.getCore().byId("idReasonByPass").getSelectedKey();
	if(sap.ui.getCore().byId("idReasonByPass").getSelectedItem()){
	obj.Event = sap.ui.getCore().byId("idReasonByPass").getSelectedItem().getAdditionalText();
	}
	if(obj.ClaimTyp === "" || obj.Reason === ""){
		oBusyDialog.close();
		MessageBox.error("Please select claim type and reason");
		return;
	}
	
	obj.ItemNo = this.selectedByPassItem;
	obj.RO_No = RepairOrderNo;
	oSuccess = function(oData) {
		oBusyDialog.close();
		if(oData.Flg === 'S'){
			MessageBox.success(oData.Msg);
		}else if(oData.Flg === 'E'){
			MessageBox.error(oData.Msg);
		}
		that.onCancelByPass();
	}
	oError = function(e) {
		oBusyDialog.close();
		try{
		MessageBox.error(JSON.parse(e.responseText).error.message.value);
		}catch{
			MessageBox.error(e.responseText);
		}
	};
	this.getOwnerComponent().getModel("ZJOB_CARD_SRV").create("/ByPassSet",obj, {
		success: oSuccess,
		error: oError
	});


},
ReadComplaintdata:function(){
	oBusyDialog.open();
			var that = this,
				errmessage;
			var sFilters = [];
			sFilters.push(new sap.ui.model.Filter("Input", sap.ui.model.FilterOperator.EQ, "COMPLAINTS"));
			

			var oSuccess = function(oData) {
				oBusyDialog.close();
				var oModel = new JSONModel(oData.results);
				that.getView().setModel(oModel, "Complaintsdata");
			};
			var oError = function(error) {
				oBusyDialog.close();
				errmessage = error.responseText;
				errmessage = JSON.parse(errmessage);
				errmessage = errmessage.error.message.value;
				sap.m.MessageBox.show(errmessage, sap.m.MessageBox.Icon.ERROR, "Error");
			};
			that.getOwnerComponent().getModel("ZJOB_CARD_SRV").read("/Drop_DownSet", {
				success: oSuccess,
				error: oError,
				filters: sFilters
			});

}
	
	});
});