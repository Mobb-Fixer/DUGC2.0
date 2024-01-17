import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-course-widthdrawal-report',
  templateUrl: './course-widthdrawal-report.component.html',
  styleUrls: ['./course-widthdrawal-report.component.css'],
})
export class CourseWidthdrawalReportComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private studentService: StudentsService
  ) { }

  students: any;
  sno: number = 1;
  selectedSem = '';
  stud: any;
  studentsOfSelectedSem: any = [];
  courseCode: any = new Set();
  courseName: any = new Set();
  i = 0;
  c: number = 0;
  startSpaces = 0;
  trailSpaces = 0;

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data;
    });
  }
  hasSelectedCourse(student: any, code: string): boolean {
    return student.selectedCourseToWithdraw.some((c: any) => c.code === code);
  }

  getCourseDetails(student: any, courseCode: string): { att: number, cie: number } {
    const course = student.selectedCourseToWithdraw.find((c: any) => c.code === courseCode);
    return course ? { att: course.attendance, cie: course.cie } : { att: 0, cie: 0 };
  }

  printReport() {
    window.print();
  }

  incrementSno() {
    this.sno += 1;
  }

  resetSno() {
    this.sno = 1;
  }

  getSemReport(selectedSem: string) {
    this.courseCode = new Set();
    this.courseName = new Set();
    this.selectedSem = selectedSem;

    for (this.stud of this.students) {
      if (this.stud.status == 'approved' && this.stud.sem == selectedSem) {
        this.studentsOfSelectedSem.push(this.stud);

        for (
          this.c = 0;
          this.c < this.stud.selectedCourseToWithdraw.length;
          this.c++
        ) {
          this.courseCode.add(
            this.stud.selectedCourseToWithdraw[this.c].code
          );
          this.courseName.add(
            this.stud.selectedCourseToWithdraw[this.c].name
          );
        }
      }
      this.i++;
    }

    this.courseCode = Array.from(this.courseCode);
    this.courseName = Array.from(this.courseName);

    this.i = 0;

  }

  getPosition(course: any) {
    this.startSpaces = this.courseCode.indexOf(course.code);
    this.trailSpaces = this.courseCode.length - this.startSpaces - 1;
  }

  counter(i: number) {
    return new Array(i);
  }
}