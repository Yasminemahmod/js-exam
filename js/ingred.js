let spinner = document.querySelector(".spinner")

$(document).ready(function() {
  spinner.classList.add("d-none")
  // ======== Navbar Visibility =========
  $(".nav .dropDown-list i").on('click', function() {
    $(".show-nav").toggleClass("d-none")
    $(".close-nav").toggleClass("d-none")
    $(".nav").toggleClass("translate-x")
  })




// ============= Area ===============
let ingList = document.querySelector(".ings .row")
ingList.innerHTML = ``
  $.ajax({
  type: "GET",
  url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  data: {},
  dataType: "json",
  success: function (response) {
    console.log(response.meals);
    let shortDesc = []
    $(".ings .row").html(function() {
      for(let i=0; i<response.meals.length; i++) {
        shortDesc.push(`${response.meals[i].strDescription}`.split(" ").slice(1,20).join(" "))
        ingList.innerHTML += `<div class="ingred text-center col-12 col-md-4 position-relative overflow-hidden pointer-event">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h3 class="">${response.meals[i].strIngredient}</h3>
            <p>${shortDesc[i]}</p>
          </div>
        `
      }
    $(".ingred").on('click', function(e) {
      let catName = e.currentTarget.children[1].innerText
      showDishes(catName)
      $(".ing-dishes").removeClass("d-none")
      $(".ings").addClass("d-none")
    })
    })
  }
});






  // =========== When Choose The Area =============
  let dishesCard = document.querySelector(".ing-dishes .row")
  dishesCard.innerHTML = ``
function showDishes(ing) {
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`,
    data: {},
    dataType: "json",
    success: function (response) {
        $(".ing-dishes .row").html(function () { 
          for(let i=0; i<20; i++) {
            dishesCard.innerHTML += `<div class="dish-card col-12 col-md-6 col-lg-4 col-xl-3 position-relative overflow-hidden pointer-event">
              <div class="img rounded-3 overflow-hidden position-relative">
                <img src="${response.meals[i].strMealThumb}" class="w-100" alt="dish name">
                <div class="rec-name text-black pt-3 px-2 fs-2 position-absolute top-100 start-0 bg-white opacity-75 d-flex align-items-center w-100 h-100">
                  <p>${response.meals[i].strMeal}</p>
                </div>
              </div>
            </div>`
          }
        })
        $(".dish-card").on('click', function(e) {
          let catName = e.currentTarget.innerText
          showRec(catName)
          $(".ing-dishes").addClass("d-none")
          $(".dish-det").removeClass("d-none")
        })
    }
  });
}







  // =========== Dish Details ===========
  class DishesRecipes {
    constructor(imgSrc, dName, inst, area, cat, tag, src, youtube) {
      this.imgSrc = imgSrc
      this.dName = dName
      this.inst = inst
      this.area = area
      this.cat = cat
      this.tag = tag
      this.src = src
      this.youtube = youtube
    }
    displayRec(list) {

      console.log(list);
      $(".dish-det .row").html(`
        <div class="img col-12 col-md-4">
          <img src="${this.imgSrc}" alt="dish name">
          <p class="fs-2">${this.dName}</p>
        </div>
        <div class="details col-12 col-md-8">
          <h3 class="fw-normal">Instructions</h3>
          <p class="dish-inst">${this.inst}</p>
          <h4 class="area fw-bolder">Area : <span class="fw-normal">${this.area}</span></h4>
          <h4 class="category fw-bolder">Category : <span class="fw-normal">${this.cat}</span></h4>
          <div class="recipes">
            <h4 class="fw-normal">Recipes :</h4>
            <ul class="ing d-flex gap-3 flex-wrap, py-2 ms-2">${list}</ul>
          </div>
          <div class="tags fw-bolder">
            <h4>Tags :</h4>
            <span class="fw-normal ms-2 mt-2 mb-4 d-inline-block">${this.tag}</span>
          </div>
          <div class="btns">
            <a href="${this.src} target="_blank" class="btn btn-success">Source</a>
            <a href="${this.youtube}" target="_blank" class="btn btn-danger">Youtube</a>
          </div>
        </div>
      `
    ) 
    console.log(list);
    }
  }
  


function showRec(name) {
  $.ajax({
    type: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    data: {},
    dataType: "json",
    success: function (response) {
      let imgSrc =  response.meals[0].strMealThumb
      let name =  response.meals[0].strMeal
      let inst =  response.meals[0].strInstructions
      let area =  response.meals[0].strArea
      let cat =  response.meals[0].strCategory
      let ulEl = document.createElement("ul")
      // ulEl.classList.add("ing", "d-flex", "gap-3","flex-wrap","py-2","ms-2")
      // <ul class="ing d-flex gap-3 flex-wrap, py-2 ms-2"></ul>
      ulEl.innerHTML = ``
      let li = document.createElement("li")
      for(let i= 0; i<20; i++) {
        // console.log(eval(`response.meals[0].strIngredient${i+1}`))
        if(eval(`response.meals[0].strIngredient${i+1}`)== '') {
          continue;
        } else {
          let ing = eval(`response.meals[0].strIngredient${i+1}`)
          let quant = eval(`response.meals[0].strMeasure${i+1}`)
          li.innerText = `${quant} ${ing}`
          ulEl.innerHTML += li
        }
      }
      // console.log(ulEl);
      let tag =  response.meals[0].strTags
      let src =  response.meals[0].strSource
      let youtube =  response.meals[0].strYoutube
      let dishRec = new DishesRecipes(imgSrc,name,inst,area,cat,tag,src,youtube)
      dishRec.displayRec($(".recipes ul"))
    }
  });
}
})
