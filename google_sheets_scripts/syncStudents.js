//tutorial source: https://github.com/grahamearley/FirestoreGoogleAppsScript
//FirestoreApp google script library id: 1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw 

var email = "*secret*";
var key = "*secret*";
var projectId = "*secret*";

var firestore = FirestoreApp.getFirestore(email, key, projectId);

function startStudentsDoingStandardSync() {
  Logger.log("i am working")
  
  //Get the currently active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  //Get the number of rows and columns which contain some content
  // minus the 3 rows of headers

  var [rows, columns] = [sheet.getLastRow() - 1, sheet.getLastColumn()];
  Logger.log("rows: " + rows);
  Logger.log("columns: " + columns);


  //============= Get Subject Data =============
  var subjectData = sheet.getRange(1, 2, 2, 1).getValues();
  
  var subject = subjectData[0][0]
  var teacher = subjectData[1][0]
  
  //============= Get Standard Data =============
  var standardData = sheet.getRange(2, 4, 4, 1).getValues();
  
  var assessmentName = standardData[0][0]
  var assessmentNum = standardData[1][0]
  var assessmentCredits = standardData[2][0]
  var dueDate = standardData[3][0]
   
   //============= Get Progress Data & Report Comments =============
  var progress = sheet.getRange(8, 1, 40, 6).getValues();
  for (var i = 0; i < progress.length; i++) {
    
    var taiohiData = progress[i]
    //Logger.log(taiohiData)
 
    // check that row is not empty
    if (taiohiData[0] != null && taiohiData[0] != "" && taiohiData[0] != "0") {
      var nsn = Number(taiohiData[0])
      var name = taiohiData[1]
      
      var standardDataObj = {
        nsn: nsn,
        //name: taiohiData[1],
        completed: taiohiData[2],
        teacherComment: taiohiData[3],
        status: taiohiData[4],
        
        subject: subject,
        assessmentNum: assessmentNum,
        assessmentName: assessmentName,
        assessmentCredits: assessmentCredits,
        dueDate: dueDate,
        teacher: teacher
      }

      var updateObj = {
        last_updated: new Date()
      }
      
      Logger.log(updateObj)
      Logger.log(standardDataObj)
      
      // update 'last update'
      firestore.updateDocument("students/"+nsn, updateObj, true)
    
      // add standard info to each student
      firestore.updateDocument("students/"+nsn+"/openCredits2021/"+assessmentNum, standardDataObj)
      Logger.log("standards added to TU TOA DB, for: " + name)
      
    } else {
           Logger.log('this row does NOT have content') 
    }
    
    
  }
}

function reportCommentsSync() {
   //Get the currently active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  //============= Get Subject Data =============
  var subjectData = sheet.getRange(1, 2, 2, 1).getValues();
  
  var subject = subjectData[0][0]
  var teacher = subjectData[1][0]
  
   //============= Report Comments =============
  var progress = sheet.getRange(6, 1, 40, 3).getValues();
  for (var i = 0; i < progress.length; i++) {
    
    var taiohiData = progress[i]
    //Logger.log(taiohiData)
    
     // check that row is not empty
    if (taiohiData[0] != null && taiohiData[0] != "" && taiohiData[0] != "0") {
      var nsn = taiohiData[0]
      var name = taiohiData[1]
      
      var reportDataObj = {
         subject: subject,
         teacher: teacher,
         reportComment: taiohiData[2]
      }
      
      firestore.updateDocument("students/"+nsn+"/reportComments2021/"+ subject, reportDataObj) 
      Logger.log("report comments added to TU TOA DB, for: " + name)
      
    } else {
           Logger.log('this row does NOT have content') 
    }
      
  }
 
}