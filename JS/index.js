function addCardToDOM(arr,id) {
    const cardHtml = `
    <div class="m-2">
                <img class="img-fluid rounded" src="Assets/${arr.cover_image}"></img>
                <p class="card-text text-left my-1 date-text">${arr.date}</p>
                <h5 class="card-title text-left card-title">${arr.title}</h5>
                <p class="card-text text-left">${arr.body}</p>
    </div>
               
    `;
  
    // Create a temporary container element to hold the cardHtml
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = cardHtml;
  
    // Get the 'content' element where you want to append the new content
    const contentElement = document.getElementById(id);
    
  
    // Append the cardHtml content to the 'content' element
    contentElement.appendChild(tempContainer);
    console.log(contentElement)
  }
  function fetchDataFromJSONFile(jsonFileUrl) {
    return fetch(jsonFileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  const jsonFileBlog = 'http://localhost:4000/blogs';
  fetchDataFromJSONFile(jsonFileBlog)
    .then(data => {
      const blogsData = data;
      
      
      for (let i = 0; i < 2; i++) {
        addCardToDOM(blogsData[i],"card-body");
      }
      
    });
  
const jsonFilePodcast = "http://localhost:4000/podcasts"
fetchDataFromJSONFile(jsonFilePodcast)
.then(data => {
  const blogsData = data;
  
  
  for (let i = 0; i < 2; i++) {
    addCardToDOM(blogsData[i],"card-body-podcast");
  }
  
});

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button with the id "navigateBtn"
    const navigateBtn = document.getElementById("listBlogs");
    navigateBtn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });
    const navigateBtnn = document.getElementById("listPodcasts");
    navigateBtnn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtnn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });

    const navigateCardD = document.getElementsByClassName("content-Blog");
    const navigateCardArray = [...navigateCardD];

navigateCardArray.forEach((element) => {
  element.addEventListener("click", function () {
    window.location.href = `HTML/list.html?cat=Blogs`;
  });
});
const navigateCardP = document.getElementsByClassName("content-Podcast");
    const navigateCardPArray = [...navigateCardP];

navigateCardPArray.forEach((element) => {
  element.addEventListener("click", function () {
    window.location.href = `HTML/list.html?cat=Podcasts`;
  });
});


  });
  