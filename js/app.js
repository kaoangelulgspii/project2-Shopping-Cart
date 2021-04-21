// Variable
const courses = document.querySelector('#courses-list');


//Listeners
loadEventListeners();

function loadEventListeners(){
    // when new course is added
    courses.addEventListener('click', buycourse);
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
    
    `;
}