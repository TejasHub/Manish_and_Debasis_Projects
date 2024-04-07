public with sharing class CloneCase {
    @AuraEnabled
    public static Opportunity collectCaseDetails(String oppId){ 
        try{
            List<String> fieldsList = new List<String>();
            Map<String, Schema.SObjectField> fieldSchemaMap = Schema.getGlobalDescribe().get('Opportunity').getDescribe().fields.getMap();
            for(String fieldName : fieldSchemaMap.keySet())
            {
                Schema.DescribeFieldResult fieldDescribe = fieldSchemaMap.get(fieldName).getDescribe();
                if(fieldDescribe.isCreateable()){fieldsList.add(fieldName);}
            }
            return Database.Query('Select '+String.join(fieldsList, ',')+' from Opportunity where Id = \''+oppId+'\'');
        }catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }}