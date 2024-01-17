import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { LabService } from '../../services/lab.service';
import { DataService } from '../../../minor-analysis/data.service';
import { StatusService } from '../../../minor-analysis/status.service';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import * as allcourses from 'backend/backend/server/data_files/courses_with_credits.json';
import * as allcourses3 from 'backend/backend/server/data_files/courses_for_endsem.json';
import * as allcoursestheory from 'backend/backend/server/data_files/theory_courses.json';
import * as allcourseslab from 'backend/backend/server/data_files/lab_courses.json';

import { Router } from '@angular/router';

interface FormattedStudent {
  USN: string;
  Name: string;
  [courseCode: string]: {
    CIE: string;
    Attendance: string;
  } | string;
}
@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {
  ExelData: any;
  exeldata: any;
  retrievedData: any;

  count: number = 1;

  //get student data from database
  studentResult: any;
  studentList: any;

  attendanceresult: any;
  attendance: any;

  //to display courses
  course1: string = "";
  course2: string = "";
  course3: string = "";
  course4: string = "";
  course5: string = "";
  course6: string = "";


  couses: any = (allcourses as any).default;
  courses: any = (allcourses3);
  theorycourses: any = (allcoursestheory)
  labcourses: any = (allcourseslab)


  test: string = "22ECSC303";

  showSem: number = 3;
  showdiv: string = "A";

  Showdate: any;
  //tos store unique values of json
  studdentusn: any = [];
  studdentname: any = [];
  studdentcourse: any = [];
  studdentcourseid: any = [];

  studentColumns: string[] = ['Sl no.', 'USN', 'Name', 'Course1 CIE', 'Course1 Att', 'Course2 CIE', 'Course2 Att', 'Course3 CIE', 'Course3 Att', 'Course4 CIE', 'Course4 Att', 'Course5 CIE', 'Course5 Att'];



  constructor(private studentService: StudentsService, private labService: LabService,
    private toast: ToastrService,
    private dataService: DataService, private route: Router) {
    this.Showdate = studentService.displayDate();
  }


  ngOnInit(): void {
    console.log(this.courses);
    console.log(this.courses.sem3);
    console.log(this.courses.sem3[0].code);
    console.log(this.couses);
  }

  //read xl file to store data in json
  readfile(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.ExelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.ExelData);
    }


  }
  readfile2(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.exeldata = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.exeldata);
    }

  }

  //upload captured json to database
  uploadstudent() {
    this.studentService.uploadlist(this.exeldata).subscribe((data) => {
      console.log('students are added', data);
    }, err => {
      console.log(err);
    })

  }

  uploadstudentlab() {
    if (!this.exeldata) {
      this.toast.error("cannot upload empty data");
    }
    else {
      this.labService.uploadlist(this.exeldata).subscribe((data: any) => {
        console.log('students are added', data);
        this.toast.success("uploaded successfully");
      }, err => {
        console.log(err);
        this.toast.error("server error cannot add student list");
      })
    }
  }



  inp: any = {
    sem: '',
    // filename: ''
  };

  statusMessage = '';

  validateInput1(): boolean {
    for (let key in this.inp) {
      const value = this.inp[key].trim();
      console.log(`Key: ${key}, Value: ${value}`);

      // Check if the key is "sem" and value is not an empty string
      if (key === 'sem' && value === '') {
        return false;
      }

      if (value === '') {
        return false;
      }
    }
    return true;
  }



  retrieveDataBySem(): void {
    console.log("HIIII");
    if (!this.validateInput1()) {
      this.statusMessage = 'ERROR: Invalid or missing field';
    } else {
      this.statusMessage = '';
      const sem = parseInt(this.inp.sem);
      this.dataService.getTheoryBySem(sem).subscribe(
        (data) => {
          console.log('Data retrieved successfully:', data);

          // Transform the data structure to the desired format
          this.retrievedData = Object.keys(data.result).map(usn => {
            const studentDetails = data.result[usn];
            const formattedStudent: FormattedStudent = {
              USN: studentDetails.USN,
              Name: studentDetails.Name,
            };

            Object.keys(studentDetails).forEach(key => {
              if (key !== 'USN' && key !== 'Name') {
                formattedStudent[key] = {
                  CIE: studentDetails[key].CIE,
                  Attendance: studentDetails[key].Attendance,
                };
              }
            });

            return formattedStudent;
          });

          console.log('Formatted Data:', this.retrievedData);
          this.retrievedData.map((student: any) => {
            console.log('Formatted Student Data:', student);
          });
        },
        (error) => {
          console.log('Error retrieving data:', error);
        }
      );
    }
  }




  formvalue(E: any) {
    let sem = E.target.value;


    if (sem == 7) {
      console.log(sem);
      this.course1 = "17ECSC401";
      this.course2 = "20ECSE402";
      this.course3 = "18ECSE402";
      this.course4 = "19ECSE401";
      this.course5 = "20ECSE504";
    }
    else if (sem == 6) {
      console.log(sem);
      this.course1 = "20ECSC303";
      this.course2 = "20ECSC305";
      this.course3 = "22ECSC307";
      this.course4 = "17ECSE307";
      this.course5 = "";
      // this.course6="17ECSE303";
      // this.course7="17ECSE309";
      // this.course8="18ECSE302";
      // this.course9="17ECSE306";
      // this.course10="19ECSE303";
      // this.course11="12ECSE332";


    } else if (sem == 5) {
      console.log(sem);
      this.course1 = this.couses[2].courses[4].code;
      this.course2 = "19ECSC302";
      this.course3 = "17ECSC302";
      this.course4 = "22ECSC306";


    } else if (sem == 4) {
      console.log(sem);
      this.course1 = "20EMAB209";
      this.course2 = "21ECSC206";
      this.course3 = "20ECSC204";
      this.course4 = "19ECSC203";
      this.course5 = "22ECSC202";
      this.course6 = "21ECSC210";


    } else if (sem == 3) {
      console.log(sem);
      this.course1 = this.couses[0].courses[0].code;
      this.course2 = "19ECSC202";
      this.course3 = "20ECSC201";
      this.course4 = "20ECSC205";
      this.course5 = "15ECSC208";
    }
    this.courses = this.courses['sem' + sem];
    this.theorycourses = this.theorycourses['sem' + sem];

    console.log(this.courses);
  }


  incrementSno() {
    this.count += 1;
  }

  resetSno() {
    this.count += 1;
  }

}