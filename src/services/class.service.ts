import { Classroom } from "../store.toolkit/features/class.slice";
import { storageService } from "./async.storage.service";

const STORAGE_KEY = "CLASS";

export const classService = {
  query,
  save,
  remove,
};

async function query(filterBy = {}) {
  // return httpService.get(STORAGE_KEY, filterBy)

  var classes: Classroom[] = await storageService.query(STORAGE_KEY);
  if (!classes || !classes.length) {
    classes = _getDemoClasses();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
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
  return classes;
}

async function save(classroom: Classroom) {
  var savedClassroom;
  // if (classroom._id) {
  // savedClassroom = await storageService.put(STORAGE_KEY, classroom);
  // savedClassroom = await httpService.put(`spa/${spa._id}`, classroom)
  // } else {
  savedClassroom = await storageService.post(STORAGE_KEY, classroom);
  // savedClassroom = await httpService.post('spa', classroom)
  // }
  return savedClassroom;
}

async function remove(classroomId: string | number) {
  return await storageService.remove(STORAGE_KEY, classroomId);
  // return httpService.delete(`spa/${spaId}`)
}

function _getDemoClasses() {
  const classes = [
    {
      _id: "class1",
      name: "Class-1",
      totalPlaces: 30,
      placeLeft: 20,
    },
    {
      _id: "class2",
      name: "Class-2",
      totalPlaces: 30,
      placeLeft: 20,
    },
  ];

  return classes;
}
