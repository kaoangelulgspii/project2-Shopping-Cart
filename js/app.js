// Variable
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn =  document.querySelector('#clear-cart');


//Listeners
loadEventListeners();

function loadEventListeners(){
    // when new course is added
    courses.addEventListener('click', buycourse);

    //when the removed button is Click
    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart Btn
    clearCartBtn.addEventListener('click', clearCart);

    // document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}




//function
function buycourse(e){
    e.preventDefault();
    // use the delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')){
      //read the course values
     const course = e.target.parentElement.parentElement;

     // read the values
     getCourseInfo(course);
    }
}
// read the HTML information of the selected course
function getCourseInfo(course){
  // create an object with course data
  const courseInfo = {
     image: course.querySelector('img').src,
     title: course.querySelector('h4').textContent,
     price: course.querySelector('.price span').textContent,
     id: course.querySelector('a').getAttribute('data-id')
  }
  // insert into shopping cart
  addIntoCart(courseInfo);


}
// Display the selector course into the shoping cart
function addIntoCart(course){
    //create a <tr>
    const row = document.createElement('tr');

    //build the template
    row.innerHTML = `
      <tr>
            <td>
            <img src = "${course.image}" width = 100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                $s<a href"#" class = "remove" data-id = "${course.id}">X<a/>
            </td>

      </tr>
    `;
    // add into shopping cart
    shoppingCartContent.appendChild(row);

    // Addcourse into Storage
    saveIntoStorage(course);
}

// Add the courses into Local storage
function saveIntoStorage(course){
  let courses = getCoursesFromStorage();

  // add the courses into the array
  courses.push(course);

  // Since storage only saves strings, we need to convert JSON into string
  localStorage.setItem('courses', JSON.stringify(courses) );
}
// get the content from the storage
function getCoursesFromStorage(){

   let courses;

   //if something exist on storage then we get the value, otherwise create an empty array
   if(localStorage.getItem('courses') === null){
     courses = [];

   }else{
     courses =JSON.parse(localStorage.getItem('courses'));
   }
   return courses;
}

// remove course from the DOM
function removeCourse (e){
  let course, courseId;
  //remove from the dom 
  if(e.target.classList.contains('remove')){
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }
  console.log(courseId);
  //remove from the local storage
  removeCourseLocalStorage(courseId);

}
// remove the  local storage
function removeCourseLocalStorage(id){
  // get the local storage data
  let coursesLS = getCoursesFromStorage();

  // loop throught the array and find the index  to remove
  coursesLS.forEach(function(courseLS, index){
    if(courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });
  // Add the rest of the array
  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clear the shopping Cart
function clearCart(){
 // shoppingCartContent.innerHTML = '';

 while(shoppingCartContent.firstChild){
  shoppingCartContent.removeChild(shoppingCartContent.firstChild);
 }
 // Clear from local storage
 clearLocalStorage();
}
// clears the whole local storage
function clearLocalStorage(){
  localStorage.clear();
}
//Loads when document is ready and print courses into shopping cart
function getFromLocalStorage(){
  let coursesLS = getCoursesFromStorage();

  //loop throught the course and print into the cart
  coursesLS.forEach(function(course){
    // create the <tr>
    const row = document.createElement('tr');

    // print the content
    row.innerHTML = `
    <tr>
        <td>
        <img src = "${course.image}" width = 100>
        </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
        <td>
            $s<a href"#" class = "remove" data-id = "${course.id}">X<a/>
        </td>

    </tr>

    `;
    shoppingCartContent.appendChild(row);
  });

}
