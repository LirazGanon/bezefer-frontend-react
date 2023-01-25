import { Student } from "../store.toolkit/features/student.slice";
import { storageService } from "./async.storage.service";

const STORAGE_KEY = "STUDENT";

export const studentService = {
  query,
  save,
  remove,
};

async function query(filterBy = {}) {
  // return httpService.get(STORAGE_KEY, filterBy)

  var students = await storageService.query(STORAGE_KEY);
  if (!students || !students.length) {
    students = _getDemoStudents();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }
  // if (filterBy.txt) {
  //   const regex = new RegExp(filterBy.txt, "i");
  //   spas = spas.filter((spa) => {
  //     return (
  //       regex.test(spa.name) ||
  //       regex.test(spa.location.city) ||
  //       regex.test(spa.categories)
  //     );
  //   });
  // }
  // if (filterBy.minPrice) {
  //   spas = spas.filter((spa) =>
  //     spa.packs.some((pack) => pack.price >= filterBy.minPrice)
  //   );
  // }
  // if (filterBy.maxPrice) {
  //   spas = spas.filter((spa) =>
  //     spa.packs.some((pack) => pack.price <= filterBy.price)
  //   );
  // }

  // if (filterBy.guests) {

  //   spas = spas.filter((spa) => {
  //     return spa.guests.includes(filterBy.guests);
  //   });
  //   console.log('spas', spas)
  // }

  // if (filterBy.amenities?.length) {
  //   spas = spas.filter((spa) =>
  //     filterBy.amenities.every((amenity) => spa.amenities.includes(amenity))
  //   );
  // }
  // if (filterBy.city) {
  //   spas = spas.filter(spa => spa.location.city.toLowerCase() === filterBy.city.toLowerCase())
  // }
  return students;
}

async function remove(studentId: number) {
  return await storageService.remove(STORAGE_KEY, studentId);
  // return httpService.delete(`spa/${spaId}`)
}

async function save(student: Student) {
  var savedStudent;
  // if (classroom._id) {
  // savedClassroom = await storageService.put(STORAGE_KEY, classroom);
  // savedClassroom = await httpService.put(`spa/${spa._id}`, classroom)
  // } else {
  savedStudent = await storageService.post(STORAGE_KEY, student);
  // savedClassroom = await httpService.post('spa', classroom)
  // }
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
    },
    {
      _id: 435476567,
      firstName: "יוסי",
      lastName: "בן יוסי",
      age: 99,
      profession: "יוסאי",
    },
    {
      _id: 272727270,
      firstName: "איימי",
      lastName: "ויינהאוס",
      age: 27,
      profession: "זמרת בכירה",
    },
    {
      _id: 435835540,
      firstName: "עמוס",
      lastName: "סומע",
      age: 100,
      profession: "מורה רוחני",
    },
    {
      _id: 938465769,
      firstName: "ריף",
      lastName: "רף",
      age: 32,
      profession: "מטקאי",
    },
  ];

  return students;
}
