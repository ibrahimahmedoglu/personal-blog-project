document.addEventListener("DOMContentLoaded", function() {
    
  

  const navigateBtn = document.getElementById("listBlogs");
    navigateBtn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `../HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });
    const navigateBtnn = document.getElementById("listPodcasts");
    navigateBtnn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtnn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `../HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get('cat');
    let productId = urlParams.get('id')
    console.log(productId)
    console.log(category)
  
    if (category == "Blogs") {
      const jsonFileBlog = `http://localhost:4000/blogs?id=${productId}`;
      fetchDataFromJSONFile(jsonFileBlog)
        .then(data => {
         console.log(data)
          createCenterPage(data)
        });
    } else if (category == "Podcasts") {
      const jsonFilePodcasts = `http://localhost:4000/podcasts?id=${productId}`;
      fetchDataFromJSONFile(jsonFilePodcasts)
        .then(data => {
         
         createCenterPage(data)
        });
    }
  });

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

  function createCenterPage(data) {
    // Create the necessary elements
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');

    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'center-content', "border", "border-secondary", "mb-5");

    const image = document.createElement('img');
    image.classList.add('img-fluid', 'mx-auto', 'd-block', 'mt-5', 'rounded');
    image.src = "../Assets/" + data[0].cover_image;
    image.alt = data[0].cover_image;

    const title = document.createElement('h4');
    title.classList.add('text-left', 'mt-3');
    title.textContent = data[0].title;

    const category = document.createElement('p');
    category.classList.add('text-left', 'mt-3');
    category.textContent = data[0].category;

    const paragraph = document.createElement('p');
    paragraph.classList.add('text-left', 'mt-3');
    paragraph.textContent = data[0].body;

    const date = document.createElement('p');
    date.classList.add('text-right', 'mt-3');
    date.textContent = data[0].date;

    // Append elements to create the desired layout
    col.appendChild(image);
    col.appendChild(title);
    col.appendChild(category);
    col.appendChild(paragraph);
    col.appendChild(date);
    row.appendChild(col);
    container.appendChild(row);

    // Add the content to the document
    const dynamicContent = document.getElementById('content');
    dynamicContent.appendChild(container);
  }