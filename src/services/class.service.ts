import axios from "axios";
import { Classroom } from "../store.toolkit/features/class.slice";
import { storageService } from "./async.storage.service";
import { httpService } from "./http.service";

const STORAGE_KEY = "classes";

export const classService = {
  query,
  save,
  remove,
  update,
};

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

async function query() {
  return (await instance.get("classes")).data;

  var classes: Classroom[] = await storageService.query(STORAGE_KEY);
  //   if (!classes || !classes.length) {
  //     classes = _getDemoClasses();
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  //   }
  //   return classes;
}

async function save(classroom: Classroom) {
  return (await instance.post("classes", classroom)).data;

  const savedClassroom = await storageService.post(STORAGE_KEY, classroom);

  return savedClassroom;
}
async function update(classroom: Classroom) {
  return (await instance.patch(`classes/${classroom._id}`, classroom)).data;

  const savedClassroom = await storageService.put(STORAGE_KEY, classroom);

  return savedClassroom;
}

async function remove(classroomId: string | number) {
  return (await instance.delete(`classes/${classroomId}`)).data;
  return await storageService.remove(STORAGE_KEY, classroomId);
}

// function _getDemoClasses() {
//   const classes = [
//     {
//       _id: storageService.makeId(),
//       name: "אלון",
//       totalPlaces: 2,
//       placeLeft: 2,
//       students: [],
//     },
//     {
//       _id: storageService.makeId(),
//       name: "שקמה",
//       totalPlaces: 11111,
//       placeLeft: 11111,
//       students: [],
//     },
//     {
//       _id: storageService.makeId(),
//       name: "שיטה",
//       totalPlaces: 96,
//       placeLeft: 96,
//       students: [],
//     },
//     {
//       _id: storageService.makeId(),
//       name: "תאנה",
//       totalPlaces: 45,
//       placeLeft: 45,
//       students: [],
//     },
//     {
//       _id: storageService.makeId(),
//       name: "גפן",
//       totalPlaces: 1,
//       placeLeft: 1,
//       students: [],
//     },
//     {
//       _id: storageService.makeId(),
//       name: "ארזים",
//       totalPlaces: 22,
//       placeLeft: 22,
//       students: [],
//     },
//   ];

//   return classes;
// }
