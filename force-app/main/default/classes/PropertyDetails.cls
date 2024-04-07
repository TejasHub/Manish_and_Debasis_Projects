public with sharing class PropertyDetails {

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getLatestProperty(){
        List<Property__c> allPropertyList = new List<Property__c>();
        allPropertyList = [SELECT Id, Additional_Room__c,
                       Area__c,
                       Available_From__c,
                       Carpet_area_sqft__c,
                       Coverd_area_sqft__c,
                       Electricity_Status__c,
                       Facing__c,
                       Floor__c,
                       For_Bachellor__c,
                       For_Family__c,
                       Furnished_Type__c,
                       Furnishning_Available__c,
                       Geo_Map__c,
                       Landmark__c,
                       Location__c,
                       Maintainance_Charge__c	,
                       No_of_Balcony__c,
                       No_Of_Bed_Room__c,
                       OwnerId,
                       Property_Description__c,
                       Property_Main_Image__c,
                       Name,
                       Property_Owner__c,
                       Property_Video_URL__c,
                       Rent__c,
                       Security_Deposit__c,
                       State__c,
                       Status__c,
                       street__c,
                       Verified__c,
                       Water_Availability__c FROM Property__c];
        return allPropertyList;
    }
}