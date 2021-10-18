const filemanager = require('../../file_incomplete/file');
const faker = require('faker');
const routerUtil = {
    name: 'routerUtil',
    getMockData: function(req, res){
        let students = filemanager.getMockStudents();
        let courses = filemanager.getMockCourses();
        return{
            students: students,
            courses: courses
        }
    },
    getData: function(req, res){
        //TBD
    },
    getStudents: function(req, res){
        return filemanager.getAllStudents();
    },
    getCourses: function(req, res){
        return filemanager.getAllCourses();
    },
    getStudent: function(req, res){
        //TBD
    },
    getCourse: function(req, res){
        //TBD
    }
}

module.exports = routerUtil;
