import { Student } from "../store.toolkit/features/student.slice";
import { storageService } from "./async.storage.service";

const STORAGE_KEY = "STUDENT";

export const studentService = {
  query,
  save,
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
      _id: "student1",
      firstName: "Student",
      lastName: "One",
      age: 30,
      profession: "Expert Tester",
    },
    {
      _id: "student2",
      firstName: "Student",
      lastName: "Two",
      age: 27,
      profession: "King Tester",
    },
  ];

  return students;
}
