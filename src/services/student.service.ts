import axios from "axios";
import { Student } from "../store.toolkit/features/student.slice";
import { storageService } from "./async.storage.service";

const STORAGE_KEY = "STUDENT";

export const studentService = {
  query,
  save,
  remove,
  update,
};

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

async function query() {
  return (await instance.get("students")).data;

  var students = await storageService.query(STORAGE_KEY);
  if (!students || !students.length) {
    students = _getDemoStudents();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }
  return students;
}

async function remove(studentId: number) {
  return (await instance.delete(`students/${studentId}`)).data;

  return await storageService.remove(STORAGE_KEY, studentId);
}

async function save(student: Student) {
  return (await instance.post("students", student)).data;

  const savedStudent = await storageService.post(STORAGE_KEY, student);

  return savedStudent;
}

async function update(student: Student) {
  return (await instance.patch(`students/${student._id}`, student)).data;

  const savedStudent = await storageService.put(STORAGE_KEY, student);

  return savedStudent;
}

function _getDemoStudents() {
  const students = [
    {
      _id: 938475845,
      firstName: "דוד",
      lastName: "שימי",
      age: 65,
      profession: "חשמליזציה",
      classroom: null,
    },
    {
      _id: 435476567,
      firstName: "יוסי",
      lastName: "בן יוסי",
      age: 99,
      profession: "יוסאי",
      classroom: null,
    },
    {
      _id: 272727270,
      firstName: "איימי",
      lastName: "ויינהאוס",
      age: 27,
      profession: "זמרת בכירה",
      classroom: null,
    },
    {
      _id: 435835540,
      firstName: "עמוס",
      lastName: "סומע",
      age: 100,
      profession: "מורה רוחני",
      classroom: null,
    },
    {
      _id: 938465769,
      firstName: "ריף",
      lastName: "רף",
      age: 32,
      profession: "מטקאי",
      classroom: null,
    },
  ];

  return students;
}
