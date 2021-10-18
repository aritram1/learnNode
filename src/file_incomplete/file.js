const fs = require("fs");
const path = require('path');
const faker = require('faker');
const studentFileName = '/data/students.json';
const courseFileName = '/data/courses.json';

const FileManager = {

    getMockStudents: function(){
        let count = 0;
        let mockstudents = [];
        while(count < 5){   
            count+=1;
            let student = this.generateStudentInfo();
            mockstudents.push(student);
        }
        this.save(mockstudents, studentFileName, existing=false);
        return mockstudents;
    },

    getMockCourses(){
        let count = 0;
        let mockcourses = [];
        while(count < 5){   
            count+=1;
            let course = this.generateCourseInfo();
            mockcourses.push(course);
        }
        this.save(mockcourses, courseFileName, existing=false);
        return mockcourses;
    },

    getStudents: function(){
        let fileContent = fs.readFileSync(path.join(__dirname, fileName)).toString();
        let students = new Array(JSON.parse(fileContent))[0];
        this.save(students,studentFileName, false);
        return students;
    },
    getCourses: function(){
        let fileContent = fs.readFileSync(path.join(__dirname, fileName)).toString();
        let courses = new Array(JSON.parse(fileContent))[0];
        this.saveCourses(courses, courseFileName, false);
        return courses;
    },
    
    getStudent: function(studentId){
        let record = this.getOne('student', studentId);
        return record;
        // let allStudents = this.getAllCourses();
        // let matchingStudent;
        // for(let student of allStudents){
        //     if(student.id === studentId){
        //         matchingStudent = student;
        //         break;
        //     }
        // }
        // if(!matchingStudent) throw 'student not found';
        // return matchingStudent;
    },

    getCourse: function(courseId){
        let record = this.getOne('course', courseId);
        return record;
        // let allCourses = this.getAllCourses();
        // let matchingCourse;
        // for(let course of allCourses){
        //     if(course.id === courseId){
        //         matchingCourse = course;
        //         break;
        //     }
        // }
        // if(!matchingCourse) throw 'course not found';
        // return matchingCourse;
    },

    getOne: function(id, type){
        let all;matching;
        switch(type){
            case 'student':
                all = this.getAllStudents();
                break;
            case 'course':
                all = this.getAllCourses();
                break;
        }
        for(let each of all){
            if(each.id === id){
                matching = each;
                break;
            }
        }
        if(!matching) throw `${type} with id ${id} not found`;
        return matching;
    },
    
    // Utility methods to generate student and course info
    generateStudentInfo : function(studentId){
        return{
            id: studentId ? studentId : faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            country: faker.address.city()
        }
    },
    generateCourseInfo: function(courseId){
        return {
            id: courseId ? courseId : faker.datatype.uuid(),
            name: 'Introduction to ' + faker.commerce.department(),
            price: faker.commerce.price()
        }
    },

    save : function(records, fileName, existing=true){
        let existingContent = fs.readFileSync(path.join(__dirname, fileName)).toString();
        let existingRecords = existing ? new Array(JSON.parse(existingContent)) : [];
        for(r of records) {
            existingRecords.push(r);
        }
        const data = fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(existingRecords));
    },

    // saveStudents : function(students, existing=true){
    //     console.log('In saveAllStudents>' + JSON.stringify(students));
    //     let existingRecords = [];
    //     if(existing){
    //         let existingContent = fs.readFileSync(path.join(__dirname, '/data/students.json')).toString();
    //         existingRecords = new Array(JSON.parse(existingContent));
    //     }
    //     console.log('EXISTING RECORDS>' + JSON.stringify(existingRecords));
    //     for(stud of students) {
    //         existingRecords.push(stud);
    //     }
    //     console.log('In saveAllStudents> after write ' + JSON.stringify(existingRecords));
    //     const data = fs.writeFileSync(path.join(__dirname, '/data/students.json'), JSON.stringify(existingRecords));
    // },

    // createStudent : function(student){
    //     //read the students.json file
    //     let existingContent = fs.readFileSync(path.join(__dirname, '/data/students.json')).toString();
    //     existingRecords = new Array(JSON.parse(existingContent));
    //     existingRecords.push(student);
    //     //add the student record with <student> info
    //     const data = fs.writeFileSync('../data/students.json', JSON.stringify(existingRecords));
    //     return student.id;
    // },

    // createEnrollments : function(){
    //     //TBI
    // },

    // findStudent: function(studentId){
    //     //parse the file

    //     //get the student info

    //     //return if present
    // },

    // findCourse: function(studentId){
    //     //parse the file

    //     //get the course info

    //     //return if present
    // },
    // findEnrollment : function(){
    //     //parse the file

    //     //get the course info

    //     //return if present
    // },
    // getAllCourses: function(){
    //     let count = 0;
    //     let courses = [];
    //     while(count < 5){
    //         count+=1;
    //         courses.push(this.generateCourseInfo());
    //     }
    //     return courses;
    // }
    
}
module.exports = FileManager;